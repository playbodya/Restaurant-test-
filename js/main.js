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
    'nav.about': 'О нас', 'nav.menu': 'Меню', 'nav.tasting': 'Дегустация', 'nav.contact': 'Контакты', 'nav.where': 'Как добраться', 'nav.book': 'Бронь',
    'hero.eyebrow': 'Ресторан · Слезска-Острава', 'hero.t1': 'Чешская кухня', 'hero.t2': 'с ноткой', 'hero.t3': 'французской деревни',
    'hero.lead': 'Мы готовим честную чешскую кухню с ноткой французской деревни. Сезонные продукты, травы и вино небольших виноделен.',
    'hero.book': 'Забронировать стол', 'hero.menu': 'Смотреть меню',
    'marquee': 'лаванда · тимьян · розмарин · лесной мёд · козий сыр · оливки · инжир · шалфей · ',
    'about.eyebrow': 'О нас', 'about.title': 'Пространство для вкуса, <em>времени</em> и разговора',
    'about.p1': 'Prostorica родилась из простой идеи: готовить честную чешскую кухню, по сезону и с уважением к продукту. Вдохновение ищем во французской деревне, а продукты покупаем у фермеров из окрестностей Остравы.',
    'about.p2': 'Меню меняется четыре раза в год. Хлеб печём каждое утро, травы срываем прямо перед подачей, а лаванду с нашего огорода вы найдёте и в десертах, и в лимонаде.',
    'about.f1': 'мест за столами', 'about.f2': 'сезонных меню в год', 'about.f3': 'малых виноделен',
    'menu.eyebrow': 'Осеннее меню 2026', 'menu.title': 'Меню',
    'menu.note': 'Цифры у блюд обозначают аллергены (1–14) по регламенту ЕС 1169/2011. Полный список принесём к столу.',
    'tasting.eyebrow': 'Четверг – суббота, с 18:00', 'tasting.title': 'Дегустационный вечер из пяти подач',
    'tasting.lead': 'Доверьтесь кухне. К каждой подаче — бокал вина, который подберёт наш сомелье.',
    'tasting.p1': 'меню', 'tasting.p2': 'с винным сопровождением',
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
    },
    ru: {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      closed: 'выходной', openNow: (t) => `Сейчас открыто · до ${t}`, opensAt: (d, t) => `Закрыто · откроемся ${d} в ${t}`,
      today: 'сегодня', tomorrow: 'завтра',
      errors: { date: 'Выберите, пожалуйста, дату.', name: 'Укажите, пожалуйста, имя.', phone: 'Укажите телефон, чтобы мы могли подтвердить бронь.', past: 'Эта дата уже прошла.' },
      done: (n, g, d, t) => `${n}, запрос на столик для ${g} ${g === 1 ? 'персоны' : 'персон'} ${d} в ${t} принят. Мы свяжемся с вами для подтверждения. (Демо-страница: заявка никуда не отправляется.)`,
      copied: 'Скопировано ✓',
    },
  };

  const MENU = [
    { cat: { cs: 'Předkrmy', ru: 'Закуски' }, items: [
      { n: { cs: 'Kozí sýr s levandulovým medem', ru: 'Козий сыр с лавандовым мёдом' }, d: { cs: 'pečený fík, vlašské ořechy, kváskový chléb', ru: 'печёный инжир, грецкий орех, хлеб на закваске' }, g: '120 g', a: '1, 7, 8', p: 245, v: true },
      { n: { cs: 'Tatarák z pstruha', ru: 'Тартар из форели' }, d: { cs: 'šalotka, kapary, citronová crème fraîche', ru: 'шалот, каперсы, лимонный крем-фреш' }, g: '90 g', a: '4, 7', p: 285 },
      { n: { cs: 'Tapenáda a focaccia', ru: 'Тапенад и фокачча' }, d: { cs: 'černé olivy, rozmarýn, olivový olej z Provence', ru: 'чёрные оливки, розмарин, прованское оливковое масло' }, g: '150 g', a: '1', p: 165, v: true },
      { n: { cs: 'Polévka z pečené dýně', ru: 'Суп из печёной тыквы' }, d: { cs: 'šalvějové máslo, dýňová semínka', ru: 'масло с шалфеем, тыквенные семечки' }, g: '0,3 l', a: '7, 9', p: 145, v: true },
    ] },
    { cat: { cs: 'Hlavní chody', ru: 'Основные блюда' }, items: [
      { n: { cs: 'Kachní prso s tymiánem', ru: 'Утиная грудка с тимьяном' }, d: { cs: 'pyré z celeru, višňová omáčka, pečená mrkev', ru: 'пюре из сельдерея, вишнёвый соус, печёная морковь' }, g: '180 g', a: '7, 9, 12', p: 445 },
      { n: { cs: 'Ratatouille z pece', ru: 'Рататуй из печи' }, d: { cs: 'lilek, cuketa, rajčata, bazalkové pesto', ru: 'баклажан, цукини, томаты, песто из базилика' }, g: '300 g', a: '7, 8', p: 325, v: true },
      { n: { cs: 'Candát na másle', ru: 'Судак на сливочном масле' }, d: { cs: 'beurre blanc, pórek, brambory s pažitkou', ru: 'бёр-блан, лук-порей, картофель с шнитт-луком' }, g: '160 g', a: '4, 7, 12', p: 465 },
      { n: { cs: 'Jehněčí kýta po provensálsku', ru: 'Ягнёнок по-провански' }, d: { cs: 'bylinková krusta, fazole, pečený česnek', ru: 'травяная корочка, фасоль, запечённый чеснок' }, g: '200 g', a: '1, 3, 10', p: 525 },
    ] },
    { cat: { cs: 'Dezerty', ru: 'Десерты' }, items: [
      { n: { cs: 'Levandulová crème brûlée', ru: 'Лавандовый крем-брюле' }, d: { cs: 'karamelizovaný cukr, máslová sušenka', ru: 'карамелизованный сахар, песочное печенье' }, g: '140 g', a: '1, 3, 7', p: 165, v: true },
      { n: { cs: 'Tarte tatin', ru: 'Тарт татен' }, d: { cs: 'jablka z Polabí, vanilková zmrzlina', ru: 'яблоки из Полабья, ванильное мороженое' }, g: '160 g', a: '1, 3, 7', p: 175, v: true },
      { n: { cs: 'Sýrový talíř', ru: 'Сырная тарелка' }, d: { cs: 'tři sýry z farmy Hrušov, hroznové chutney', ru: 'три сыра фермы Грушов, виноградный чатни' }, g: '120 g', a: '7, 8', p: 245, v: true },
    ] },
    { cat: { cs: 'Nápoje', ru: 'Напитки' }, items: [
      { n: { cs: 'Levandulová limonáda', ru: 'Лавандовый лимонад' }, d: { cs: 'domácí sirup, citron, perlivá voda', ru: 'домашний сироп, лимон, газированная вода' }, g: '0,4 l', a: '—', p: 95, v: true },
      { n: { cs: 'Ryzlink rýnský, Morava', ru: 'Рислинг рейнский, Моравия' }, d: { cs: 'suché, svěží, minerální', ru: 'сухое, свежее, минеральное' }, g: '0,15 l', a: '12', p: 125 },
      { n: { cs: 'Côtes de Provence rosé', ru: 'Côtes de Provence розе' }, d: { cs: 'jahody, grep, lehká slanost', ru: 'клубника, грейпфрут, лёгкая солоноватость' }, g: '0,15 l', a: '12', p: 145 },
      { n: { cs: 'Bylinný čaj ze zahrádky', ru: 'Травяной чай с огорода' }, d: { cs: 'máta, meduňka, levandule', ru: 'мята, мелисса, лаванда' }, g: '0,5 l', a: '—', p: 85, v: true },
    ] },
  ];

  const COURSES = [
    { n: { cs: 'Chléb, máslo a levandulová sůl', ru: 'Хлеб, масло и лавандовая соль' }, d: { cs: 'kváskový chléb z ranního pečení', ru: 'хлеб на закваске утренней выпечки' }, w: 'Crémant de Loire' },
    { n: { cs: 'Pstruh, okurka, kopr', ru: 'Форель, огурец, укроп' }, d: { cs: 'marinovaný pstruh z Pošumaví', ru: 'маринованная форель из Пошумавья' }, w: 'Sauvignon, Pálava' },
    { n: { cs: 'Dýně, šalvěj, lískové ořechy', ru: 'Тыква, шалфей, фундук' }, d: { cs: 'ravioli z domácího těsta', ru: 'равиоли из домашнего теста' }, w: 'Chardonnay, Velké Žernoseky' },
    { n: { cs: 'Kachna, višně, celer', ru: 'Утка, вишня, сельдерей' }, d: { cs: 'zrající kachní prso, tymiánová šťáva', ru: 'выдержанная утиная грудка, соус с тимьяном' }, w: 'Bandol rouge' },
    { n: { cs: 'Levandule, med, broskev', ru: 'Лаванда, мёд, персик' }, d: { cs: 'parfait, pečená broskev, medová tuile', ru: 'парфе, печёный персик, медовое тюиль' }, w: 'Muscat de Beaumes-de-Venise' },
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
    renderTabs(); renderMenu(false); renderCourses(); renderHours(); renderStatus();
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
    const veg = lang === 'ru' ? 'вегетарианское' : 'vegetariánské';
    const al = lang === 'ru' ? 'аллергены' : 'alergeny';
    list.setAttribute('aria-labelledby', `tab-${activeCat}`);
    list.innerHTML = MENU[activeCat].items.map((it, i) => `
      <article class="dish" style="--i:${animate ? i : 0};${animate ? '' : 'animation:none'}">
        <div class="dish__top"><span class="dish__name">${it.n[lang]}</span><span class="dish__dots"></span><span class="dish__price">${fmt(it.p)}</span></div>
        <p class="dish__desc">${it.d[lang]}</p>
        <p class="dish__meta"><span>${it.g}</span><span>${al}: ${it.a}</span>${it.v ? `<span class="tag">● ${veg}</span>` : ''}</p>
      </article>`).join('');
  }

  function renderCourses() {
    $('#courses').innerHTML = COURSES.map((c) => `
      <li class="course reveal"><div><h3>${c.n[lang]}</h3><p>${c.d[lang]}</p><p class="wine">${c.w}</p></div></li>`).join('');
    observeReveals($$('#courses .reveal'));
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

  /* ---------- Boot ---------- */
  initForm();
  applyLang();
  observeReveals($$('.reveal'));
  petals();
})();
