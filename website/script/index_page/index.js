var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const content = `// very cool intro:)
import { buttonStyle } from "./style.js"

const website = new sudoker0.website()
const home_page = website.home

const a_tag = document.createElement("a")
a_tag.innerText = "Home"
a_tag.href = home_page.url
a_tag.style = buttonStyle

this.append(a_tag)

//#run_console`;
const typingDelay = 15;
function delay(ms) {
    return new Promise(resolve => setTimeout(_ => resolve(), ms));
}
function postTyping() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(1000);
        document.querySelector("p#running").classList.remove("hidden");
        yield delay(1000);
        document.querySelector("a#redirect").classList.remove("hidden");
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    let indexOfString = 0;
    yield delay(500);
    const typingInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
        if (indexOfString < content.length) {
            const char = content.charAt(indexOfString);
            document.querySelector("pre#codeblock code").textContent += char;
            indexOfString++;
        }
        else {
            clearInterval(typingInterval);
            yield postTyping();
        }
    }), typingDelay);
}))();
//# sourceMappingURL=index.js.map