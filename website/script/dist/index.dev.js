"use strict";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/website/script/serviceworker.js?ver=1.3').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })["catch"](function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}