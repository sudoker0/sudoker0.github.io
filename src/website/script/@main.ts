interface Template {
    [key: string]: string
}
interface HTMLElement {
    replace(data: Template, prefix?: string): void
}

HTMLElement.prototype.replace = function (data: Template, prefix: string = "$_") {
    const alternate_prefix = "id_dlr_"
    const _this: () => HTMLElement = () => this
    for (const i in data) {
        const old = _this().innerHTML
        const span: () => HTMLElement | null = () =>
            _this().querySelector(`span.reactive#${alternate_prefix}${encodeURIComponent(i)}`)
        if (span() == null) _this().innerHTML =
            old.replace(`${prefix}${i}`, `
                <span class="reactive" id="${alternate_prefix}${encodeURIComponent(i)}"></span>`)
        span().innerText = data[i]
    }
}

/**
 * Returns the first element that is a descendant of node that matches selectors.
 * @param selector CSS selector to select the element
 * @returns The element
 */
function qSel<T extends Element>(selector: string) { return document.querySelector<T>(selector) }

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
    if (!url) url = window.location.href
    name = name.replace(/[\[\]\\]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
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
    return r.join("")
}

/**
 * Return a cryptographically secure random number
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
function getRandomInt(min: number, max: number) {
    const range = max - min + 1
    const bytes_needed = Math.ceil(Math.log2(range) / 8)
    const cutoff = Math.floor((256 ** bytes_needed) / range) * range
    const bytes = new Uint8Array(bytes_needed)
    let value: number
    do {
        crypto.getRandomValues(bytes)
        value = bytes.reduce((acc, x, n) => acc + x * 256 ** n, 0)
    } while (value >= cutoff)
    return min + value % range
}

/**
 * Wait for a number of seconds
 * @param ms Milliseconds
 */
function wait(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)) }

function displayTime(date: number) {
    var s = Math.floor(date / 1000),
        m = Math.floor(s / 60),
        h = Math.floor(m / 60),
        d = Math.floor(h / 24)

    var result = "", result_arr = [
        `${d} days`,
        `${h % 24} hours`,
        `${m % 60} minutes`,
        `${s % 60} seconds`,
    ]

    result_arr = result_arr.filter(x => {
        return x.replace(/(\d+) (\w)*?$/gm, (_0, p1, _p2) => {
            const num = Number(p1)
            if (num == 0) return ""
            return x
        }) != ""
    })

    result = result_arr.slice(0, result_arr.length - 1).join(", ")
        + ((result_arr.length > 1) ? " and " : "")
        + result_arr[result_arr.length - 1]

    return result
}

function sanitizeString(str: string): string {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim,"")
    return str.trim()
}

function detectBrowser() {
    // Opera 8.0+
    //@ts-ignore
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

    // Firefox 1.0+
    //@ts-ignore
    var isFirefox = typeof InstallTrigger !== 'undefined'

    // Safari 3.0+ "[object HTMLElementConstructor]"
    //@ts-ignore
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]" })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))

    // Internet Explorer 6-11
    //@ts-ignore
    var isIE = /*@cc_on!@*/false || !!document.documentMode

    // Edge 20+
    //@ts-ignore
    var isEdge = !isIE && !!window.StyleMedia

    // Chrome 1 - 79
    //@ts-ignore
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)

    // Edge (based on chromium) detection
    //@ts-ignore
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1)

    if (isOpera) return "Opera"
    if (isFirefox) return "Firefox"
    if (isSafari) return "Safari"
    if (isIE) return "Internet Explorer (damn)"
    if (isEdge) return "Microsoft Edge (old)"
    if (isEdgeChromium) return "Microsoft Edge"
    if (isChrome) return "Chrome"
}

function detectResolution() {
    var width = screen.availWidth * devicePixelRatio
    var height = screen.availHeight * devicePixelRatio
    return `${width}x${height}`
}

function updateWebsiteData() {
    const WEBSITE_CREATION_DATE = "2020-07-16T23:35:00+07:00"
    qSel<HTMLElement>(".footer").replace({
        day: displayTime((new Date()).getTime() - (new Date(WEBSITE_CREATION_DATE).getTime())),
    })
    setTimeout(updateWebsiteData, 500)
}

function cardHoverStart(e: MouseEvent) {
    const elm = (e.currentTarget as HTMLElement)
    elm.classList.add("hover")

    var colorOverride = elm.getAttribute("data-colorOverride")

    if (colorOverride != null) {
        elm.style.setProperty("--card-blobColor", colorOverride)
    }
}

