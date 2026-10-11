/* Offline support. Pages are served from the cache instantly and refreshed in the background,
   so an update you publish appears on the next visit after that. Change VERSION to force a full refresh. */
const VERSION = 'v3';
const CACHE = 'visual-way-' + VERSION;
const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/style.css",
  "assets/engine.js",
  "assets/icons/icon-192.png",
  "courses/ces1102/index.html",
  "courses/ces1102/progress.html",
  "courses/ces1102/course.js",
  "courses/ces1102/unit1.html",
  "courses/ces1102/unit2.html",
  "courses/ces1102/unit3.html",
  "courses/ces1102/unit4.html",
  "courses/ces1102/unit5.html",
  "courses/ces1102/data/unit1.js",
  "courses/ces1102/data/unit2.js",
  "courses/ces1102/data/unit3.js",
  "courses/ces1102/data/unit4.js",
  "courses/ces1102/data/unit5.js"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('visual-way-') && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameSite = url.origin === self.location.origin;
  const font = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameSite && !font) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: sameSite });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    });
    if (hit) { e.waitUntil(fresh.catch(() => {})); return hit; }
    try { return await fresh; }
    catch (err) { return (await cache.match('index.html')) || Response.error(); }
  })());
});
