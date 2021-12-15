function sel(q) { return document.querySelector(q); }
function selAll(q) { return document.querySelectorAll(q); }
function gPBN(name, url) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]\\]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim, "");
    return str.trim();
}
function setAttrClass(clas, name, attr) { document.querySelectorAll(".".concat(clas)).forEach(function (elem) { elem.setAttribute(name, attr); }); }
var somethingCrash = false;
document.addEventListener("DOMContentLoaded", function () {
    console.log("Trigger");
    if (typeof SVGRect !== 'undefined') { }
    else {
        setAttrClass("website_logo", "src", "/website/image/logo/logo.png");
    }
    setTimeout(function () {
        sel("#loadingIndicator").style.opacity = "0";
        sel("#loadingIndicator").style.pointerEvents = "none";
    }, 500);
    document.querySelectorAll("h3#accbar a, h3#accbar_small a").forEach(function (v) {
        v.addEventListener("click", function (e) {
            e.preventDefault();
            sel("#loadingIndicator").style.opacity = "1";
            sel("#loadingIndicator").style.pointerEvents = "initial";
            setTimeout(function () {
                window.location.href = e.target["href"];
            }, 500);
        });
    });
});
sel("#list_dir").onclick = function (_) { window.location.href = "/dir_listing.html"; };
selAll("a.openInProjectViewer").forEach(function (v) {
    v.onclick = function (ev) {
        ev.preventDefault();
        oOPIIF(v.getAttribute("href"));
    };
});
function oOPIIF(url) {
    sel("#iframe__").setAttribute("src", sanitizeString(url) + "?nocache=".concat(Math.round(Math.random() * 1000000)));
    sel("#iframe_").style.display = "block";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
}
//# sourceMappingURL=lite.js.map