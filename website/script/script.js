HTMLElement.prototype.replace = function (data, prefix = "$_") {
    const alternate_prefix = "id_dlr_";
    const _this = () => this;
    for (const i in data) {
        const old = _this().innerHTML;
        const span = () => _this().querySelector(`span.reactive#${alternate_prefix}${i}`);
        if (span() == null)
            _this().innerHTML =
                old.replace(`${prefix}${i}`, `
                <span class="reactive" id="${alternate_prefix}${i}"></span>`);
        span().innerText = data[i];
    }
};
function qSel(selector) { return document.querySelector(selector); }
function qSelAll(sel) { return document.querySelectorAll(sel); }
function gPBName(name, url = window.location.href) {
    if (!url)
        url = window.location.href;
    name = name.replace(/[\[\]\\]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function rString(l) {
    var r = [];
    for (var i = 0; i < l; i++) {
        r.push(String.fromCharCode.apply(null, [Math.floor(Math.random() * 256)]));
    }
    return r.join("");
}
function getRandomInt(min, max) {
    const range = max - min + 1;
    const bytes_needed = Math.ceil(Math.log2(range) / 8);
    const cutoff = Math.floor((Math.pow(256, bytes_needed)) / range) * range;
    const bytes = new Uint8Array(bytes_needed);
    let value;
    do {
        crypto.getRandomValues(bytes);
        value = bytes.reduce((acc, x, n) => acc + x * Math.pow(256, n), 0);
    } while (value >= cutoff);
    return min + value % range;
}
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function displayTime(date) {
    var s = Math.floor(date / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60), d = Math.floor(h / 24);
    var result = "", result_arr = [
        `${d} days`,
        `${h % 24} hours`,
        `${m % 60} minutes`,
        `${s % 60} seconds`,
    ];
    result_arr = result_arr.filter(x => {
        return x.replace(/(\d+) (\w)*?$/gm, (_0, p1, _p2) => {
            const num = Number(p1);
            if (num == 0)
                return "";
            return x;
        }) != "";
    });
    result = result_arr.slice(0, result_arr.length - 1).join(", ")
        + ((result_arr.length > 1) ? " and " : "")
        + result_arr[result_arr.length - 1];
    return result;
}
function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim, "");
    return str.trim();
}
function toggleSection(id, show = true) {
    document.querySelector(`section#${id}`)
        .setAttribute("data-show", show ? "true" : "false");
}
function updateWebsiteAge() {
    const WEBSITE_CREATION_DATE = "2020-07-16T23:35:00+07:00";
    qSel("footer").replace({
        day: displayTime((new Date()).getTime() - (new Date(WEBSITE_CREATION_DATE).getTime()))
    });
    setTimeout(updateWebsiteAge, 500);
}
document.addEventListener("DOMContentLoaded", () => {
    updateWebsiteAge();
    switch (gPBName("id")) {
        case "entropy":
            var charStart = 1;
            setInterval(() => {
                var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
                document.body.innerHTML =
                    document.body.innerHTML.substring(0, lChar)
                        + char
                        + document.body.innerHTML.substring(lChar + Math.floor(charStart));
                charStart = charStart <= 32 ? charStart + 0.1 : charStart;
            }, 10);
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
    var intersect = null;
    try {
        intersect = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                toggleSection(entry.target.id, entry.isIntersecting);
            });
        }, {
            root: null,
            rootMargin: "-50%",
            threshold: 0,
        });
    }
    catch (e) {
        console.log("Looks like IntersectionObserver doesn't exist!");
    }
    document.querySelectorAll("section")
        .forEach(v => {
        if (v.classList.value
            .split(" ")
            .map(v => v.startsWith("st-") || v.startsWith("nost"))
            .reduce((a, b) => a || b)) {
            if (intersect == null) {
                toggleSection(v.id);
                return;
            }
            intersect.observe(v);
        }
    });
});
//# sourceMappingURL=script.js.map