// HTML starts collapsed, with the icon's space reserved even while this file loads.
// The noscript styles in base.html expose the checked date without JavaScript.
for (const source of document.querySelectorAll('[data-source]')) {
  const history = source;
  const button = source.querySelector('.source-info');
  const tooltip = source.querySelector('.source-tooltip');
  let hovering = false;
  let dismissed = false;

  function hide() { tooltip.hidden = true; }
  function position() {
    if (tooltip.hidden) return;
    tooltip.classList.remove('source-tooltip--below');
    tooltip.style.right = '0px';
    const bounds = tooltip.getBoundingClientRect();
    const left = Math.max(16, Math.min(bounds.left, document.documentElement.clientWidth - bounds.width - 16));
    tooltip.style.right = `${bounds.left - left}px`;
    if (bounds.top < 8) tooltip.classList.add('source-tooltip--below');
  }
  function show() {
    if (dismissed) return;
    tooltip.hidden = false;
    position();
  }

  source.classList.add('source--enhanced');
  hide();
  history.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;
    hovering = true;
    dismissed = false;
    show();
  });
  history.addEventListener('pointerleave', () => {
    hovering = false;
    if (!source.contains(document.activeElement)) hide();
  });
  source.addEventListener('focusin', () => { dismissed = false; show(); });
  source.addEventListener('focusout', event => { if (!hovering && !source.contains(event.relatedTarget)) hide(); });
  button.addEventListener('click', () => { dismissed = false; show(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { dismissed = true; hide(); }
  });
  document.addEventListener('pointerdown', event => {
    if (!history.contains(event.target)) { dismissed = true; hide(); }
  });
  window.addEventListener('resize', position);
  new ResizeObserver(position).observe(tooltip);
  button.disabled = false;
}
