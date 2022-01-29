const getId = (id: string) => { return document.getElementById(id) },
    qSel = (selector: string) => { return document.querySelector(selector) },
    qSelAll = (sel: string) => { return document.querySelectorAll(sel) },
    sharedFunctions = {
        _a79o6W2KfD: () => {
            document.body.style.overflow = "auto";
            getId("projectViewer").style.opacity = "0";
            getId("projectViewer").style.transform = "scale(1.5)";
            getId("pv_iframe").setAttribute("src", "about:blank");
            setTimeout(() => {
                getId("projectViewer").style.display = "none";
            }, 400);
        }
    },
    gPBName = (name: string, url = window.location.href): string => {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]\\]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    rString = (l: number): string => {
        var r = []
        for(var i = 0; i < l; i++) { r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)])) }
        return r.join("");
    }

// ! Project Viewer Handler

function sanitizeString(str: string): string {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim,"");
    return str.trim();
}

function openURLInProjectViewer(url: string) {
    getId("pv_iframe").setAttribute("src", sanitizeString(url) + `?nocache=${Math.round(Math.random() * 1000000)}`);
    document.body.style.overflow = "hidden";
    getId("projectViewer").style.display = "block";
    setTimeout(() => {
        getId("projectViewer").style.transform = "scale(1)";
        getId("projectViewer").style.opacity = "1";
    }, 100)
}

document.addEventListener("DOMContentLoaded", () => {
    qSelAll("a.openInProjectViewer")?.forEach((v) => {
        (v as HTMLAnchorElement).onclick = (ev) => {
            ev.preventDefault();
            openURLInProjectViewer(v.getAttribute("href"));
        }
    })
    getId("pv_close")?.addEventListener("click", sharedFunctions._a79o6W2KfD);

    getId("pv_oint")?.addEventListener("click", () => {
        window.open(getId("pv_iframe").getAttribute("src"), "_blank");
        sharedFunctions._a79o6W2KfD();
    })

    if (gPBName("id") == "entropy") {
        var charStart = 1;
        setInterval(() => {
            var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
            document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
            charStart =  charStart <= 32 ? charStart + 0.1 : charStart;
        }, 10)
    }

});