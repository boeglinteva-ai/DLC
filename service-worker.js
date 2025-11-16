self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("padova-v1").then(cache =>
      cache.addAll([
        "/",
        "index.html",
        "Logo-DLC.png",
        "manifest.json"
      ])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
