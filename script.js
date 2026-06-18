/* =========================================================
   Samia Rahman Sashi — Portfolio · script.js
   ---------------------------------------------------------
   EVERYTHING you'll usually want to change lives in CONFIG.
   No HTML editing needed for contact info, quote, learning
   topics, notes/resources, or projects. See README.md.
   ========================================================= */

const CONFIG = {
  /* --- Contact (replace the placeholders) --- */
  email: "hello@example.com",          // ← your email
  linkedin: "https://www.linkedin.com/", // ← your LinkedIn profile URL

  /* --- Favourite mathematical quote --- */
  quote: {
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein"
  },

  /* --- Currently learning (MEd journey). pct is the little progress meter --- */
  learning: [
    { title: "Educational Psychology",   pct: 70 },
    { title: "Curriculum & Instruction", pct: 60 },
    { title: "Assessment & Evaluation",  pct: 55 },
    { title: "Teaching Methodologies",   pct: 65 },
    { title: "Research in Education",     pct: 45 }
  ],

  /* --- Notes & resources ---
     Paste a Google Drive (or any) link into `link`.
     Leave link empty ("") and the card shows "Coming soon". */
  resources: {
    mathNotes:          { title: "Mathematics Notes",      desc: "Topic-wise notes, worked examples, and quick references.", icon: "∑", link: "" },
    examGuides:         { title: "Exam Preparation Guides", desc: "Strategies, practice sets, and revision checklists.",       icon: "✓", link: "" },
    learningResources:  { title: "Learning Resources",     desc: "Curated readings and external material worth exploring.",  icon: "✎", link: "" },
    classroomMaterials: { title: "Classroom Materials",    desc: "Handouts and slides used in class, shared for review.",     icon: "▦", link: "" }
  },

  /* --- Featured projects ---
     `cover` = path to an image in assets/images (or any URL); leave "" for a soft gradient placeholder.
     `link`  = external/Drive URL; leave "" to show "Coming soon". */
  projects: [
    { title: "Classroom Learning Materials",     desc: "Materials designed to make abstract ideas tangible and clear.", cover: "", link: "" },
    { title: "Mathematics Teaching Resources",   desc: "Reusable resources that support consistent, confident teaching.", cover: "", link: "" },
    { title: "Student Development Initiatives",  desc: "Efforts focused on growth, mentorship, and engagement.", cover: "", link: "" },
    { title: "Educational Research Work",        desc: "Inquiry into how students learn mathematics best.", cover: "", link: "" }
  ],

  /* --- Pixel cat tooltips (shown rarely) --- */
  catTooltips: ["Keep learning.", "Curiosity matters.", "One step at a time.", "Mathematics is beautiful."]
};

/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */
const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------
   1. Contact links + quote + year
   --------------------------------------------------------- */
function applyConfig() {
  const emailBtn = $("#emailBtn");
  if (emailBtn) emailBtn.href = `mailto:${CONFIG.email}`;

  $$("#linkedInBtn, #heroLinkedIn").forEach(a => { if (a) a.href = CONFIG.linkedin; });

  const qt = $("#quoteText"), qa = $("#quoteAuthor");
  if (qt) qt.textContent = CONFIG.quote.text;
  if (qa) qa.textContent = `— ${CONFIG.quote.author}`;

  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   2. Render config-driven sections
   --------------------------------------------------------- */
function renderLearning() {
  const grid = $("#learningGrid");
  if (!grid) return;
  grid.innerHTML = CONFIG.learning.map(item => `
    <div class="learn-card">
      <h3>${item.title}</h3>
      <div class="learn-meter"><span data-pct="${item.pct}"></span></div>
      <span class="learn-pct">In progress</span>
    </div>
  `).join("");
}

function renderNotes() {
  const grid = $("#notesGrid");
  if (!grid) return;
  grid.innerHTML = Object.values(CONFIG.resources).map(r => {
    const hasLink = r.link && r.link.trim() !== "";
    const btn = hasLink
      ? `<a class="note-download" href="${r.link}" target="_blank" rel="noopener">Download <span class="arrow">↓</span></a>`
      : `<span class="note-download is-soon">Coming soon</span>`;
    return `
      <div class="note-card">
        <span class="note-icon">${r.icon || "•"}</span>
        <h3>${r.title}</h3>
        <p>${r.desc}</p>
        ${btn}
      </div>`;
  }).join("");
}

function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;
  grid.innerHTML = CONFIG.projects.map(p => {
    const hasCover = p.cover && p.cover.trim() !== "";
    const cover = hasCover
      ? `<img src="${p.cover}" alt="${p.title}" loading="lazy" />`
      : `<div class="project-cover-fallback">∿</div>`;
    const hasLink = p.link && p.link.trim() !== "";
    const link = hasLink
      ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">View project <span class="arrow">→</span></a>`
      : `<span class="project-link is-soon">Coming soon</span>`;
    return `
      <article class="project-card">
        <div class="project-cover">${cover}</div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          ${link}
        </div>
      </article>`;
  }).join("");
}

