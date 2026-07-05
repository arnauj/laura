/* ============================================================
   EF EN CASA · Aplicación (SPA con rutas por hash)
   Rutas:
     #/                        → inicio
     #/temporalizacion         → línea del tiempo del curso
     #/unidades                → todas las unidades
     #/unidad/up1              → detalle de unidad
     #/unidad/up1/a1           → detalle de actividad
     #/metodo                  → Merrill + Gardner
   ============================================================ */

const app = document.getElementById("app");

/* ---------- Progreso (localStorage) ---------- */
const STORE_KEY = "efencasa-progreso";
const getProgress = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; } };
const isDone = (uid, aid) => !!getProgress()[`${uid}/${aid}`];
const toggleDone = (uid, aid) => {
  const p = getProgress();
  const k = `${uid}/${aid}`;
  if (p[k]) delete p[k]; else p[k] = true;
  localStorage.setItem(STORE_KEY, JSON.stringify(p));
};
const unitDone = (u) => u.actividades.filter(a => isDone(u.id, a.id)).length;

/* ---------- Utilidades ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const intelPills = (keys) => keys.map(k => {
  const i = INTELIGENCIAS[k];
  return `<span class="intel-pill" style="border-color:${i.color};color:${i.color}" title="${esc(i.desc)}">${i.emoji} ${esc(i.nombre)}</span>`;
}).join("");

const faseBadge = (key, cls = "act-fase-badge") => {
  const f = FASES[key];
  return `<span class="${cls}" style="background:${f.color}">${f.emoji} ${esc(f.nombre)}</span>`;
};

const TRIMESTRES = {
  1: { nombre: "1er Trimestre", emoji: "🍂", periodo: "septiembre – diciembre", color: "#f97316" },
  2: { nombre: "2º Trimestre",  emoji: "❄️", periodo: "enero – marzo",          color: "#0ea5e9" },
  3: { nombre: "3er Trimestre", emoji: "🌸", periodo: "abril – junio",           color: "#22c55e" },
};

/* ---------- Componentes ---------- */
function unitCard(u, delayClass = "") {
  const done = unitDone(u);
  const total = u.actividades.length;
  const pct = Math.round(done / total * 100);
  return `
  <a href="#/unidad/${u.id}" class="unit-card reveal ${delayClass}">
    <div class="unit-card-top" style="background:linear-gradient(135deg,${u.color},${u.color2})">
      <span class="up-num">UP ${u.num} · SA ${u.num}</span>
      <span class="emoji">${u.emoji}</span>
      <h3>${esc(u.titulo)}</h3>
    </div>
    <div class="unit-card-body">
      <div class="unit-meta">
        <span>📅 ${esc(u.fechas)}</span>
        <span>🗓️ ${u.sesiones} sesiones</span>
        <span>${TRIMESTRES[u.trimestre].emoji} ${TRIMESTRES[u.trimestre].nombre}</span>
      </div>
      <p>${esc(u.tagline)}</p>
      <div class="unit-progress">
        <div class="bar"><i style="width:${pct}%;background:linear-gradient(90deg,${u.color},${u.color2})"></i></div>
        <small>${done}/${total} ✔</small>
      </div>
    </div>
  </a>`;
}

function actCard(u, a, idx) {
  const done = isDone(u.id, a.id);
  return `
  <a href="#/unidad/${u.id}/${a.id}" class="act-card reveal reveal-d${(idx % 4) + 1}">
    <div class="act-thumb">
      <img src="${ytThumb(a.video)}" alt="" loading="lazy">
      ${faseBadge(a.fase)}
      ${done ? `<span class="act-done-badge">✔ Completada</span>` : ""}
      <span class="play"><i>▶</i></span>
    </div>
    <div class="act-card-body">
      <h3>${idx + 1}. ${esc(a.titulo)}</h3>
      <p>${esc(a.desc.slice(0, 110))}…</p>
      <div class="intel-row">${intelPills(a.inteligencias)}</div>
    </div>
  </a>`;
}

