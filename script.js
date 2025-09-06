// Twinkling stars + Shooting stars
// Twinkle adapted from https://codepen.io/Jenbo/pen/pgmZwB
// Shooting stars adapted from https://codepen.io/tsotne-ts/pen/YzmxyjE

/* -------------------------------- twinkling stars -------------------------------- */
(function initTwinkle(){
  const canvas = document.getElementById("twinkling-star");
  if (!canvas) return; // only run on pages that have the canvas (about.html, dreams.html)

  const ctx = canvas.getContext("2d");

  function sizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  sizeCanvas();
  window.addEventListener("resize", () => {
    sizeCanvas();
    buildStars();
  });

  function Star(x, y, r, color) {
    this.x = x; this.y = y; this.r = r; this.color = color;
    this.rChange = 0.006; // slower twinkle
  }
  Star.prototype.render = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.shadowBlur = 8;
    ctx.shadowColor = "white";
    ctx.fillStyle = this.color;
    ctx.fill();
  };
  Star.prototype.update = function () {
    if (this.r > 2 || this.r < 0.8) this.rChange = -this.rChange;
    this.r += this.rChange;
  };

  function randomColor() {
    const arr = ["#ffffff", "#ffecd3", "#bfcfff"];
    return arr[(Math.random() * arr.length) | 0];
  }

  let stars = [];
  function buildStars() {
    stars = [];
    const COUNT = 120; // fewer stars
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.7 + 0.5;
      stars.push(new Star(x, y, r, randomColor()));
    }
  }
  buildStars();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].render();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();


/* ----------------------------------- shooting stars ----------------------------------- */
(function initShooting(){
  const layer = document.querySelector(".shooting-stars");
  if (!layer) return; 

  const numStars = 10;
  const colors = ["#ffffff"]; 

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("span");

    const topPosition = Math.random() * window.innerHeight;
    const rightPosition = Math.random() * window.innerWidth;

    const animationDelay = (-Math.random() * 6).toFixed(2) + "s";
    const animationDuration = (Math.random() * 3 + 4).toFixed(2) + "s";

    star.style.top = topPosition + "px";
    star.style.right = rightPosition + "px";
    star.style.background = colors[0];
    star.style.animationDelay = animationDelay;
    star.style.animationDuration = animationDuration;

    layer.appendChild(star);
  }
})();

// Fade transition adapted from 
// https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css

function fade(element, callback) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = 'none';
      if (callback) callback(); // call callback after fade completes
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function unfade(element) {
  var op = 0.1; // initial opacity
  element.style.opacity = op;
  element.style.display = 'block';
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}
