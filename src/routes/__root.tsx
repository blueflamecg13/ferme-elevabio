import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#2E7D32" },
      { name: "author", content: "Elevabio" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      { httpEquiv: "X-Frame-Options", content: "SAMEORIGIN" },
      { httpEquiv: "Permissions-Policy", content: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { httpEquiv: "Strict-Transport-Security", content: "max-age=63072000; includeSubDomains; preload" },
      { httpEquiv: "Content-Security-Policy", content: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'self'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self' https:; form-action 'self' https://wa.me; manifest-src 'self'; upgrade-insecure-requests" },
      { title: "Ferme Avicole Elevabio" },
      { name: "description", content: "Elevabio, ferme avicole spécialisée Goliath et Brahma à Pointe-Noire, Congo. Œufs fertiles, poussins, reproducteurs et formations." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Elevabio" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Ferme Avicole Elevabio" },
      { name: "twitter:title", content: "Ferme Avicole Elevabio" },
      { property: "og:description", content: "Elevabio, ferme avicole spécialisée Goliath et Brahma à Pointe-Noire, Congo. Œufs fertiles, poussins, reproducteurs et formations." },
      { name: "twitter:description", content: "Elevabio, ferme avicole spécialisée Goliath et Brahma à Pointe-Noire, Congo. Œufs fertiles, poussins, reproducteurs et formations." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7f310ff1-478b-4e04-89ac-6218dce05df2" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/7f310ff1-478b-4e04-89ac-6218dce05df2" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "apple-touch-icon", href: "/icon-512.jpg" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const swRegisterScript = `(function(){
  try {
    var inIframe = false;
    try { inIframe = window.self !== window.top; } catch(e) { inIframe = true; }
    var host = window.location.hostname;
    var isPreview = host.indexOf('id-preview--') !== -1 || host.indexOf('lovableproject.com') !== -1;
    if ('serviceWorker' in navigator && !inIframe && !isPreview) {
      window.addEventListener('load', function(){
        navigator.serviceWorker.register('/sw.js').catch(function(){});
      });
    } else if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function(rs){ rs.forEach(function(r){ r.unregister(); }); }).catch(function(){});
    }
  } catch(e){}
})();`;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <script dangerouslySetInnerHTML={{ __html: swRegisterScript }} />
      <Outlet />
    </QueryClientProvider>
  );
}
