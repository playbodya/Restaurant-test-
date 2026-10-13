(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };
  const M = window.DENNI_MENU;

  const RU = {
    back: '← На главную', book: 'Бронь', eyebrow: 'Обеденное предложение · пн–пт', t1: 'Дневное', t2: 'меню',
    soups: 'Супы', soupsHint: 'Каждый день новый. Сегодняшний выделен.', mains: 'Основные блюда', mainsHint: 'Заказывайте по номеру. Действуют всю неделю.',
    allergens: 'Список аллергенов (1–14)', n1: 'Вес указан в сыром виде', n2: 'Аллергены уточнит персонал', n3: 'Упаковка с собой 15 Kč',
    ctaTitle: 'Приходите на <em>обед</em>', ctaLead: 'Придержим для вас стол на обед. Достаточно позвонить.', route: 'Как добраться',
  };
  const EN = {
    back: '← Home', book: 'Book', eyebrow: 'Lunch offer · Mon–Fri', t1: 'Lunch', t2: 'menu',
    soups: 'Soups', soupsHint: 'A different one every day. Today’s is highlighted.', mains: 'Main courses', mainsHint: 'Order by number. Valid all week.',
    allergens: 'Allergen list (1–14)', n1: 'Weights are raw weights', n2: 'Our staff will gladly advise on allergens', n3: 'Takeaway box 15 Kč',
    ctaTitle: 'Come for <em>lunch</em>', ctaLead: 'We’ll gladly hold a lunch table for you. Just give us a call.', route: 'Find us',
  };
  const PL = {
    back: '← Strona główna', book: 'Rezerwacja', eyebrow: 'Oferta obiadowa · pon.–pt.', t1: 'Menu', t2: 'dnia',
    soups: 'Zupy', soupsHint: 'Codziennie inna. Dzisiejsza jest wyróżniona.', mains: 'Dania główne', mainsHint: 'Zamawiaj według numeru. Obowiązują cały tydzień.',
    allergens: 'Lista alergenów (1–14)', n1: 'Gramatura w stanie surowym', n2: 'O alergeny zapytaj obsługę', n3: 'Opakowanie na wynos 15 Kč',
    ctaTitle: 'Wpadnij na <em>obiad</em>', ctaLead: 'Chętnie przytrzymamy dla Ciebie stolik na obiad. Wystarczy zadzwonić.', route: 'Dojazd',
  };
  const DICT = { ru: RU, en: EN, pl: PL };

  const UI = {
    cs: {
      days: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'], today: 'Dnes',
      open: (h) => `Právě vaříme · ${h}`, later: (h) => `Dnes ${h}`, done: 'Dnešní polední menu skončilo',
      weekend: 'Denní menu vaříme Po–Pá', stale: 'Nové denní menu právě připravujeme', soon: (d) => `Platí od ${d}`,
      al: 'alergeny',
      allergens: ['Obiloviny obsahující lepek', 'Korýši', 'Vejce', 'Ryby', 'Arašídy', 'Sójové boby', 'Mléko', 'Skořápkové plody', 'Celer', 'Hořčice', 'Sezamová semena', 'Oxid siřičitý a siřičitany', 'Vlčí bob (lupina)', 'Měkkýši'],
    },
    ru: {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'], today: 'Сегодня',
      open: (h) => `Сейчас готовим · ${h}`, later: (h) => `Сегодня ${h}`, done: 'Обеденное меню на сегодня закончилось',
      weekend: 'Дневное меню готовим пн–пт', stale: 'Новое дневное меню скоро появится', soon: (d) => `Действует с ${d}`,
      al: 'аллергены',
      allergens: ['Злаки, содержащие глютен', 'Ракообразные', 'Яйца', 'Рыба', 'Арахис', 'Соя', 'Молоко', 'Орехи', 'Сельдерей', 'Горчица', 'Кунжут', 'Диоксид серы и сульфиты', 'Люпин', 'Моллюски'],
    },
    en: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], today: 'Today',
      open: (h) => `Cooking now · ${h}`, later: (h) => `Today ${h}`, done: 'Today’s lunch service has ended',
      weekend: 'Lunch menu runs Mon–Fri', stale: 'The new lunch menu is on its way', soon: (d) => `Valid from ${d}`,
      al: 'allergens',
      allergens: ['Cereals containing gluten', 'Crustaceans', 'Eggs', 'Fish', 'Peanuts', 'Soybeans', 'Milk', 'Tree nuts', 'Celery', 'Mustard', 'Sesame seeds', 'Sulphur dioxide and sulphites', 'Lupin', 'Molluscs'],
    },
    pl: {
      days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'], today: 'Dziś',
      open: (h) => `Teraz gotujemy · ${h}`, later: (h) => `Dziś ${h}`, done: 'Dzisiejsze menu obiadowe już się skończyło',
      weekend: 'Menu dnia serwujemy pon.–pt.', stale: 'Nowe menu dnia właśnie przygotowujemy', soon: (d) => `Obowiązuje od ${d}`,
      al: 'alergeny',
      allergens: ['Zboża zawierające gluten', 'Skorupiaki', 'Jaja', 'Ryby', 'Orzeszki ziemne', 'Soja', 'Mleko', 'Orzechy', 'Seler', 'Gorczyca', 'Sezam', 'Dwutlenek siarki i siarczyny', 'Łubin', 'Mięczaki'],
    },
  };

  const LANGS = ['cs', 'ru', 'en', 'pl'];
  const stored = store.get('prostorica-lang');
  let lang = LANGS.includes(stored) ? stored : 'cs';
  const nodes = $$('[data-i18n]');
  nodes.forEach((el) => { el.dataset.cs = el.innerHTML; });
  const tr = (o) => o[lang] || o.cs;
  const fmt = (n) => `${n.toLocaleString('cs-CZ')} Kč`;
  const dm = (iso) => { const [, m, d] = iso.split('-'); return `${+d}. ${+m}.`; };
  const addDays = (iso, n) => { const d = new Date(`${iso}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

  function pragueNow() {
    const f = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' });
    const p = Object.fromEntries(f.formatToParts(new Date()).map((x) => [x.type, x.value]));
    return { iso: `${p.year}-${p.month}-${p.day}`, h: +p.hour + +p.minute / 60 };
  }

  function render() {
    const u = UI[lang], now = pragueNow();
    const dayIdx = Math.round((Date.parse(now.iso) - Date.parse(M.from)) / 864e5);
    const inWeek = now.iso >= M.from && now.iso <= M.to;
    const [hOpen, hClose] = M.hours.split('–').map((t) => { const [h, m] = t.split(':'); return +h + +m / 60; });

    $('#dmWeek').textContent = `${dm(M.from)} – ${dm(M.to)} ${M.to.slice(0, 4)}`;
    let status, live = false;
    if (now.iso > M.to) status = u.stale;
    else if (now.iso < M.from) status = u.soon(dm(M.from));
    else if (dayIdx > 4) status = u.weekend;
    else if (now.h >= hOpen && now.h < hClose) { status = u.open(M.hours); live = true; }
    else if (now.h < hOpen) status = u.later(M.hours);
    else status = u.done;
    $('#dmStatus').textContent = status;
    $('#dmDot').classList.toggle('is-closed', !live);

    $('#dmDays').innerHTML = M.soups.map((s, i) => {
      const iso = addDays(M.from, s.day);
      const cls = inWeek && s.day === dayIdx ? 'is-today' : inWeek && s.day < dayIdx ? 'is-past' : '';
      return `<li class="dm-day ${cls}" style="--i:${i}">
        ${cls === 'is-today' ? `<span class="dm-day__badge">${u.today}</span>` : ''}
        <span class="dm-day__name">${u.days[s.day]}</span>
        <span class="dm-day__date">${dm(iso)}</span>
        <p class="dm-day__soup">${tr(s)}</p>
        <span class="dm-day__al">${u.al}: ${s.a}</span>
      </li>`;
    }).join('');

    $('#dmMains').innerHTML = M.mains.map((m, i) => `
      <li class="dm-main" style="--i:${i}">
        <span class="dm-main__no">${i + 1}</span>
        <span class="dm-main__name">${tr(m)}</span>
        <span class="dm-main__price">${fmt(m.p)}</span>
        <p class="dm-main__desc">${m.g} · ${tr(m.side)}<span>${u.al}: ${m.a}</span></p>
      </li>`).join('');

    $('#dmAllergens').innerHTML = u.allergens.map((a) => `<li>${a}</li>`).join('');
  }

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

  if (!reduced && matchMedia('(pointer: fine)').matches) {
    $$('.magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('pointerleave', () => { b.style.transform = ''; });
    });
  }

  applyLang();
  // after the entrance animation, later re-renders (language, clock) swap content without replaying it
  setTimeout(() => document.body.classList.add('dm-ready'), 2000);
  setInterval(render, 60000);
})();
