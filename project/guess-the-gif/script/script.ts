const api_key = "AIzaSyCDheC0w5STLWBJd-n0jUpRbBnEAEhYIDw" // Replace

const wordlist = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt"
const max_reset = 10,
    num_of_tag = 12,
    max_good_tag = 5,
    score_good_tag = 20,
    score_bad_tag = -40,
    penality_after = 3

var wlist: string[] = []
var tag_list: string[] = []
var good_tag: string[] = []
var next_item = ""
var reset_count = max_reset

var round_number = 1
var game_score = 0

function qSel(selector: string) { return document.querySelector(selector) }
function qSelAll(sel: string) { return document.querySelectorAll(sel) }
function wait(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }

HTMLElement.prototype.replace = function (data: Template, prefix: string = "$_") {
    const alternate_prefix = "id_dlr_";
    const _this: () => HTMLElement = () => this;
    for (const i in data) {
        const old = _this().innerHTML;
        const span: () => HTMLElement | null = () =>
            _this().querySelector(`span.reactive#${alternate_prefix}${i}`)
        if (span() == null) _this().innerHTML =
            old.replace(`${prefix}${i}`,
                `<span class="reactive" id="${alternate_prefix}${i}"></span>`)
        span().innerText = data[i]
    }
}

function shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function sanitizeString(str: string){
    var nstr = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"")
    return nstr.trim()
}

async function newgame() {
    good_tag = []

    const elm_tag_list = qSel("div#list_of_tags")
    var tags = [], start_length = 0
    //! Check if the program should reset it's source of random tags
    if (reset_count >= max_reset) {
        tag_list = []
        const r_featured = await fetch(
            `https://tenor.googleapis.com/v2/featured` +
                `?key=${api_key}` +
                `&limit=50` +
                `${next_item != "" ? "&pos=" + next_item : ""}`),
            featured = await r_featured.json()
        await wait(1000)
        
        for (const i of featured["results"]) {
            for (const j of i["tags"]) {
                tag_list.push(j)
            }
        }
        next_item = featured["next"]
        reset_count = 0;
    } else reset_count++;


    while (elm_tag_list.lastChild) {
        elm_tag_list.removeChild(elm_tag_list.lastChild)
    }

    var copy_tag_list = [...tag_list]

    //! Get a list of GIF based on a random keyword
    const r_gif_data = await fetch(
        `https://tenor.googleapis.com/v2/search` +
            `?key=${api_key}` +
            `&q=${wlist[Math.floor(Math.random() * wlist.length)]}`),
        gif_data = await r_gif_data.json()

    const gif = gif_data["results"][0]
    start_length = gif["tags"].length
    gif["tags"].splice(max_good_tag)
    
    for (const i of gif["tags"]) {
        tags.push(i)
        good_tag.push(sanitizeString(i))
    }
    
    for (var i = 0; i < num_of_tag - Math.min(gif["tags"].length, max_good_tag); i++) {
        const index_select = Math.floor(Math.random() * copy_tag_list.length)
        const removed_select = copy_tag_list.splice(index_select, 1);
        tags.push(removed_select[0])
    }
    
    shuffleArray(tags)

    const gif_url = gif["media_formats"]["gif"]["url"]
    const r_gif_img = await fetch(gif_url),
        gif_img = await r_gif_img.blob()

    const url = URL.createObjectURL(gif_img)
    qSel("img#gif_image")["src"] = url

    document.body.replace({
        "round": round_number.toString(),
        "score": game_score.toString(),
        "num_of_tag": `${good_tag.length.toString()} tags` +
            `${start_length > max_good_tag
                ? ` (${start_length - max_good_tag} tag(s) has been removed to fit the requirement)`
                : ""}`,
        "max_score": (good_tag.length * score_good_tag).toString(),
    })

    for (const t of tags) {
        const template = `
            <button class="select_button tag_select" data-tag="${t}">
                #${t}
                <div class="selector" data-selected="false"></div>
            </button>
        `
        qSel("div#list_of_tags").insertAdjacentHTML("beforeend", template)
    }
    
    qSelAll(".tag_select").forEach(v => {
        v["onclick"] = () => {
            const current = v.querySelector("div.selector").getAttribute("data-selected")
            v.querySelector("div.selector")
                .setAttribute("data-selected", current == "true" ? "false" : "true")
        }
    })
}

function showPage(id: string) {
    qSelAll(".page_fragment").forEach(v => v.setAttribute("data-hidden", "true"))
    qSel(`.page_fragment[data-id=${id}]`)?.setAttribute("data-hidden", "false")
}

async function submit_action() {
    var count_good = 0, count_bad = 0, limit_bad = 0, cnt = 0
    var good_t = [], bad_t = []
    qSelAll(".tag_select").forEach(v => {
        const checked = v.querySelector("div.selector")
            .getAttribute("data-selected") == "true" ? true : false
        if (checked) cnt++
    })
    if (cnt < good_tag.length) {
        alert(`Please select at least ${good_tag.length} tags!`)
        return
    }
    qSelAll(".tag_select").forEach(v => {
        const checked = v.querySelector("div.selector")
            .getAttribute("data-selected") == "true" ? true : false
        if (!checked) {
            return
        }

        const tag = v.getAttribute("data-tag")
        if (good_tag.find(v => v == tag) == undefined) {
            limit_bad += limit_bad < penality_after ? 1 : 0
            bad_t.push(tag)
            if (limit_bad >= penality_after) {
                game_score += score_bad_tag
                count_bad++
            }
        } else {
            good_t.push(tag)
            game_score += score_good_tag
            count_good++
        }
    })

    var score_good = count_good * score_good_tag,
        score_bad = count_bad * score_bad_tag
    
    document.body.replace({
        "round_result": round_number.toString(),
        "num_of_tag_correct": count_good.toString(),
        "correct_tag_list": good_t.join(", "),
        "score_tag_correct": score_good.toString(),
        "num_of_tag_incorrect": (count_bad + limit_bad).toString(),
        "incorrect_tag_list": bad_t.join(", "),
        "score_tag_incorrect": Math.abs(score_bad).toString(),
        "total_score_this_round": (score_good + score_bad).toString(),
        "total_score": game_score.toString(),
    })

    showPage("game_result")
}

async function init() {
    showPage("loading_screen")
    const r_wordlist = await (await fetch(wordlist)).text()
    wlist = r_wordlist.split("\n")

    document.body.replace({
        "round": round_number.toString(),
        "score": game_score.toString()
    })
    await newgame()
    showPage("game_board")
}

async function next_game() {
    round_number++
    showPage("loading_screen")
    document.body.replace({
        "round": round_number.toString(),
        "score": game_score.toString()
    })
    await newgame()
    showPage("game_board")
}

showPage("explain_stuff")
