/* SumAtlas embeds: sizes each <iframe data-sumatlas> to its calculator's height. */
(function () {
  if (window.__sumatlasEmbed) return;
  window.__sumatlasEmbed = true;
  window.addEventListener("message", function (e) {
    if (e.origin !== "https://sumatlas.com" || !e.data || e.data.type !== "sumatlas-height") return;
    var frames = document.querySelectorAll("iframe[data-sumatlas]");
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) frames[i].style.height = Math.ceil(e.data.height) + "px";
    }
  });
})();
