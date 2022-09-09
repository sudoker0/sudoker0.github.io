HTMLElement.prototype.replace = function (data, prefix = "$_") {
    for (const i in data) {
        const old = this.innerHTML;
        this.innerHTML = old.replace(`${prefix}${i}`, data[i]);
    }
};
function getId(id) { return document.getElementById(id); }
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
function sanitizeString(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_\-\/]/gim, "");
    return str.trim();
}
document.addEventListener("DOMContentLoaded", () => {
    if (gPBName("id") == "entropy") {
        var charStart = 1;
        setInterval(() => {
            var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
            document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
            charStart = charStart <= 32 ? charStart + 0.1 : charStart;
        }, 10);
    }
    switch (gPBName("id")) {
        case "entropy":
            var charStart = 1;
            setInterval(() => {
                var lChar = Math.round(Math.random() * document.body.innerHTML.length), char = rString(Math.floor(charStart));
                document.body.innerHTML = document.body.innerHTML.substring(0, lChar) + char + document.body.innerHTML.substring(lChar + Math.floor(charStart));
                charStart = charStart <= 32 ? charStart + 0.1 : charStart;
            }, 10);
            break;
        case "darkness":
            document.body.style.setProperty("--color-fg", "#000");
            break;
        case "\"alert(1)":
            alert(1);
            break;
    }
});
//# sourceMappingURL=script.js.map