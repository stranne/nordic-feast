// Hover gives one month; keyboard focus gives the year without twelve extra tab stops.
// The static bar description and labelled detail page also work without this script.
for (const card of document.querySelectorAll(".ingredient-card")) {
  const link = card.querySelector("a");
  const bar = card.querySelector(".season-bar");
  const tooltip = bar.querySelector(".season-tooltip");
  const content = tooltip.querySelector(".season-tooltip-content");
  const months = [...bar.querySelectorAll(".season-month")];
  let keyboardFocus = false;
  let pointerInside = false;
  let dismissed = false;

  function hide() {
    tooltip.hidden = true;
    card.classList.remove("tooltip-open");
  }

  function show(lines) {
    if (dismissed) return;
    content.replaceChildren(...lines.map(text => {
      const line = document.createElement("span");
      line.textContent = text;
      return line;
    }));
    tooltip.hidden = false;
    card.classList.add("tooltip-open");
    positionTooltip();
  }

  function positionTooltip() {
    if (tooltip.hidden) return;
    tooltip.classList.remove("season-tooltip--below");
    tooltip.style.left = "0px";
    const bounds = tooltip.getBoundingClientRect();
    const left = Math.max(16, Math.min(bounds.left, document.documentElement.clientWidth - bounds.width - 16));
    tooltip.style.left = `${left - bounds.left}px`;
    if (bounds.top < 8) tooltip.classList.add("season-tooltip--below");
  }

  function showYear() {
    const statuses = ["I säsong", "Uppgift saknas"].filter(status => months.some(month => month.dataset.status === status));
    show(statuses.map(status => `${status}: ${months.filter(month => month.dataset.status === status).map(month => month.dataset.month).join(", ")}.`));
  }

  bar.addEventListener("pointerenter", event => {
    if (event.pointerType !== "touch") pointerInside = true;
  });
  for (const month of months) {
    month.addEventListener("pointerenter", event => {
      if (event.pointerType === "touch") return;
      dismissed = false;
      show([`${month.dataset.month} · ${month.dataset.status}`]);
    });
  }
  bar.addEventListener("pointerleave", () => {
    pointerInside = false;
    if (keyboardFocus) showYear();
    else { hide(); dismissed = false; }
  });
  link.addEventListener("focus", () => {
    keyboardFocus = link.matches(":focus-visible");
    dismissed = false;
    if (keyboardFocus) showYear();
  });
  link.addEventListener("blur", () => {
    keyboardFocus = false;
    if (!pointerInside) hide();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !tooltip.hidden) {
      dismissed = true;
      hide();
    }
  });
  // Reposition only on a fresh hover/focus after the viewport changes.
  window.addEventListener("resize", hide);
  // Text-size changes can resize an open tooltip without resizing the viewport.
  new ResizeObserver(positionTooltip).observe(tooltip);
}
