if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/website/script/serviceworker.js?ver=1.4')
            .then((registration) => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}