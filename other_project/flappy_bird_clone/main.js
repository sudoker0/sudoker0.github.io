const canvas = document.querySelector("canvas#canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
const debugCanvas = document.querySelector("canvas#debug");
const debugCtx = debugCanvas.getContext("2d");
debugCanvas.width = 400;
debugCanvas.height = 800;
debugCtx.font = "14px monospace";
ctx.translate(0.5, 0.5);
ctx.font = "64px Flappy_Bird_Font";
ctx.imageSmoothingEnabled = false;
let score = 0;
let gameFrame = 0;
let canvasPos = canvas.getBoundingClientRect();
let gameOver = false;
let startGame = false;
const hitSound = document.createElement("audio");
hitSound.src = "./hit.wav";
hitSound.volume = 0.5;
const jumpSound = document.createElement("audio");
jumpSound.src = "./jump.wav";
jumpSound.volume = 0.5;
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.velocity_y = 0;
        this.radius = 20;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 500;
        this.spriteHeight = 500;
        this.acceleratingSpeed = 15;
    }
    update() {
        if (startGame) {
            gameFrame++;
            player.velocity_y += 0.45;
            player.y += player.velocity_y;
            player.velocity_y *= 0.9;
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
const pipeArray = [];
class Pipe {
    constructor() {
        this.collideThreshold = 2;
        this.countingThreshold = player.radius / 2;
        this.spaceThreshold = 70;
        this.counted = false;
        this.width = 40;
        this.x = canvas.width + this.width;
        this.y = canvas.height - getRandomArbitrary(50, canvas.height / 2);
        this.height = canvas.height - this.y;
        this.movingSpeed = 3;
        this.dx_point1 = 0;
        this.dx_point2 = 0;
        this.dy = 0;
    }
    update(i) {
        if (startGame) {
            this.x -= this.movingSpeed;
            this.dx_point1 = this.x - player.x;
            this.dx_point2 = (this.x + this.width) - player.x;
            this.dy = this.y - player.y;
            ctx.fillStyle = "black";
            debugCtx.fillText(`ID: ${i} | dx1: ${this.dx_point1} | dx2: ${this.dx_point2} | dy: ${Math.round(this.dy)}`, 10, 100 + (20 * i));
        }
    }
    draw(i) {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fillText(i, this.x + (this.width / 2), this.y);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, 0, this.width, canvas.height - this.height - (player.radius * 2 + this.spaceThreshold));
    }
}
const player = new Player();
function handlePlayer() {
    if (!gameOver) {
        jumpSound.currentTime = 0;
        startGame = true;
        mouse.click = true;
        player.jump();
        jumpSound.play();
    }
}
document.body.addEventListener("keydown", (ev) => { if (ev.key == " ") {
    handlePlayer();
} });
canvas.addEventListener("mousedown", handlePlayer);
canvas.addEventListener("mouseup", () => { mouse.click = false; });
const background = new Image();
background.src = "./background.png";
function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;
    if (offsetX < 0)
        offsetX = 0;
    if (offsetY < 0)
        offsetY = 0;
    if (offsetX > 1)
        offsetX = 1;
    if (offsetY > 1)
        offsetY = 1;
    var iw = typeof img.width == "number" ? img.width : 0, ih = typeof img.height == "number" ? img.height : 0, r = Math.min(w / iw, h / ih), nw = iw * r, nh = ih * r, cx, cy, cw, ch, ar = 1;
    if (nw < w)
        ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h)
        ar = h / nh;
    nw *= ar;
    nh *= ar;
    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
    if (cx < 0)
        cx = 0;
    if (cy < 0)
        cy = 0;
    if (cw > iw)
        cw = iw;
    if (ch > ih)
        ch = ih;
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}
function fail() {
    hitSound.play();
    gameOver = true;
    startGame = false;
    if (confirm(`Game Over!\nYour score is ${score}\nTo continue, please click OK`))
        reset();
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
        if (pipeArray[i].dx_point1 < player.radius &&
            pipeArray[i].dx_point2 > -player.radius &&
            (pipeArray[i].dy < player.radius ||
                pipeArray[i].dy > player.radius + pipeArray[i].spaceThreshold)) {
            fail();
        }
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
        ctx.fillStyle = "black";
        debugCtx.fillText(`Score: ${score}`, 10, 40);
        player.update();
        player.draw();
        debugCtx.fillText(`Y Velocity: ${player.velocity_y}`, 10, 80);
        debugCtx.fillText(`Flappy Bird (Vietnamese Clone) [PUBLIC_BETA_1]`, 10, 20);
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.fillText(score.toString(), canvas.width / 2, 80);
        ctx.strokeText(score.toString(), canvas.width / 2, 80);
        player.y = player.y > player.radius ? player.y : player.radius;
        if (player.y + player.radius > canvas.height)
            fail();
        requestAnimationFrame(animate);
    }
}
animate();
//# sourceMappingURL=main.js.map