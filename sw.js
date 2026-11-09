/* Koveli Announcement — service worker.
   Lets the console be installed as an app and open even when the internet is down.
   The page itself is fetched fresh when online (so updates on GitHub appear on the next launch)
   and served from the cache when offline. YouTube and Google requests are never cached. */
const CACHE = "koveli-v4";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-192.png", "./icon-512.png"];
const OPTIONAL = ["./Ding.mp3"]; // cached if present

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Cache each file on its own so one missing file never stops the app from installing.
    await Promise.all([...CORE, ...OPTIONAL].map(u => cache.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== self.location.origin) return; // leave YouTube/Google alone

  // Pages: network first, cache as fallback.
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        (await caches.open(CACHE)).put("./index.html", fresh.clone());
        return fresh;
      } catch {
        return (await caches.match("./index.html")) || (await caches.match("./")) || Response.error();
      }
    })());
    return;
  }

  // Everything else on this site (chime, icons): cache first, then network.
  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    const res = await fetch(req);
    if (res.ok && res.status === 200) (await caches.open(CACHE)).put(req, res.clone());
    return res;
  })());
});
