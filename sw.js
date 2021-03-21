var cacheName = `version-${Math.floor(Math.random() * 100000)}`, urlsToCache = ["other_project/soope.html", "offline.html"];
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(cacheName)
            .then(c => {
                console.log("Cache opened");
                return c.addAll(urlsToCache);
            })
    )
})
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request)
            .then(r => {
                if (r) {
                    return r;
                }
                return fetch(e.request)
                    .catch(e => {
                        console.log(`Error: ${e}`);
                        return caches.match("offline.html");
                    })
            })
    )
})
self.addEventListener('activate', e => {
    var cWl = [];
    cWl.push(cacheName);
    e.waitUntil(
        caches.keys().then(c => {
            return Promise.all(
                c.map(c_ => {
                    if (!cWl.includes(c_)) {
                        return caches.delete(c_);
                    }
                })
            );
        })
    );
});