function cardHoverMove(e: MouseEvent) {
    const elm = (e.currentTarget as HTMLElement)
    const maxRotate = 5
    var rect = elm.getBoundingClientRect()

    var x = e.clientX - rect.left
    var y = e.clientY - rect.top
    var midX = rect.width / 2
    var midY = rect.height / 2

    elm.style.setProperty("--x", `${x}px`)
    elm.style.setProperty("--y", `${y}px`)
    elm.style.setProperty("--angleY", `${(midX - x) / midX * maxRotate}deg`)
    elm.style.setProperty("--angleX", `${(y - midY) / midY * maxRotate}deg`)
}

function cardHoverEnd(e: MouseEvent) {
    const elm = (e.currentTarget as HTMLElement)
    elm.classList.remove("hover")
    elm.style.setProperty("--angleY", `0`)
    elm.style.setProperty("--angleX", `0`)
}

function registerCardHover() {
    qSelAll<HTMLElement>(".card")
        .forEach(v => {
            v.addEventListener("pointerenter", cardHoverStart)
            v.addEventListener("pointermove", cardHoverMove)
            v.addEventListener("pointerleave", cardHoverEnd)
        })
}

function toggleSection(id: string, show?: boolean) {
    const targetedElm = qSel<HTMLElement>(`#${id}`)
    const cardElm = targetedElm.querySelector(".card")
    const contentElm = targetedElm.querySelector(".content")
    const childDivElm = targetedElm.querySelector(`div[data-section=${id}]`)

    childDivElm.classList[show ? "add" : "remove"]("focused")

    cardElm.classList[show ? "add" : "remove"]("show")
    contentElm.classList[show ? "add" : "remove"]("show")
}

document.addEventListener("DOMContentLoaded", () => {
    registerCardHover()
    scroll({top: 0})

    qSel<HTMLElement>(".footer").replace({
        reported_browser: detectBrowser(),
        reported_resolution: detectResolution()
    })

    updateWebsiteData()
    switch (gPBName("id")) {
        case "entropy":
            var charStart = 1
            setInterval(() => {
                var lChar = Math.round(Math.random() * document.body.innerHTML.length),
                    char = rString(Math.floor(charStart))

                document.body.innerHTML =
                    document.body.innerHTML.substring(0, lChar)
                    + char
                    + document.body.innerHTML.substring(lChar + Math.floor(charStart))

                charStart = charStart <= 32 ? charStart + 0.1 : charStart
            }, 10)
            break
        case "\"alert(1)":
            alert(1)
            break
        case "rtl":
        case "righttoleft":
            document.body.style.direction = "rtl"
    }

    var intersect: IntersectionObserver | null = null;
    try {
        intersect = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                toggleSection(entry.target.id, entry.isIntersecting)
            })
        }, {
            root: null,
            rootMargin: "100% 0% -350px 0%",
            threshold: 0,
        })
    } catch (e) {
        console.log("Looks like IntersectionObserver doesn't exist!")
    }

    qSelAll<HTMLElement>("section")
        .forEach(v => {
            if (intersect == null) {
                toggleSection(v.id)
                return
            }
            intersect.observe(v)
        })
})

// document.addEventListener("scroll", () => {
//     const scroll = scrollY
//     const parallaxSpeed = 0.2

//     document.body.style.setProperty("--parallax-offset", `-${(scroll * parallaxSpeed) % innerHeight}px`)
// })

// document.addEventListener("scroll", _ => {
//     var scrollOffset = innerHeight / 2
//     var offsets: {elm: HTMLElement, offset: number}[] = []
//     qSelAll<HTMLElement>("section")
//         .forEach(v => {
//             var bodyRect = document.body.getBoundingClientRect(),
//                 elemRect = v.getBoundingClientRect(),
//                 offset = elemRect.top - bodyRect.top
//             offsets.push({
//                 elm: v,
//                 offset: offset
//             })
//         })
//     for (let i = 0; i < offsets.length - 1; i++) {
//         const elmOffset = offsets[i].offset
//         const percentage = (scrollY + scrollOffset - elmOffset) / (offsets[i + 1].offset - elmOffset) * 100
//         offsets[i].elm.style.setProperty("--line-height", `${percentage}%`)
//         //console.log(offsets[i].elm, percentage)
//     }
// })