/* ---------- Vistas ---------- */
function viewHome() {
  const floats = [
    ["⚽", "8%", "18%"], ["🏀", "88%", "22%"], ["🤸", "12%", "72%"],
    ["🥇", "90%", "70%"], ["🎯", "78%", "8%"], ["🌋", "20%", "8%"],
  ].map(([e, l, t], i) => `<span class="float" style="left:${l};top:${t};animation-delay:${i * .8}s">${e}</span>`).join("");

  return `
  <section class="hero">
    ${floats}
    <div class="wrap hero-inner">
      <span class="kicker pop">Educación Física · Modo no presencial</span>
      <h1>Tu gimnasio está donde tú estés.<br><span class="grad">¡EF en casa!</span></h1>
      <p class="lead">Aula virtual de Educación Física para 5º de Primaria. Nueve aventuras, un curso entero de movimiento, salud y cultura canaria… sin salir de casa. 🌋</p>
      <div class="teacher">
        <span class="avatar">L</span>
        <span>Maestra: <b>Laura de los Ángeles Hernández Sierra</b> · Curso 2025-2026</span>
      </div>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#/unidades">🚀 Empezar a entrenar</a>
        <a class="btn btn-ghost" href="#/temporalizacion">📅 Ver temporalización</a>
      </div>
      <div class="hero-stats">
        <div class="stat reveal"><b>9</b><span>Unidades</span></div>
        <div class="stat reveal reveal-d1"><b>54</b><span>Actividades</span></div>
        <div class="stat reveal reveal-d2"><b>3</b><span>Trimestres</span></div>
        <div class="stat reveal reveal-d3"><b>103</b><span>Sesiones</span></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">El curso de un vistazo</span>
        <h2>Las 9 Unidades Didácticas</h2>
        <p>Cada unidad es una misión con su reto final. Dentro encontrarás las actividades, los vídeos y lo que tienes que entregar en Classroom.</p>
      </div>
      <div class="units-grid">
        ${UNIDADES.map((u, i) => unitCard(u, `reveal-d${(i % 3) + 1}`)).join("")}
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Nuestra forma de aprender</span>
        <h2>Actividades pensadas para ti</h2>
        <p>Seguimos la secuencia de M. David Merrill (activar → observar → practicar → integrar) y la teoría de las Inteligencias Múltiples de Howard Gardner: hay un camino para cada forma de aprender.</p>
      </div>
      <div class="merrill-flow reveal">
        ${METODO.merrill.fases.map(k => {
          const f = FASES[k];
          return `<div class="merrill-step">
            <div class="ms-circle" style="background:${f.color}">${f.emoji}</div>
            <b>${esc(f.nombre)}</b><small>${esc(f.desc)}</small>
          </div>`;
        }).join("")}
      </div>
      <div style="text-align:center;margin-top:28px" class="reveal">
        <a class="btn btn-ghost" href="#/metodo">🧠 Descubre cómo aprendemos</a>
      </div>
    </div>
  </section>`;
}

function viewTemporalizacion() {
  const blocks = [1, 2, 3].map(t => {
    const tri = TRIMESTRES[t];
    const ups = UNIDADES.filter(u => u.trimestre === t);
    return `
    <div class="tri-block reveal">
      <div class="tri-title">
        <span class="dot" style="background:${tri.color}">${t}º</span>
        <span>${tri.emoji} ${tri.nombre} <small style="color:var(--ink-soft);font-weight:700;font-size:.85rem"> · ${tri.periodo}</small></span>
      </div>
      <div class="timeline">
        ${ups.map(u => `
        <div class="tl-item" style="--tl-color:${u.color}">
          <a class="tl-card" href="#/unidad/${u.id}">
            <span class="emoji">${u.emoji}</span>
            <span class="tl-info">
              <b>UP ${u.num} · ${esc(u.titulo)}</b>
              <small>${esc(u.fechas)}</small>
            </span>
            <span class="tl-tags">
              <span>SA ${u.num}</span>
              <span>${u.sesiones} sesiones</span>
            </span>
          </a>
        </div>`).join("")}
      </div>
    </div>`;
  }).join("");

  return `
  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Curso 2025-2026</span>
        <h2>📅 Temporalización</h2>
        <p>Así se distribuyen las 9 Unidades de Programación y sus Situaciones de Aprendizaje a lo largo del curso. Toca cualquier unidad para entrar.</p>
      </div>
      ${blocks}
    </div>
  </section>`;
}

