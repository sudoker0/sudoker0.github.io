var CURRENT_TIME = new Date(0)
var CURRENT_YEAR = 0
var BEGIN_NNN = new Date(0)
var END_NNN = new Date(0)
var BEGIN_NEW_NNN = new Date(0)

// ! everything was a pain to handle

HTMLElement.prototype.replace = function (data: Template, prefix: string = "$_") {
    const alternate_prefix = "id_dlr_"
    const _this: () => HTMLElement = () => this
    for (const i in data) {
        const old = _this().innerHTML
        const span: () => HTMLElement | null = () => _this().querySelector(`span.reactive#${alternate_prefix}${i}`)
        if (span() == null) _this().innerHTML = old.replace(`${prefix}${i}`, `<span class="reactive" id="${alternate_prefix}${i}"></span>`)
        span().innerText = data[i]
    }
}
//@ts-ignore
function qSel<T>(selector: string): T { return document.querySelector(selector) }
//@ts-ignore
function qSelAll<T>(sel: string): T { return document.querySelectorAll(sel) }

function diffTime(begin: Date, end: Date) {
    let diff = new Date(Math.abs(end.getTime() - begin.getTime()))
    // Since Date object in JavaSript start at year 1970, we need to adjust
    // so the year start at zero instead
    //diff.setFullYear(diff.getFullYear() - 1970)
    return diff
}

function getTimeZone() {
    var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
    return (offset <= 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
}

function daysIntoYear(date: Date){
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

function displayTime(date: Date) {
    var result = "", result_arr = [
        `${date.getUTCFullYear() - 1970} years`,
        `${daysIntoYear(date) - 1} days`,
        `${date.getUTCHours()} hours`,
        `${date.getUTCMinutes()} minutes`,
        `${date.getUTCSeconds()} seconds`,
    ]

    result_arr = result_arr.filter(x => {
        return x.replace(/(\d) (\w)*?$/gm, (_0, p1, _p2) => {
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

function update() {
    qSelAll(".display_time").forEach(v => v.setAttribute("data-hidden", "true"))
    CURRENT_TIME = new Date()
    CURRENT_YEAR = CURRENT_TIME.getFullYear()
    BEGIN_NNN = new Date(CURRENT_YEAR, 10, 1, 0, 0, 0)
    END_NNN = new Date(CURRENT_YEAR, 11, 1, 0, 0, 1)
    BEGIN_NEW_NNN = new Date(CURRENT_YEAR + 1, 10, 1)

    // Check if the current date is between Nov 1st and Dec 1s
    const IN_BETWEEN = CURRENT_TIME >= BEGIN_NNN && CURRENT_TIME <= END_NNN
    if (IN_BETWEEN) {
        qSel("div#time_left").setAttribute("data-hidden", "false")

        const ELAPSED = diffTime(CURRENT_TIME, BEGIN_NNN)
        const TIME_LEFT = diffTime(END_NNN, CURRENT_TIME)
        const PERCENTAGE
            = (ELAPSED.getTime() / (END_NNN.getTime() - BEGIN_NNN.getTime()) * 100).toString()
                + "%"

        document.body.replace({
            "elapsed": displayTime(ELAPSED),
            "time_left": displayTime(TIME_LEFT),
            "time_left_percentage": PERCENTAGE,
            "timezone": getTimeZone()
        })
        qSel<HTMLElement>("div#time_left_pb .indicator").style.width = PERCENTAGE

    } else {
        qSel("div#time_before_begin").setAttribute("data-hidden", "false")
        const TIME_LEFT_BEFORE_BEGIN = diffTime(BEGIN_NEW_NNN, CURRENT_TIME)

        document.body.replace({
            "time_left_before_begin": displayTime(TIME_LEFT_BEFORE_BEGIN)
        })
    }
    requestAnimationFrame(update)
}

requestAnimationFrame(update)
//setInterval(update, 10)