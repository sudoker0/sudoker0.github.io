//@QuanMCPC
//@ts-check//
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
    var rnd = Math.floor(Math.random() * 1000), dateTime = rnd + '-' + rnd + '-' + rnd + '-' + rnd,
        anchor = document.createElement("a"), anchor_text = document.createTextNode(list.name),
        anchor2 = document.createElement("a"), anchor2_text = document.createTextNode(list.name),
        anchor3 = document.createElement("br");
    anchor.appendChild(anchor_text);
    anchor.title = list.title;
    anchor.href = list.address + "?id=" + dateTime;
    anchor2.appendChild(anchor2_text);
    anchor2.title = list.title;
    anchor2.href = list.address + "?id=" + dateTime;
    document.getElementById("accbar_small").appendChild(anchor2)
    document.getElementById("accbar_small").appendChild(anchor3)
    document.getElementById("accbar").appendChild(anchor);
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function check() {
    document.getElementById("accb_small").style.top = document.getElementById("accb_small_").style.width
    if (Number(getParameterByName("sv_cheat")) >= 1 || Number(getParameterByName("debug")) >= 1 || Number(getParameterByName("hack")) >= 1) {
        window.location.replace("ban.html");
    }
    if (localStorage.getItem("ls") == "927") {
        window.location.replace("ban.html");
    }
    if (getParameterByName("secret") == "true") {
        document.getElementById("secret_image").style.display = "block"
        document.getElementsByTagName("body")[0].style.backgroundImage = "url(website/image/sus_.png)"
    }
}
document.addEventListener("click", function(evt) {
    var flyoutElement = document.getElementById('accb_small'),
        targetElement = evt.target,
        flyoutElement_2 = document.getElementById("accb_small_")
    do {
        if (targetElement == flyoutElement || targetElement == flyoutElement_2) { return; }
        targetElement = targetElement.parentNode;
    } while (targetElement);
    document.getElementById("accb_small").style.display = "none";
    accb_small_isOn = false;
});
window.onload = window.onresize = function() {
    if (pathname == "/home.html" || pathname == "/home") { document.getElementById("project__").style.width = document.getElementById("project").scrollWidth + "px" }
    check()
    accb_small_isOn = false;
    document.getElementById("accb_small").style.display = "none"
    // if (window.innerWidth < 482 || window.outerWidth < 482) {
    //     document.getElementById("accb_small_").style.display = "grid";
    //     document.getElementsByClassName("accb")[0].style.display = "none"
    // } else {
    //     document.getElementById("accb_small_").style.display = "none";
    //     document.getElementsByClassName("accb")[0].style.display = "grid";
    // }
}
accb_small_isOn = false;
function accb_small() {
    if (accb_small_isOn) {
        document.getElementById("accb_small").style.display = "none";
        accb_small_isOn = false;
    } else {
        document.getElementById("accb_small").style.display = "block";
        accb_small_isOn = true;
    }
}
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    document.getElementById("accb_small").style.display = "none"
    accb_small_isOn = false;
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementsByClassName("accb")[0].style.top = "0";
        document.getElementById("accb_small_").style.top = "0";
    } else {
        document.getElementsByClassName("accb")[0].style.top = "-" + document.getElementsByClassName("accb")[0].offsetHeight + "px";
        document.getElementById("accb_small_").style.top = "-" + document.getElementById("accb_small_").offsetHeight + "px";
    }
    prevScrollpos = currentScrollPos;
}