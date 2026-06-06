/* Light/dark toggle: a sun/moon that arcs over a hill (clockwise), with the
   moon drawn at the real current lunar phase from the device clock.
   Auto theme via prefers-color-scheme still works with JS off. */
(function () {
  "use strict";
  var root = document.documentElement;
  root.classList.add("js");

  // Apply a stored override before paint to avoid a flash of the wrong theme.
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  if (stored === "light" || stored === "dark")
    root.setAttribute("data-theme", stored);

  function effectiveTheme() {
    var t = root.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Moon phase in [0,1): 0 = new, 0.5 = full. Uses the device's local clock.
  function moonPhase(date) {
    var synodic = 29.530588853;
    var knownNew = Date.UTC(2000, 0, 6, 18, 14, 0) / 86400000; // days
    var now = date.getTime() / 86400000;
    var p = ((now - knownNew) / synodic) % 1;
    return p < 0 ? p + 1 : p;
  }

  // Narrow windows for the four instantaneous phases (new/quarters/full) so the
  // label matches the drawn illumination; the rest is crescent/gibbous.
  function phaseName(p) {
    if (p < 0.02 || p >= 0.98) return "New moon";
    if (p < 0.23) return "Waxing crescent";
    if (p < 0.27) return "First quarter";
    if (p < 0.48) return "Waxing gibbous";
    if (p < 0.52) return "Full moon";
    if (p < 0.73) return "Waning gibbous";
    if (p < 0.77) return "Last quarter";
    return "Waning crescent";
  }

  // SVG path for the lit portion of the moon (northern-hemisphere orientation).
  function moonLitPath(cx, cy, R, p) {
    var a = Math.cos(p * 2 * Math.PI); // +1 near new, -1 near full
    var rx = Math.abs(a) * R;
    var limb = p <= 0.5 ? 1 : 0; // waxing lights the right limb
    var term = a > 0 ? limb : 1 - limb;
    return (
      "M " + cx + " " + (cy - R) +
      " A " + R + " " + R + " 0 0 " + limb + " " + cx + " " + (cy + R) +
      " A " + rx.toFixed(3) + " " + R + " 0 0 " + term + " " + cx + " " + (cy - R) +
      " Z"
    );
  }

  var CX = 24,
    CY = 30,
    ORBIT = 18,
    SUN_Y = CY - ORBIT, // 12 (up)
    MOON_Y = CY + ORBIT; // 48 (home/down)

  function rays(cx, cy, n, inner, outer) {
    var s = "";
    for (var i = 0; i < n; i++) {
      var ang = (Math.PI * 2 * i) / n;
      var c = Math.cos(ang),
        sn = Math.sin(ang);
      s +=
        '<line x1="' + (cx + c * inner).toFixed(2) +
        '" y1="' + (cy + sn * inner).toFixed(2) +
        '" x2="' + (cx + c * outer).toFixed(2) +
        '" y2="' + (cy + sn * outer).toFixed(2) + '"/>';
    }
    return s;
  }

  function buildScene(p) {
    var litR = 5.5;
    var lit = moonLitPath(CX, MOON_Y, litR, p);
    return (
      '<svg viewBox="0 0 48 36">' +
      '<defs><clipPath id="tt-sky"><path d="M0 0 H48 V30 Q24 25 0 30 Z"/></clipPath></defs>' +
      '<g clip-path="url(#tt-sky)"><g class="orbit">' +
      '<g class="sun"><circle cx="' + CX + '" cy="' + SUN_Y + '" r="5"/>' +
      rays(CX, SUN_Y, 8, 7.5, 9.8) + "</g>" +
      '<g class="moon"><circle class="moon-disk" cx="' + CX + '" cy="' + MOON_Y + '" r="' + litR + '"/>' +
      '<path class="moon-lit" d="' + lit + '"/></g>' +
      "</g></g>" +
      '<path class="hill" d="M3 30 Q24 25 45 30"/>' +
      "</svg>"
    );
  }

  function apply(orbit, sun, moon, angle) {
    orbit.style.transform = "rotate(" + angle + "deg)";
    sun.style.transform = "rotate(" + -angle + "deg)";
    moon.style.transform = "rotate(" + -angle + "deg)";
  }

  function label(t) {
    return t === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }

  function init() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var p = moonPhase(new Date());
    btn.innerHTML = buildScene(p);
    var caption = document.getElementById("moon-phase");
    if (caption) caption.textContent = phaseName(p);
    var orbit = btn.querySelector(".orbit");
    var sun = btn.querySelector(".sun");
    var moon = btn.querySelector(".moon");

    // Place instantly (no transition) so the initial state doesn't animate.
    var angle = effectiveTheme() === "dark" ? 180 : 0;
    apply(orbit, sun, moon, angle);
    btn.setAttribute("aria-label", label(effectiveTheme()));
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        btn.classList.add("anim");
      });
    });

    btn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      angle += 180; // keep turning clockwise on every click
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
      apply(orbit, sun, moon, angle);
      btn.setAttribute("aria-label", label(next));
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
