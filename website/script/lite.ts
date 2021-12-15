/**
 * Short for: `document.querySelector`
 */
function sel(q: string): HTMLElement { return document.querySelector(q) }
function selAll(q: string) { return document.querySelectorAll(q) }
function gPBN(name: string, url: string) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]\\]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function sanitizeString(str: string){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim,"");
    return str.trim();
}
function setAttrClass(clas: string, name: string, attr: string) { document.querySelectorAll(`.${clas}`).forEach((elem) => { elem.setAttribute(name, attr) }) }
var somethingCrash = false;
document.addEventListener("DOMContentLoaded", () => {
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
                window.location.href = e.target["href"];
            }, 500)
        })
    })
})
sel("#list_dir").onclick = (_: any) => { window.location.href = "/dir_listing.html" }
selAll("a.openInProjectViewer").forEach((/** @type {HTMLAnchorElement} */v: HTMLAnchorElement) => {
    v.onclick = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        oOPIIF(v.getAttribute("href"));
    }
})
function oOPIIF(url: any) {
    sel("#iframe__").setAttribute("src", sanitizeString(url) + `?nocache=${Math.round(Math.random() * 1000000)}`);
    sel("#iframe_").style.display = "block";
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
}