(() => {
  const controls = document.querySelector('.ingredient-filters');
  if (!controls) return;
  const input = controls.querySelector('input');
  const buttons = [...controls.querySelectorAll('button')];
  const empty = document.querySelector('.filter-empty');
  const status = document.querySelector('.filter-status');
  const normalize = value => value.trim().toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cards = [...document.querySelectorAll('.ingredient-card')].map(card => ({
    card,
    name: normalize(card.querySelector('h2').textContent),
    link: card.querySelector('a'),
  }));
  let category = '';
  let announcement;
  const storageKey = () => {
    const params = new URLSearchParams(location.search);
    params.sort();
    return `ingredient-return:${location.pathname.replace(/\/$/, '')}?${params}`;
  };

  function apply(announce = false) {
    const query = normalize(input.value);
    let count = 0;
    for (const { card, name, link } of cards) {
      card.hidden = !(name.includes(query) && (!category || card.dataset.category === category));
      if (!card.hidden) count++;
      const url = new URL(link.href);
      for (const [key, value] of [['from-q', input.value.trim()], ['from-category', category]]) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      link.href = url.href;
    }
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.category === category));
    empty.hidden = count !== 0;
    clearTimeout(announcement);
    if (announce) announcement = setTimeout(() => { status.textContent = `${count} ${count === 1 ? 'råvara' : 'råvaror'}`; }, 200);
  }

  function update() {
    const url = new URL(location.href);
    for (const [key, value] of [['q', input.value.trim()], ['category', category]]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(history.state, '', url);
    apply(true);
  }

  function readUrl() {
    const params = new URLSearchParams(location.search);
    input.value = params.get('q') || '';
    category = buttons.some(button => button.dataset.category === params.get('category')) ? params.get('category') : '';
    apply();
  }

  input.addEventListener('input', update);
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') { input.value = ''; update(); }
  });
  for (const button of buttons) button.addEventListener('click', () => { category = button.dataset.category; update(); });
  empty.querySelector('button').addEventListener('click', () => {
    input.value = '';
    category = '';
    update();
    input.focus();
  });

  // Keep the return position per filtered URL. Storage is optional.
  for (const { link } of cards) link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    try { sessionStorage.setItem(storageKey(), JSON.stringify({ y: scrollY, id: link.getAttribute('aria-labelledby') })); } catch { /* Storage may be blocked. */ }
  });
  window.addEventListener('pageshow', event => {
    readUrl();
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey()));
      sessionStorage.removeItem(storageKey());
      if (saved && !event.persisted) requestAnimationFrame(() => {
        const link = document.getElementById(saved.id)?.closest('a');
        if (link && !link.closest('li').hidden) link.focus({ preventScroll: true });
        window.scrollTo(0, Number(saved.y) || 0);
      });
    } catch { /* Native back navigation still works without storage. */ }
  });
  window.addEventListener('popstate', readUrl);
  readUrl();
  controls.hidden = false;
})();
