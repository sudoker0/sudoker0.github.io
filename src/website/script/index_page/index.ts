const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
const textElm: HTMLElement = document.querySelector("#text_container p")
const textContainerElm: HTMLElement = document.querySelector("#text_container")

function randomString(len: number) {
    var output = ""
    for (let i = 0; i < len; i++) {
        output += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return output
}

function handleOnMouseMove(e: MouseEvent | Touch) {
    const rect = textContainerElm.getBoundingClientRect()
    const x = e.clientX - rect.left,
        y = e.clientY - rect.top

    textElm.innerText = randomString(2000)
    textElm.style.setProperty("--x", `${x + 20}px`)
    textElm.style.setProperty("--y", `${y + 20}px`)
}

textContainerElm.addEventListener("mousemove", handleOnMouseMove)
textContainerElm.addEventListener("touchmove", (e) => handleOnMouseMove(e.touches[0]))
textContainerElm.addEventListener("click", () => location.href = "/home.html")