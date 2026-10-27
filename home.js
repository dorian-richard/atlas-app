/* ATLAS website — the globe, the stamps, the route, the iPhone Duo. No framework; d3-geo draws the globe. */
(() => {
  "use strict";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  // ---------- Languages ----------
  const FR = {
    "nav.passport": "Passeport", "nav.features": "Fonctionnalités", "nav.privacy": "Confidentialité",
    "hero.overline": "Votre vie, explorée",
    "hero.title": "Chaque voyage laisse une&nbsp;trace.",
    "hero.lede": "ATLAS lit les dates et les lieux de vos photos et en fait un globe vivant, des voyages reconstitués pour vous et un passeport de tampons originaux — en privé, sur votre iPhone.",
    "cta.soon": "Bientôt disponible sur l’", "cta.get": "Télécharger dans l’", "cta.price": "2,99 € · un seul achat, sans abonnement ni pub",
    "hero.hint": "Faites tourner le globe — les pays dorés sont un atlas de démo",
    "pass.overline": "Passeport des découvertes",
    "pass.title": "Un tampon pour chaque pays vraiment exploré.",
    "pass.body": "Pas de check-in, pas de liste à remplir. ATLAS retrouve vos pays dans vos photos — et c’est vous qui pressez chaque tampon original dans votre passeport.",
    "pass.button": "Tamponner", "pass.entries": "Entrées",
    "feat.overline": "Sur votre iPhone", "feat.title": "Vos photos contiennent déjà la carte.",
    "f1.title": "Votre monde, illuminé.",
    "f1.body": "Chaque pays exploré s’illumine d’or sur un globe 3D. Faites-le tourner, zoomez, passez à la carte ou au brouillard de guerre — et regardez-le se remplir, voyage après voyage.",
    "f2.title": "Vos voyages, reconstitués pour vous.",
    "f2.body": "ATLAS regroupe vos photos en voyages — dates, villes, monuments — et tout reste modifiable. Pendant que vous voyagez, le voyage s’écrit tout seul.",
    "f3.title": "Chaque pays, en détail.",
    "f3.body": "Villes, photos, monuments et les jours que vous y avez vraiment passés — pays par pays, ville par ville.",
    "f4.title": "Voyagez dans le temps.",
    "f4.body": "La Time Machine rejoue votre vie année après année pendant que le globe s’illumine. Partagez l’année qui a tout changé.",
    "f5.title": "Laissez des messages dans le monde.",
    "f5.body": "Cachez un texte, une photo, un mémo vocal ou une vidéo dans un lieu. Il ne s’ouvre que pour les personnes choisies — une fois sur place. Même des années plus tard.",
    "f6.title": "Un passeport qui donne envie.",
    "f6.body": "Des tampons originaux pour chaque pays, des succès gagnés par de vraies découvertes, votre ADN de voyageur — jamais par des séries quotidiennes.",
    "duo.overline": "Pensé pour l’iPhone Duo",
    "duo.title": "Fermé, c’est votre passeport. Ouvert, c’est votre atlas.",
    "duo.body": "Fermé, ATLAS affiche la couverture de votre passeport — ou le globe, au choix. Dépliez votre iPhone : la couverture tourne sur la charnière et s’ouvre sur votre atlas, le globe sur la page de gauche, votre monde sur celle de droite. Puis tournez les pages du passeport comme un livre.",
    "duo.closed": "Fermé", "duo.open": "Ouvert",
    "t.cover": "Couverture", "t.globe": "Globe", "t.book": "Passeport", "t.launch": "Lancement", "t.atlas": "Atlas",
    "t.collection": "Collection", "t.explore": "Explorer", "t.journeys": "Voyages",
    "priv.overline": "La confidentialité d’abord", "priv.title": "Vos souvenirs restent les vôtres.",
    "p1.title": "Analysé sur cet iPhone", "p1.body": "Lieux, voyages et paysages sont calculés sur votre appareil.",
    "p2.title": "Vous choisissez ce qu’ATLAS voit", "p2.body": "Toutes vos photos, une sélection, ou aucune — vous pouvez ajouter vos voyages à la main.",
    "p3.title": "Jamais envoyé", "p3.body": "Votre photothèque ne quitte jamais votre iPhone. Pas de compte requis, pas de pub, pas de pistage.",
    "p4.title": "Effaçable à tout moment", "p4.body": "Supprimez tout ce qu’ATLAS a créé en un geste. Vos photos ne sont jamais modifiées.",
    "priv.note": "Messages est optionnel — c’est la seule partie d’ATLAS qui utilise un serveur, et seulement si vous vous connectez. Lire la <a href=\"privacy.html#fr\">politique de confidentialité</a>.",
    "fin.label": "Passeport des découvertes", "fin.title": "Votre passeport vous attend.",
    "foot.privacy": "Confidentialité", "foot.with": "Créé avec", "foot.by": "par", "foot.in": "à Paris",
  };
  const CAPTIONS = {
    en: {
      "cap.cover": "Closed: your passport’s cover. Tap it and the booklet opens, full screen — the globe is in the side bar, under the time.",
      "cap.globe": "Or the globe, if you prefer — its tools sit in the side bar, right under the Wi-Fi.",
      "cap.book": "The passport, full screen: turn its pages like a book.",
      "cap.tm": "The Time Machine, made to fit the outer screen.",
      "cap.launch": "Even the launch screen is your passport — a little plane flies while ATLAS opens.",
      "cap.atlas": "Open: an atlas. The globe at night on the left page, “The World of” you on the right, a gilded spine on the fold.",
      "cap.openbook": "Two pages side by side, turned with the curl of a real book.",
      "cap.collection": "Your stamp collection, continent by continent.",
      "cap.explore": "Achievements and messages, in two columns.",
      "cap.journeys": "All your journeys, year after year.",
    },
    fr: {
      "cap.cover": "Fermé : la couverture de votre passeport. Touchez-la, le livret s’ouvre en plein écran — le globe est dans la barre latérale, sous l’heure.",
      "cap.globe": "Ou le globe, si vous préférez — ses outils sont dans la barre latérale, juste sous le Wi-Fi.",
      "cap.book": "Le passeport en plein écran : on tourne ses pages comme un livre.",
      "cap.tm": "La Time Machine, ajustée à l’écran extérieur.",
      "cap.launch": "Même l’écran de lancement est votre passeport — un petit avion vole pendant qu’ATLAS s’ouvre.",
      "cap.atlas": "Ouvert : un atlas. Le globe de nuit sur la page de gauche, « The World of » vous sur la droite, une reliure dorée sur le pli.",
      "cap.openbook": "Deux pages côte à côte, tournées comme un vrai livre.",
      "cap.collection": "Votre collection de tampons, continent par continent.",
      "cap.explore": "Succès et messages, sur deux colonnes.",
      "cap.journeys": "Tous vos voyages, année après année.",
    },
  };
  const EN = { "cta.get": "Download on the" };
  $$("[data-i18n]").forEach((el) => { EN[el.dataset.i18n] = el.innerHTML; });
  let lang = "en";
  try { lang = localStorage.getItem("atlas.lang") || ""; } catch {}
  if (lang !== "en" && lang !== "fr") lang = (navigator.language || "en").toLowerCase().startsWith("fr") ? "fr" : "en";

  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.title = lang === "fr" ? "ATLAS — Votre vie, explorée" : "ATLAS — Your Life, Explored";
    $$("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === "fr" && FR[key] ? FR[key] : EN[key];
    });
    $$(".lang button").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    duo.caption();
    try { localStorage.setItem("atlas.lang", lang); } catch {}
  }
  $$(".lang button").forEach((b) => b.addEventListener("click", () => applyLanguage(b.dataset.lang)));

  // ---------- Reveal on scroll ----------
  const revealer = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealer.unobserve(e.target); } });
  }, { threshold: 0.15 });
  $$(".reveal").forEach((el) => revealer.observe(el));

  // ---------- Starfields (paused off screen) ----------
  function starfield(canvas, density) {
    const ctx = canvas.getContext("2d");
    let stars = [], w = 0, h = 0, visible = true, raf = 0;
    const dpr = Math.min(2, devicePixelRatio || 1);
    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      const n = Math.round((w * h) / 10000 * density);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + 0.25,
        a: Math.random() * 0.6 + 0.2, p: Math.random() * Math.PI * 2, s: Math.random() * 1.5 + 0.5 }));
      draw(performance.now());
    }
    function draw(t) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = reduceMotion ? s.a : s.a * (0.65 + 0.35 * Math.sin(t / 1000 * s.s + s.p));
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      }
    }
    function loop(t) { draw(t); if (visible && !reduceMotion) raf = requestAnimationFrame(loop); }
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
    }).observe(canvas);
    addEventListener("resize", resize);
    resize();
  }
  $$("canvas.stars").forEach((c) => starfield(c, 1.6));

  // ---------- The globe ----------
  // A demo atlas, like the app's Demo Mode: ISO numeric code → [name, French name, year of the first photo].
  const VISITED = {
    "250": ["France", "France", 2015], "352": ["Iceland", "Islande", 2016], "380": ["Italy", "Italie", 2017],
    "392": ["Japan", "Japon", 2018], "604": ["Peru", "Pérou", 2019], "724": ["Spain", "Espagne", 2019],
    "756": ["Switzerland", "Suisse", 2020], "578": ["Norway", "Norvège", 2021], "504": ["Morocco", "Maroc", 2022],
    "300": ["Greece", "Grèce", 2023], "840": ["United States", "États-Unis", 2025], "620": ["Portugal", "Portugal", 2026],
  };
  const CITIES = [[2.35, 48.86], [4.84, 45.76], [-9.14, 38.72], [-8.61, 41.15], [2.17, 41.39], [12.5, 41.9], [11.25, 43.77],
    [-21.9, 64.15], [10.75, 59.91], [-7.98, 31.63], [23.73, 37.98], [8.54, 47.37], [139.69, 35.69], [135.77, 35.01],
    [135.5, 34.69], [-71.97, -13.53], [-77.04, -12.05], [-122.42, 37.77], [-112.11, 36.1], [-74, 40.71]];

  function globe() {
    const canvas = $("canvas.globe"), tip = $(".globe-tip");
    if (!canvas || !window.d3 || !window.topojson) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, devicePixelRatio || 1);
    const projection = d3.geoOrthographic().clipAngle(90);
    const path = d3.geoPath(projection, ctx);
    const graticule = d3.geoGraticule10();
    let land, borders, visited = [], size = 0, radius = 0;
    let rotation = [-6, -32], velocity = [0, 0], dragging = null, lastInteraction = 0;
    let reveal = reduceMotion ? 1 : 0, revealStart = 0, visible = true, raf = 0;

    function resize() {
      size = canvas.clientWidth;
      canvas.width = canvas.height = size * dpr;
      radius = size * 0.42;
      projection.scale(radius).translate([size / 2, size / 2]);
    }

    function frame(t) {
      if (!dragging && !reduceMotion) {
        const idle = t - lastInteraction > 1800;
        velocity = velocity.map((v) => v * 0.94);
        rotation[0] += velocity[0] + (idle ? 0.08 : 0);
        rotation[1] = Math.max(-70, Math.min(70, rotation[1] + velocity[1]));
      }
      if (land && reveal < 1) {
        if (!revealStart) revealStart = t + 500;
        reveal = Math.max(0, Math.min(1, (t - revealStart) / 2600));
      }
      draw(t);
      if (visible && !reduceMotion) raf = requestAnimationFrame(frame);
    }

    function draw(t) {
      projection.rotate(rotation);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      const c = size / 2;
      // Atmosphere
      let g = ctx.createRadialGradient(c, c, radius * 0.92, c, c, radius * 1.22);
      g.addColorStop(0, "rgba(111,169,207,0.32)"); g.addColorStop(1, "rgba(111,169,207,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c, c, radius * 1.22, 0, Math.PI * 2); ctx.fill();
      // Ocean
      g = ctx.createRadialGradient(c - radius * 0.35, c - radius * 0.4, radius * 0.1, c, c, radius);
      g.addColorStop(0, "#1B355A"); g.addColorStop(0.55, "#0E2240"); g.addColorStop(1, "#060F1F");
      ctx.fillStyle = g; ctx.beginPath(); path({ type: "Sphere" }); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 0.7; ctx.beginPath(); path(graticule); ctx.stroke();
      if (land) {
        ctx.fillStyle = "#2B3D57"; ctx.beginPath(); path(land); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.10)"; ctx.lineWidth = 0.6; ctx.beginPath(); path(borders); ctx.stroke();
        // The discoveries light up one after the other, in the order they were made.
        visited.forEach((f, i) => {
          const a = Math.max(0, Math.min(1, reveal * visited.length - i));
          if (a <= 0) return;
          ctx.save();
          ctx.shadowColor = "rgba(232,207,152,0.55)"; ctx.shadowBlur = 14;
          ctx.fillStyle = `rgba(227,199,143,${0.92 * a})`; ctx.beginPath(); path(f); ctx.fill();
          ctx.restore();
        });
        // Cities, twinkling — only on the visible side.
        const centre = [-rotation[0], -rotation[1]];
        CITIES.forEach(([lon, lat], i) => {
          if (d3.geoDistance([lon, lat], centre) > Math.PI / 2 - 0.05 || reveal < 0.6) return;
          const [x, y] = projection([lon, lat]);
          const tw = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(t / 420 + i * 1.7);
          ctx.fillStyle = `rgba(255,248,230,${0.95 * tw})`;
          ctx.beginPath(); ctx.arc(x, y, 1.9, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(232,207,152,${0.22 * tw})`;
          ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
        });
      }
      // Light from the upper left, night on the lower right.
      g = ctx.createRadialGradient(c - radius * 0.45, c - radius * 0.5, radius * 0.2, c, c, radius * 1.05);
      g.addColorStop(0, "rgba(255,255,255,0.06)"); g.addColorStop(0.6, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = g; ctx.beginPath(); path({ type: "Sphere" }); ctx.fill();
      ctx.strokeStyle = "rgba(111,169,207,0.35)"; ctx.lineWidth = 1; ctx.beginPath(); path({ type: "Sphere" }); ctx.stroke();
    }

    function start() { cancelAnimationFrame(raf); if (reduceMotion) draw(0); else raf = requestAnimationFrame(frame); }

    // Drag to turn, with a little inertia.
    canvas.addEventListener("pointerdown", (e) => {
      dragging = { x: e.clientX, y: e.clientY, r: rotation.slice() };
      velocity = [0, 0];
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add("dragging");
      tip.hidden = true;
    });
    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      if (dragging) {
        const k = 90 / radius;
        const prev = rotation.slice();
        rotation = [dragging.r[0] + (e.clientX - dragging.x) * k, Math.max(-70, Math.min(70, dragging.r[1] - (e.clientY - dragging.y) * k))];
        velocity = [rotation[0] - prev[0], rotation[1] - prev[1]];
        lastInteraction = performance.now();
        if (reduceMotion) draw(0);
        return;
      }
      // Hover: which discovery is under the pointer?
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const coord = projection.invert([x, y]);
      const centre = [-rotation[0], -rotation[1]];
      const hit = coord && d3.geoDistance(coord, centre) < Math.PI / 2 && reveal > 0.9
        ? visited.find((f) => d3.geoContains(f, coord)) : null;
      if (hit) {
        const [en, fr, year] = VISITED[hit.id];
        tip.innerHTML = `${lang === "fr" ? fr : en}<small>${lang === "fr" ? "dans vos photos depuis" : "in your photos since"} ${year}</small>`;
        tip.style.left = `${x}px`; tip.style.top = `${y}px`;
        tip.hidden = false;
      } else {
        tip.hidden = true;
      }
    });
    const end = () => { if (!dragging) return; dragging = null; lastInteraction = performance.now(); canvas.classList.remove("dragging"); };
    canvas.addEventListener("pointerup", end);
    canvas.addEventListener("pointercancel", end);
    canvas.addEventListener("pointerleave", () => { tip.hidden = true; });

    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else cancelAnimationFrame(raf); }).observe(canvas);
    addEventListener("resize", () => { resize(); draw(performance.now()); });
    resize();
    start();

    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json")
      .then((r) => r.json())
      .then((world) => {
        land = topojson.feature(world, world.objects.land);
        borders = topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
        visited = topojson.feature(world, world.objects.countries).features
          .filter((f) => VISITED[f.id])
          .sort((a, b) => VISITED[a.id][2] - VISITED[b.id][2]);
        if (reduceMotion) draw(0);
      })
      .catch(() => {});
  }
  globe();

  // ---------- Stamps ----------
  const page = $(".page");
  function stamp(slot, byHand = false) {
    if (!slot || slot.classList.contains("stamped")) return;
    slot.classList.add("stamped");
    page.classList.remove("thud"); void page.offsetWidth; page.classList.add("thud");
    if (byHand && navigator.vibrate) navigator.vibrate(12);
  }
  const slots = $$(".slot");
  slots.forEach((s) => s.addEventListener("click", () => stamp(s, true)));
  function stampAll() { slots.filter((s) => !s.classList.contains("stamped")).forEach((s, i) => setTimeout(() => stamp(s), i * 320)); }
  $("#stampAll").addEventListener("click", () => {
    if (slots.every((s) => s.classList.contains("stamped"))) { slots.forEach((s) => s.classList.remove("stamped")); setTimeout(stampAll, 250); }
    else stampAll();
  });
  new IntersectionObserver(([e], obs) => { if (e.isIntersecting) { setTimeout(stampAll, 500); obs.disconnect(); } }, { threshold: 0.6 }).observe(page);

  // ---------- The route: a plane flies it as you scroll ----------
  (() => {
    const route = $(".route"), pathEl = $("#routePath"), dotsBox = $(".route-dots"), plane = $(".route .plane");
    const length = pathEl.getTotalLength(), N = 70;
    const dots = Array.from({ length: N }, (_, i) => {
      const p = pathEl.getPointAtLength((i / (N - 1)) * length);
      const d = document.createElement("i");
      d.style.left = `${(p.x / 1200) * 100}%`; d.style.top = `${(p.y / 160) * 100}%`;
      dotsBox.appendChild(d);
      return d;
    });
    function update() {
      const rect = route.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      const at = Math.min(length - 1, progress * length);
      const p = pathEl.getPointAtLength(at), q = pathEl.getPointAtLength(Math.min(length, at + 2));
      const w = rect.width, h = rect.height;
      const angle = Math.atan2((q.y - p.y) * (h / 160), (q.x - p.x) * (w / 1200));
      plane.style.left = `${(p.x / 1200) * w}px`; plane.style.top = `${(p.y / 160) * h}px`;
      plane.style.transform = `rotate(${angle}rad)`;
      dots.forEach((d, i) => d.classList.toggle("flown", i / (N - 1) <= progress));
    }
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    update();
  })();

  // ---------- Features: the iPhone follows the chapter on screen ----------
  const shots = $$(".iphone .shot");
  const chapters = $$(".chapter");
  const chapterObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const key = e.target.dataset.shot;
      chapters.forEach((c) => c.classList.toggle("active", c === e.target));
      shots.forEach((s) => s.classList.toggle("active", s.dataset.shot === key));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  chapters.forEach((c) => chapterObserver.observe(c));

  // ---------- iPhone Duo: fold, unfold ----------
  const duo = (() => {
    const stage = $(".duo-stage"), captionEl = $(".duo-caption");
    const closedImg = $(".duo-closed-img"), openImg = $(".duo-open-img");
    const groups = { closed: $('.thumbs[data-for="closed"]'), open: $('.thumbs[data-for="open"]') };
    let captionKey = "cap.cover";
    function caption() { if (captionEl) captionEl.textContent = CAPTIONS[lang][captionKey] || ""; }
    function setState(state) {
      stage.dataset.state = state;
      $$(".seg").forEach((b) => b.classList.toggle("active", b.dataset.fold === state));
      Object.entries(groups).forEach(([k, g]) => { g.hidden = k !== state; });
      const active = $(".thumb.active", groups[state]);
      captionKey = active ? active.dataset.cap : captionKey;
      caption();
    }
    $$(".seg").forEach((b) => b.addEventListener("click", () => setState(b.dataset.fold)));
    stage.addEventListener("click", () => { if (stage.dataset.state === "closed") setState("open"); });
    Object.entries(groups).forEach(([state, g]) => {
      $$(".thumb", g).forEach((t) => t.addEventListener("click", () => {
        $$(".thumb", g).forEach((x) => x.classList.toggle("active", x === t));
        const img = state === "closed" ? closedImg : openImg;
        img.style.opacity = 0;
        setTimeout(() => { img.src = `img/${t.dataset.img}.webp`; img.onload = () => { img.style.opacity = 1; }; }, 160);
        captionKey = t.dataset.cap;
        caption();
      }));
    });
    // The first time it comes into view, it unfolds by itself — like opening the passport.
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      if (!reduceMotion) setTimeout(() => { if (stage.dataset.state === "closed") setState("open"); }, 1400);
    }, { threshold: 0.6 }).observe(stage);
    return { caption };
  })();

  // ---------- App Store: the badge becomes a link the day ATLAS is out (Apple's lookup, JSONP) ----------
  const APP_URL = "https://apps.apple.com/app/id6823246669";
  window.atlasLookup = (result) => {
    if (!result || !result.resultCount) return;
    $$(".store").forEach((badge) => {
      const link = document.createElement("a");
      link.className = "store"; link.href = APP_URL; link.rel = "noopener";
      link.innerHTML = badge.innerHTML;
      badge.replaceWith(link);
    });
    $$('.store-small[data-i18n="cta.soon"]').forEach((el) => { el.dataset.i18n = "cta.get"; });
    applyLanguage(lang);
  };
  const lookup = document.createElement("script");
  lookup.src = `https://itunes.apple.com/lookup?id=6823246669&country=${lang === "fr" ? "fr" : "us"}&callback=atlasLookup`;
  lookup.async = true;
  document.body.appendChild(lookup);

  applyLanguage(lang);
})();
