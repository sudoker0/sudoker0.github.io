const cache_name = "My_Cache";
const My_Cache = [
    "./b.html",
    "./a.html",
    "./script.js",
    "/"
]


self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cache_name)
        .then(function (cache) {
            console.log("Cache opened")
            return cache.addAll(My_Cache)
        })
    )
})
self.addEventListener("fetch", (event1) => {
    event1.respondWith(
        cache.match(event1.request)
        .then(function (response) {
            if (response) {
                return response
            }
            return fetch(event1.request)
        })
    )
})