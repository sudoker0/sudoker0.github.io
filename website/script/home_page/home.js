var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let fartmode = false;
var claiming_gift = false;
var fartnoise = new Audio("/website/sound/fart.mp3");
getId("claim_gift").onclick = () => __awaiter(this, void 0, void 0, function* () {
    if (claiming_gift)
        return;
    if (fartmode) {
        fartnoise.loop = true;
        fartnoise.play();
    }
    claiming_gift = true;
    getId("claim_gift").style.transformOrigin = "bottom";
    getId("claim_gift").style.animation = "gift_opening_animation 3s";
    yield wait(2750);
    if (fartmode) {
        fartnoise.pause();
        fartnoise.currentTime = 0;
        fartmode = false;
    }
    getId("gift_display").style.display = "flex";
    getId("gift_flashbang").style.opacity = "1";
    yield wait(250);
    getId("gift_flashbang").style.transition = "opacity 0.5s";
    getId("gift_flashbang").style.opacity = "0";
    var gift = getRandomInt(1, 4);
    getId(`gift_item_${gift}`).style.display = "flex";
    yield wait(500);
    getId("claim_gift").style.animation = "none";
    yield wait(1500);
    var gift_svg = qSel(`div#gift_item_${gift} img`);
    var somestring = qSel("div#gift_thatsmygift_dialog p");
    getId("gift_thatsmygift_dialog").style.display = "block";
    switch (gift) {
        case 1:
            somestring.replace({ "message": "Ooh, free money! That's mine now! Hahahaha!" });
            yield wait(1000);
            gift_svg.style.transition = "all 0.65s linear";
            gift_svg.style.transform = "translateY(-100%)";
            gift_svg.style.opacity = "0";
            break;
        case 2:
            somestring.replace({ "message": "Ooh, a bird! I like them, but, ew, it's flappy bird! Shoo!" });
            yield wait(1500);
            gift_svg.style.transition = "all 0.4s linear";
            gift_svg.style.transform = "translate(100%, -100%)";
            gift_svg.style.opacity = "0";
            break;
        case 3:
            somestring.replace({ "message": "Hey, that's my Sublime Text license key! Give it back!" });
            yield wait(1500);
            gift_svg.style.transition = "all 0.2s linear";
            gift_svg.style.transform = "translate(100%)";
            gift_svg.style.opacity = "0";
            break;
        case 4:
        case 5:
            somestring.replace({ "message": "Hahaha, you got nothing!" });
            break;
        default:
            break;
    }
    yield wait(2000);
    if (!!gift_svg) {
        gift_svg.style.transform = "translateY(0%)";
        gift_svg.style.opacity = "1";
    }
    getId("gift_thatsmygift_dialog").style.display = "none";
    getId(`gift_item_${gift}`).style.display = "none";
    getId("gift_display").style.display = "none";
    getId("gift_flashbang").style.transition = "none";
    claiming_gift = false;
});
getId("website_logo").ondragstart = (ev) => {
    ev.dataTransfer.setData("text", "website_logo");
};
getId("website_logo").ondrag = (ev) => {
    console.log("Drag: " + ev);
};
getId("claim_gift").ondrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data != "website_logo")
        return;
    getId("claim_gift").style.animation = "lsd 1s infinite linear";
    fartmode = true;
};
getId("building_block").ondrop = (ev) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data != "website_logo")
        return;
    getId("building_block").setAttribute("src", getId("building_block").classList.contains("toggled")
        ? "./website/image/home_page/building_block_of_internet.svg"
        : "./website/image/home_page/building_block_of_my_website.svg");
    getId("building_block_caption").innerText =
        getId("building_block").classList.contains("toggled")
            ? "The Building Block Of The Internet"
            : "The Building Block Of My Website";
    getId("building_block").classList.toggle("toggled");
};
getId("claim_gift").ondragover = (ev) => ev.preventDefault();
getId("building_block").ondragover = (ev) => ev.preventDefault();
//# sourceMappingURL=home.js.map