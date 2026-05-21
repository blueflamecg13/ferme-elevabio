// Elevabio — Service Worker (mode hors-ligne)
const VERSION = "v1.0.0";
const STATIC_CACHE = `elevabio-static-${VERSION}`;
const RUNTIME_CACHE = `elevabio-runtime-${VERSION}`;
const OFFLINE_URL = "/";

const PRECACHE = [
  "/",
  "/races",
  "/commande",
  "/formation",
  "/contact",
  "/faq",
  "/manifest.webmanifest",
  "/favicon.jpg",
  "/icon-512.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k)).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML / navigation : network-first, fallback cache puis page d'accueil
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match(OFFLINE_URL)))
    );
    return;
  }

  // Images / assets : cache-first
  if (["image", "style", "script", "font"].includes(req.destination)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
            return res;
          }).catch(() => cached)
      )
    );
  }
});
