window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.nav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

const setCanvas = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

const createParticles = () => {
  const count = Math.floor((canvas.width * canvas.height) / 8000);
  return Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  }));
};

setCanvas();
let particles = createParticles();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }

  requestAnimationFrame(animate);
};

animate();

addEventListener('resize', () => {
  setCanvas();
  particles = createParticles();
});


const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
});