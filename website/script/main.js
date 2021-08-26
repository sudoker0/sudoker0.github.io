//@QuanMCPC
//@ts-check/
window.onerror = (_, s, l ,c, err) => { if (!somethingCrash) { somethingCrash = true; function a() {return document.createElement("p")}; var errordiv = document.createElement("div"); errordiv.id = "errorscreen"; errordiv.style.backgroundColor = "#000000"; errordiv.style.color = "#ffffff"; errordiv.style.whiteSpace = "pre"; errordiv.style.position = "fixed"; errordiv.style.top = "0"; errordiv.style.left = "0"; errordiv.style.zIndex = "10000"; errordiv.style.padding = "5px"; var text1 = a(), text2 = a(), text3 = a(), text4 = a(); text1.innerHTML = "An error has occurred so the website has been halted to prevent further damage, please reload page."; text2.innerHTML = `Details: \n${err.stack}`; text3.innerHTML = `Source: ${s}`; text4.innerHTML = `Error happened at: Cols${c},Lines${l}`; text1.style.margin = "0 5px 0 5px"; text2.style.margin = "0 5px 0 5px"; text3.style.margin = "0 5px 0 5px"; text4.style.margin = "0 5px 0 5px"; errordiv.append(text1); errordiv.append(text2); errordiv.append(text3); errordiv.append(text4); document.body.append(errordiv); document.body.style.pointerEvents = "none"; document.body.style.overflow = "hidden"; document.body.style.userSelect = "none" } }
/**
 * Short for: document.getElementById
 * @param {string} i The Id of the element
 * @returns HTMLELement
 */
function getId(i) { return document.getElementById(i) }
/**
 * Short for: document.querySelectorAll
 * @param {string} q The selector
 * @returns NodeListOf<Element>
 */
function qSelAll(q) { return document.querySelectorAll(q) }
/**
 * Short for: document.querySelector
 * @param {string} q The selector
 * @returns Element
 */
function qSel(q) { return document.querySelector(q) }
var pathname = window.location.pathname, accb_small_isOn;
var name_ = [
    {
        "name": "Home",
        "title": "Home - The main page of the website",
        "address": "/home.html"
    },
    {
        "name": "Credit",
        "title": "Credit - All of the stuff and people that created this website will be listed here",
        "address": "/credit.html"
    },
    {
        "name": "About Website",
        "title": "About Website - Information about my website",
        "address": "/about.html"
    },
    {
        "name": "Gallery",
        "title": "Gallery - Where I store picture of project and stuff",
        "address": "/gallery.html"
    },
    {
        "name": "Download",
        "title": "Download - Download stuff, that's it",
        "address": "/download.html"
    }
];
//Syntax: Name / Description / Link (Space is important)
name_.forEach(function (list, index) {
    var dateTime = Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
        anchor = document.createElement("a"), anchor_text = document.createTextNode(list.name),
        anchor2 = document.createElement("a"), anchor2_text = document.createTextNode(list.name),
        anchor3 = document.createElement("br");
    anchor.appendChild(anchor_text);
    anchor.title = list.title;
    anchor.href = list.address + "?id=" + dateTime;
    anchor2.appendChild(anchor2_text);
    anchor2.title = list.title;
    anchor2.href = list.address + "?id=" + dateTime;
    getId("accbar_small").appendChild(anchor2)
    getId("accbar_small").appendChild(anchor3)
    getId("accbar").appendChild(anchor);
});
/**
 * Get the value of a field in a URL
 * @param {string} name The field that you want to get the value
 * @param {string} url The URL that you want to use (Optional)
 * @returns String
 */
function gPBName(name, url = window.location.href) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function setWebConf(dataChangeName, dataChangeData) {
    var data = JSON.parse(localStorage.getItem("website_settings"))
    // var dataTemplate = !!data ? data : {"antialiasing":true,"background":0,"theme":0,"backgroundURL":"","advanced_background":{"backgroundAttachment":"fixed","backgroundBlendMode":"initial","backgroundClip":"initial","backgroundOrigin":"initial","backgroundPosition":"center center","backgroundRepeat":"no-repeat","backgroundSize":"initial"}}
    var dataTemplate = !!data ? data : {"antialiasing":true,"background":0,"theme":0,"backgroundURL":""}
    if (dataChangeName != "initdata") { dataTemplate[dataChangeName] = dataChangeData }
    localStorage.setItem("website_settings", JSON.stringify(dataTemplate))
}
function getWebConf(dataName) {
    var returnedData = JSON.parse(localStorage.getItem("website_settings"))
    if (dataName == "*") { return returnedData } else { return returnedData[dataName] }
}
/**
 * Check if the current browser support WebP
 * @returns {Boolean}
 */
function webpSupport() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
        return false;
    }
}
/**
 * Create random string
 * @param {Number} l Length of the string
 * @returns {String}
 */
