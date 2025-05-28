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
  for (let i = 0; i < 50; i++) {
    particles.push({
      x,
      y,
      angle: random(0, Math.PI * 2),
      speed: random(2, 8),
      radius: random(1, 3),
      alpha: 1,
      decay: random(0.01, 0.03),
      color: `hsl(${Math.floor(random(0, 360))}, 100%, 50%)`,
    });
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, w, h);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed + 0.5;
    p.alpha -= p.decay;
    p.speed *= 0.99;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color.replace("50%", `50%, ${p.alpha})`);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

// Tạo sao
function createStars() {
  const starsContainer = document.getElementById("stars");
  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
  }
}

// Tạo bóng bay
function createBalloons() {
  const balloonContainer = document.getElementById("balloons");
  balloonContainer.innerHTML = "";

  for (let i = 0; i < 15; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    balloon.style.animationDuration = `${8 + Math.random() * 6}s`;
    balloon.style.animationDelay = `${Math.random() * 3}s`;
    balloonContainer.appendChild(balloon);
  }
}

// Bắt đầu lễ kỷ niệm
function startCelebration() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("navigation").style.display = "flex";

  // Phát nhạc
  const music = document.getElementById("bgMusic");
  music.play().catch((e) => console.log("Không thể phát nhạc tự động"));

  // Tạo hiệu ứng
  createBalloons();
  startFireworks();
}

// Pháo hoa
function startFireworks() {
  let fireworkCount = 0;
  const interval = setInterval(() => {
    createFirework(random(100, w - 100), random(100, h - 200));
    fireworkCount++;
    if (fireworkCount >= 8) {
      clearInterval(interval);
    }
  }, 1000);
}

// Chuyển trang
function showPage(pageId) {
  // Ẩn tất cả trang
  document.querySelectorAll(".page").forEach((page) => {
    page.style.display = "none";
  });

  // Hiện trang được chọn
  document.getElementById(pageId).style.display = "block";

  // Tạo hiệu ứng đặc biệt cho trang chính
  if (pageId === "mainPage") {
    createBalloons();
    setTimeout(() => startFireworks(), 500);
  }
}

// Game thổi nến
let candlesBlown = 0;
const totalCandles = 5;

function blowCandle(index) {
  const candles = document.querySelectorAll(".candle");
  if (!candles[index].classList.contains("blown")) {
    candles[index].classList.add("blown");
    candles[index].textContent = "💨";
    candlesBlown++;

    if (candlesBlown === totalCandles) {
      document.getElementById("gameMessage").textContent =
        "🎉 Chúc mừng! Bạn đã thổi tắt hết nến! Chúc mừng sinh nhật! 🎂";
      setTimeout(() => {
        // Tạo pháo hoa đặc biệt
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createFirework(random(200, w - 200), random(100, h - 300));
          }, i * 200);
        }
      }, 500);
    } else {
      document.getElementById("gameMessage").textContent = `Tuyệt vời! Còn ${
        totalCandles - candlesBlown
      } ngọn nến nữa! 😊`;
    }
  }
}

function blowCandles() {
  // Thổi tất cả nến cùng lúc
  const candles = document.querySelectorAll(".candle");
  candles.forEach((candle, index) => {
    if (!candle.classList.contains("blown")) {
      setTimeout(() => blowCandle(index), index * 200);
    }
  });
}

// Khởi tạo
window.addEventListener("load", () => {
  createStars();
  animate();

  // Auto-play pháo hoa sau 2 giây
  setTimeout(() => {
    createFirework(w / 2, h / 2);
  }, 2000);
});

// Tự động tạo pháo hoa ngẫu nhiên
setInterval(() => {
  if (Math.random() < 0.3) {
    createFirework(random(100, w - 100), random(100, h - 200));
  }
}, 3000);

// Tự động tạo bóng bay mới
setInterval(() => {
  if (document.getElementById("mainPage").style.display !== "none") {
    const balloonContainer = document.getElementById("balloons");
    if (balloonContainer.children.length < 10) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.style.left = `${Math.random() * 100}%`;
      balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      balloon.style.animationDuration = `${8 + Math.random() * 4}s`;
      balloonContainer.appendChild(balloon);
    }
  }
}, 2000);
