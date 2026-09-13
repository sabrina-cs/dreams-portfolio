// ---------------- Twinkling stars + shooting stars ----------------
(function () {
  const canvas = document.getElementById("star-canvas");
  if (!canvas) return;
 
  const ctx = canvas.getContext("2d");
  const hero = canvas.closest(".hero");
  let width, height, stars, shootingStars;
 
  const STAR_COLORS = ["#ffffff", "#ffffff", "#ffecd3", "#bfcfff"];
 
  function resize() {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
    createStars();
  }
 
  function createStars() {
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.6 + 0.3,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      color: STAR_COLORS[(Math.random() * STAR_COLORS.length) | 0],
    }));
  }
 
  function spawnShootingStar() {
    shootingStars.push({
      x: Math.random() * width * 0.7,
      y: Math.random() * height * 0.4,
      length: Math.random() * 120 + 80,
      speed: Math.random() * 6 + 6,
      angle: Math.PI / 5, // travels down-right
      life: 1,
    });
  }
 
  shootingStars = [];
  let frame = 0;
 
  function draw() {
    ctx.clearRect(0, 0, width, height);
 
    // twinkling stars, each 1 glows in its own colour
    stars.forEach((s) => {
      s.phase += s.twinkleSpeed;
      ctx.globalAlpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(s.phase));
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
 
    // shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const star = shootingStars[i];
      const dx = Math.cos(star.angle) * star.speed;
      const dy = Math.sin(star.angle) * star.speed;
      star.x += dx;
      star.y += dy;
      star.life -= 0.02;
 
      const tailX = star.x - Math.cos(star.angle) * star.length;
      const tailY = star.y - Math.sin(star.angle) * star.length;
 
      const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(255,255,255,${star.life})`);
      gradient.addColorStop(1, "rgba(255,255,255,0)");
 
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(255, 236, 211, 0.8)"; // warm cream glow
      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.stroke();
 
      if (star.life <= 0 || star.x > width || star.y > height) {
        shootingStars.splice(i, 1);
      }
    }
 
    ctx.shadowBlur = 0;
 
    // occasionally spawn a new shooting star (roughly every 8-14s)
    frame++;
    if (frame % Math.floor(Math.random() * 360 + 480) === 0) {
      spawnShootingStar();
    }
 
    requestAnimationFrame(draw);
  }
 
  window.addEventListener("resize", resize);
  resize();
  draw();
})();
 
// ---------------- Hobby carousel ----------------
(function () {
  const slides = [
    { label: "Painting", icon: "fa-regular fa-image" },
    { label: "Pool / Billiards", icon: "fa-regular fa-image" },
    { label: "Reading", icon: "fa-regular fa-image" },
    { label: "Other", icon: "fa-regular fa-image" },
  ];
 
  const imageEl = document.getElementById("carousel-image");
  const captionEl = document.getElementById("carousel-caption");
  const dotsEl = document.getElementById("carousel-dots");
  const prevBtn = document.querySelector(".carousel-arrow.prev");
  const nextBtn = document.querySelector(".carousel-arrow.next");
 
  if (!imageEl || !dotsEl) return;
 
  let current = 0;
 
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(dot);
  });
 
  function render() {
    captionEl.textContent = slides[current].label;
    [...dotsEl.children].forEach((d, i) =>
      d.classList.toggle("active", i === current)
    );
    // To use a real photo instead of the placeholder icon, replace this
    // block with: imageEl.style.backgroundImage = `url(images/hobby-${current}.jpg)`;
  }
 
  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
  }
 
  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
 
  render();
})();
 
