/* ════════════════════════════════════════════════════════
   ANC Education — Student Portal  |  script.js
   ════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  /* ── Helpers ── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ══════════════════════════════════════════════════════
     USER PROFILE DROPDOWN
     ══════════════════════════════════════════════════════ */
  const userMenuBtn  = $("#userMenuBtn");
  const userDropdown = $("#userDropdown");
  const overlay      = $("#overlay");

  function closeAll() {
    $$("#userDropdown, .notif-panel, .nav-dropdown").forEach(el => el.classList.remove("open"));
    $$(".nav-item").forEach(el => el.classList.remove("open"));
    $$(".nav-link").forEach(el => el.classList.remove("open"));
    userMenuBtn?.classList.remove("open");
    overlay.classList.remove("active");
  }

  userMenuBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = userDropdown.classList.contains("open");
    closeAll();
    if (!isOpen) {
      userDropdown.classList.add("open");
      userMenuBtn.classList.add("open");
      overlay.classList.add("active");
    }
  });

  /* ══════════════════════════════════════════════════════
     NOTIFICATION PANEL
     ══════════════════════════════════════════════════════ */
  const notifBtn   = $("#notifBtn");
  const notifPanel = $("#notifPanel");

  notifBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = notifPanel.classList.contains("open");
    closeAll();
    if (!isOpen) {
      notifPanel.classList.add("open");
      overlay.classList.add("active");
    }
  });

  /* Mark all read */
  $(".mark-all-read")?.addEventListener("click", () => {
    $$(".notif-item.unread").forEach(el => el.classList.remove("unread"));
    const badge = $(".badge");
    if (badge) badge.style.display = "none";
  });

  /* ══════════════════════════════════════════════════════
     NAV DROPDOWNS
     ══════════════════════════════════════════════════════ */
  $$(".nav-item.has-dropdown").forEach(item => {
    const btn      = $(".nav-link", item);
    const dropdown = $(".nav-dropdown", item);

    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open");
      closeAll();
      if (!isOpen) {
        dropdown.classList.add("open");
        item.classList.add("open");
        overlay.classList.add("active");
      }
    });
  });

  /* ══════════════════════════════════════════════════════
     OVERLAY / OUTSIDE CLICK — closes everything
     ══════════════════════════════════════════════════════ */
  overlay.addEventListener("click", closeAll);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
  });

  /* ══════════════════════════════════════════════════════
     ACTIVE NAV HIGHLIGHT
     ══════════════════════════════════════════════════════ */
  $$(".nav-link").forEach(link => {
    link.addEventListener("click", function () {
      $$(".nav-link").forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  /* ══════════════════════════════════════════════════════
     GREETING — time-of-day
     ══════════════════════════════════════════════════════ */
  const greetingTitle = $(".greeting-title");
  if (greetingTitle) {
    const hour = new Date().getHours();
    const name = "Sandali";
    let timeGreet = "Good morning";
    if (hour >= 12 && hour < 17) timeGreet = "Good afternoon";
    else if (hour >= 17) timeGreet = "Good evening";
    greetingTitle.textContent = `${timeGreet}, ${name} 👋`;
  }

  /* ══════════════════════════════════════════════════════
     LIVE DATE in greeting bar
     ══════════════════════════════════════════════════════ */
  const greetingSub = $(".greeting-sub");
  if (greetingSub) {
    const now   = new Date();
    const days  = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const dayStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    greetingSub.textContent = `Semester SEM2024  ·  ${dayStr}`;
  }

  /* ══════════════════════════════════════════════════════
     QUICK CARD — ripple effect on click
     ══════════════════════════════════════════════════════ */
  $$(".quick-card").forEach(card => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        width:${size}px; height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(245,166,35,.25);
        transform:scale(0); animation:ripple .5s linear;
        pointer-events:none;
      `;
      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });
  });

  /* Inject ripple keyframe */
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

})();
