/* Service Worker — Planejamento SEPLAN-PI
   Estratégia:
   - App shell (HTML/ícones): network-first com fallback para cache (você sempre pega a versão nova quando há internet, mas o app abre offline).
   - Biblioteca do Supabase (CDN): cache-first (não muda).
   Ao publicar uma nova versão do app, troque o número em VERSION para forçar atualização.
*/
const VERSION = "v2.0.0";
const CACHE = "seplanpi-" + VERSION;
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Nunca interceptar chamadas de API do Supabase (dados e login precisam de rede real)
  if (url.hostname.endsWith("supabase.co")) return;

  // Biblioteca do CDN: cache-first
  if (url.hostname.includes("jsdelivr.net") || url.hostname.includes("unpkg.com")) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // App shell: network-first, cai para o cache quando offline
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then(hit => hit || caches.match("./index.html")))
    );
  }
});
