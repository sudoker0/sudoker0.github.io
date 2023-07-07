const content = `// very cool intro:)
import { buttonStyle } from "./style.js"

const website = new sudoker0.website()
const home_page = website.home

const a_tag = document.createElement("a")
a_tag.innerText = "Home"
a_tag.href = home_page.url
a_tag.style = buttonStyle

this.append(a_tag)

//#run_console`
const typingDelay = 15

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(_ => resolve(), ms))
}

async function postTyping() {
    await delay(1000)
    document.querySelector("p#running").classList.remove("hidden")
    await delay(1000)
    document.querySelector("a#redirect").classList.remove("hidden")
}

(async () => {
    let indexOfString = 0
    await delay(500)
    const typingInterval = setInterval(async () => {
        if (indexOfString < content.length) {
            const char = content.charAt(indexOfString)
            document.querySelector("pre#codeblock code").textContent += char
            indexOfString++
        } else {
            clearInterval(typingInterval)
            await postTyping()
        }
    }, typingDelay)
})()