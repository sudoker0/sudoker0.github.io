var claiming_gift = false;

qSel<HTMLElement>("#claim_gift").onclick = async () => {
    if (claiming_gift)
        return;

    claiming_gift = true;
    qSel<HTMLElement>("#claim_gift").style.transformOrigin = "bottom";
    qSel<HTMLElement>("#claim_gift").style.animation = "gift_opening_animation 3s";

    await wait(2750);

    qSel<HTMLElement>("#gift_display").style.display = "flex";
    qSel<HTMLElement>("#gift_flashbang").style.opacity = "1";

    await wait(250);
    qSel<HTMLElement>("#gift_flashbang").style.transition = "opacity 0.5s";
    qSel<HTMLElement>("#gift_flashbang").style.opacity = "0";
    var gift = getRandomInt(1, 4);
    qSel<HTMLElement>(`#gift_item_${gift}`).style.display = "flex";

    await wait(500);
    qSel<HTMLElement>("#claim_gift").style.animation = "none";

    await wait(1500);
    var gift_svg = qSel<SVGElement>(`div#gift_item_${gift} img`)
    var somestring = qSel("div#gift_thatsmygift_dialog p") as HTMLParagraphElement;
    qSel<HTMLElement>("#gift_thatsmygift_dialog").style.display = "block";

    switch (gift) {
        case 1:
            somestring.replace({ "message": "Ooh, free money! That's mine now! Hahahaha!" })
            await wait(1000);
            gift_svg.style.transition = "all 0.65s linear";
            gift_svg.style.transform = "translateY(-100%)";
            gift_svg.style.opacity = "0";
            break;
        case 2:
            somestring.replace({ "message": "Ooh, a bird! I like them, but, ew, it's flappy bird! Shoo!" })
            await wait(1500);
            gift_svg.style.transition = "all 0.4s linear";
            gift_svg.style.transform = "translate(100%, -100%)";
            gift_svg.style.opacity = "0";
            break;
        case 3:
            somestring.replace({ "message": "Hey, that's my Sublime Text license key! Give it back!" })
            await wait(1500);
            gift_svg.style.transition = "all 0.2s linear";
            gift_svg.style.transform = "translate(100%)";
            gift_svg.style.opacity = "0";
            break;
        case 4:
        case 5:
            somestring.replace({ "message": "Hahaha, you got nothing!" })
            break;
        default:
            break;
    }
    await wait(2000);
    if (!!gift_svg) {
        gift_svg.style.transform = "translateY(0%)";
        gift_svg.style.opacity = "1";
    }
    qSel<HTMLElement>("#gift_thatsmygift_dialog").style.display = "none";
    qSel<HTMLElement>(`#gift_item_${gift}`).style.display = "none";
    qSel<HTMLElement>("#gift_display").style.display = "none";
    qSel<HTMLElement>("#gift_flashbang").style.transition = "none";
    claiming_gift = false;
};

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

function handleOnMouseMove(e: MouseEvent) {
    const rect = textContainerElm.getBoundingClientRect()
    const x = e.clientX - rect.left,
        y = e.clientY - rect.top

    textElm.innerText = randomString(2000)
    textElm.style.setProperty("--x", `${x + 20}px`)
    textElm.style.setProperty("--y", `${y + 20}px`)
}

textContainerElm.addEventListener("pointermove", handleOnMouseMove)

// if (gPBName("dev_mode") == "true") {
//     qSel("#dev_console").classList.add("show")
// }

// function xorEncrypt(input: string, key: string) {
//     let result: string[] = [];
//     for (let i = 0; i < input.length; i++) {
//         const encryptedChar = input.charCodeAt(i) ^ key.charCodeAt(i % key.length);
//         result.push(encryptedChar.toString(16).padStart(2, '0'));
//     }
//     return result;
// }

