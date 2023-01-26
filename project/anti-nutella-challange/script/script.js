var CURRENT_TIME = new Date(0);
var CURRENT_YEAR = 0;
var BEGIN_NNN = new Date(0);
var END_NNN = new Date(0);
var BEGIN_NEW_NNN = new Date(0);
HTMLElement.prototype.replace = function (data, prefix = "$_") {
    const alternate_prefix = "id_dlr_";
    const _this = () => this;
    for (const i in data) {
        const old = _this().innerHTML;
        const span = () => _this().querySelector(`span.reactive#${alternate_prefix}${i}`);
        if (span() == null)
            _this().innerHTML = old.replace(`${prefix}${i}`, `<span class="reactive" id="${alternate_prefix}${i}"></span>`);
        span().innerText = data[i];
    }
};
function qSel(selector) { return document.querySelector(selector); }
function qSelAll(sel) { return document.querySelectorAll(sel); }
function diffTime(begin, end) {
    let diff = Math.abs((typeof end == "number" ? end : end.getTime()) -
        (typeof begin == "number" ? begin : begin.getTime()));
    return diff;
}
function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset <= 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}
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
const limitRefresh = 15000;
const timeDelayLimit = 10000;
var startTimeRefresh = -1;
function checkTime() {
    fetch(`https://worldtimeapi.org/api/ip`, {
        "headers": {
            "accept": "application/json"
        }
    })
        .then(v => v.json())
        .then(r => {
        qSelAll(".full_screen_error").forEach(v => v.setAttribute("data-hidden", "true"));
        const diff = diffTime(new Date().getTime(), r["unixtime"] * 1000);
        qSel("#clock_not_correct_error").setAttribute("data-hidden", diff > timeDelayLimit ? "false" : "true");
        console.log(diff);
    });
}
function update(timestamp) {
    if (startTimeRefresh == -1)
        startTimeRefresh = timestamp;
    const elapsed = timestamp - startTimeRefresh;
    if (elapsed >= limitRefresh) {
        startTimeRefresh = timestamp;
    }
    qSelAll("[class*='challange_']").forEach(v => {
        v.setAttribute("data-hidden", "true");
    });
    CURRENT_TIME = new Date();
    CURRENT_YEAR = CURRENT_TIME.getFullYear();
    BEGIN_NNN = new Date(CURRENT_YEAR, 10, 1, 0, 0, 0);
    END_NNN = new Date(CURRENT_YEAR, 11, 1, 0, 0, 1);
    BEGIN_NEW_NNN = BEGIN_NNN;
    if (CURRENT_TIME >= BEGIN_NNN)
        BEGIN_NEW_NNN = new Date(CURRENT_YEAR + 1, 10, 1);
    const IN_BETWEEN = CURRENT_TIME >= BEGIN_NNN && CURRENT_TIME <= END_NNN;
    if (IN_BETWEEN) {
        qSelAll(".challange_started").forEach(v => {
            v.setAttribute("data-hidden", "false");
        });
        const ELAPSED = diffTime(CURRENT_TIME, BEGIN_NNN);
        const TIME_LEFT = diffTime(END_NNN, CURRENT_TIME);
        const PERCENTAGE = (ELAPSED / (END_NNN.getTime() - BEGIN_NNN.getTime()) * 100).toString()
            + "%";
        document.body.replace({
            "elapsed": displayTime(ELAPSED),
            "time_left": displayTime(TIME_LEFT),
            "time_left_percentage": PERCENTAGE,
        });
        qSel("div#time_left_pb .indicator").style.width = PERCENTAGE;
    }
    else {
        qSelAll(".challange_not_started").forEach(v => {
            v.setAttribute("data-hidden", "false");
        });
        const TIME_LEFT_BEFORE_BEGIN = diffTime(BEGIN_NEW_NNN, CURRENT_TIME);
        document.body.replace({
            "time_left_before_begin": displayTime(TIME_LEFT_BEFORE_BEGIN)
        });
    }
    document.body.replace({
        "timezone": `${getTimeZone()} (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
    });
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
//# sourceMappingURL=script.js.map