function rString(l) {
    // var r = [], c = 'XLft#w!g03OK^h$5osJkvxI9VN(zecY1HTy8}rniRCj@S7m,UbPd%{a2lFEWqM)Q*&G4A6BDuZ.p', cL = c.length;
    // for ( var i = 0; i < l; i++ ) { r.push(c.charAt(Math.floor(Math.random() * cL))) }
    // return r.join('');
    var r = []
    for(var i = 0; i < l; i++) { r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)])) }
    return r.join("");
}
function check() {
    getId("accb_small").style.top = getId("accb_small_").style.width
    if (Number(gPBName("sv_cheat")) >= 1 || Number(gPBName("debug")) >= 1 || Number(gPBName("hack")) >= 1) {
        window.location.replace("ban.html");
    }
    if (localStorage.getItem("ls") == "927") {
        window.location.replace("ban.html");
    }
    if (gPBName("secret") == "true" || gPBName("id") == "secret") {
        getId("secret_image").style.display = "block"
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(website/image/sus_.png)"
    }
    if (gPBName("id") == "entropy") {
        var charStart = 1;
        function d() {
            var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
            document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
            charStart =  charStart <= 32 ? charStart + 0.1 : charStart;
        }
        var c = setInterval(d, 10)
    }
    if (gPBName("id") == "rotate") { document.body.style.animation = "rotate_ 5s ease"; }
    if (gPBName("id") == "rotate-inf") { document.body.style.animation = "rotate_ 5s ease infinite"; }
}
document.addEventListener("click", function(evt) {
    var flyoutElement = getId('accb_small'),
        targetElement = evt.target,
        flyoutElement_2 = getId("accb_small_")
    do {
        if (targetElement == flyoutElement || targetElement == flyoutElement_2) { return; }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    getId("accb_small").style.display = "none";
    accb_small_isOn = false;
});
function fetchLocal() {
    getId("bg_control").querySelectorAll("li")[getWebConf("background")].querySelector("input[type='radio']").setAttribute("checked", "checked")
    getId("theme_control").querySelectorAll("li")[getWebConf("theme")].querySelector("input[type='radio']").setAttribute("checked", "checked")
    document.body.style.imageRendering = getWebConf("antialiasing") ? "auto" : "pixelated"
    if (getWebConf("antialiasing")) {
        getId("bg-antialiasing").setAttribute("checked", "true");
    } else {
        getId("bg-antialiasing").removeAttribute("checked")
    }
    if (Number(getWebConf("theme")) == 0) { ws_1() } else { ws_2() }
}
window.onresize = smtg;
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
    // Object.keys(getWebConf("advanced_background")).forEach((value) => {
    //     document.body.style[value] = getWebConf("advanced_background")[value]
    // })
    if (!getWebConf("*")) { setWebConf("initdata") }
    fetchLocal();
}
var somethingCrash = false;
function smtg() {
    check()
    accb_small_isOn = false;
    getId("accb_small").style.display = "none"
}
accb_small_isOn = false;
function accb_small() {
    if (accb_small_isOn) {
        getId("accb_small").style.display = "none";
        accb_small_isOn = false;
    } else {
        getId("accb_small").style.display = "block";
        accb_small_isOn = true;
    }
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    getId("accb_small").style.display = "none"
    accb_small_isOn = false;
}
function changeBg(mode) {
    function noCustomBackground() { getId("bg-custom-upload-file").setAttribute("disabled", "disabled") }
    switch (mode) {
        case 0:
            qSel("body").style.backgroundImage = "url(\"/website/image/background/background_light.png\")";
            noCustomBackground()
            break;
        case 1:
            qSel("body").style.backgroundImage = "url(\"/website/image/background/background_dark.png\")";
            noCustomBackground()
            break;
        case 3:
            qSel("body").style.backgroundImage = `url("${getWebConf("backgroundURL")}")`
            getId("bg-custom-upload-file").removeAttribute("disabled")
    }
}
/**
 * Basically localStorage.getItem
 * @param {String} i - The name of the item
 * @returns {String} The content of the item
 */
function ls_gt(i) { return localStorage.getItem(i) }
/**
 * Basically localStorage.setItem
 * @param {string} i The name of the item
 * @param {any} v The value of the item
 */
