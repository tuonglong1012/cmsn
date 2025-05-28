const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const particles = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework(x, y) {
  for (let i = 0; i < 100; i++) {
    particles.push({
      x,
      y,
      angle: random(0, Math.PI * 2),
      speed: random(2, 10),
      radius: 2,
      alpha: 1,
      decay: random(0.01, 0.02),
      color: `hsl(${Math.floor(random(0, 360))}, 100%, 50%)`,
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, w, h);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color.match(/\d+/g).join(",")}, ${p.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
function createBalloons() {
  const balloonContainer = document.getElementById("balloons");
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    balloon.style.animationDuration = `${6 + Math.random() * 4}s`;
    balloonContainer.appendChild(balloon);
  }
}

function showMessage() {
  document.getElementById("showBtn").style.display = "none";
  document.getElementById("content").style.display = "block";
  createBalloons(); // Thêm dòng này
}

let fireworkCount = 0;
const interval = setInterval(() => {
  createFirework(random(100, w - 100), random(100, h - 100));
  fireworkCount++;
  if (fireworkCount >= 5) {
    // Trước là 10, giờ chỉ còn 5 lần bắn pháo hoa
    clearInterval(interval);
    setTimeout(() => {
      document.getElementById("showBtn").style.display = "block";
    }, 500); // Sau khi pháo hoa kết thúc 0.5s, hiện nút bấm
  }
}, 800);
