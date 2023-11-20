let fartmode = false;
var claiming_gift = false;
var fartnoise = new Audio("/website/sound/fart.mp3");

qSel<HTMLElement>("#claim_gift").onclick = async () => {
    if (claiming_gift)
        return;
    if (fartmode) {
        fartnoise.loop = true;
        fartnoise.play();
    }

    claiming_gift = true;
    qSel<HTMLElement>("#claim_gift").style.transformOrigin = "bottom";
    qSel<HTMLElement>("#claim_gift").style.animation = "gift_opening_animation 3s";

    await wait(2750);
    if (fartmode) {
        fartnoise.pause();
        fartnoise.currentTime = 0;
        fartmode = false;
    }

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
qSel<HTMLElement>("#website_logo").ondragstart = (ev) => {
    ev.dataTransfer.setData("text", "website_logo");
}

qSel<HTMLElement>("#website_logo").ondrag = (ev) => {
    console.log("Drag: " + ev);
}

qSel<HTMLElement>("#claim_gift").ondrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data != "website_logo") return;
    qSel<HTMLElement>("#claim_gift").style.animation = "lsd 1s infinite linear";
    fartmode = true;
}

qSel<HTMLElement>("#building_block").ondrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data != "website_logo") return;
    qSel<HTMLElement>("#building_block").setAttribute("src",
        qSel<HTMLElement>("#building_block").classList.contains("toggled")
            ? "./website/image/home_page/building_block_of_internet.svg"
            : "./website/image/home_page/building_block_of_my_website.svg"
    )
    qSel<HTMLElement>("#building_block_caption").innerText =
        qSel<HTMLElement>("#building_block").classList.contains("toggled")
            ? "The Building Block Of The Internet"
            : "The Building Block Of My Website"
    qSel<HTMLElement>("#building_block").classList.toggle("toggled")
}

qSel<HTMLElement>("#claim_gift").ondragover = (ev) => ev.preventDefault();
qSel<HTMLElement>("#building_block").ondragover = (ev) => ev.preventDefault();