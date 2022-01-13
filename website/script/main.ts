//@QuanMCPC
/**
 * Short for: `document.querySelectorAll`
 */
function selAll(q: string): NodeListOf<Element> { return document.querySelectorAll(q) }
/**
 * Short for: `document.querySelector`
 */
function sel(q: string): HTMLElement { return document.querySelector(q) }
/**
 * Basically `localStorage.getItem`
 */
function ls_gt(i: string): string { return localStorage.getItem(i) }
/**
  * Basically `localStorage.setItem`
  */
function ls_st(i: string, v: string) { localStorage.setItem(i, v) }
/**
 * Basically `document.documentElement.style.setProperty`
 */
function setCSSVar(p: string, v: string) { document.documentElement.style.setProperty(p, v) }
var pathname = window.location.pathname, accb_small_isOn = false, nBP = { "close": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", "open": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" };
document.querySelectorAll("h3#accbar a").forEach((v) => { document.querySelector("h3#accbar_small").append(v.cloneNode(true)) })
/**
 * Get the value of a field in a URL
 */
function sanitizeString(str: string): string {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim,"");
    return str.trim();
}
/**
 * Get the value of a field in a URL
 */
function gPBName(name: string, url = window.location.href): string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]\\]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window["opera"]);
    return check;
};
/**
 * Check if the current browser support WebP
 */
function webpSupport(): boolean {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        return false;
    }
}
/**
 * Create random string
 */
function rString(l: number): string {
    var r = []
    for(var i = 0; i < l; i++) { r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)])) }
    return r.join("");
}
function check() {
    if (Number(gPBName("sv_cheat")) >= 1 || Number(gPBName("debug")) >= 1 || Number(gPBName("hack")) >= 1 || ls_gt("ls") == "927") { window.location.replace("ban.html") }
    if (gPBName("secret") == "true" || gPBName("id") == "secret") {
        sel("#secret_image").style.display = "block"
        setCSSVar("--bg-img", "url(website/image/sus_.png)")
    }
    if (gPBName("id") == "entropy") {
        var charStart = 1;
        setInterval(() => {
            var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
            document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
            charStart =  charStart <= 32 ? charStart + 0.1 : charStart;
        }, 10)
    }
    if (gPBName("id") == "rotate") { document.body.style.animation = "rotate_ 5s ease"; }
    if (gPBName("id") == "rotate-inf") { document.body.style.animation = "rotate_ 5s ease infinite"; }
}
document.addEventListener("click", function(evt) {
    var fE = sel("#accbar"),
        tE = evt.target;
    do {
        if (tE == fE) { return; }
        tE = tE["parentNode"];
    } while (tE);
    sel("#accb_small").style["webkitClipPath"] = nBP.close;
    sel("#accb_small").style.clipPath = nBP.close;
    accb_small_isOn = false;
});
window.onresize = smtg;
window.addEventListener("DOMContentLoaded", () => {
    smtg();
    setTimeout(() => { selAll("nav.navbar").forEach(e => { e.classList.add("logo_rotate") }) }, Math.random() * (4.5e+6 - 3.6e+6) + 3.6e+6)
    setTimeout(() => { sel("#loadingIndicator").classList.add("lIClosed") }, 500);
    document.querySelectorAll<HTMLAnchorElement>("h3#accbar a, h3#accbar_small a").forEach((v) => {
        v.addEventListener("click", (e) => {
            e.preventDefault();
            sel("#loadingIndicator").classList.remove("lIClosed");
            setTimeout(() => {
                window.location.href = e.target["href"];
            }, 500)
        })
    })
})
var somethingCrash = false;
function smtg() {
    check()
    accb_small_isOn = false;
    sel("#accb_small").style["webkitClipPath"] = nBP.close;
    sel("#accb_small").style.clipPath = nBP.close;
}
accb_small_isOn = false;
function accb_small() {
    if (accb_small_isOn) {
        sel("#accb_small").style["webkitClipPath"] = nBP.close;
        sel("#accb_small").style.clipPath = nBP.close;
        accb_small_isOn = false;
    } else {
        sel("#accb_small").style["webkitClipPath"] = nBP.open;
        sel("#accb_small").style.clipPath = nBP.open;
        accb_small_isOn = true;
    }
}
var prevScrollpos = window.pageYOffset;
var constant = 0;
/**
 * @param {string} clas
 * @param {string} name
 * @param {string} attr
 */
function setAttrClass(clas: string, name: string, attr: string) { document.querySelectorAll(`.${clas}`).forEach((elem) => { elem.setAttribute(name, attr) }) }
document.addEventListener("DOMContentLoaded", () => {
    if (typeof SVGAnimateElement !== 'undefined') {} else {
        sel("#loading_redstone_dust").setAttribute('src', '/website/image/logo/loading.gif')
    }
    if (typeof SVGRect !== 'undefined') {} else {
        setAttrClass("website_logo", "src", "/website/image/logo/logo.png")
    }
    document.querySelectorAll('.nt').forEach((v) => {
        v.classList.remove("nt");
    })
});
function dropShadow() {
    sel("#accb").style.boxShadow = scrollY > 5 ? "0px 7px 8px rgb(15 15 15)" : "none"
}
document.onscroll = (_) => {
    dropShadow();
    sel("#accb_small").style["webkitClipPath"] = nBP.close;
    sel("#accb_small").style.clipPath = nBP.close;
    accb_small_isOn = false;
}
sel("#list_dir").onclick = () => { window.location.href = "/dir_listing.html" }
var logo_a = selAll("nav#accb > a") as NodeListOf<HTMLAnchorElement>;
logo_a.forEach(e => {
    e.onmousemove = (ev) => {
        selAll("nav.navbar").forEach(e => {
            if (ev.ctrlKey && ev.shiftKey) { e.classList.add("logo_rotate") }
            else { e.classList.remove("logo_rotate") }
        })
    }
})
function oOPIIF(url: string) {
    sel("#iframe__").setAttribute("src", sanitizeString(url) + `?nocache=${Math.round(Math.random() * 1000000)}`);
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    sel("#iframe_").style.display = "block";
    setTimeout(() => {
        sel("#iframe_").style.transform = "scale(1)";
        sel("#iframe_").style.opacity = "1";
    }, 100)
}
selAll("a.openInProjectViewer").forEach((v) => {
    (v as HTMLAnchorElement).onclick = (ev) => {
        ev.preventDefault();
        oOPIIF(v.getAttribute("href"));
    }
})
function closeIframe() {
    sel('#iframe__').setAttribute('src', 'about:blank');
    sel('#iframe_').style.transform = 'scale(1.5)';
    sel('#iframe_').style.opacity = '0';
    setTimeout(() => {
        sel('#iframe_').style.display = 'none';
        sel('body').style.overflow = 'initial';
    }, 400)
}
function openIframeInNewTab() {
    window.open(sel('#iframe__').getAttribute('src'), '_blank');
    sel('#iframe__').setAttribute('src', 'about:blank');
    closeIframe()
}