// function xorDecrypt(encryptedArray: string[], key: string) {
//     let result = '';
//     for (let i = 0; i < encryptedArray.length; i++) {
//         const decryptedChar = parseInt(encryptedArray[i], 16) ^ key.charCodeAt(i % key.length);
//         result += String.fromCharCode(decryptedChar);
//     }
//     return result;
// }

// function handleConsoleCommand(commands: string) {
//     const args = commands.split(" ")
//     const command = args[0]
//     const outputElm = qSel<HTMLElement>("#dev_console_output")

//     const lsContent = `doc1.txt  doc2.txt.enc  doc999.bin  SECRET.txt  portal.txt  t̷̛̹̮͌͊̑́͒͝h̴͈̹̞̻̼̄͐ͅë̵̺̯̰̠̠̼́̍̍͒̿͗ŷ̵͚̥͉̩̼̖̊͑͂̒̊̉k̴͔͛̒͒̽̈́̇͠ṅ̶̦̭͋͐͗̏̕ǫ̶̻̞͓̳͎͙̈́̑ẅ̵̯̘́͜.̷̛̬̤̟̗͙͕͌̓̆̔͝ť̸̮̗̤͐̏͊̌͋͊x̵͉́̈t̵̩͐͗̓́̅̀ͅ
//     listed 7 files.`

//     const helpContent = `"open <filename> [password]": open a file (and decrypt file with password if the file is encrypted)
//     "ls": display the current directory's content
//     "dir": alias for "ls"
//     "help": display this help page
//     "login <username> <password>": login as a different user`

//     const handleOpen = (filename: string, password: string = "") => {
//         var output = `> file ${filename}:\n`
//         var message = ""

