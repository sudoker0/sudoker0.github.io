//@ts-check/
function getId(i) { return document.getElementById(i) }
function qSelAll(q) { return document.querySelectorAll(q) }
function gPBN(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var name_ = [
    {
        "name": "Home",
        "title": "Home - The main page of the website",
        "address": "home.html"
    },
    {
        "name": "Credit",
        "title": "Credit - All of the stuff and people that created this website will be listed here",
        "address": "credit.html"
    },
    {
        "name": "About Website",
        "title": "About Website - Information about my website",
        "address": "about.html"
    },
    {
        "name": "Gallery",
        "title": "Gallery - Where I store picture of project and stuff",
        "address": "gallery.html"
    },
    {
        "name": "Download",
        "title": "Download - Download stuff, that's it",
        "address": "/download.html"
    }
];
var pathname = window.location.pathname;
//Syntax: Name / Description / Link (Space is important)
name_.forEach(function (list, index) {
    var dateTime = Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
        anchor = document.createElement("a"), anchor_text = document.createTextNode(list.name),
        anchor2 = document.createElement("a"), anchor2_text = document.createTextNode(list.name)
    anchor.appendChild(anchor_text);
    anchor.title = list.title;
    anchor.href = list.address + "?id=" + dateTime;
    anchor2.appendChild(anchor2_text);
    anchor2.title = list.title;
    anchor2.href = list.address + "?id=" + dateTime;
    document.getElementById("accbar").appendChild(anchor);
});
function smtg() {
    if (pathname == "/lite/home.html" || pathname == "/lite/home") { getId("project__").style.width = getId("project").scrollWidth + "px" }
}
window.onload = () => {
    smtg();
    setTimeout(() => {
        getId("loadingIndicator").style.opacity = "0";
        getId("loadingIndicator").style.pointerEvents = "none"
    }, 500);
    document.querySelectorAll("h3#accbar a, h3#accbar_small a").forEach((v) => {
        v.addEventListener("click", e => {
            e.preventDefault();
            getId("loadingIndicator").style.opacity = "1";
            getId("loadingIndicator").style.pointerEvents = "initial";
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 500)
        })
    })
}