//@QuanMCPC
//@ts-check/
// window.onerror = (_, s, l ,c, err) => { if (!somethingCrash) { somethingCrash = true; function a() {return document.createElement("p")}; var errordiv = document.createElement("div"); errordiv.id = "errorscreen"; errordiv.style.backgroundColor = "#000000"; errordiv.style.color = "#ffffff"; errordiv.style.whiteSpace = "pre"; errordiv.style.position = "fixed"; errordiv.style.top = "0"; errordiv.style.left = "0"; errordiv.style.zIndex = "10000"; errordiv.style.padding = "5px"; var text1 = a(), text2 = a(), text3 = a(), text4 = a(); text1.innerHTML = "An error has occurred so the website has been halted to prevent further damage, please reload page."; text2.innerHTML = `Details: \n${err.stack}`; text3.innerHTML = `Source: ${s}`; text4.innerHTML = `Error happened at: Cols${c},Lines${l}`; text1.style.margin = "0 5px 0 5px"; text2.style.margin = "0 5px 0 5px"; text3.style.margin = "0 5px 0 5px"; text4.style.margin = "0 5px 0 5px"; errordiv.append(text1); errordiv.append(text2); errordiv.append(text3); errordiv.append(text4); document.body.append(errordiv); document.body.style.pointerEvents = "none"; document.body.style.overflow = "hidden"; document.body.style.userSelect = "none" } }
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
name_.forEach(function (list, _) {
    var dateTime = Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
        anchor = document.createElement("a"), anchor_text = document.createTextNode(list.name),
        anchor2 = document.createElement("a"), anchor2_text = document.createTextNode(list.name),
        anchor3 = document.createElement("br");
    anchor.appendChild(anchor_text);
    anchor.title = list.title;
    anchor.href = list.address + "?id=" + dateTime;
    anchor.classList.add("nav_bar_link")
    anchor2.appendChild(anchor2_text);
    anchor2.title = list.title;
    anchor2.href = list.address + "?id=" + dateTime;
    anchor2.classList.add("nav_bar_link")
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
function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
/**
 * @param {string} dataChangeName
 * @param {string | number | boolean | ArrayBuffer} [dataChangeData]
 */
function setWebConf(dataChangeName, dataChangeData) {
    var data = JSON.parse(localStorage.getItem("website_settings"))
    var dataTemplate = !!data ? data : {"antialiasing":true,"background":0,"theme":mobileCheck() ? 1 : 0,"backgroundURL":""}
    if (dataChangeName != "initdata") { dataTemplate[dataChangeName] = dataChangeData }
    localStorage.setItem("website_settings", JSON.stringify(dataTemplate))
}
/**
 * @param {string} dataName
 */
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
    var r = []
    for(var i = 0; i < l; i++) { r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)])) }
    return r.join("");
}
function check() {
    getId("accb_small").style.top = getId("accb_small_").style.width
    if (Number(gPBName("sv_cheat")) >= 1 || Number(gPBName("debug")) >= 1 || Number(gPBName("hack")) >= 1 || ls_gt("ls") == "927") { window.location.replace("ban.html") }
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
function closeSettings() { getId('settingspage').classList.remove('spOpened') }
document.addEventListener("click", function(evt) {
    var fE = getId('accb_small'),
        fE_2 = getId("accb_small_"),
        tE = evt.target;
    do {
        if (tE == fE || tE == fE_2) { return; }
        tE = tE.parentNode;
    } while (tE);
    getId("accb_small").style.clipPath = "polygon(0 0, 100% 0, 100% 0%, 0% 0%)";
    accb_small_isOn = false;
});
getId("settingspage").onclick = (e) => { if (!(getId("sp_actual").contains(e.target))) { closeSettings(); } }
function fetchLocal() {
    getId("sp_background").querySelectorAll("button")[getWebConf("background")].classList.add("selected")
    getId("sp_look").querySelectorAll("button")[getWebConf("theme")].classList.add("selected")
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
        getId("loadingIndicator").classList.add("lIClosed");
    }, 500);
    document.querySelectorAll("h3#accbar a, h3#accbar_small a").forEach((v) => {
        v.addEventListener("click", e => {
            e.preventDefault();
            getId("loadingIndicator").classList.remove("lIClosed");
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
    getId("accb_small").style.clipPath = "polygon(0 0, 100% 0, 100% 0%, 0% 0%)";
}
accb_small_isOn = false;
function accb_small() {
    if (accb_small_isOn) {
        // getId("accb_small").style.display = "none";
        getId("accb_small").style.clipPath = "polygon(0 0, 100% 0, 100% 0%, 0% 0%)";
        accb_small_isOn = false;
    } else {
        // getId("accb_small").style.display = "block";
        getId("accb_small").style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
        accb_small_isOn = true;
    }
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    getId("accb_small").style.clipPath = "polygon(0 0, 100% 0, 100% 0%, 0% 0%)";
    accb_small_isOn = false;
}
/**
 * @param {number} mode
 */
function changeBg(mode) {
    switch (mode) {
        case 0:
            qSel("body").style.backgroundImage = "url(\"/website/image/background/background_light.png\")";
            break;
        case 1:
            qSel("body").style.backgroundImage = "url(\"/website/image/background/background_dark.png\")";
            break;
        case 3:
            qSel("body").style.backgroundImage = `url("${getWebConf("backgroundURL")}")`
    }
}
var constant = 0;
/**
 * @param {string} clas
 * @param {string} name
 * @param {string} attr
 */
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
    getId("wslook-default").classList.add("selected");
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
    getId("sp_background").querySelectorAll("button").forEach(v => v.removeAttribute("disabled"))
    getId("bg-antialiasing").removeAttribute("disabled")
}
function ws_2() {
    document.documentElement.style.setProperty("--bg", "rgb(21, 21, 21)")
    qSel(".container").style.border = "1px solid rgb(21, 21, 21)";
    qSel(".container").style.margin = "-8px";
    qSel("body").style.backgroundImage = "initial";
    getId("wslook-minimal").classList.add("selected");
    getId("sp_background").querySelectorAll("button").forEach(v => v.setAttribute("disabled", "disabled"))
    getId("bg-antialiasing").setAttribute("disabled", "disabled")
}
function backgroundEasterEgg() {
    constant = constant + 0.5
    if (constant >= 15) {
        alert("Hey! Who keep changing the day?")
        constant = 0
    }
}
qSelAll("button.bg-style").forEach(function (elem) {
    elem.onclick = (ev) => {
        qSelAll("button.bg-style").forEach(e => e.classList.remove("selected"))
        switch(ev.target.id) {
            case "bg-night":
                changeBg(1);
                setWebConf("background", 1);
                getId("bg-night").classList.add("selected");
                break;
            case "bg-day":
                changeBg(0);
                setWebConf("background", 0)
                getId("bg-day").classList.add("selected");
                break;
            case "bg-sys":
                if (window.matchMedia("(prefers-color-scheme: light)").matches) { changeBg(0); } else { changeBg(1);}
                setWebConf("background", 2)
                getId("bg-sys").classList.add("selected");
                break;
            case "bg-custom":
                changeBg(3);
                setWebConf("background", 3)
                getId("bg-custom").classList.add("selected");
                if (confirm("Do you want to select a new custom background?")) {
                    openFile().then((e) => {
                        qSel("body").style.backgroundImage = `url(${e})`
                        setWebConf("backgroundURL", e)
                        setWebConf("theme", 0);
                    })
                }
                break;
        }
        backgroundEasterEgg();
    }
})
function ws_shared() {
    dropShadow();
    qSelAll("button.web-look").forEach((e) => { e.classList.remove("selected"); })
}
getId("wslook-default").onclick = () => { ws_shared(); ws_1(); setWebConf("theme", 0); }
getId("wslook-minimal").onclick = () => { ws_shared(); ws_2(); setWebConf("theme", 1); }
/**
 * Open file
 * @returns {Promise<string | ArrayBuffer>}
 */
function openFile() {
    return new Promise((resolve, reject) => {
        /**
         * @param {HTMLInputElement} elem
         */
        function clickElem(elem) {
            var eventMouse = document.createEvent("MouseEvents");
            eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem.dispatchEvent(eventMouse);
        }
        var readFile = function(/** @type {{ target: { files: any[]; }; }} */ e) {
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
getId("bg-antialiasing").onchange = (e) => {
    if (e.target.checked) {
        document.body.style.imageRendering = "auto"
        setWebConf("antialiasing", true)
    } else {
        document.body.style.imageRendering = "pixelated"
        setWebConf("antialiasing", false)
    }
}
getId("list_dir").onclick = (_) => { window.location.href = "/dir_listing.html" }