/* ---------------------------------------------------------
   3. Theme (light/dark) — system preference + localStorage
   --------------------------------------------------------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = $("#themeToggle");
  const stored = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = stored || (systemDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);
  if (toggle) toggle.setAttribute("aria-pressed", theme === "dark");

  toggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    toggle.setAttribute("aria-pressed", next === "dark");
  });
}

/* ---------------------------------------------------------
   4. Navigation: scroll state, mobile menu, active link
   --------------------------------------------------------- */
function initNav() {
  const nav = $("#nav");
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  };
  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

  // active link via section observer
  const links = $$("#navLinks a");
  const map = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove("is-active"));
        map.get(e.target.id)?.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach(s => spy.observe(s));
}

/* ---------------------------------------------------------
   5. Scroll progress bar
   --------------------------------------------------------- */
function initScrollProgress() {
  const bar = $("#scrollBar");
  if (!bar) return;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------------------------------------------------------
   6. Reveal on scroll (+ meters + timeline progress)
   --------------------------------------------------------- */
function initReveal() {
  if (prefersReduced) {
    $$(".reveal").forEach(el => el.classList.add("is-visible"));
    fillMeters();
    fillTimeline();
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-visible");
      if (e.target.id === "learning") fillMeters();
      if (e.target.id === "education") fillTimeline();
      o.unobserve(e.target);
    });
  }, { threshold: 0.16 });
  $$(".reveal").forEach(el => obs.observe(el));
}
function fillMeters() {
  $$(".learn-meter span").forEach(s => { s.style.width = (s.dataset.pct || 0) + "%"; });
}
function fillTimeline() {
  const tl = $("#timeline");
  if (tl) tl.style.setProperty("--line-progress", "100%");
}

/* ---------------------------------------------------------
   7. Floating particles (lightweight canvas)
   --------------------------------------------------------- */
function initParticles() {
  const canvas = $("#particles");
  if (!canvas || prefersReduced) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots, raf;
  const COUNT = window.innerWidth < 700 ? 26 : 50;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function seed() {
    dots = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.4 + 0.2
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    ctx.fillStyle = dark ? "rgba(199,180,237," : "rgba(184,162,227,";
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(tick);
  }
  resize(); seed(); tick();
  window.addEventListener("resize", () => { cancelAnimationFrame(raf); resize(); seed(); tick(); });
}

/* ---------------------------------------------------------
   8. Sakura petals (CSS-driven, gentle)
   --------------------------------------------------------- */
