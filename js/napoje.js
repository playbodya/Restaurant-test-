(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };
  const N = window.NAPOJE;

  const DICT = {
    ru: { back: '← Меню блюд', book: 'Бронь', eyebrow: 'Ресторан Prostorica', t1: 'Напитки', t2: 'и винная карта', drinks: 'Напитки', wine: 'Вина', lunch: 'Дневное меню' },
    en: { back: '← Food menu', book: 'Book', eyebrow: 'Restaurant Prostorica', t1: 'Drinks', t2: '& wine list', drinks: 'Drinks', wine: 'Wines', lunch: 'Lunch menu' },
    pl: { back: '← Karta dań', book: 'Rezerwacja', eyebrow: 'Restauracja Prostorica', t1: 'Karta napojów', t2: 'i win', drinks: 'Napoje', wine: 'Wina', lunch: 'Menu dnia' },
  };
  const COUNT = { cs: 'položek', ru: 'позиций', en: 'items', pl: 'pozycji' };
  const NEALKO = { cs: 'nealko', ru: 'без алкоголя', en: 'alcohol-free', pl: 'bez alkoholu' };

  const LANGS = ['cs', 'ru', 'en', 'pl'];
  const stored = store.get('prostorica-lang');
  let lang = LANGS.includes(stored) ? stored : 'cs';
  let panel = location.hash === '#vina' ? 'wine' : 'drinks';

  const nodes = $$('[data-i18n]');
  nodes.forEach((el) => { el.dataset.cs = el.innerHTML; });
  const tr = (x) => (x == null ? '' : typeof x === 'string' ? x : x[lang] || x.cs);
  const fmt = (n) => `${n.toLocaleString('cs-CZ')} Kč`;
  const prices = (p) => (Array.isArray(p) ? p : [[null, p]])
    .map(([v, c]) => `<span class="nl-price">${v ? `<small>${v}</small>` : ''}${fmt(c)}</span>`).join('');
  const total = (cats) => cats.reduce((a, c) => a + c.items.length, 0);

  function drinkRow(it) {
    return `<li class="nl-item">
      <span class="nl-item__v">${it.v || ''}</span>
      <span class="nl-item__n">${tr(it.n)}${it.d ? `<span class="nl-item__d">${tr(it.d)}</span>` : ''}</span>
      <span class="nl-prices">${prices(it.p)}</span>
    </li>`;
  }
  function wineCard(it) {
    return `<li class="nl-wine">
      <div class="nl-wine__top">
        <h3 class="nl-wine__n">${tr(it.n)}${it.nealko ? `<span class="nl-badge">${NEALKO[lang]}</span>` : ''}</h3>
        <span class="nl-prices">${prices(it.p)}</span>
      </div>
      <span class="nl-wine__s">${tr(it.s)}</span>
      <span class="nl-wine__w">${tr(it.w)}</span>
      <p class="nl-wine__d">${tr(it.d)}</p>
    </li>`;
  }
  function category(c, i, key, rowFn, listCls) {
    return `<div class="nl-cat" id="${key}-${i}" style="--i:${i}">
      <div class="nl-cat__head"><h2 class="nl-cat__title">${tr(c.cat)}</h2>${c.note ? `<p class="nl-cat__note">${tr(c.note)}</p>` : ''}</div>
      <ul class="${listCls}">${c.items.map(rowFn).join('')}</ul>
    </div>`;
  }

  function render() {
    $('#panel-drinks').innerHTML = N.drinks.map((c, i) => category(c, i, 'n', drinkRow, 'nl-list')).join('');
    $('#panel-wine').innerHTML = N.wine.map((c, i) => category(c, i, 'v', wineCard, 'nl-wines')).join('')
      + `<div class="nl-recommend"><span>${tr(N.recommend.title)}</span><strong>${N.recommend.text}</strong></div>`
      + `<p class="nl-winenote">${tr(N.wineNote)}</p>`;
    $('#countDrinks').textContent = `${total(N.drinks)} ${COUNT[lang]}`;
    $('#countWine').textContent = `${total(N.wine)} ${COUNT[lang]}`;
    renderJump();
  }
  function renderJump() {
    const cats = panel === 'wine' ? N.wine : N.drinks, key = panel === 'wine' ? 'v' : 'n';
    $('#jump').innerHTML = cats.map((c, i) => `<a href="#${key}-${i}">${tr(c.cat)}</a>`).join('');
  }

  function showPanel(next, push) {
    panel = next;
    $('.nl-switch').dataset.active = panel;
    $$('.nl-switch__btn').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.panel === panel)));
    $('#panel-drinks').hidden = panel !== 'drinks';
    $('#panel-wine').hidden = panel !== 'wine';
    renderJump();
    if (push) history.replaceState(null, '', panel === 'wine' ? '#vina' : '#napoje');
  }
  $$('.nl-switch__btn').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.panel === panel) return;
    showPanel(b.dataset.panel, true);
    const top = $('.nl-switch').getBoundingClientRect().top + scrollY - 80;
    if (scrollY > top) scrollTo({ top, behavior: 'smooth' });
  }));

  function applyLang() {
    document.documentElement.lang = lang;
    nodes.forEach((el) => { el.innerHTML = (DICT[lang] && DICT[lang][el.dataset.i18n]) || el.dataset.cs; });
    $$('.lang__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    render();
  }
  $$('.lang__btn').forEach((b) => b.addEventListener('click', () => {
    if (lang === b.dataset.lang) return;
    lang = b.dataset.lang; store.set('prostorica-lang', lang); applyLang();
  }));

  applyLang();
  showPanel(panel, false);
  setTimeout(() => document.body.classList.add('nl-ready'), 1500);
})();
