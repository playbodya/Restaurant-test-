(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };

  /* ---------- Content ---------- */
  const RU = {
    'nav.about': 'О нас', 'nav.menu': 'Меню', 'nav.lunch': 'Дневное меню', 'nav.contact': 'Контакты', 'nav.where': 'Как добраться', 'nav.gallery': 'Галерея', 'nav.book': 'Бронь',
    'hero.eyebrow': 'Ресторан · Слезска-Острава', 'hero.t1': 'Чешская кухня', 'hero.t2': 'с ноткой', 'hero.t3': 'французской деревни',
    'hero.lead': 'Мы готовим честную чешскую кухню с ноткой французской деревни. Сезонные продукты, травы и вино небольших виноделен.',
    'hero.book': 'Забронировать стол', 'hero.menu': 'Смотреть меню',
    'marquee': 'лаванда · тимьян · розмарин · лесной мёд · козий сыр · оливки · инжир · шалфей · ',
    'about.eyebrow': 'О нас', 'about.title': 'Пространство для вкуса, <em>времени</em> и разговора',
    'about.p1': 'Prostorica родилась из простой идеи: готовить честную чешскую кухню, по сезону и с уважением к продукту. Вдохновение ищем во французской деревне, а продукты покупаем у фермеров из окрестностей Остравы.',
    'about.p2': 'Меню меняется четыре раза в год. Хлеб печём каждое утро, травы срываем прямо перед подачей, а лаванду с нашего огорода вы найдёте и в десертах, и в лимонаде.',
    'about.f1': 'мест за столами', 'about.f2': 'сезонных меню в год', 'about.f3': 'малых виноделен',
    'menu.eyebrow': 'Основное меню', 'menu.title': 'Меню',
    'dishes.label': 'Чешская кухня в современном прочтении. Честно. Легко. Со вкусом.',
    'gallery.eyebrow': 'Галерея', 'gallery.title': 'Атмосфера <em>французской деревни</em>', 'gallery.c1': 'Полевые цветы на каждом столе', 'gallery.c2': 'Праздничный стол', 'gallery.c3': 'Лавандовые салфетки', 'gallery.c4': 'Салон', 'gallery.c5': 'Зал для праздников', 'gallery.c6': 'Длинный стол для семейных встреч',
    'hall.eyebrow': 'Аренда зала / кейтеринг', 'hall.title': 'Свадьбы, праздники <em>и корпоративы</em>', 'hall.lead': 'Сдадим весь зал с оформлением под ваше событие или приготовим и привезём кейтеринг туда, где празднуете вы.',
    'menu.note': 'Половина порции — 70 % от цены блюда · вес указан в сыром виде · аллергены по запросу у персонала · упаковка с собой 15 Kč',
    'lunch.eyebrow': 'Дневное меню · пн–пт', 'lunch.title': 'Обед, который меняется <em>каждую неделю</em>', 'lunch.lead': 'Суп дня и шесть основных блюд на выбор. Будни с 11:00 до 15:00.', 'lunch.from': 'блюда от', 'lunch.cta': 'Всё дневное меню →',
    'quote.text': '«Хорошей еде нужны три вещи: сезон, терпение и стол, за которым никто не спешит».', 'quote.by': '— шеф-повар Prostorica',
    'book.eyebrow': 'Бронирование', 'book.title': 'Мы подготовим для вас <em>стол</em>',
    'book.lead': 'Стол можно забронировать и по телефону. Аренду зала и кейтеринг обсуждаем по отдельному номеру.', 'book.telBook': 'Бронирование столов', 'book.telCater': 'Аренда зала / кейтеринг', 'book.hours': 'Часы работы',
    'form.date': 'Дата', 'form.time': 'Время', 'form.guests': 'Количество гостей', 'form.name': 'Имя', 'form.phone': 'Телефон',
    'form.note': 'Комментарий (аллергии, праздник…)', 'form.submit': 'Отправить запрос', 'form.doneTitle': 'Спасибо!', 'form.again': 'Новая бронь', 'form.gdpr': 'Отправляя форму, вы соглашаетесь на обработку персональных данных для оформления брони (GDPR).',
    'where.eyebrow': 'Как добраться', 'where.title': 'Švédská 42/58a, <em>Слезска-Острава</em>', 'where.lead': 'Мы находимся в районе Муглинов. Укажите, откуда едете, и Google Карты покажут маршрут на машине, общественном транспорте или пешком.', 'where.from': 'Откуда вы едете?', 'where.fromPh': 'например, Hlavní nádraží Ostrava', 'where.car': 'На машине', 'where.transit': 'Транспорт', 'where.walk': 'Пешком', 'where.go': 'Построить маршрут ↗', 'where.here': 'От моего места ↗',
    'foot.addr': 'Как добраться', 'foot.map': 'Открыть в Google Картах ↗', 'foot.route': 'Построить маршрут', 'foot.contact': 'Контакты', 'foot.copy': 'Скопировать', 'foot.telBook': 'Бронирование столов', 'foot.telCater': 'Аренда зала / кейтеринг', 'foot.hours': 'Часы работы', 'foot.monsat': 'Понедельник – суббота', 'foot.sun': 'Воскресенье', 'foot.tagline': 'Мы готовим честную чешскую кухню с ноткой французской деревни.', 'foot.gdpr': 'GDPR – Политика обработки персональных данных',
    
  };

  const UI = {
    cs: {
      days: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
      closed: 'zavřeno', openNow: (t) => `Právě otevřeno · do ${t}`, opensAt: (d, t) => `Zavřeno · otevíráme ${d} v ${t}`,
      today: 'dnes', tomorrow: 'zítra',
      errors: { date: 'Vyberte prosím datum.', name: 'Napište prosím své jméno.', phone: 'Zadejte telefon, ať vám můžeme potvrdit rezervaci.', past: 'Toto datum už proběhlo.' },
      done: (n, g, d, t) => `${n}, poptávku na ${g} ${g === 1 ? 'osobu' : g < 5 ? 'osoby' : 'osob'} ${d} v ${t} jsme přijali. Ozveme se vám s potvrzením. (Ukázková stránka: zpráva se nikam neodesílá.)`,
      copied: 'Zkopírováno ✓',
      lunch: { todaySoup: 'Dnešní polévka', weekend: 'O víkendu denní menu nevaříme, těšíme se v pondělí.', stale: 'Nové denní menu právě připravujeme.', soon: (d) => `Menu platí od ${d}` },
    },
    ru: {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      closed: 'выходной', openNow: (t) => `Сейчас открыто · до ${t}`, opensAt: (d, t) => `Закрыто · откроемся ${d} в ${t}`,
      today: 'сегодня', tomorrow: 'завтра',
      errors: { date: 'Выберите, пожалуйста, дату.', name: 'Укажите, пожалуйста, имя.', phone: 'Укажите телефон, чтобы мы могли подтвердить бронь.', past: 'Эта дата уже прошла.' },
      done: (n, g, d, t) => `${n}, запрос на столик для ${g} ${g === 1 ? 'персоны' : 'персон'} ${d} в ${t} принят. Мы свяжемся с вами для подтверждения. (Демо-страница: заявка никуда не отправляется.)`,
      copied: 'Скопировано ✓',
      lunch: { todaySoup: 'Суп дня', weekend: 'В выходные дневного меню нет, ждём вас в понедельник.', stale: 'Новое дневное меню скоро появится.', soon: (d) => `Меню действует с ${d}` },
    },
  };

  // Stálý jídelní lístek. p = cena v Kč, nebo text, když se cena mění.
  const I = (cs, ru, dcs, dru, g, p) => ({ n: { cs, ru }, d: dcs ? { cs: dcs, ru: dru } : null, g, p });
  const MENU = [
    { cat: { cs: 'Předkrmy', ru: 'Закуски' }, items: [
      I('Hovězí tatarák', 'Говяжий тартар', 'sušený žloutek · petrželová majonéza · nakládané hřiby · domácí pečivo', 'сушёный желток · петрушечный майонез · маринованные белые грибы · домашняя выпечка', '90 g', 235),
      I('Carpaccio z pomalu pečené vepřové krkovice', 'Карпаччо из томлёной свиной шейки', 'křenová majonéza · nakládaná hořčičná semínka · domácí pečivo', 'майонез с хреном · маринованные зёрна горчицы · домашняя выпечка', '120 g', 189),
    ] },
    { cat: { cs: 'Polévky', ru: 'Супы' }, items: [
      I('Hovězí vývar', 'Говяжий бульон', 'domácí těstovina · kořenová zelenina · hovězí maso', 'домашняя лапша · корнеплоды · говядина', '', 120),
      I('Dýňový krém', 'Тыквенный крем-суп', 'kokosové mléko · koriandr · nakládaná dýně', 'кокосовое молоко · кинза · маринованная тыква', '', 119),
      I('Krémová kyselica', 'Сливочная киселица', 'brambory · uzenina', 'картофель · копчёности', '', 115),
    ] },
    { cat: { cs: 'Hlavní chody', ru: 'Основные блюда' }, items: [
      I('Svíčková na smetaně', 'Свичкова на сметане', 'loupaná hovězí plec · karlovarský knedlík · brusinky', 'говяжья лопатка · карловарский кнедлик · брусника', '200 g', 365),
      I('Konfitované kachní stehno', 'Утиная ножка конфи', 'červené zelí · povidlová omáčka · variace domácích knedlíků', 'красная капуста · соус из повидла · ассорти домашних кнедликов', '400 g', 389),
      I('Daňčí hřbet', 'Спинка лани', 'topinambur · bramborová roláda · omáčka z jalovce', 'топинамбур · картофельный рулет · можжевёловый соус', '180 g', 489),
      I('Čerstvé tagliolini', 'Свежие тальолини', 'krémová omáčka z lesních hub · podzimní lanýž', 'сливочный соус из лесных грибов · осенний трюфель', '', 289),
      I('Čerstvé tagliolini s kuřecím prsem', 'Свежие тальолини с куриной грудкой', 'krémová omáčka z lesních hub · podzimní lanýž', 'сливочный соус из лесных грибов · осенний трюфель', '', 339),
      I('Vepřová panenka', 'Свиная вырезка', 'pastiňákové pyré · divoká brokolice · bramborová kroketa s lanýžem', 'пюре из пастернака · дикая брокколи · картофельная крокета с трюфелем', '180 g', 369),
      I('Králík', 'Кролик', 'pohanka · pečená červená řepa · slanina · hořčice', 'гречка · печёная свёкла · бекон · горчица', '180 g', 359),
      I('Grilovaná vepřová krkovice', 'Свиная шейка на гриле', 'bramborové noky · omáčka z pečeného česneku · restovaná sezónní zelenina', 'картофельные ньокки · соус из печёного чеснока · обжаренные сезонные овощи', '250 g', 349),
      I('Pstruh duhový', 'Радужная форель', 'máslové brambory · kopr', 'картофель со сливочным маслом · укроп', '200 g', 368),
      I('Smažená gouda', 'Жареный сыр гауда', 'máslové brambory · domácí tatarská omáčka', 'картофель со сливочным маслом · домашний соус тартар', '150 g', 279),
      I('Caesar salát s kuřecím masem', 'Салат «Цезарь» с курицей', 'římský salát · Caesar dresink · parmazán · slanina · domácí krutony · kuřecí prso', 'салат ромэн · соус «Цезарь» · пармезан · бекон · домашние крутоны · куриная грудка', '', 289),
    ] },
    { cat: { cs: 'Speciality', ru: 'Фирменное' }, items: [
      I('Steak dne', 'Стейк дня', 'sezónní příloha · omáčka dle aktuální nabídky', 'сезонный гарнир · соус по текущему предложению', '', { cs: 'cena dle aktuální nabídky', ru: 'цена по текущему предложению' }),
    ] },
    { cat: { cs: 'Dětské menu', ru: 'Детское меню' }, items: [
      I('Kuřecí řízek', 'Куриный шницель', 'hranolky · bramborová kaše', 'картофель фри · картофельное пюре', '100 g', 209),
      I('Smažená gouda', 'Жареная гауда', 'hranolky · bramborová kaše', 'картофель фри · картофельное пюре', '100 g', 209),
      I('Tagliolini', 'Тальолини', 'rajčatová omáčka · parmazán', 'томатный соус · пармезан', '150 g', 189),
    ] },
    { cat: { cs: 'Dezerty', ru: 'Десерты' }, items: [
      I('Éclair', 'Эклер', 'šlehaný pařížský krém · pistácie', 'взбитый парижский крем · фисташки', '', 159),
      I('Crème brûlée', 'Крем-брюле', 'pomeranč · crumble z bílé čokolády · perník', 'апельсин · крамбл из белого шоколада · пряник', '', 149),
    ] },
    { cat: { cs: 'Chuťovky a omáčky', ru: 'Снеки и соусы' }, items: [
      I('Domácí hranolky', 'Домашний картофель фри', '', '', '200 g', 69),
      I('Domácí bramborové lupínky', 'Домашние картофельные чипсы', 'dip · naše tatarka + ďábelská omáčka', 'дип · наш тартар + «дьявольский» соус', '250 g', 189),
      I('Pražené mandle', 'Жареный миндаль', '', '', '70 g', 99),
      I('Domácí tatarka', 'Домашний соус тартар', '', '', '50 g', 49),
      I('Ďábelská omáčka', '«Дьявольский» соус', '', '', '50 g', 49),
      I('Kečup', 'Кетчуп', '', '', '50 g', 39),
    ] },
  ];

  // Mon..Sun, [open, close] in hours; null = closed
  const HOURS = [[11, 21], [11, 21], [11, 21], [11, 21], [11, 21], [11, 21], [12, 20]];

  /* ---------- i18n ---------- */
  let lang = store.get('prostorica-lang') === 'ru' ? 'ru' : 'cs';
  const nodes = $$('[data-i18n]');
  nodes.forEach((el) => { el.dataset.cs = el.innerHTML; });
  const phNodes = $$('[data-i18n-ph]');
  phNodes.forEach((el) => { el.dataset.csPh = el.placeholder; });

  function applyLang() {
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = lang === 'ru' && RU[key] ? RU[key] : el.dataset.cs;
    });
    phNodes.forEach((el) => { el.placeholder = lang === 'ru' && RU[el.dataset.i18nPh] ? RU[el.dataset.i18nPh] : el.dataset.csPh; });
    $$('.lang__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    renderTabs(); renderMenu(false); renderLunch(); renderHours(); renderStatus();
  }
  $$('.lang__btn').forEach((b) => b.addEventListener('click', () => {
    if (lang === b.dataset.lang) return;
    lang = b.dataset.lang; store.set('prostorica-lang', lang); applyLang();
  }));

  /* ---------- Menu ---------- */
  let activeCat = 0;
  const tabs = $('#tabs'), ink = $('#tabsInk'), list = $('#menuList');
  const fmt = (n) => `${n.toLocaleString('cs-CZ')} Kč`;

  function renderTabs() {
    $$('.tab', tabs).forEach((t) => t.remove());
    MENU.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.role = 'tab'; b.id = `tab-${i}`;
      b.setAttribute('aria-selected', String(i === activeCat));
      b.textContent = c.cat[lang];
      b.addEventListener('click', () => { activeCat = i; updateTabs(); renderMenu(true); });
      tabs.appendChild(b);
    });
    requestAnimationFrame(moveInk);
  }
  function updateTabs() {
    $$('.tab', tabs).forEach((t, i) => t.setAttribute('aria-selected', String(i === activeCat)));
    moveInk();
  }
  function moveInk() {
    const t = $$('.tab', tabs)[activeCat];
    if (!t) return;
    ink.style.left = `${t.offsetLeft}px`; ink.style.width = `${t.offsetWidth}px`;
  }
  addEventListener('resize', moveInk);

  function renderMenu(animate) {
    list.setAttribute('aria-labelledby', `tab-${activeCat}`);
    list.innerHTML = MENU[activeCat].items.map((it, i) => {
      const price = typeof it.p === 'number' ? fmt(it.p) : it.p[lang];
      return `
      <article class="dish" style="--i:${animate ? i : 0};${animate ? '' : 'animation:none'}">
        <div class="dish__top"><span class="dish__name">${it.n[lang]}${it.g ? ` <span class="dish__g">— ${it.g}</span>` : ''}</span><span class="dish__dots"></span><span class="dish__price${typeof it.p === 'number' ? '' : ' dish__price--text'}">${price}</span></div>
        ${it.d ? `<p class="dish__desc">${it.d[lang]}</p>` : ''}
      </article>`;
    }).join('');
  }

  /* ---------- Weekly lunch teaser (data: js/denni-menu-data.js) ---------- */
  const LUNCH = window.DENNI_MENU;
  const pragueISO = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const tr = (o) => (lang === 'ru' && o.ru) || o.cs;
  const dm = (iso) => { const [, m, d] = iso.split('-'); return `${+d}. ${+m}.`; };
  function renderLunch() {
    if (!$('#lunchList') || !LUNCH) return;
    const L = UI[lang].lunch, today = pragueISO();
    const dayIdx = Math.round((Date.parse(today) - Date.parse(LUNCH.from)) / 864e5);
    const soup = LUNCH.soups.find((s) => s.day === dayIdx);
    let status;
    if (today > LUNCH.to) status = L.stale;
    else if (today < LUNCH.from) status = L.soon(dm(LUNCH.from));
    else status = soup ? `${L.todaySoup}: <strong>${tr(soup)}</strong>` : L.weekend;
    $('#lunchWeek').textContent = `${dm(LUNCH.from)} – ${dm(LUNCH.to)} ${LUNCH.to.slice(0, 4)} · ${LUNCH.hours}`;
    $('#lunchStatus').innerHTML = status;
    $('#lunchFrom').textContent = fmt(Math.min(...LUNCH.mains.map((m) => m.p)));
    $('#lunchList').innerHTML = LUNCH.mains.map((m, i) => `
      <li class="lunch__item reveal"><span class="lunch__no">${i + 1}.</span><span class="lunch__name">${tr(m)}<small>${m.g} · ${tr(m.side)}</small></span><span class="lunch__price">${fmt(m.p)}</span></li>`).join('');
    observeReveals($$('#lunchList .reveal'));
  }

  /* ---------- Hours & live status (Prague time) ---------- */
  function pragueNow() {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Prague', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(get('weekday'));
    return { day, h: +get('hour') + +get('minute') / 60 };
  }
  function renderHours() {
    const { day } = pragueNow();
    const u = UI[lang];
    $('#hours tbody').innerHTML = HOURS.map((h, i) => `
      <tr class="${i === day ? 'is-today' : ''}"><td>${u.days[i]}</td><td>${h ? `${h[0]}:00 – ${h[1]}:00` : u.closed}</td></tr>`).join('');
  }
  function renderStatus() {
    const { day, h } = pragueNow();
    const u = UI[lang], today = HOURS[day];
    const dot = $('#statusDot'), txt = $('#statusText');
    if (today && h >= today[0] && h < today[1]) {
      dot.classList.remove('is-closed'); txt.textContent = u.openNow(`${today[1]}:00`); return;
    }
    dot.classList.add('is-closed');
    if (today && h < today[0]) { txt.textContent = u.opensAt(u.today, `${today[0]}:00`); return; }
    for (let k = 1; k <= 7; k++) {
      const d = (day + k) % 7;
      if (HOURS[d]) { txt.textContent = u.opensAt(k === 1 ? u.tomorrow : u.days[d].toLowerCase(), `${HOURS[d][0]}:00`); return; }
    }
  }
  setInterval(renderStatus, 60000);

  /* ---------- Reservation form ---------- */
  const form = $('#bookForm'), err = $('#formError'), done = $('#formDone');
  const dateIn = $('#f-date'), timeIn = $('#f-time');
  let guests = 2;
  const pad = (n) => String(n).padStart(2, '0');
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  function initForm() {
    const t = new Date(); dateIn.min = iso(t);
    const next = new Date(t); next.setDate(t.getDate() + 1);
    dateIn.value = iso(next);
    fillSlots();
    const g = $('#guests');
    g.innerHTML = Array.from({ length: 8 }, (_, i) => `<button type="button" class="guest" role="radio" aria-checked="${i + 1 === guests}" data-g="${i + 1}">${i + 1}</button>`).join('');
  }
  $('#guests').addEventListener('click', (e) => {
    const b = e.target.closest('.guest'); if (!b) return;
    guests = +b.dataset.g;
    $$('.guest', $('#guests')).forEach((x) => x.setAttribute('aria-checked', String(x === b)));
  });

  // last table one hour before closing
  function fillSlots() {
    const prev = timeIn.value || '18:00';
    const d = dateIn.value ? new Date(`${dateIn.value}T12:00`) : new Date();
    const [open, close] = HOURS[(d.getDay() + 6) % 7];
    const slots = [];
    for (let m = open * 60; m <= (close - 1) * 60; m += 30) slots.push(`${Math.floor(m / 60)}:${pad(m % 60)}`);
    const pick = slots.includes(prev) ? prev : slots[slots.length - 1];
    timeIn.innerHTML = slots.map((s) => `<option${s === pick ? ' selected' : ''}>${s}</option>`).join('');
  }
  dateIn.addEventListener('change', fillSlots);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = UI[lang].errors;
    const name = $('#f-name'), phone = $('#f-phone');
    $$('.is-invalid', form).forEach((x) => x.classList.remove('is-invalid'));
    let msg = '', bad = null;
    const picked = dateIn.value ? new Date(`${dateIn.value}T12:00`) : null;
    if (!picked) { msg = u.date; bad = dateIn; }
    else if (dateIn.value < iso(new Date())) { msg = u.past; bad = dateIn; }
    else if (!name.value.trim()) { msg = u.name; bad = name; }
    else if (phone.value.replace(/\D/g, '').length < 9) { msg = u.phone; bad = phone; }
    if (msg) { err.textContent = msg; err.hidden = false; bad.classList.add('is-invalid'); bad.focus(); return; }
    err.hidden = true;
    const d = picked.toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'cs-CZ', { day: 'numeric', month: 'long' });
    $('#doneText').textContent = UI[lang].done(name.value.trim(), guests, d, timeIn.value);
    done.hidden = false;
  });
  $('#formAgain').addEventListener('click', () => { done.hidden = true; form.reset(); initForm(); });

  /* ---------- Copy phone numbers ---------- */
  $$('.copy-btn').forEach((btn) => btn.addEventListener('click', () => {
    const ok = () => { btn.textContent = UI[lang].copied; setTimeout(() => { btn.textContent = lang === 'ru' ? RU['foot.copy'] : btn.dataset.cs; }, 1800); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(btn.previousElementSibling); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); };
    try { navigator.clipboard.writeText(btn.dataset.copy).then(ok, fallback); } catch { fallback(); }
  }));

  /* ---------- Google Maps route ---------- */
  const DEST = 'Švédská 42/58a, 712 00 Slezská Ostrava';
  let mode = 'driving';
  const routeUrl = (from) => `https://www.google.com/maps/dir/?api=1${from ? `&origin=${encodeURIComponent(from)}` : ''}&destination=${encodeURIComponent(DEST)}&travelmode=${mode}`;
  function updateRoute() {
    $('#routeBtn').href = routeUrl($('#r-from').value.trim());
    $('#routeHere').href = routeUrl('');
  }
  $('#r-from').addEventListener('input', updateRoute);
  $('#routeModes').addEventListener('click', (e) => {
    const b = e.target.closest('.mode'); if (!b) return;
    mode = b.dataset.mode;
    $$('.mode').forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    updateRoute();
  });
  $('#routeForm').addEventListener('submit', (e) => { e.preventDefault(); updateRoute(); $('#routeBtn').click(); });

  /* ---------- Nav ---------- */
  const nav = $('#nav'), burger = $('#burger');
  const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  burger.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open); burger.setAttribute('aria-expanded', String(open));
  });
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => { nav.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }));

  const sections = $$('main section[id], footer[id]');
  const linkFor = (id) => $(`#navLinks a[href="#${id}"]`);
  if ('IntersectionObserver' in window) {
    const navObs = new IntersectionObserver((entries) => entries.forEach((en) => {
      const l = linkFor(en.target.id);
      if (l) l.classList.toggle('is-current', en.isIntersecting);
    }), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navObs.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  let revealObs = null;
  function observeReveals(els) {
    if (reduced || !('IntersectionObserver' in window)) return;
    revealObs = revealObs || new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.remove('is-pending'); en.target.classList.add('is-in');
      if (en.target.querySelector('.count')) countUp(en.target);
      revealObs.unobserve(en.target);
    }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.92) { el.classList.add('is-in'); return; } // already visible: never hide it
      el.classList.add('is-pending');
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
      revealObs.observe(el);
    });
  }
  function countUp(root) {
    $$('.count', root).forEach((el) => {
      const to = +el.dataset.to, t0 = performance.now(), dur = 1400;
      const step = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Parallax + hero tilt + magnetic buttons ---------- */
  const parallax = $$('.parallax');
  let ticking = false;
  function onParallax() {
    const narrow = innerWidth <= 900;
    parallax.forEach((el) => {
      if (narrow) { el.style.setProperty('--py', '0px'); return; }
      const r = el.parentElement.getBoundingClientRect();
      const off = (r.top + r.height / 2 - innerHeight / 2) * +el.dataset.speed;
      el.style.setProperty('--py', `${off.toFixed(1)}px`);
    });
    ticking = false;
  }
  if (!reduced) {
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onParallax); } }, { passive: true });
    onParallax();

    const mark = $('#heroMark');
    const fine = matchMedia('(pointer: fine)').matches;
    if (fine) {
      $('.hero').addEventListener('pointermove', (e) => {
        const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        mark.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translate(${x * 14}px, ${y * 14}px)`;
      });
      $('.hero').addEventListener('pointerleave', () => { mark.style.transform = ''; });
      $$('.magnetic').forEach((b) => {
        b.addEventListener('pointermove', (e) => {
          const r = b.getBoundingClientRect();
          b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
        });
        b.addEventListener('pointerleave', () => { b.style.transform = ''; });
      });
    }
  }

  /* ---------- Falling lavender petals ---------- */
  function petals() {
    const c = $('#petals'); if (!c || reduced) return;
    const ctx = c.getContext('2d');
    let w, h, dpr, ps = [];
    const colors = ['#9b84d8', '#b7a3e6', '#7b5ec6', '#cdbff0', '#8f9f7f'];
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(46, w / 26));
      ps = Array.from({ length: n }, () => make(true));
    }
    function make(anywhere) {
      return { x: Math.random() * w, y: anywhere ? Math.random() * h : -20, r: 2 + Math.random() * 4.5, vy: .25 + Math.random() * .6, sw: Math.random() * Math.PI * 2, rot: Math.random() * Math.PI, vr: (Math.random() - .5) * .02, col: colors[(Math.random() * colors.length) | 0], a: .35 + Math.random() * .45 };
    }
    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(c);
    function frame() {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        ps.forEach((p, i) => {
          p.sw += .012; p.y += p.vy; p.x += Math.sin(p.sw) * .45; p.rot += p.vr;
          if (p.y > h + 20) ps[i] = make(false);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.globalAlpha = p.a; ctx.fillStyle = p.col;
          ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .45, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        });
      }
      requestAnimationFrame(frame);
    }
    resize(); addEventListener('resize', resize); frame();
  }

  /* ---------- Dishes strip: duplicate for a seamless loop ---------- */
  const track = $('#dishTrack');
  if (track && !reduced) $$('img', track).forEach((im) => { const c = im.cloneNode(); c.alt = ''; c.setAttribute('aria-hidden', 'true'); track.appendChild(c); });

  /* ---------- Hall curtains ---------- */
  const hall = $('#hallPhoto');
  if (reduced || !('IntersectionObserver' in window)) hall.classList.add('is-open');
  else new IntersectionObserver(([en], o) => { if (en.isIntersecting) { hall.classList.add('is-open'); o.disconnect(); } }, { threshold: 0.35 }).observe(hall);

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbCount = $('#lbCount');
  const shots = $$('[data-lb]').sort((a, b) => a.dataset.lb - b.dataset.lb);
  let cur = 0, lastFocus = null;
  const capOf = (im) => im.closest('figure')?.querySelector('figcaption')?.textContent || im.alt;
  function show(i) {
    cur = (i + shots.length) % shots.length;
    const im = shots[cur];
    lbImg.src = im.currentSrc || im.src; lbImg.alt = im.alt;
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbCap.textContent = capOf(im); lbCount.textContent = `${cur + 1} / ${shots.length}`;
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbClose').focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.(); }
  shots.forEach((im, i) => {
    im.tabIndex = 0;
    im.addEventListener('click', () => openLb(i));
    im.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); } });
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => show(cur - 1));
  $('#lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb__fig')) closeLb(); });
  addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  let tx = null;
  lb.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });

  /* ---------- Boot ---------- */
  initForm();
  applyLang();
  observeReveals($$('.reveal, .photo-reveal'));
  petals();
})();
