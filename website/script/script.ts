/**
 * Returns a reference to the first object with the specified value of the ID attribute.
 * @param id String that specifies the ID value.
 * @returns The element
 */
function getId(id: string) { return document.getElementById(id) }

/**
 * Returns the first element that is a descendant of node that matches selectors.
 * @param selector CSS selector to select the element
 * @returns The element
 */
function qSel(selector: string) { return document.querySelector(selector) }

/**
 * Returns all element descendants of node that match selectors.
 * @param sel CSS selector to select elements
 * @returns List of elements
 */
function qSelAll(sel: string) { return document.querySelectorAll(sel) }

/**
 * Get the value of query string
 * @param name Name of the query string
 * @param url The URL to analyze
 * @returns The value
 */
function gPBName(name: string, url = window.location.href): string {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]\\]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Create a random string with a defined length
 * @param l Length of the string
 * @returns The random string
 */
function rString(l: number): string {
    var r = []
    for(var i = 0; i < l; i++) { r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)])) }
    return r.join("");
}

/**
 * Return a cryptographically secure random number
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
function getRandomInt(min: number, max: number) {
    const range = max - min + 1;
    const bytes_needed = Math.ceil(Math.log2(range) / 8);
    const cutoff = Math.floor((256 ** bytes_needed) / range) * range;
    const bytes = new Uint8Array(bytes_needed);
    let value: number;
    do {
        crypto.getRandomValues(bytes);
        value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0);
    } while (value >= cutoff);
    return min + value % range;
}

/**
 * Wait for a number of seconds
 * @param ms Milliseconds
 */
function wait(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

function sanitizeString(str: string): string {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim,"");
    return str.trim();
}

function openURLInProjectViewer(url: string) {

    if (getId("projectViewer") == null || qSelAll("a.openInProjectViewer").length <= 0) return;

    getId("pv_iframe").setAttribute("src", sanitizeString(url) + `?nocache=${Math.round(Math.random() * 1000000)}`);
    document.body.style.overflow = "hidden";
    getId("projectViewer").style.display = "block";
    setTimeout(() => {
        getId("projectViewer").style.transform = "scale(1)";
        getId("projectViewer").style.opacity = "1";
    }, 100)
}

document.addEventListener("DOMContentLoaded", () => {

    if (getId("projectViewer") == null || qSelAll("a.openInProjectViewer").length <= 0) return;

    const _ = () => {
        document.body.style.overflow = "auto";
        getId("projectViewer").style.opacity = "0";
        getId("projectViewer").style.transform = "scale(1.5)";
        getId("pv_iframe").setAttribute("src", "about:blank");
        setTimeout(() => {
            getId("projectViewer").style.display = "none";
        }, 400);
    }

    qSelAll("a.openInProjectViewer").forEach((v) => {
        (v as HTMLAnchorElement).onclick = (ev) => {
            ev.preventDefault();
            openURLInProjectViewer(v.getAttribute("href"));
        }
    })
    getId("pv_close").addEventListener("click", _);

    getId("pv_oint").addEventListener("click", () => {
        window.open(getId("pv_iframe").getAttribute("src"), "_blank");
        _();
    })

    if (gPBName("id") == "entropy") {
        var charStart = 1;
        setInterval(() => {
            var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
            document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
            charStart =  charStart <= 32 ? charStart + 0.1 : charStart;
        }, 10)
    }
})