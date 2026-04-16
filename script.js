// MC Tickets — interactions

// =============================================
// Lenis momentum smooth scroll
// =============================================
let lenis = null;
if (typeof Lenis !== 'undefined' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis = new Lenis({
    duration: 1.3,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// =============================================
// Word split for stagger reveals
// =============================================
document.querySelectorAll('.section-title, .big-quote').forEach((el) => {
  const html = el.innerHTML;
  // Split on space but preserve <br> and inline tags
  const parts = html.split(/(\s+|<br\s*\/?\s*>|<[^>]+>)/g);
  let wordIndex = 0;
  const wrapped = parts.map((p) => {
    if (!p) return '';
    if (/^\s+$/.test(p)) return p;
    if (/^<[^>]+>$/.test(p)) return p;
    return `<span class="word" style="--i:${wordIndex++}">${p}</span>`;
  }).join('');
  el.innerHTML = wrapped;
});

// =============================================
// Fade in on scroll
// =============================================
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));

// =============================================
// Count-up stat animation (.why-num)
// =============================================
function animateCount(textNode, target, duration = 1800) {
  const start = performance.now();
  const isThousand = target >= 1000;
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(target * eased);
    textNode.textContent = isThousand ? value.toLocaleString() : String(value);
    if (t < 1) requestAnimationFrame(frame);
    else textNode.textContent = target.toLocaleString();
  }
  requestAnimationFrame(frame);
}

const countObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const firstText = [...el.childNodes].find(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
    );
    if (firstText) {
      const raw = firstText.textContent.replace(/,/g, '').trim();
      const target = parseInt(raw, 10);
      if (!isNaN(target) && target > 0) {
        firstText.textContent = '0';
        animateCount(firstText, target);
      }
    }
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.why-num').forEach((el) => countObs.observe(el));

// =============================================
// Cursor spotlight on cards
// =============================================
document.querySelectorAll('.cat-card, .inv-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--mx', `50%`);
    card.style.setProperty('--my', `50%`);
  });
});

// =============================================
// Magnetic hover on primary CTAs
// =============================================
document.querySelectorAll('.btn-primary').forEach((btn) => {
  const strength = 0.28;
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    btn.style.transform = `translate(${x}px, ${y - 2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll for in-page anchors (routed through Lenis when available)
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(target, { offset: -20, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  });
});

// Sparkle particle field in the hero
(function initSparkles() {
  const canvas = document.getElementById('sparkles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, particles = [];

  const COUNT = 70;
  const colors = [
    { r: 232, g: 201, b: 104 }, // gold
    { r: 212, g: 175, b: 55  }, // deep gold
    { r: 155, g: 107, b: 255 }, // purple
    { r: 255, g: 255, b: 255 }, // white
  ];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function seed() {
    particles = Array.from({ length: COUNT }, () => {
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(Math.random() * 0.25 + 0.05),
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        color: c,
        big: Math.random() > 0.92, // a few standout sparkles
      };
    });
  }

  function drawStar(x, y, r, rgb, alpha) {
    // Soft glow
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
    grad.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
    grad.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.25})`);
    grad.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r * 6, 0, Math.PI * 2);
    ctx.fill();

    // Bright core
    ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.twinkleSpeed;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      const alpha = (Math.sin(p.phase) * 0.5 + 0.5) * (p.big ? 0.95 : 0.6);
      drawStar(p.x, p.y, p.big ? p.r * 1.8 : p.r, p.color, alpha);
    }
    requestAnimationFrame(tick);
  }

  resize();
  seed();
  tick();
  window.addEventListener('resize', () => { resize(); seed(); });
})();

// Nav state on scroll
const nav = document.querySelector('.nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 40) {
    nav.style.padding = '14px 40px';
    nav.style.background = 'rgba(8, 8, 11, 0.92)';
  } else {
    nav.style.padding = '';
    nav.style.background = '';
  }
  lastY = y;
}, { passive: true });
