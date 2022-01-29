const canvas: HTMLCanvasElement = document.querySelector("canvas#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

const debugCanvas: HTMLCanvasElement = document.querySelector("canvas#debug");
const debugCtx = debugCanvas.getContext("2d");
debugCanvas.width = 400;
debugCanvas.height = 800;

debugCtx.font = "14px monospace"

ctx.translate(0.5, 0.5);
ctx.font = "64px Flappy_Bird_Font";
ctx.imageSmoothingEnabled = false;

let score = 0;
let gameFrame = 0;
let canvasPos = canvas.getBoundingClientRect();
let gameOver = false
let startGame = false

const hitSound = document.createElement("audio");
hitSound.src = "./hit.wav";
hitSound.volume = 0.5

const jumpSound = document.createElement("audio");
jumpSound.src = "./jump.wav";
jumpSound.volume = 0.5

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
}

// const pipeImage = new Image();
// const body = document.createElement("canvas");
// const head = document.createElement("canvas");
// pipeImage.src = "./pipe.png";
// pipeImage.onload = () => {
//     var headHeight = 64,
//         headCtx = head.getContext("2d");
//     head.width = pipeImage.width;
//     head.height = headHeight;
//     headCtx.drawImage(pipeImage, 0, 0, head.width, headHeight, 0, 0, head.width, headHeight);

//     var bodyCtx = body.getContext("2d");
//     body.width = pipeImage.width;
//     body.height = 100;
//     bodyCtx.drawImage(pipeImage, 0, headHeight, body.width, body.height, 0, 0, body.width, body.height);
// }

class Player {

    x: number = canvas.width / 2;
    y: number = canvas.height / 2;
    velocity_y: number = 0;
    radius: number = 20;
    angle: number = 0;
    frameX: number = 0;
    frameY: number = 0;
    frame: number = 0;
    spriteWidth: number = 500;
    spriteHeight: number = 500;
    acceleratingSpeed: number = 15;

    update() { // ! ------------------------------- Debug stuff -------------------------------
        if (startGame) {
            gameFrame++;
            player.velocity_y += 0.45; // gravity
            player.y += player.velocity_y;
            player.velocity_y *= 0.9; // friction
            handlePipe();
        }
        ctx.fillStyle = "black";
        debugCtx.fillText(`Y: ${Math.round(this.y)}`, 10, 60);
    }
    draw() {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
    jump() {
        this.velocity_y -= 13;
    }
}

const pipeArray: Pipe[] = [];
class Pipe {

    collideThreshold: number = 2
    countingThreshold: number = player.radius / 2;
    spaceThreshold: number = 70;
    counted: boolean = false;
    width: number = 40;
    x: number = canvas.width + this.width;
    y: number = canvas.height - getRandomArbitrary(50, canvas.height / 2);
    height: number = canvas.height - this.y;
    movingSpeed: number = 3;

    dx_point1: number = 0;
    dx_point2: number = 0;
    dy: number = 0;

    update(i: number) {
        if (startGame) {
            this.x -= this.movingSpeed;
            this.dx_point1 = this.x - player.x; // ! Bottom block | Top-Left location (1)
            this.dx_point2 = (this.x + this.width) - player.x; //! Bottom block | Top-Right location (2)
            this.dy = this.y - player.y;
            ctx.fillStyle = "black";
            // ! ------------------------------- Debug stuff -------------------------------
            debugCtx.fillText(`ID: ${i} | dx1: ${this.dx_point1} | dx2: ${this.dx_point2} | dy: ${Math.round(this.dy)}`, 10, 100 + (20 * i));
        }
    }
    draw(i: string) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // drawImageProp(ctx, this.pipeImage, this.x, this.y, this.width, this.height, 0, 0)
            // var fullBody = document.createElement("canvas"),
            //     fullBodyCtx = fullBody.getContext("2d");
            //     // fullBodyPattern = fullBodyCtx.createPattern(body, "repeat-y");
            // fullBody.width = pipeImage.width;
            // fullBody.height = (pipeImage.width / this.width) * this.height;
            // // fullBodyCtx.fillStyle = fullBodyPattern;
            // // fullBodyCtx.fillRect(0, 0, fullBody.width, fullBody.height)
            // fullBodyCtx.drawImage(body, 0, 0, fullBody.width, fullBody.height);
            // fullBodyCtx.drawImage(head, 0, 0);
            // // console.log(fullBody.toDataURL("image/png"));