function initPetals() {
  const layer = $("#petals");
  if (!layer || prefersReduced) return;
  const COUNT = window.innerWidth < 700 ? 6 : 11;
  for (let i = 0; i < COUNT; i++) layer.appendChild(makePetal());

  function makePetal() {
    const p = document.createElement("div");
    p.className = "petal";
    const size = 8 + Math.random() * 8;
    p.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 20">
      <path d="M10 1 C13 5 17 7 10 19 C3 7 7 5 10 1 Z" fill="rgba(184,162,227,0.55)"/></svg>`;
    reset(p, true);
    fall(p);
    return p;
  }
  function reset(p, initial) {
    p.style.left = Math.random() * 100 + "vw";
    p.dataset.dur = 9 + Math.random() * 10;
    p.dataset.drift = (Math.random() * 80 - 40).toFixed(0);
    p.dataset.rot = (Math.random() * 360).toFixed(0);
    p.style.top = initial ? (-Math.random() * 100 - 10) + "vh" : "-10vh";
  }
  function fall(p) {
    const dur = parseFloat(p.dataset.dur) * 1000;
    const drift = parseFloat(p.dataset.drift);
    const startRot = parseFloat(p.dataset.rot);
    const start = performance.now();
    const startTop = parseFloat(p.style.top);
    function step(now) {
      const t = (now - start) / dur;
      if (t >= 1) { reset(p, false); requestAnimationFrame(() => fall(p)); return; }
      const y = startTop + t * (110 - startTop);
      const x = Math.sin(t * Math.PI * 2) * drift;
      p.style.transform = `translate(${x}px, ${y}vh) rotate(${startRot + t * 360}deg)`;
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
}

/* ---------------------------------------------------------
   9. Pixel cat companion
   --------------------------------------------------------- */
function initCat() {
  const cat = $("#cat");
  if (!cat) return;

  // Pixel cat as an SVG rect grid (crisp, lightweight, animatable).
  // Body group + separate tail group (animated) + eyes (blink).
  cat.insertAdjacentHTML("beforeend", `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A small pixel cat">
      <g fill="var(--lavender)">
        <!-- ears -->
        <rect x="14" y="14" width="6" height="6"/><rect x="34" y="14" width="6" height="6"/>
        <!-- head/body -->
        <rect x="12" y="20" width="32" height="24" rx="2"/>
      </g>
      <!-- inner ears -->
      <rect x="16" y="16" width="2" height="2" fill="var(--accent)"/>
      <rect x="36" y="16" width="2" height="2" fill="var(--accent)"/>
      <!-- eyes -->
      <rect class="cat-eye" x="20" y="28" width="4" height="5" rx="1" fill="#2F3142"/>
      <rect class="cat-eye" x="32" y="28" width="4" height="5" rx="1" fill="#2F3142"/>
      <!-- nose -->
      <rect x="27" y="34" width="2" height="2" fill="#D98CA6"/>
      <!-- paws -->
      <rect x="16" y="44" width="6" height="4" fill="var(--lavender)"/>
      <rect x="34" y="44" width="6" height="4" fill="var(--lavender)"/>
      <!-- tail (animated group) -->
      <g class="cat-tail" fill="var(--pastel-blue)">
        <rect x="44" y="30" width="5" height="5"/>
        <rect x="48" y="34" width="5" height="5"/>
        <rect x="50" y="39" width="5" height="5"/>
      </g>
    </svg>`);

  const tooltip = $("#catTooltip");
  let walkX = 0;

  function blink() {
    cat.classList.add("is-blink");
    setTimeout(() => cat.classList.remove("is-blink"), 160);
  }
  function stretch() {
    cat.classList.add("is-stretch");
    setTimeout(() => cat.classList.remove("is-stretch"), 700);
  }
  function walk() {
    walkX += (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 20);
    walkX = Math.max(0, Math.min(walkX, Math.min(140, window.innerWidth * 0.3)));
    cat.style.transform = `translateX(${walkX}px)`;
    setTimeout(() => { cat.style.transform = `translateX(${walkX}px)`; }, 50);
  }
  function speak() {
    if (!tooltip) return;
    tooltip.textContent = CONFIG.catTooltips[Math.floor(Math.random() * CONFIG.catTooltips.length)];
    tooltip.classList.add("is-show");
    setTimeout(() => tooltip.classList.remove("is-show"), 3200);
  }

  // idle loop: every 15–30s do something gentle
  function loop() {
    const delay = 15000 + Math.random() * 15000;
    setTimeout(() => {
      const roll = Math.random();
      if (roll < 0.45) blink();
      else if (roll < 0.7) stretch();
      else if (roll < 0.9) walk();
      else speak();
      loop();
    }, delay);
  }

  // a casual blink rhythm independent of the main loop
  function blinkLoop() {
    setTimeout(() => { if (!prefersReduced) blink(); blinkLoop(); }, 4000 + Math.random() * 4000);
  }

  if (!prefersReduced) { loop(); blinkLoop(); }
  // a friendly hello shortly after load
  setTimeout(speak, 6000);
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  renderLearning();
  renderNotes();
  renderProjects();
  initTheme();
  initNav();
  initScrollProgress();
  initReveal();
  initParticles();
  initPetals();
  initCat();
});
