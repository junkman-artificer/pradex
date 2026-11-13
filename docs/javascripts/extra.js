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