function viewUnidades() {
  return `
  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Elige tu misión</span>
        <h2>🎒 Unidades Didácticas</h2>
        <p>Nueve unidades, nueve retos. Tu progreso se guarda en este dispositivo: cada actividad completada suma en la barra de la unidad.</p>
      </div>
      <div class="units-grid">
        ${UNIDADES.map((u, i) => unitCard(u, `reveal-d${(i % 3) + 1}`)).join("")}
      </div>
    </div>
  </section>`;
}

function viewUnidad(u) {
  const tri = TRIMESTRES[u.trimestre];
  return `
  <section class="unit-hero" style="background:linear-gradient(135deg,${u.color},${u.color2})">
    <div class="wrap">
      <div class="crumbs"><a href="#/unidades">Unidades</a> / UP ${u.num}</div>
      <span class="emoji-big">${u.emoji}</span>
      <h1>UP ${u.num} · ${esc(u.titulo)}</h1>
      <p class="tag">${esc(u.tagline)}</p>
      <div class="unit-meta">
        <span>📅 ${esc(u.fechas)}</span>
        <span>🗓️ ${u.sesiones} sesiones</span>
        <span>${tri.emoji} ${tri.nombre}</span>
        <span>📘 SA ${u.num}</span>
      </div>
    </div>
  </section>

  <div class="wrap">
    <div class="reto-banner reveal">${esc(u.reto)}</div>

    <div class="unit-info-grid">
      <div class="info-card reveal">
        <h4>¿De qué va esta unidad?</h4>
        <p style="font-size:.9rem;font-weight:600;color:var(--ink-soft)">${esc(u.justificacion)}</p>
      </div>
      <div class="info-card reveal reveal-d1">
        <h4>Criterios de evaluación</h4>
        <ul>${u.criterios.map(c => `<li>${esc(c)}</li>`).join("")}</ul>
      </div>
      <div class="info-card reveal reveal-d2">
        <h4>Saberes básicos</h4>
        <ul>${u.saberes.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <div class="info-card prods reveal reveal-d3">
        <h4>Productos de evaluación</h4>
        <ul>${u.productos.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>
    </div>
  </div>

  <section class="section" style="padding-top:34px">
    <div class="wrap">
      <div class="section-head reveal" style="margin-bottom:8px">
        <h2>Actividades de la unidad</h2>
        <p>Sigue el orden: cada fase prepara la siguiente. 🔥→👀→💪→🚀</p>
      </div>
      <div class="fases-strip reveal">
        ${METODO.merrill.fases.map(k => {
          const f = FASES[k];
          const n = u.actividades.filter(a => a.fase === k).length;
          return `<div class="fase-chip"><span class="f-dot" style="background:${f.color}"></span>${f.emoji} ${esc(f.nombre)} <span style="color:var(--ink-soft)">×${n}</span></div>`;
        }).join("")}
      </div>
      <div class="acts-grid">
        ${u.actividades.map((a, i) => actCard(u, a, i)).join("")}
      </div>
    </div>
  </section>`;
}