function ls_st(i, v) { localStorage.setItem(i, v) }
var constant = 0;
function setAttrClass(clas, name, attr) { document.querySelectorAll(`.${clas}`).forEach((elem) => { elem.setAttribute(name, attr) }) }
document.addEventListener("DOMContentLoaded", () => {
    if (typeof SVGAnimateElement !== 'undefined') {} else {
        getId("loading_redstone_dust").setAttribute('src', '/website/image/logo/loading.gif')
    }
    if (typeof SVGRect !== 'undefined') {} else {
        setAttrClass("website_logo", "src", "/website/image/logo/logo.png")
    }
    document.querySelectorAll('.nt').forEach((v) => {
        v.classList.remove("nt");
    })
});
function dropShadow() {
    if (scrollY > 5 && getWebConf("theme") == 1) {
        getId("accb").style.boxShadow = "0px 7px 8px rgb(15 15 15)";
        getId("accb_small_").style.boxShadow = "0px 7px 8px rgb(15 15 15)";
    } else {
        getId("accb").style.boxShadow = "none";
        getId("accb_small_").style.boxShadow = "none";
    }
}
document.onscroll = (_) => { dropShadow(); }
function ws_1() {
    document.documentElement.style.setProperty("--bg", "rgba(20, 20, 20, 0.85)")
    qSel(".container").style.border = "3px solid black";
    qSel(".container").style.margin = "20px";
    if (getWebConf("background") == 0) { changeBg(0) }
    else if (getWebConf("background") == 1) { changeBg(1) }
    else if (getWebConf("background") == 2) {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) { changeBg(0); } else { changeBg(1);}
        window.matchMedia("(prefers-color-scheme: light)").onchange = function(e) {
            if (e.matches) { changeBg(0); } else { changeBg(1);}
        }
    } else {
        changeBg(3)
    }
    getId("bg_control").querySelectorAll("input, textarea").forEach(function(elem) { elem.removeAttribute("disabled") })
}
function ws_2() {
    document.documentElement.style.setProperty("--bg", "rgb(21, 21, 21)")
    qSel(".container").style.border = "1px solid rgb(21, 21, 21)";
    qSel(".container").style.margin = "-8px";
    qSel("body").style.backgroundImage = "initial";
    // qSelAll("[name='bgstyle']").forEach(function(elem) { elem.setAttribute("disabled", "disabled") })
    getId("bg_control").querySelectorAll("input, textarea").forEach(function(elem) { elem.setAttribute("disabled", "disabled") })
}
function backgroundEasterEgg() {
    constant = constant + 0.5
    if (constant >= 15) {
        alert("Hey! Who keep changing the day?")
        constant = 0
    }
}
qSelAll("[name='bgstyle']").forEach(function (elem) {
    elem.onclick = (ev) => {
        console.log(ev.target.id)
        switch(ev.target.id) {
            case "bg-night":
                changeBg(1);
                setWebConf("background", 1)
                break;
            case "bg-day":
                changeBg(0);
                setWebConf("background", 0)
                break;
            case "bg-sys":
                if (window.matchMedia("(prefers-color-scheme: light)").matches) { changeBg(0); } else { changeBg(1);}
                setWebConf("background", 2)
                break;
            case "bg-custom":
                changeBg(3);
                setWebConf("background", 3)
                break;
        }
        backgroundEasterEgg();
    }
})
getId("wslook-default").onchange = () => { ws_1(); setWebConf("theme", 0); dropShadow(); }
getId("wslook-minimal").onchange = () => { ws_2(); setWebConf("theme", 1); dropShadow(); }
/**
 * Open file
 * @returns {Promise<string | ArrayBuffer>}
 */
function openFile() {
    return new Promise((resolve, reject) => {
        function clickElem(elem) {
            var eventMouse = document.createEvent("MouseEvents");
            eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem.dispatchEvent(eventMouse);
        }
        var readFile = function(e) {
            var file = e.target.files[0];
            if (!file) { return }
            var reader = new FileReader();
            reader.onerror = function(e) { reject(e.target.error) }
            reader.onload = function(e) { resolve(e.target.result) }
            reader.readAsDataURL(file)
        }
        var fileInput = document.createElement("input");
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        fileInput.onchange = readFile;
        document.body.appendChild(fileInput);
        clickElem(fileInput);
    })
}
getId("bg-custom-upload-file").onclick = (e) => {
    openFile()
        .then((result) => {
            qSel("body").style.backgroundImage = `url(${result})`
            setWebConf("backgroundURL", result)
            setWebConf("theme", 0);
        })
        .catch((error) => {
            console.log(error)
        })
}
getId("bg-antialiasing").onchange = (e) => {
    if (e.target.checked) {
        document.body.style.imageRendering = "auto"
        setWebConf("antialiasing", true)
    } else {
        document.body.style.imageRendering = "pixelated"
        setWebConf("antialiasing", false)
    }
}
// qSelAll("select.bg-config")
//     .forEach((elem) => {
//         elem.onchange = (e) => {
//             setWebConf(qSel(`label[for=${e.target.id}]`).getAttribute("data-cssvalue"), e.target.value)
//             console.log(e.target.value, qSel(`label[for=${e.target.id}]`).getAttribute("data-cssvalue"))
//             document.body.style[qSel(`label[for=${e.target.id}]`).getAttribute("data-cssvalue")] = e.target.value
//         }
//     })