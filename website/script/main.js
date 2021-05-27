//@QuanMCPC
//@ts-check/
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
function gPBName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function rString(l) {
    var r = [], c = 'XLft#w!g03OK^h$5osJkvxI9VN(zecY1HTy8}rniRCj@S7m,UbPd%{a2lFEWqM)Q*&G4A6BDuZ.p', cL = c.length;
    for ( var i = 0; i < l; i++ ) { r.push(c.charAt(Math.floor(Math.random() * cL))) }
    return r.join('');
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
            // if (document.body.querySelectorAll("*").length <= 2) {
            //     clearInterval(c);
            //     document.body.innerHTML += `<div style="max-length: 70%; color: white; background-color: black; border: 2px solid white; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 10px; position: fixed;">An error has occurred in the root of the website, so we have to suspend your current session.<br>A dump of the current session will be created and allow you to download. You can continue with the current session but it's not recommended by <button onclick="c = setInterval(d, 750)">click here</button>.</div>`;
            // }
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
window.onresize = smtg;
window.onload = () => {
    smtg();
    setTimeout(() => {
        getId("loadingIndicator").style.opacity = 0;
        getId("loadingIndicator").style.pointerEvents = "none"
    }, 500);
    document.querySelectorAll("h3#accbar a, h3#accbar_small a").forEach((v) => {
        v.addEventListener("click", e => {
            e.preventDefault();
            getId("loadingIndicator").style.opacity = 1;
            getId("loadingIndicator").style.pointerEvents = "initial";
            setTimeout(() => {
                window.location.href = e.target.href;
            }, 500)
        })
    })

}
function smtg() {
    if (pathname == "/home.html" || pathname == "/home") { getId("project__").style.width = getId("project").scrollWidth + "px" }
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
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        // getId("accb").style.top = "0";
        // getId("accb_small_").style.top = "0";
        getId("accb").style.transform = "translateY(0%)";
        getId("accb_small_").style.transform = "translateY(0%)";
    } else {
        // getId("accb").style.top = "-" + getId("accb").offsetHeight + "px";
        // getId("accb_small_").style.top = "-" + getId("accb_small_").offsetHeight + "px";
        getId("accb").style.transform = "translateY(-100%)";
        getId("accb_small_").style.transform = "translateY(-100%)";
    }
    prevScrollpos = currentScrollPos;
}
function changeBg(isLight) { if (isLight) { qSel("body").style.backgroundImage = "url(\"/website/image/background_light.png\")"; } else { qSel("body").style.backgroundImage = "url(\"/website/image/background_dark.png\")"; } }
function ls_gt(i) { return localStorage.getItem(i) }
function ls_st(i, v) { localStorage.setItem(i, v) }
var constant = 0;
/*
    Background: Light (0)/Dark(1)/BasedOnSystemPreferences(2)
    Theme: Default (0)/Minimal(1)
*/
document.addEventListener("DOMContentLoaded", () => {
    console.log("Fired!")
    document.querySelectorAll('.nt').forEach((v) => {
        v.classList.remove("nt");
    })
});
function fetchLocal() {
    if (ls_gt("background") && ls_gt("theme")) {
        document.getElementById("bg_control").getElementsByTagName("li")[Number(ls_gt("background"))].childNodes[0].setAttribute("checked", "checked")
        document.getElementById("theme_control").getElementsByTagName("li")[Number(ls_gt("theme"))].childNodes[0].setAttribute("checked", "checked")
        if (ls_gt("theme") == "0") {
            ws_1()
        } else {
            ws_2()
        }
    } else {
        ls_st("background", "0");
        ls_st("theme", "0");
        fetchLocal();
    }
}
fetchLocal();
function ws_1() {
    document.documentElement.style.setProperty("--bg", "rgba(20, 20, 20, 0.85)")
    qSel(".container").style.border = "3px solid black";
    qSel(".container").style.margin = "20px";
    qSel("body").style.backgroundColor = "initial";
    if (ls_gt("background") == "0") { changeBg(true) } else if (ls_gt("background") == "1") { changeBg(false) } else {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) { changeBg(true); } else { changeBg(false);}
        window.matchMedia("(prefers-color-scheme: light)").onchange = function(e) {
            if (e.matches) { changeBg(true); } else { changeBg(false);}
        }
    }
    getId("bg-day").removeAttribute("disabled")
    getId("bg-night").removeAttribute("disabled")
    getId("bg-sys").removeAttribute("disabled")
}
function ws_2() {
    document.documentElement.style.setProperty("--bg", "rgb(21, 21, 21)")
    qSel(".container").style.border = "1px solid rgb(21, 21, 21)";
    qSel(".container").style.margin = "-8px";
    qSel("body").style.backgroundImage = "initial";
    qSel("body").style.backgroundColor = "rgb(21, 21, 21)";
    getId("bg-day").setAttribute("disabled", "disabled")
    getId("bg-night").setAttribute("disabled", "disabled")
    getId("bg-sys").setAttribute("disabled", "disabled")
}
getId("bg-night").onchange = () => {
    constant = constant + 0.5
    changeBg(false);
    ls_st("background", "1");
    if (constant >= 15) {
        alert("Hey! Who keep changing the day?")
        constant = 0
    }
}
getId("bg-day").onchange = () => {
    constant = constant + 0.5
    changeBg(true);
    ls_st("background", "0");
    if (constant >= 15) {
        alert("Hey! Who keep changing the day?")
        constant = 0
    }
}
getId("bg-sys").onchange = () => {
    constant = constant + 0.5
    if (window.matchMedia("(prefers-color-scheme: light)").matches) { changeBg(true); } else { changeBg(false);}
    ls_st("background", "2");
    if (constant >= 15) {
        alert("Hey! Who keep changing the day?")
        constant = 0
    }
}
getId("wslook-default").onchange = () => { ws_1(); ls_st("theme", 0); }
getId("wslook-minimal").onchange = () => { ws_2(); ls_st("theme", 1); }