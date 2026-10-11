/* Offline support. When online, every page and file is fetched fresh from the network (the saved
   copy is only refreshed), so a published change shows up on the next visit. When offline, the saved
   copies are used. Change VERSION when you add, rename or remove files so the offline copy is rebuilt. */
const VERSION = '2026-10-12b';
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
  "courses/ces1102/data/practice.js",
  "courses/ces1102/practice.html",
  "courses/ces1102/data/tags.js",
  "courses/ces1102/data/exam.js",
  "courses/ces1102/data/sdl.js",
  "courses/ces1102/exam.html",
  "courses/ces1102/sdl.html",
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
    if (sameSite) {
      // Network first: always the latest files when online, saved copies when offline.
      try {
        const res = await fetch(req.url, { cache: 'no-cache' });
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      } catch (err) {
        return (await cache.match(req, { ignoreSearch: true })) || (await cache.match('index.html')) || Response.error();
      }
    }
    // Fonts never change, so the saved copy is used first.
    const hit = await cache.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
    return res;
  })());
});
