/* =========================
   script.js
   ========================= */

/* ====== CAMBIAR EL VIDEO DE YOUTUBE AQUÍ ======
   Si prefieres cambiarlo desde JS, usa:
   const VIDEO_ID = "XXXXXXXXXXX";
   Y asigna al iframe.
   Por defecto se toma del HTML: <div class="video" data-video-id="...">
*/
(function () {
  "use strict";

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = document.querySelector(".nav__toggle");
  const menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // YouTube embed (from data-video-id)
  const videoWrap = document.querySelector(".video");
  const iframe = videoWrap ? videoWrap.querySelector("iframe") : null;

  if (videoWrap && iframe) {
    const id = videoWrap.getAttribute("data-video-id") || "";
    // Use a privacy-enhanced domain
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1&playsinline=1`;
  }

  // Copy video link button
  const copyBtn = document.getElementById("copyVideoLink");
  if (copyBtn && videoWrap) {
    copyBtn.addEventListener("click", async () => {
      const id = videoWrap.getAttribute("data-video-id") || "";
      const url = `https://www.youtube.com/watch?v=${id}`;

      try {
        await navigator.clipboard.writeText(url);
        copyBtn.textContent = "Copiado ✅";
        setTimeout(() => (copyBtn.textContent = "Copiar link"), 1200);
      } catch {
        copyBtn.textContent = "No se pudo 😅";
        setTimeout(() => (copyBtn.textContent = "Copiar link"), 1200);
      }
    });
  }

  // Simple contact form validation (client-side)
  const form = document.getElementById("contactForm");
  const hint = document.getElementById("formHint");

  if (form && hint) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");

      const missing = [];
      if (!name.value.trim()) missing.push("Nombre");
      if (!email.value.trim()) missing.push("Email");
      if (!message.value.trim()) missing.push("Mensaje");

      if (missing.length) {
        hint.textContent = `Faltan campos: ${missing.join(", ")}.`;
        return;
      }

      // NOTE: Aquí puedes integrar un endpoint (Formspree, Netlify Forms, tu API, etc.)
      hint.textContent = "Listo ✅ Tu mensaje está preparado. (Integra un endpoint para enviarlo.)";
      form.reset();
    });
  }
})();
