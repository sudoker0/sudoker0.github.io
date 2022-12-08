var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const api_key = "AIzaSyCDheC0w5STLWBJd-n0jUpRbBnEAEhYIDw";
const wordlist = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
const max_reset = 10, num_of_tag = 12, max_good_tag = 5, score_good_tag = 20, score_bad_tag = -40, penality_after = 3;
var wlist = [];
var tag_list = [];
var good_tag = [];
var next_item = "";
var reset_count = max_reset;
var round_number = 1;
var game_score = 0;
function qSel(selector) { return document.querySelector(selector); }
function qSelAll(sel) { return document.querySelectorAll(sel); }
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
HTMLElement.prototype.replace = function (data, prefix = "$_") {
    const alternate_prefix = "id_dlr_";
    const _this = () => this;
    for (const i in data) {
        const old = _this().innerHTML;
        const span = () => _this().querySelector(`span.reactive#${alternate_prefix}${i}`);
        if (span() == null)
            _this().innerHTML =
                old.replace(`${prefix}${i}`, `<span class="reactive" id="${alternate_prefix}${i}"></span>`);
        span().innerText = data[i];
    }
};
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function sanitizeString(str) {
    var nstr = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return nstr.trim();
}
function newgame() {
    return __awaiter(this, void 0, void 0, function* () {
        good_tag = [];
        const elm_tag_list = qSel("div#list_of_tags");
        var tags = [], start_length = 0;
        if (reset_count >= max_reset) {
            tag_list = [];
            const r_featured = yield fetch(`https://tenor.googleapis.com/v2/featured` +
                `?key=${api_key}` +
                `&limit=50` +
                `${next_item != "" ? "&pos=" + next_item : ""}`), featured = yield r_featured.json();
            yield wait(1000);
            for (const i of featured["results"]) {
                for (const j of i["tags"]) {
                    tag_list.push(j);
                }
            }
            next_item = featured["next"];
            reset_count = 0;
        }
        else
            reset_count++;
        while (elm_tag_list.lastChild) {
            elm_tag_list.removeChild(elm_tag_list.lastChild);
        }
        var copy_tag_list = [...tag_list];
        const r_gif_data = yield fetch(`https://tenor.googleapis.com/v2/search` +
            `?key=${api_key}` +
            `&q=${wlist[Math.floor(Math.random() * wlist.length)]}`), gif_data = yield r_gif_data.json();
        const gif = gif_data["results"][0];
        start_length = gif["tags"].length;
        gif["tags"].splice(max_good_tag);
        for (const i of gif["tags"]) {
            tags.push(i);
            good_tag.push(sanitizeString(i));
        }
        for (var i = 0; i < num_of_tag - Math.min(gif["tags"].length, max_good_tag); i++) {
            const index_select = Math.floor(Math.random() * copy_tag_list.length);
            const removed_select = copy_tag_list.splice(index_select, 1);
            tags.push(removed_select[0]);
        }
        shuffleArray(tags);
        const gif_url = gif["media_formats"]["gif"]["url"];
        const r_gif_img = yield fetch(gif_url), gif_img = yield r_gif_img.blob();
        const url = URL.createObjectURL(gif_img);
        qSel("img#gif_image")["src"] = url;
        document.body.replace({
            "round": round_number.toString(),
            "score": game_score.toString(),
            "num_of_tag": `${good_tag.length.toString()} tags` +
                `${start_length > max_good_tag
                    ? ` (${start_length - max_good_tag} tag(s) has been removed to fit the requirement)`
                    : ""}`,
            "max_score": (good_tag.length * score_good_tag).toString(),
        });
        for (const t of tags) {
            const template = `
            <button class="select_button tag_select" data-tag="${t}">
                #${t}
                <div class="selector" data-selected="false"></div>
            </button>
        `;
            qSel("div#list_of_tags").insertAdjacentHTML("beforeend", template);
        }
        qSelAll(".tag_select").forEach(v => {
            v["onclick"] = () => {
                const current = v.querySelector("div.selector").getAttribute("data-selected");
                v.querySelector("div.selector")
                    .setAttribute("data-selected", current == "true" ? "false" : "true");
            };
        });
    });
}
function showPage(id) {
    var _a;
    qSelAll(".page_fragment").forEach(v => v.setAttribute("data-hidden", "true"));
    (_a = qSel(`.page_fragment[data-id=${id}]`)) === null || _a === void 0 ? void 0 : _a.setAttribute("data-hidden", "false");
}
function submit_action() {
    return __awaiter(this, void 0, void 0, function* () {
        var count_good = 0, count_bad = 0, limit_bad = 0, cnt = 0;
        var good_t = [], bad_t = [];
        qSelAll(".tag_select").forEach(v => {
            const checked = v.querySelector("div.selector")
                .getAttribute("data-selected") == "true" ? true : false;
            if (checked)
                cnt++;
        });
        if (cnt < good_tag.length) {
            alert(`Please select at least ${good_tag.length} tags!`);
            return;
        }
        qSelAll(".tag_select").forEach(v => {
            const checked = v.querySelector("div.selector")
                .getAttribute("data-selected") == "true" ? true : false;
            if (!checked) {
                return;
            }
            const tag = v.getAttribute("data-tag");
            if (good_tag.find(v => v == tag) == undefined) {
                limit_bad += limit_bad < penality_after ? 1 : 0;
                bad_t.push(tag);
                if (limit_bad >= penality_after) {
                    game_score += score_bad_tag;
                    count_bad++;
                }
            }
            else {
                good_t.push(tag);
                game_score += score_good_tag;
                count_good++;
            }
        });
        var score_good = count_good * score_good_tag, score_bad = count_bad * score_bad_tag;
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
        });
        showPage("game_result");
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        showPage("loading_screen");
        const r_wordlist = yield (yield fetch(wordlist)).text();
        wlist = r_wordlist.split("\n");
        document.body.replace({
            "round": round_number.toString(),
            "score": game_score.toString()
        });
        yield newgame();
        showPage("game_board");
    });
}
function next_game() {
    return __awaiter(this, void 0, void 0, function* () {
        round_number++;
        showPage("loading_screen");
        document.body.replace({
            "round": round_number.toString(),
            "score": game_score.toString()
        });
        yield newgame();
        showPage("game_board");
    });
}
showPage("explain_stuff");
//# sourceMappingURL=script.js.map