//         switch (filename) {
//             case "doc1.txt":
//                 message = `it's pretty interesting how javascript is present in almost everywhere. back then, it was only a language to be used on the web, and people created cool stuff with it. but now, you can create applications on desktop (with electron), on mobile (with react). you can even make programs that run on the servers (with nodejs) and much more. i wonder if javascript will be like java, where it will be present on things like a blu-ray player or a toaster.`
//                 output += message
//                 break
//             case "doc2.txt.enc":
//                 message = xorDecrypt([
//                     "28","06","05","01","1d","39","0c","1f","10","52","18","0b","0c","05","49",
//                     "54","02","45","0e","12","06","50","11","1a","0d","1b","1b","0c","1c","14",
//                     "45","0c","14","45","04","1e","11","0d","1a","1b","17","45","1b","0a","55",
//                     "11","0b","52","12","06","17","07","04","18","4b","16","1c","10","07","15",
//                     "11","52","0b","13","50","08","17","5f","45","0c","00","45","19","0a","1c",
//                     "1b","16","55","03","0a","1f","01","01","18","0c","1c","14","45","06","1e",
//                     "16","11","4b","09","10","18","10","50","08","13","1d","17","15","45","13",
//                     "53","02","02","1f","00","54","00","00","00","53","1a","02","45","01","0b",
//                     "18","15","11","1a","1a","0b","04","52","11","1c","0a","11","59","04","1a",
//                     "05","09","16","44","17","15","45","04","12","09","16","13","07","18","0e",
//                     "4b","59","11","00","04","45","06","0c","10","1e","45","1b","53","17","06",
//                     "13","09","1d","11","00","1d","49","55","04","0d","1b","17","55","19","16",
//                     "52","19","10","10","06","45","0c","04","17","59","16","1b","13","17","0b",
//                     "14","01","19","0a","1c","5f","45","02","1c","01","54","12","0a","0c","53",
//                     "1e","19","0b","16","05","55","1d","04","16","16","45","17","1a","00","54",
//                     "0f","00","1a","01","0c","00","11","1b","0b","1b","50","0e","17","0a","45",
//                     "0c","10","13","1d","04","10","0a","5f","55","03","0a","52","0d","01","50",
//                     "12","1d","06","09","07","52","07","11","4b","15","0b","16","01","04","1c",
//                     "52","11","06","15","09","17","00","16","43","06","0a","54","1e","16","1c",
//                     "53","14","03","45","13","44","02","11","1c","52","07","0a","43","01","11",
//                     "1b","19","00","59","00","1a","1d","00","52","17","1a","02","11","52","1c",
//                     "03","43","13","06","00","1e","04","15","53","06","15","06","00","01","01",
//                     "5e","45","13","1d","01","43","01","0a","58","4b","0d","16","04","55","11",
//                     "07","1d","11","01","50","04","52","11","0c","17","52","0a","12","4b","11",
//                     "11","12","1b","1b","45","0b","0b","00","4a","6f","78","53","48","43","06",
//                     "0d","15","05","0e","59","0a","1a","05","45","06","0b","55","1f","0b","17",
//                     "53","0a","05","52","08","0d","4b","03","0b","1a","10","1e","01","52","13",
//                     "1d","1f","45","1a","16","09","13","17","01","54","1f","00","0a","07","55",
//                     "04","0d","17","44","02","15","07","01","1a","11","06","52","04","1a","0f",
//                     "45","1e","12","03","15","45","1f","01","55","16","00","17","17","07","02",
//                     "11","0e","54","04","0b","59","1a","01","5e","6f","52","49","55","04","0d",
//                     "13","1d","0e","43","0b","0a","01","4b","11","16","53","12","19","11","1a",
//                     "11","17","50","03","1d","01","45","0b","1d","16","00","02","0b","1e","53",
//                     "18","09","45","05","01","17","03","0c","06","16","4b","69","52","48","54",
//                     "1f","0d","18","1d","1e","50","1c","1d","11","55","04","0a","52","1e","1c",
//                     "43","14","04","19","02","09","00","53","13","1f","17","52","09","14","1b",
//                     "0c","1c","14","45","0e","17","45","1d","05","11","16","53","02","18","0a",
//                     "52","05","18","50","0c","52","07","0a","07","13","1c","5a","61","45","54",
//                     "53","14","1e","01","5e","44","1a","16","45","11","1c","10","11","01","00",
//                     "58","4b","11","11","12","1b","1b","45","0b","0b","00","5c","45","14","1c",
//                     "17","43","04","0c","07","02","11","10","1d","12","50","08","0b","44","02",
//                     "15","07","01","1a","11","06","52","4d","15","05","01","59","11","10","50",
//                     "04","10","08","10","50","11","1d","53","17","06","13","01","54","1f","0d",
//                     "10","00","5c","5e","6f","78","14","5b","03","5f","52","1a","0b","01","1d",
//                     "16","1c","4b","0e","1c","0a","55","58","01","1d","0a","52","04","45","06",
//                     "16","09","0f","52","04","1a","12","0a","17","16","5c","4a","45","40","56",
//                     "47","43","48","42","42","57","50","5f","57","45","5a","54","54","42","44",
//                     "42","51"
//                 ], password)
//                 if (!message.startsWith("[sudo]")) {
//                     output += `error: corrupted file or wrong password`
//                 } else {
//                     output += message.replace("[sudo]", "")
//                 }
//                 break
//             default:
//                 output += `error: unknown file`
//         }
//         return output
//     }

//     var outputText = ""
//     switch (command) {
//         case "login":
//             break
//         case "open":
//             outputText = handleOpen(args[1], args[2])
//             break
//         case "ls":
//         case "dir":
//             outputText = lsContent
//             break
//         case "help":
//             outputText = helpContent
//             break
//         default:
//             outputText = `unknown command "${command}".`
//             break
//     }
//     outputElm.replace({
//         "output": outputText
//     })
// }

// document.addEventListener("DOMContentLoaded", _ => {
//     const devConsole = qSel<HTMLInputElement>("#dev_console_command")

//     devConsole.addEventListener("keyup", e => {
//         if (e.key == "Enter" || e.keyCode == 13) {
//             handleConsoleCommand(devConsole.value)
//             devConsole.value = ""
//         }
//     })
// })