let fartmode = false;
var claiming_gift = false;
var fartnoise = new Audio("/website/sound/fart.mp3");

getId("claim_gift").onclick = async () => {
    if (claiming_gift)
        return;
    if (fartmode) {
        fartnoise.loop = true;
        fartnoise.play();
    }

    claiming_gift = true;
    getId("claim_gift").style.transformOrigin = "bottom";
    getId("claim_gift").style.animation = "gift_opening_animation 3s";

    await wait(2750);
    if (fartmode) {
        fartnoise.pause();
        fartnoise.currentTime = 0;
        fartmode = false;
    }

    getId("gift_display").style.display = "flex";
    getId("gift_flashbang").style.opacity = "1";

    await wait(250);
    getId("gift_flashbang").style.transition = "opacity 0.5s";
    getId("gift_flashbang").style.opacity = "0";
    var gift = getRandomInt(1, 4);
    getId(`gift_item_${gift}`).style.display = "flex";

    await wait(500);
    getId("claim_gift").style.animation = "none";

    await wait(1500);
    var gift_svg = qSel(`div#gift_item_${gift} img`) as SVGElement;
    var somestring = qSel("div#gift_thatsmygift_dialog p") as HTMLParagraphElement;
    getId("gift_thatsmygift_dialog").style.display = "block";

    switch (gift) {
        case 1:
            somestring.innerText = "Ooh, free money! That's mine now! Hahahaha!";
            await wait(1000);
            gift_svg.style.transition = "all 0.65s linear";
            gift_svg.style.transform = "translateY(-100%)";
            gift_svg.style.opacity = "0";
            break;
        case 2:
            somestring.innerText = "Ooh, a bird! I like them, but, ew, it's flappy bird! Shoo!";
            await wait(1500);
            gift_svg.style.transition = "all 0.4s linear";
            gift_svg.style.transform = "translate(100%, -100%)";
            gift_svg.style.opacity = "0";
            break;
        case 3:
            somestring.innerText = "Hey, that's my Sublime Text license key! Give it back!";
            await wait(1500);
            gift_svg.style.transition = "all 0.2s linear";
            gift_svg.style.transform = "translate(100%)";
            gift_svg.style.opacity = "0";
            break;
        case 4:
        case 5:
            somestring.innerText = "Hahaha, you got nothing!";
            break;
        default:
            break;
    }
    await wait(2000);
    if (!!gift_svg) {
        gift_svg.style.transform = "translateY(0%)";
        gift_svg.style.opacity = "1";
    }
    getId("gift_thatsmygift_dialog").style.display = "none";
    getId(`gift_item_${gift}`).style.display = "none";
    getId("gift_display").style.display = "none";
    getId("gift_flashbang").style.transition = "none";
    claiming_gift = false;
};
getId("website_logo").ondragstart = (ev) => {
    ev.dataTransfer.setData("text", "website_logo");
}

getId("claim_gift").ondrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    if (data == "website_logo") {
        getId("claim_gift").style.animation = "lsd 1s infinite linear";
        getId(data).style.animation = "lsd 1s infinite linear";
        fartmode = true;
    }
}
getId("claim_gift").ondragover = (ev) => {
    ev.preventDefault();
}