function viewActividad(u, a) {
  const f = FASES[a.fase];
  const idx = u.actividades.findIndex(x => x.id === a.id);
  const prev = u.actividades[idx - 1];
  const next = u.actividades[idx + 1];
  const done = isDone(u.id, a.id);

  return `
  <section class="unit-hero" style="background:linear-gradient(135deg,${u.color},${u.color2});padding:34px 0 30px">
    <div class="wrap">
      <div class="crumbs">
        <a href="#/unidades">Unidades</a> / <a href="#/unidad/${u.id}">UP ${u.num} · ${esc(u.titulo)}</a> / Actividad ${idx + 1}
      </div>
    </div>
  </section>

  <section class="act-page">
    <div class="wrap">
      <div class="act-layout">
        <div>
          <div class="video-box reveal">
            <div class="video-frame" id="videoFrame">
              <button class="video-lite" data-video="${a.video}" aria-label="Reproducir vídeo">
                <img src="${ytThumb(a.video)}" alt="Miniatura del vídeo">
                <span class="play-big"><i>▶</i></span>
              </button>
            </div>
            <div class="video-note">🎬 Vídeo de muestra (provisional): la maestra lo sustituirá por el vídeo definitivo de la actividad.</div>
          </div>

          <div class="panel reveal reveal-d1" style="margin-top:16px">
            <h3>📋 ¿Qué tienes que hacer?</h3>
            <ol class="pasos">${a.pasos.map(p => `<li>${esc(p)}</li>`).join("")}</ol>
          </div>

          <div class="panel entrega-panel reveal reveal-d2">
            <h3>📤 ¿Qué entrego en Classroom?</h3>
            <p>${esc(a.entrega)}</p>
          </div>
        </div>

        <div>
          <div class="act-detail reveal">
            <h1>${esc(a.titulo)}</h1>
            <div class="act-sub">
              <span class="badge-fase" style="background:${f.color}">${f.emoji} Fase: ${esc(f.nombre)}</span>
              <span class="badge-dur">⏱ ${esc(a.duracion)}</span>
            </div>
            <div class="fase-explain">
              <span class="fe-emoji">${f.emoji}</span>
              <span><b>${esc(f.nombre)}</b> (secuencia de Merrill): ${esc(f.desc)}</span>
            </div>
            <p class="desc">${esc(a.desc)}</p>

            <div class="panel">
              <h3>🧠 Inteligencias que entrenas</h3>
              <div class="intel-row" style="flex-direction:column;align-items:flex-start;gap:8px">
                ${a.inteligencias.map(k => {
                  const i = INTELIGENCIAS[k];
                  return `<span class="intel-pill" style="border-color:${i.color};color:${i.color}">${i.emoji} ${esc(i.nombre)}</span>
                          <small style="color:var(--ink-soft);font-weight:600;margin:-4px 0 4px 4px">${esc(i.desc)}</small>`;
                }).join("")}
              </div>
            </div>

            <button class="done-toggle ${done ? "done" : ""}" id="doneToggle">
              ${done ? "✅ ¡Actividad completada! (toca para desmarcar)" : "⬜ Marcar como completada"}
            </button>

            <div class="act-nav">
              ${prev ? `<a class="btn btn-ghost" href="#/unidad/${u.id}/${prev.id}">← Anterior</a>` : ""}
              <a class="btn btn-ghost" href="#/unidad/${u.id}">📚 Unidad</a>
              ${next ? `<a class="btn btn-primary" href="#/unidad/${u.id}/${next.id}">Siguiente →</a>` : `<a class="btn btn-primary" href="#/unidades">🏁 Otras unidades</a>`}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function viewMetodo() {
  return `
  <section class="section">
    <div class="wrap">
      <div class="section-head reveal">
        <span class="kicker">Pedagogía con fundamento</span>
        <h2>🧠 ¿Cómo aprendemos en EF en casa?</h2>
        <p>Este aula virtual no es una lista de deberes: cada actividad está diseñada con dos grandes referentes de la pedagogía.</p>
      </div>

      <div class="panel reveal">
        <h3>1️⃣ ${esc(METODO.merrill.titulo)}</h3>
        <p style="color:var(--ink-soft);font-weight:600">${esc(METODO.merrill.intro)}</p>
        <div class="merrill-flow">
          ${METODO.merrill.fases.map(k => {
            const f = FASES[k];
            return `<div class="merrill-step">
              <div class="ms-circle" style="background:${f.color}">${f.emoji}</div>
              <b>${esc(f.nombre)}</b><small>${esc(f.desc)}</small>
            </div>`;
          }).join("")}
        </div>
      </div>

      <div class="panel reveal reveal-d1" style="margin-top:22px">
        <h3>2️⃣ ${esc(METODO.gardner.titulo)}</h3>
        <p style="color:var(--ink-soft);font-weight:600">${esc(METODO.gardner.intro)}</p>
        <div class="metodo-grid">
          ${Object.entries(INTELIGENCIAS).map(([k, i], idx) => `
          <div class="metodo-card reveal reveal-d${(idx % 4) + 1}">
            <span class="m-emoji">${i.emoji}</span>
            <h3>${esc(i.nombre)}</h3>
            <p>${esc(i.desc)}</p>
            <div class="m-bar" style="background:${i.color}"></div>
          </div>`).join("")}
        </div>
      </div>

      <div style="text-align:center;margin-top:30px" class="reveal">
        <a class="btn btn-primary" href="#/unidades">🚀 ¡A entrenar!</a>
      </div>
    </div>
  </section>`;
}

function view404() {
  return `
  <section class="section" style="text-align:center">
    <div class="wrap">
      <div style="font-size:4rem">🤔</div>
      <h2 style="font-weight:900">Página no encontrada</h2>
      <p style="color:var(--ink-soft);margin:10px 0 24px">Parece que este balón se salió del campo…</p>
      <a class="btn btn-primary" href="#/">🏠 Volver al inicio</a>
    </div>
  </section>`;
}

/* ---------- Router ---------- */
function router() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const parts = hash.split("/").filter(Boolean); // ej: ["unidad","up1","a1"]
  let html, navKey = "home";

  if (parts.length === 0) {
    html = viewHome();
  } else if (parts[0] === "temporalizacion") {
    html = viewTemporalizacion(); navKey = "temporalizacion";
  } else if (parts[0] === "unidades") {
    html = viewUnidades(); navKey = "unidades";
  } else if (parts[0] === "metodo") {
    html = viewMetodo(); navKey = "metodo";
  } else if (parts[0] === "unidad" && parts[1]) {
    const u = UNIDADES.find(x => x.id === parts[1]);
    if (!u) { html = view404(); }
    else if (parts[2]) {
      const a = u.actividades.find(x => x.id === parts[2]);
      html = a ? viewActividad(u, a) : view404();
      navKey = "unidades";
    } else {
      html = viewUnidad(u); navKey = "unidades";
    }
  } else {
    html = view404();
  }

  app.innerHTML = html;
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  setActiveNav(navKey);
  bindPageEvents(parts);
  observeReveals();
  closeMobileMenu();
}

/* ---------- Eventos de página ---------- */
function bindPageEvents(parts) {
  // Carga diferida del vídeo (lite embed): el iframe solo se crea al tocar
  document.querySelectorAll(".video-lite").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.video;
      const frame = btn.parentElement;
      frame.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0"
        title="Vídeo de la actividad" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    });
  });

  // Botón de completar actividad
  const toggle = document.getElementById("doneToggle");
  if (toggle && parts[0] === "unidad" && parts[1] && parts[2]) {
    toggle.addEventListener("click", () => {
      toggleDone(parts[1], parts[2]);
      const done = isDone(parts[1], parts[2]);
      toggle.classList.toggle("done", done);
      toggle.innerHTML = done
        ? "✅ ¡Actividad completada! (toca para desmarcar)"
        : "⬜ Marcar como completada";
    });
  }
}

/* ---------- Nav ---------- */
const navLinks = document.getElementById("navLinks");
const navBurger = document.getElementById("navBurger");

function setActiveNav(key) {
  document.querySelectorAll(".nav-links a").forEach(a => {
    a.classList.toggle("active", a.dataset.nav === key);
  });
}
function closeMobileMenu() {
  navLinks.classList.remove("open");
  navBurger.classList.remove("open");
}
navBurger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navBurger.classList.toggle("open");
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMobileMenu();
});

/* ---------- Animaciones al hacer scroll ---------- */
let revealObserver;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add("visible");
        revealObserver.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

/* ---------- Arranque ---------- */
window.addEventListener("hashchange", router);
router();
