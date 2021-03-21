if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js?version=4')
            .then((registration) => { console.log('ServiceWorker registration successful with scope: ', registration.scope) })
            .catch(err => { console.log('ServiceWorker registration failed: ', err) });
    });
}