//@ts-check/
window.onerror = (_, s, l ,c, err) => { if (!somethingCrash) { somethingCrash = true; function a() {return document.createElement("p")}; var errordiv = document.createElement("div"); errordiv.id = "errorscreen"; errordiv.style.backgroundColor = "#000000"; errordiv.style.color = "#ffffff"; errordiv.style.whiteSpace = "pre"; errordiv.style.position = "fixed"; errordiv.style.top = "0"; errordiv.style.left = "0"; errordiv.style.zIndex = "10000"; errordiv.style.padding = "5px"; var text1 = a(), text2 = a(), text3 = a(), text4 = a(); text1.innerHTML = "An error has occurred so the website has been halted to prevent further damage, please reload page."; text2.innerHTML = `Details: \n${err.stack}`; text3.innerHTML = `Source: ${s}`; text4.innerHTML = `Error happened at: Cols${c},Lines${l}`; text1.style.margin = "0 5px 0 5px"; text2.style.margin = "0 5px 0 5px"; text3.style.margin = "0 5px 0 5px"; text4.style.margin = "0 5px 0 5px"; errordiv.append(text1); errordiv.append(text2); errordiv.append(text3); errordiv.append(text4); document.body.append(errordiv); document.body.style.pointerEvents = "none"; document.body.style.overflow = "hidden"; document.body.style.userSelect = "none" } }
/**
 * Short for: `document.querySelector`
 * @param {string} q The selector
 * @returns {HTMLElement}
 */
function sel(q) { return document.querySelector(q) }
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
        "address": "/basic/home.html"
    },
    {
        "name": "Credit",
        "title": "Credit - All of the stuff and people that created this website will be listed here",
        "address": "/basic/credit.html"
    },
    {
        "name": "About Website",
        "title": "About Website - Information about my website",
        "address": "/basic/about.html"
    },
    {
        "name": "Gallery",
        "title": "Gallery - Where I store picture of project and stuff",
        "address": "/basic/gallery.html"
    },
    {
        "name": "Download",
        "title": "Download - Download stuff, that's it",
        "address": "/basic/download.html"
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
    // if (pathname == "/basic/home.html" || pathname == "/basic/home") { sel("#project__").style.width = sel("#project").scrollWidth + "px" }
}
var somethingCrash = false;
document.addEventListener("DOMContentLoaded", () => {
    smtg();
    console.log("Trigger");
    if (typeof SVGRect !== 'undefined') {} else {
        setAttrClass("website_logo", "src", "/website/image/logo/logo.png")
    }
    setTimeout(() => {
        sel("#loadingIndicator").style.opacity = "0";
        sel("#loadingIndicator").style.pointerEvents = "none"
    }, 500);
    document.querySelectorAll("h3#accbar a, h3#accbar_small a").forEach((v) => {
        v.addEventListener("click", e => {
            e.preventDefault();
            sel("#loadingIndicator").style.opacity = "1";
            sel("#loadingIndicator").style.pointerEvents = "initial";
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 500)
        })
    })
})
sel("#list_dir").onclick = (_) => { window.location.href = "/dir_listing.html" }