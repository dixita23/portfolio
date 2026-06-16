/**
 * Builds a circular auto-rotating testimonial carousel from the static list
 * inside #testimonial-carousel (progressive enhancement).
 */
(function () {
  const root = document.getElementById("testimonial-carousel");
  if (!root) return;

  const list = root.querySelector(".testimonial-list");
  if (!list) return;

  const sourceArticles = [...list.querySelectorAll("article")];
  if (sourceArticles.length === 0) return;

  const items = sourceArticles.map((article) => ({
    author: /** @type {HTMLElement} */ (article.querySelector(".testimonial__author")).cloneNode(true),
    quote: /** @type {HTMLElement} */ (article.querySelector(".testimonial__quote")).cloneNode(true),
  }));

  const n = items.length;
  const intervalMs = Math.max(3200, parseInt(root.getAttribute("data-interval") || "6200", 10) || 6200);

  const motionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false, addEventListener: () => {} };
  let reduceMotion = motionQuery.matches;

  list.remove();

  const inner = document.createElement("div");
  inner.className = "testimonial-carousel__inner";

  const layout = document.createElement("div");
  layout.className = "testimonial-carousel__layout";

  const arcWrap = document.createElement("div");
  arcWrap.className = "testimonial-carousel__arc-wrap";
  arcWrap.setAttribute("aria-hidden", "true");

  arcWrap.innerHTML = `
    <svg class="testimonial-carousel__arc" viewBox="0 0 320 520" preserveAspectRatio="xMidYMid meet" focusable="false">
      <path
        class="testimonial-carousel__arc-path"
        d="M 14 22 C -300 100, -300 420, 14 498"
        fill="none"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  `;

  const rowList = document.createElement("ul");
  rowList.className = "testimonial-carousel__rows";
  rowList.setAttribute("role", "list");

  const rows = [];
  for (let slot = 0; slot < 3; slot++) {
    const li = document.createElement("li");
    li.className = "testimonial-carousel__row";
    li.setAttribute("role", "listitem");
    li.dataset.slot = String(slot);

    const article = document.createElement("article");
    article.className = "testimonial-carousel__article";

    rowList.append(li);
    li.append(article);
    rows.push({ li, article });
  }

  const connectorWrap = document.createElement("div");
  connectorWrap.className = "testimonial-carousel__connector-wrap";
  connectorWrap.setAttribute("aria-hidden", "true");
  connectorWrap.innerHTML = `
    <svg class="testimonial-carousel__connector-svg" xmlns="http://www.w3.org/2000/svg">
      <path class="testimonial-carousel__connector-path testimonial-carousel__connector-path--chain" fill="none" />
      <path class="testimonial-carousel__connector-path testimonial-carousel__connector-path--loop" fill="none" />
    </svg>
  `;
  const chainPath = /** @type {SVGPathElement | null} */ (
    connectorWrap.querySelector(".testimonial-carousel__connector-path--chain")
  );
  const loopPath = /** @type {SVGPathElement | null} */ (
    connectorWrap.querySelector(".testimonial-carousel__connector-path--loop")
  );

  layout.append(arcWrap, connectorWrap, rowList);
  inner.append(layout);
  root.append(inner);

  root.setAttribute("role", "region");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", "Colleague testimonials — rotates automatically.");

  let activeIndex = 1 % n;
  let timerId = 0;
  let connectorRaf = 0;

  function attachPointOnTrack(el, layoutRect) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2 - layoutRect.left;
    const cy = r.top + r.height / 2 - layoutRect.top;
    const rad = Math.min(r.width, r.height) / 2;
    return { x: cx - rad * 0.92, y: cy };
  }

  function updateConnectorPaths() {
    if (!chainPath || !loopPath) return;
    const layoutRect = layout.getBoundingClientRect();
    const w = layout.clientWidth;
    const h = layout.clientHeight;
    if (w < 16 || h < 16) return;

    const svg = connectorWrap.querySelector(".testimonial-carousel__connector-svg");
    if (svg) {
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    }

    const motions = rowList.querySelectorAll(".testimonial-carousel__avatar-motion");
    if (motions.length < 2) {
      chainPath.setAttribute("d", "");
      loopPath.setAttribute("d", "");
      return;
    }

    const pts = [...motions].map((el) => attachPointOnTrack(el, layoutRect));
    const bulge = Math.max(20, Math.min(56, w * 0.07));

    let d = "";
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const cx = (a.x + b.x) / 2 - bulge;
      const cy = (a.y + b.y) / 2;
      if (i === 0) {
        d += `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} `;
      }
      d += `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)} `;
    }
    chainPath.setAttribute("d", d.trim());

    if (pts.length >= 3) {
      const a0 = pts[0];
      const a2 = pts[2];
      const loopCx = Math.min(a0.x, a2.x) - bulge * 1.35;
      const loopCy = (a0.y + a2.y) / 2;
      loopPath.setAttribute(
        "d",
        `M ${a2.x.toFixed(1)} ${a2.y.toFixed(1)} Q ${loopCx.toFixed(1)} ${loopCy.toFixed(1)} ${a0.x.toFixed(1)} ${a0.y.toFixed(1)}`
      );
    } else {
      loopPath.setAttribute("d", "");
    }
  }

  function queueConnectorUpdate() {
    if (connectorRaf) cancelAnimationFrame(connectorRaf);
    connectorRaf = requestAnimationFrame(() => {
      connectorRaf = 0;
      updateConnectorPaths();
      requestAnimationFrame(updateConnectorPaths);
    });
  }

  if (typeof ResizeObserver !== "undefined") {
    const ro = new ResizeObserver(() => queueConnectorUpdate());
    ro.observe(layout);
  } else {
    window.addEventListener("resize", queueConnectorUpdate);
  }

  function indexForSlot(slot) {
    return (activeIndex + slot - 1 + n * 4) % n;
  }

  function render() {
    rows.forEach(({ article }, slot) => {
      const idx = indexForSlot(slot);
      const isActive = slot === 1;
      article.replaceChildren();
      article.append(items[idx].author.cloneNode(true), items[idx].quote.cloneNode(true));
      const img = article.querySelector(".testimonial__avatar");
      if (img) {
        const motion = document.createElement("span");
        motion.className = "testimonial-carousel__avatar-motion";
        img.replaceWith(motion);
        motion.append(img);
      }
      article.classList.toggle("testimonial-carousel__article--active", isActive);
      article.setAttribute("aria-hidden", isActive ? "false" : "true");
      if (isActive) {
        article.removeAttribute("tabindex");
      } else {
        article.setAttribute("tabindex", "-1");
      }
    });
    queueConnectorUpdate();
  }

  function clearTimer() {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = 0;
    }
  }

  function startTimer() {
    clearTimer();
    if (reduceMotion || n < 2) return;
    timerId = window.setInterval(() => {
      void advance();
    }, intervalMs);
  }

  async function advance() {
    if (n < 2) return;
    if (!reduceMotion) {
      root.classList.add("testimonial-carousel--is-animating");
      await new Promise((r) => window.setTimeout(r, 220));
    }
    activeIndex = (activeIndex + 1) % n;
    render();
    if (!reduceMotion) {
      root.classList.remove("testimonial-carousel--is-animating");
    }
  }

  root.addEventListener("focusin", () => {
    clearTimer();
  });

  root.addEventListener("focusout", (e) => {
    const next = /** @type {FocusEvent} */ (e).relatedTarget;
    if (next && root.contains(/** @type {Node} */ (next))) return;
    if (!reduceMotion) startTimer();
  });

  render();
  startTimer();

  motionQuery.addEventListener("change", () => {
    reduceMotion = motionQuery.matches;
    if (reduceMotion) clearTimer();
    else startTimer();
  });
})();
