if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.getRegistrations().then(r => {
            for (let registration of r) {
                registration.unregister()
            }
            navigator.serviceWorker.register('/sw.js')
            .then((registration) => { console.log('ServiceWorker registration successful with scope: ', registration.scope) })
            .catch(err => { console.log('ServiceWorker registration failed: ', err) });
        }).catch(e => {
            console.log('Service Worker unregistration failed: ', e)
        });
    });
}