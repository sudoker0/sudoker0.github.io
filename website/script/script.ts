interface Template {
    [key: string]: string
}
interface HTMLElement {
    replace(data: Template, prefix?: string): void
}

HTMLElement.prototype.replace = function (data: Template, prefix: string = "$_") {
    const alternate_prefix = "id_dlr_";
    const _this: () => HTMLElement = () => this;
    for (const i in data) {
        const old = _this().innerHTML;
        const span: () => HTMLElement | null = () =>
            _this().querySelector(`span.reactive#${alternate_prefix}${i}`)
        if (span() == null) _this().innerHTML =
            old.replace(`${prefix}${i}`, `
                <span class="reactive" id="${alternate_prefix}${i}"></span>`)
        span().innerText = data[i]
    }
}

/**
 * Returns the first element that is a descendant of node that matches selectors.
 * @param selector CSS selector to select the element
 * @returns The element
 */
function qSel<T>(selector: string) { return document.querySelector(selector) as T }

/**
 * Returns all element descendants of node that match selectors.
 * @param sel CSS selector to select elements
 * @returns List of elements
 */
function qSelAll<T extends Node>(sel: string) { return document.querySelectorAll(sel) as unknown as NodeListOf<T> }

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
    for (var i = 0; i < l; i++) {
        r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)]))
    }
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

function toggleSection(id: string, show = true) {
    document.querySelector(`section#${id}`)
        .setAttribute("data-show", show ? "true" : "false")
}

document.addEventListener("DOMContentLoaded", () => {
    switch (gPBName("id")) {
        case "entropy":
            var charStart = 1;
            setInterval(() => {
                var lChar = Math.round(Math.random() * document.body.innerHTML.length),
                    char = rString(Math.floor(charStart));

                document.body.innerHTML =
                    document.body.innerHTML.substring(0, lChar)
                    + char
                    + document.body.innerHTML.substring(lChar + Math.floor(charStart));

                charStart = charStart <= 32 ? charStart + 0.1 : charStart;
            }, 10)
            break;
        case "darkness":
            document.body.style.setProperty("--color-fg", "#000");
            break;
        case "\"alert(1)":
            alert(1);
            break;
        case "rtl":
        case "righttoleft":
            document.body.style.direction = "rtl";
    }

    var intersect: IntersectionObserver | null = null;
    try {
        intersect = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                console.log(entry)
                toggleSection(entry.target.id, entry.isIntersecting)
                //if (entry.isIntersecting) intersect.unobserve(entry.target)
            })
        }, {
            rootMargin: "-50%",
            threshold: 0,
        })
    } catch (e) {
        console.log("Looks like IntersectionObserver doesn't exist!")
    }

    document.querySelectorAll("section")
        .forEach(v => {
            if (
                v.classList.value
                    .split(" ")
                    .map(v => v.startsWith("st-") || v.startsWith("nost"))
                    .reduce((a, b) => a || b)
            ) {
                if (intersect == null) {
                    toggleSection(v.id)
                    return
                }
                intersect.observe(v)
            }
        })
})