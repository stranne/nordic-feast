// Carry filters in ordinary links so new tabs, reload and browser history agree.
(() => {
  function updateLinks() {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') ?? params.get('from-q') ?? '';
    const candidate = params.get('category') ?? params.get('from-category') ?? '';
    const category = ['gronsaker', 'frukt', 'bar'].includes(candidate) ? candidate : '';

    for (const link of document.querySelectorAll('a[data-keep-filters]')) {
      const url = new URL(link.href);
      for (const [key, value] of [['q', query], ['category', category]]) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      link.href = url.href;
    }
  }

  document.addEventListener('ingredient-filters-change', updateLinks);
  window.addEventListener('pageshow', updateLinks);
  window.addEventListener('popstate', updateLinks);
  updateLinks();
})();
