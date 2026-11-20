// Replace the theme's "Go to repository" tooltip on the Discord link,
// including after instant page loads.
function pradexFixSourceTitle() {
  document.querySelectorAll(".md-source").forEach(function (link) {
    link.title = "Message me on the Prado Discord";
  });
}
if (typeof document$ !== "undefined") {
  document$.subscribe(pradexFixSourceTitle);
} else {
  pradexFixSourceTitle();
}

// Phones have no hover, so hover notes on icons and tags (like the shop icon on the
// spellbook pages) never show there. On touch screens, tapping one pops its note up
// instead, and tapping anywhere else closes it.
(function () {
  if (!window.matchMedia || !window.matchMedia("(hover: none)").matches) return;
  var SEL = ".md-typeset .twemoji[title], .md-typeset .twemoji[data-pdx-tip], .md-typeset .pdx-status[title], .md-typeset .pdx-status[data-pdx-tip]";
  var tip = null;
  function close() { if (tip) { tip.remove(); tip = null; } }
  document.addEventListener("click", function (ev) {
    var el = ev.target.closest(SEL);
    close();
    if (!el) return;
    var text = el.getAttribute("title") || el.getAttribute("data-pdx-tip");
    if (!text) return;
    // Keep the note, but stop the browser from also trying to show the title.
    el.setAttribute("data-pdx-tip", text); el.removeAttribute("title");
    ev.preventDefault();
    tip = document.createElement("div");
    tip.className = "pdx-tip"; tip.setAttribute("role", "tooltip"); tip.textContent = text;
    document.body.appendChild(tip);
    var r = el.getBoundingClientRect(), w = tip.offsetWidth, vw = document.documentElement.clientWidth;
    var left = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), vw - w - 8);
    tip.style.left = left + window.scrollX + "px";
    tip.style.top = r.bottom + window.scrollY + 6 + "px";
  });
  window.addEventListener("resize", close);
})();

// Desktop sidebar: when the menu is taller than its panel, the mouse wheel flips it between
// two positions, the top and the bottom, instead of scrolling a little at a time.
// Once it's already at the end you scroll toward, the wheel scrolls the page as usual.
document.addEventListener("wheel", function (ev) {
  if (!window.matchMedia("(min-width: 76.25em)").matches) return;
  var wrap = ev.target.closest && ev.target.closest(".md-sidebar--primary .md-sidebar__scrollwrap");
  if (!wrap || wrap.scrollHeight <= wrap.clientHeight + 1 || !ev.deltaY) return;
  var down = ev.deltaY > 0;
  var end = down ? wrap.scrollHeight - wrap.clientHeight : 0;
  if (Math.abs(wrap.scrollTop - end) < 2) return;
  ev.preventDefault();
  wrap.scrollTo({ top: end, behavior: "smooth" });
}, { passive: false });

// Desktop sidebar: opening a section closes the other open sections beside it,
// so only one is expanded at a time.
document.addEventListener("change", function (ev) {
  var box = ev.target;
  if (!box.checked || !box.classList || !box.classList.contains("md-nav__toggle")) return;
  if (!window.matchMedia("(min-width: 76.25em)").matches) return;
  if (!box.closest(".md-sidebar--primary")) return;
  var item = box.parentElement, list = item && item.parentElement;
  if (!list) return;
  [].forEach.call(list.children, function (sib) {
    if (sib === item) return;
    var other = sib.querySelector(":scope > input.md-nav__toggle");
    if (other && other.checked) other.checked = false;
  });
});
