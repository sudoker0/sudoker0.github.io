var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const wordlist = "./word_list.txt";
const max_reset = 5, num_of_tag = 12, max_good_tag = 5, score_good_tag = 20, score_bad_tag = -40, penality_after = 3;
var wlist = [];
var tag_list = [];
var good_tag = [];
var tags_in_game = [];
var next_item = "";
var reset_count = max_reset;
var high_score = 0;
var round_number = 1;
var game_score = 0;
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
function qSel(selector) { return document.querySelector(selector); }
function qSelAll(sel) { return document.querySelectorAll(sel); }
function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
function secureRandom(min, max) {
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
function dec2hex(dec) {
    return dec.toString(16).padStart(2, "0");
}
function generateId(len) {
    var arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
}
function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        const j = secureRandom(0, i);
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function sanitizeString(str) {
    var nstr = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
    return nstr.trim();
}
function showPage(id) {
    var _a;
    qSelAll(".page_fragment").forEach(v => v.setAttribute("data-hidden", "true"));
    (_a = qSel(`.page_fragment[data-id=${id}]`)) === null || _a === void 0 ? void 0 : _a.setAttribute("data-hidden", "false");
}
function customFetch(input, init) {
    return __awaiter(this, void 0, void 0, function* () {
        const retry_amount = 5;
        var count_retry = 0, r = null, not_good_at_all = false;
        while (count_retry < retry_amount) {
            yield wait(1000);
            try {
                r = yield fetch(input, init);
            }
            catch (e) {
                console.log(e);
                not_good_at_all = true;
                break;
            }
            if (!r.ok) {
                count_retry += 1;
                continue;
            }
            break;
        }
        if (!(r === null || r === void 0 ? void 0 : r.ok) || not_good_at_all) {
            console.log(`-------------------------------------\n` +
                `GTF network error log\n` +
                `URL: ${r === null || r === void 0 ? void 0 : r.url}\n` +
                `Status (response code): ${r === null || r === void 0 ? void 0 : r.status} (${r === null || r === void 0 ? void 0 : r.statusText})\n` +
                `Headers: ${r === null || r === void 0 ? void 0 : r.headers}\n` +
                `Response: \n${yield (r === null || r === void 0 ? void 0 : r.text())}\n` +
                `-------------------------------------`);
            console.log(r);
            alert("Failed to load API data! This might be caused by too many people loading the data, or something is blocking the connection from making through. Detail of the error will be printed onto the Developer Tools. Please reload the page manually.");
            return null;
        }
        return r;
    });
}
const k = atob("NGM0NDc3NmM1ZTc0NGU0OTY1Njg0ZTNkN2EzODVlNTk0MTVhNGY0NzY5MjA2MzNkNjc1ODdkNWY2ZjRmNjM0ODRjNDg2NTU0NDQ0OTdh");
var api_key = "";
for (var i = 0; i < k.length; i += 2) {
    api_key += String.fromCharCode(Number(atob("MHg=") + k[i] + k[i + 1]) ^ 13);
}
function newgame() {
    return __awaiter(this, void 0, void 0, function* () {
        good_tag = [];
        tags_in_game = [];
        const elm_tag_list = qSel("div#list_of_tags");
        var start_length = 0;
        if (reset_count >= max_reset) {
            tag_list = [];
            const r_featured = yield customFetch(`https://tenor.googleapis.com/v2/featured` +
                `?key=${api_key}` +
                `&limit=50` +
                `${next_item != "" ? "&pos=" + next_item : ""}`);
            if (r_featured == null)
                return false;
            const featured = yield r_featured.json();
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
        while (elm_tag_list.lastChild)
            elm_tag_list.removeChild(elm_tag_list.lastChild);
        var copy_tag_list = [...tag_list];
        const search_key = () => {
            const count = secureRandom(0, 1);
            var result = [];
            for (var i = 0; i <= count; i++) {
                result.push(wlist[secureRandom(0, wlist.length - 1)].toLowerCase());
            }
            return result.join("%20");
        };
        const r_gif_data = yield customFetch(`https://tenor.googleapis.com/v2/search` +
            `?key=${api_key}` +
            `&q=${search_key()}`);
        if (r_gif_data == null)
            return false;
        const gif_data = yield r_gif_data.json();
        const gif = gif_data["results"][secureRandom(0, gif_data["results"].length - 1)];
        start_length = gif["tags"].length;
        gif["tags"].splice(max_good_tag);
        for (const i of gif["tags"]) {
            const t_object = {
                id: generateId(64),
                name: i
            };
            tags_in_game.push(t_object);
            good_tag.push(t_object.id);
        }
        for (var i = 0; i < num_of_tag - Math.min(gif["tags"].length, max_good_tag); i++) {
            const index_select = secureRandom(0, copy_tag_list.length - 1);
            const removed_select = copy_tag_list.splice(index_select, 1);
            const t_object = {
                id: generateId(64),
                name: removed_select[0]
            };
            tags_in_game.push(t_object);
        }
        shuffleArray(tags_in_game);
        const gif_url = gif["media_formats"]["gif"]["url"];
        const r_gif_img = yield customFetch(gif_url);
        if (r_gif_img == null)
            return false;
        const gif_img = yield r_gif_img.blob();
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
        for (const t of tags_in_game) {
            const template = `
            <button class="select_button tag_select" data-tag="${t.id}">
                #${t.name}
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
        return true;
    });
}
function submitAction() {
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
            const tag_id = v.getAttribute("data-tag");
            const tag = tags_in_game.find(v => v.id == tag_id).name;
            if (good_tag.find(v => v == tag_id) == undefined) {
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
        const gtg_hs = localStorage.getItem("guess_the_gif_high_score");
        if (Number(gtg_hs) < game_score) {
            high_score = game_score;
            localStorage.setItem("guess_the_gif_high_score", game_score.toString());
        }
        document.body.replace({
            "round_result": round_number.toString(),
            "num_of_tag_correct": count_good.toString(),
            "correct_tag_list": good_t.join(", "),
            "score_tag_correct": score_good.toString(),
            "num_of_tag_incorrect": (count_bad + limit_bad + (count_bad > 0 ? -1 : 0)).toString(),
            "incorrect_tag_list": bad_t.join(", "),
            "score_tag_incorrect": Math.abs(score_bad).toString(),
            "total_score_this_round": (score_good + score_bad).toString(),
            "total_score": game_score.toString(),
            "new_high_score": (Number(gtg_hs) < game_score) ? "(New High Score!)" : ""
        });
        showPage("game_result");
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        showPage("loading_screen");
        const key_from_input = qSel("#api_key")["value"];
        if (key_from_input.trim() != "") {
            const r_test = yield fetch(`https://tenor.googleapis.com/v2/featured?key=${key_from_input}`);
            if (!r_test.ok) {
                alert("Invalid API key! Please check if the API key has permission to access Tenor API");
                showPage("explain_stuff");
                return;
            }
            api_key = key_from_input;
            localStorage.setItem("guess_the_gif_key", key_from_input);
        }
        const r_wordlist = yield customFetch(wordlist);
        if (r_wordlist == null)
            return;
        wlist = (yield r_wordlist.text()).split("\n");
        document.body.replace({
            "round": round_number.toString(),
            "score": game_score.toString(),
            "high_score": high_score.toString(),
        });
        const result = yield newgame();
        if (!result)
            return;
        showPage("game_board");
    });
}
function nextGame() {
    return __awaiter(this, void 0, void 0, function* () {
        round_number++;
        showPage("loading_screen");
        document.body.replace({
            "round": round_number.toString(),
            "score": game_score.toString(),
            "high_score": high_score.toString(),
        });
        const result = yield newgame();
        if (!result)
            return;
        showPage("game_board");
    });
}
function resetHighScore() {
    localStorage.setItem("guess_the_gif_high_score", "0");
    high_score = 0;
    alert("High score has been reset!");
}
const gtg_key = localStorage.getItem("guess_the_gif_key");
if (gtg_key != null)
    qSel("#api_key")["value"] = gtg_key;
const gtg_hs = localStorage.getItem("guess_the_gif_high_score");
if (gtg_hs == null)
    localStorage.setItem("guess_the_gif_high_score", "0");
else
    high_score = Number(gtg_hs);
showPage("explain_stuff");
//# sourceMappingURL=script.js.map