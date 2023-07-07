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
//#console run`
const typingDelay = 15

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(_ => resolve(), ms))
}

async function postTyping() {
    await delay(1000)
    document.querySelector("p#running").classList.remove("hidden")
    await delay(750)
    document.querySelector("a#redirect").classList.remove("hidden")
}

async function typeWriter(text: string) {
    const elm = document.querySelector("pre#codeblock code")
    for (var i = 0; i < text.length; i++) {
        var char = text.charAt(i)
        var nextChar = i < text.length - 1 ? text.charAt(i + 1) : ""
        var extraDelay = 0

        if (char == "\n" && nextChar == "^") {
            var posNum = 0
            i++
            while (true) {
                i++
                const num = Number(text.charAt(i))
                if (isNaN(num)) {
                    i++
                    break
                }
                extraDelay += 10 ** posNum * num
                posNum++
            }
            char = text.charAt(i)
            console.log(extraDelay)
        }

        elm.textContent += char
        await delay(typingDelay + extraDelay)
        extraDelay = 0
    }
}

// function typeWriter(text: string, index = 0) {
//     if (index < text.length) {
//         const char = content.charAt(index)
//         document.querySelector("pre#codeblock code").textContent += char
//         index++
//         setTimeout(() => typeWriter(text, index), typingDelay)
//     }
// }

(async () => {
    await delay(1000)
    await typeWriter(content)
    await postTyping()
})()