            // ctx.drawImage(fullBody, this.x, this.y, this.width, this.height);
            // fullBody.remove();
        // ctx.drawImage(this.pipeImage, this.x, this.y)
        ctx.fillStyle = "black";
        // ! ------------------------------- Debug stuff -------------------------------
        ctx.fillText(i, this.x + (this.width / 2), this.y);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, 0, this.width, canvas.height - this.height - (player.radius * 2 + this.spaceThreshold));
    }
}

const player = new Player();

function handlePlayer() {
    if (!gameOver) {
        jumpSound.currentTime = 0
        startGame = true;
        mouse.click = true;
        player.jump();
        jumpSound.play();
    }
}

document.body.addEventListener("keydown", (ev) => { if (ev.key == " ") { handlePlayer() } })
canvas.addEventListener("mousedown", handlePlayer)
canvas.addEventListener("mouseup", () => { mouse.click = false })

const background = new Image();
background.src = "./background.png"

function getRandomArbitrary(min: number, max: number) { return Math.random() * (max - min) + min; }

/**
 * https://stackoverflow.com/a/21961894/11418759
 * @param {CanvasRenderingContext2D} ctx Context
 * @param {CanvasImageSource} img Image
 * @param {Number} x X coords
 * @param {Number} y Y coords
 * @param {Number} w Width of container
 * @param {Number} h Height of container
 * @param {Number} offsetX Offset X
 * @param {Number} offsetY Offset Y
 */
function drawImageProp(ctx: CanvasRenderingContext2D, img: CanvasImageSource, x: number, y: number, w: number, h: number, offsetX: number, offsetY: number) {
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;
    var iw = typeof img.width == "number" ? img.width : 0,
        ih = typeof img.height == "number" ? img.height : 0,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,
        nh = ih * r,
        cx: number, cy: number, cw: number, ch: number, ar = 1;
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
    nw *= ar;
    nh *= ar;
    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
}

function fail() {
    hitSound.play();
    gameOver = true;
    startGame = false;
    if (confirm(`Game Over!\nYour score is ${score}\nTo continue, please click OK`)) reset()
}

function reset() {
    pipeArray.splice(0, pipeArray.length);
    score = 0;
    gameOver = false;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.velocity_y = 0;
}

function handlePipe() {
    if (gameFrame % 100 == 0) {
        pipeArray.push(new Pipe());
    }
    for (let i = 0; i < pipeArray.length; i++) {
        pipeArray[i].update(i);
        pipeArray[i].draw(i.toString());
    }
    for (let i = 0; i < pipeArray.length; i++) {
        if (pipeArray[i].x < 0 - pipeArray[i].width * 2) {
            pipeArray.splice(i, 1);
        }
        //! dx_point1 will be 0 when the player is at the middle of the Point(1)
        //! dx_point2 will be 0 when the player is at the middle of the Point(2)
        if (
            pipeArray[i].dx_point1 < player.radius &&
            pipeArray[i].dx_point2 > -player.radius &&
            (
                pipeArray[i].dy < player.radius ||
                pipeArray[i].dy > player.radius + pipeArray[i].spaceThreshold
            )
        ) { fail() }
        if (pipeArray[i] != undefined && pipeArray[i].dx_point1 < -player.radius && pipeArray[i].dx_point1 > -player.radius * 2) {
            if (!pipeArray[i].counted) {
                score++;
                pipeArray[i].counted = true;
            }
        }
    }
}

function animate() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(ctx, background, 0, 0, canvas.width, canvas.height, 0, 1);
        debugCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
        // ! ------------------------------- Debug stuff -------------------------------
        ctx.fillStyle = "black";
        debugCtx.fillText(`Score: ${score}`, 10, 40);
        player.update();
        player.draw();
        // ! ------------------------------- Debug stuff -------------------------------
        debugCtx.fillText(`Y Velocity: ${player.velocity_y}`, 10, 80);
        debugCtx.fillText(`Flappy Bird (Vietnamese Clone) [PUBLIC_BETA_1]`, 10, 20);
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.fillText(score.toString(), canvas.width / 2, 80);
        ctx.strokeText(score.toString(), canvas.width / 2, 80);
        player.y = player.y > player.radius ? player.y : player.radius;
        if (player.y + player.radius > canvas.height) fail()
        requestAnimationFrame(animate);
    }
}
animate();