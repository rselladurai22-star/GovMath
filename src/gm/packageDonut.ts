/**
 * The hover donut for the salary and mortgage package pages, matching
 * Studio's Ring. Their supplied scripts paint the ring as a conic-gradient
 * on .circle; this reads that gradient and the legend, draws the same SVG
 * donut over it and keeps it in step whenever the script repaints.
 * Hovering or focusing a slice or legend row shows its name, amount and
 * share in the middle.
 */
const NS = "http://www.w3.org/2000/svg";
const R = 78;
const C = 2 * Math.PI * R;

export function initPackageDonut() {
  const ring = document.querySelector<HTMLElement>(".calculator.gm-modern .circle");
  const rows = [...document.querySelectorAll<HTMLElement>(".calculator.gm-modern .ax-chartlegend > div")];
  if (!ring || !rows.length) return;
  ring.classList.add("gm-pkgdonut");
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.setAttribute("aria-hidden", "true");
  ring.prepend(svg);
  const hover = document.createElement("div");
  hover.className = "gm-donut-centre gm-pkgdonut-hover";
  hover.hidden = true;
  ring.append(hover);
  const shares = rows.map((row) => {
    row.tabIndex = 0;
    const em = document.createElement("em");
    row.append(em);
    return em;
  });

  let segs: { color: string; share: number }[] = [];
  let active: number | null = null;

  const paint = () => {
    svg.querySelectorAll("circle").forEach((c, i) => {
      c.classList.toggle("is-on", active !== null && i - 1 === active);
      c.classList.toggle("is-off", active !== null && i > 0 && i - 1 !== active);
    });
    rows.forEach((r, i) => r.classList.toggle("is-on", active === i));
    ring.classList.toggle("is-hover", active !== null);
    hover.hidden = active === null;
    if (active !== null && segs[active]) {
      const row = rows[active];
      const label = row.querySelector("span")?.textContent?.trim() ?? "";
      const value = row.querySelector("b")?.textContent?.trim() ?? "";
      hover.innerHTML = "";
      for (const [tag, text] of [["span", label], ["strong", value], ["small", `${fmt(segs[active].share)} of the total`]]) {
        const el = document.createElement(tag);
        el.textContent = text;
        hover.append(el);
      }
    }
  };

  const draw = () => {
    // The script writes conic-gradient(#2a78d6 0% 78.4%,#eb6834 0% 100%); browsers
    // read it back as rgb() colours with one position per stop. Group each run
    // of one colour and take its furthest position as the slice's end.
    const css = ring.style.background || "";
    const stops: { color: string; end: number }[] = [];
    for (const m of css.matchAll(/(#[0-9a-f]{3,8}|rgba?\([^)]*\))((?:\s+[\d.]+%)+)/gi)) {
      const end = Math.max(...[...m[2].matchAll(/[\d.]+/g)].map((n) => Number(n[0])));
      const last = stops[stops.length - 1];
      if (last && last.color === m[1]) last.end = Math.max(last.end, end);
      else stops.push({ color: m[1], end });
    }
    if (!stops.length) return;
    let prev = 0;
    segs = stops.map((s) => {
      const share = Math.max(0, Math.min(100, s.end) - prev) / 100;
      prev = Math.max(prev, Math.min(100, s.end));
      return { color: s.color, share };
    });
    const live = segs.filter((s) => s.share > 0).length;
    const gap = live > 1 ? 3 : 0;
    svg.innerHTML = "";
    const track = document.createElementNS(NS, "circle");
    track.setAttribute("class", "gm-donut-track");
    for (const c of [track]) {
      c.setAttribute("cx", "100");
      c.setAttribute("cy", "100");
      c.setAttribute("r", String(R));
      svg.append(c);
    }
    let start = 0;
    segs.forEach((s, i) => {
      const len = s.share * C;
      const arc = document.createElementNS(NS, "circle");
      arc.setAttribute("class", "gm-donut-arc");
      arc.setAttribute("cx", "100");
      arc.setAttribute("cy", "100");
      arc.setAttribute("r", String(R));
      arc.setAttribute("stroke", s.color);
      const dash = s.share > 0 ? Math.max(len - gap, 0.5) : 0;
      arc.setAttribute("stroke-dasharray", `${dash} ${C - dash}`);
      arc.setAttribute("stroke-dashoffset", String(-start));
      arc.addEventListener("mouseenter", () => ((active = i), paint()));
      arc.addEventListener("mouseleave", () => ((active = null), paint()));
      svg.append(arc);
      start += len;
    });
    shares.forEach((em, i) => (em.textContent = segs[i] ? fmt(segs[i].share) : ""));
    paint();
  };

  rows.forEach((row, i) => {
    const on = () => ((active = i), paint());
    const off = () => ((active = null), paint());
    row.addEventListener("mouseenter", on);
    row.addEventListener("mouseleave", off);
    row.addEventListener("focus", on);
    row.addEventListener("blur", off);
  });
  draw();
  new MutationObserver(draw).observe(ring, { attributes: true, attributeFilter: ["style"] });
  // The legend values change after the ring on some updates; refresh the hover text too.
  new MutationObserver(paint).observe(rows[0].parentElement!, { subtree: true, characterData: true, childList: true });
}

function fmt(share: number) {
  return `${(share * 100).toFixed(share < 0.1 ? 1 : 0)}%`;
}
