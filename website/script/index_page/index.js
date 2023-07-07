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
^003$
import { buttonStyle } from "./style.js"

^003$
const website = new sudoker0.website()
const home_page = website.home

^003$
const a_tag = document.createElement("a")
a_tag.innerText = "Home"
a_tag.href = home_page.url
a_tag.style = buttonStyle

^003$
this.append(a_tag)

^0001$
//#console run`;
const typingDelay = 15;
function delay(ms) {
    return new Promise(resolve => setTimeout(_ => resolve(), ms));
}
function postTyping() {
    return __awaiter(this, void 0, void 0, function* () {
        yield delay(1000);
        document.querySelector("p#running").classList.remove("hidden");
        yield delay(750);
        document.querySelector("a#redirect").classList.remove("hidden");
    });
}
function typeWriter(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const elm = document.querySelector("pre#codeblock code");
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            var nextChar = i < text.length - 1 ? text.charAt(i + 1) : "";
            var extraDelay = 0;
            if (char == "\n" && nextChar == "^") {
                var posNum = 0;
                i++;
                while (true) {
                    i++;
                    const num = Number(text.charAt(i));
                    if (isNaN(num)) {
                        i++;
                        break;
                    }
                    extraDelay += Math.pow(10, posNum) * num;
                    posNum++;
                }
                char = text.charAt(i);
                console.log(extraDelay);
            }
            elm.textContent += char;
            yield delay(typingDelay + extraDelay);
            extraDelay = 0;
        }
    });
}
(() => __awaiter(this, void 0, void 0, function* () {
    yield delay(1000);
    yield typeWriter(content);
    yield postTyping();
}))();
//# sourceMappingURL=index.js.map