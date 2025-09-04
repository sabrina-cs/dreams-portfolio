// Twinkling stars + Shooting stars
// Twinkling stars adapted from https://codepen.io/Jenbo/pen/pgmZwB
// Shooting star adapted from https://codepen.io/tsotne-ts/pen/YzmxyjE

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ------------------------------- twinkling stars -------------------------------
function Star(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.rChange = 0.008; 
}

Star.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
  ctx.shadowBlur = 6;
  ctx.shadowColor = "white";
  ctx.fillStyle = "white";
  ctx.fill();
};

Star.prototype.update = function () {
  if (this.r > 2 || this.r < 0.5) this.rChange = -this.rChange;
  this.r += this.rChange;
  this.draw();
};

let stars = [];
for (let i = 0; i < 100; i++) {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height;
  let r = Math.random() * 1.5 + 0.5;
  stars.push(new Star(x, y, r));
}

// ------------------------------- shooting stars -------------------------------
function shootingStar() {
  let x = canvas.width;
  let y = Math.random() * canvas.height / 3; 
  let length = 200;
  let speed = 3; 

  function draw() {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - length, y + length / 3);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function animateStar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update stars in background
    stars.forEach(s => s.update());

    // draw the shooting star
    draw();
    x -= speed;
    y += speed / 3;

    if (x > -length) requestAnimationFrame(animateStar);
  }

  animateStar();
}

// make shooting stars appear sometimes
setInterval(() => {
  if (Math.random() < 0.3) shootingStar(); 
}, 8000); 

// main loop
function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => s.update());
  requestAnimationFrame(loop);
}

loop();