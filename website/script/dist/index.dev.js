"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('https://quanmcpc.github.io/website/script/serviceworker.js?ver=1.2').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })["catch"](function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}