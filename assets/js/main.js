(function () {
  var root = document.documentElement;

  // Theme: saved choice, else system preference
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Highlight the nav link for the section in view
  var links = document.querySelectorAll("#nav-links a");
  var sections = Array.prototype.map.call(links, function (a) {
    return document.querySelector(a.getAttribute("href"));
  });
  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { if (s) navObs.observe(s); });

    // Fade-in on scroll
    var fadeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("in"); fadeObs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".fade").forEach(function (el) { fadeObs.observe(el); });
  } else {
    document.querySelectorAll(".fade").forEach(function (el) { el.classList.add("in"); });
  }
})();
