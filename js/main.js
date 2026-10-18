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
    'nav.about': 'О нас', 'nav.menu': 'Меню', 'nav.lunch': 'Дневное меню', 'nav.rooms': 'Залы', 'nav.contact': 'Контакты', 'nav.where': 'Как добраться', 'nav.gallery': 'Галерея', 'nav.book': 'Бронь',
    'hero.eyebrow': 'Ресторан · Слезска-Острава', 'hero.t1': 'Чешская кухня', 'hero.t2': 'с ноткой', 'hero.t3': 'французской деревни',
    'hero.lead': 'Мы готовим честную чешскую кухню с ноткой французской деревни. Сезонные продукты, травы и вино небольших виноделен.',
    'hero.book': 'Забронировать стол', 'hero.menu': 'Смотреть меню',
    'marquee': 'лаванда · тимьян · розмарин · лесной мёд · козий сыр · оливки · инжир · шалфей · ',
    'about.eyebrow': 'О нас', 'about.title': 'Пространство для вкуса, <em>времени</em> и разговора',
    'about.p1': 'Prostorica родилась из простой идеи: готовить честную чешскую кухню, по сезону и с уважением к продукту. Вдохновение ищем во французской деревне, а продукты покупаем у фермеров из окрестностей Остравы.',
    'about.f1v': 'Пн–Вс', 'about.f1': 'открыто каждый день', 'about.f2': 'сезонных меню в год', 'about.f3': 'виноделен в винной карте',
    'menu.eyebrow': 'Основное меню', 'menu.drinks': 'Меню напитков →', 'menu.wine': 'Винная карта →', 'menu.title': 'Меню',
    'dishes.label': 'Чешская кухня в современном прочтении. Честно. Легко. Со вкусом.',
    'gallery.eyebrow': 'Галерея', 'gallery.title': 'Атмосфера <em>французской деревни</em>', 'gallery.c1': 'Полевые цветы на каждом столе', 'gallery.c2': 'Праздничный стол', 'gallery.c3': 'Лавандовые салфетки', 'gallery.c4': 'Салон', 'gallery.c5': 'Зал для праздников', 'gallery.c6': 'Длинный стол для семейных встреч',
    'rooms.eyebrow': 'Залы', 'rooms.title': 'Салоны и зал <em>для вашего праздника</em>', 'rooms.lead': 'Три помещения на десять–сто гостей. Выберите подходящее для вашего события, остальное обсудим по телефону.',
    'hall.eyebrow': 'Аренда зала / кейтеринг', 'hall.title': 'Свадьбы, праздники <em>и корпоративы</em>', 'hall.lead': 'Сдадим весь зал с оформлением под ваше событие или приготовим и привезём кейтеринг туда, где празднуете вы.',
    'menu.note': 'Половина порции — 70 % от цены блюда · вес указан в сыром виде · аллергены по запросу у персонала · упаковка с собой 15 Kč',
    'lunch.eyebrow': 'Дневное меню · пн–пт', 'lunch.title': 'Обед, который меняется <em>каждую неделю</em>', 'lunch.lead': 'Суп дня и шесть основных блюд на выбор. Будни с 11:00 до 15:00.', 'lunch.from': 'блюда от', 'lunch.cta': 'Всё дневное меню →',
    'quote.text': '«Хорошей еде нужны три вещи: сезон, терпение и стол, за которым никто не спешит».', 'quote.by': '— шеф-повар Prostorica',
    'book.eyebrow': 'Бронирование', 'book.title': 'Мы подготовим для вас <em>стол</em>',
    'book.lead': 'Столы бронируем по телефону. Аренду зала и кейтеринг обсуждаем по отдельному номеру.', 'call.eyebrow': 'Бронирование стола', 'call.title': 'Забронируйте по телефону', 'call.lead': 'Позвоните нам, и мы договоримся о дате, времени и количестве гостей. Поможем и с выбором салона.', 'call.show': 'Показать номер телефона', 'call.dial': 'Позвонить', 'call.note': 'Аренда зала и кейтеринг: +420 602 530 838', 'foot.op': 'Владелец', 'foot.reg': 'внесена в реестр предпринимателей', 'book.telBook': 'Бронирование столов', 'book.telCater': 'Аренда зала / кейтеринг', 'book.hours': 'Часы работы',
    'form.date': 'Дата', 'form.time': 'Время', 'form.guests': 'Количество гостей', 'form.name': 'Имя', 'form.phone': 'Телефон',
    'form.note': 'Комментарий (аллергии, праздник…)', 'form.submit': 'Отправить запрос', 'form.doneTitle': 'Спасибо!', 'form.again': 'Новая бронь', 'form.gdpr': 'Ваши данные мы используем только для оформления брони.', 'form.gdprLink': 'Политика обработки персональных данных', 'where.mapNote': 'Карта Google загрузится только после вашего согласия. При этом Google получит ваш IP-адрес.', 'where.mapBtn': 'Показать карту', 'foot.cookies': 'Настройки cookies',
    'where.eyebrow': 'Как добраться', 'where.title': 'Švédská 42/58a, <em>Слезска-Острава</em>', 'where.lead': 'Мы находимся в районе Муглинов. Укажите, откуда едете, и Google Карты покажут маршрут на машине, общественном транспорте или пешком.', 'where.from': 'Откуда вы едете?', 'where.fromPh': 'например, Hlavní nádraží Ostrava', 'where.car': 'На машине', 'where.transit': 'Транспорт', 'where.walk': 'Пешком', 'where.go': 'Построить маршрут ↗', 'where.here': 'От моего места ↗',
    'foot.addr': 'Как добраться', 'foot.map': 'Открыть в Google Картах ↗', 'foot.route': 'Построить маршрут', 'foot.contact': 'Контакты', 'foot.copy': 'Скопировать', 'foot.telBook': 'Бронирование столов', 'foot.telCater': 'Аренда зала / кейтеринг', 'foot.hours': 'Часы работы', 'foot.monsat': 'Понедельник – суббота', 'foot.sun': 'Воскресенье', 'foot.tagline': 'Мы готовим честную чешскую кухню с ноткой французской деревни.', 'foot.gdpr': 'GDPR – Политика обработки персональных данных',
    
  };

  const EN = {
    'nav.about': 'About', 'nav.menu': 'Menu', 'nav.lunch': 'Lunch menu', 'nav.rooms': 'Spaces', 'nav.contact': 'Contact', 'nav.where': 'Find us', 'nav.gallery': 'Gallery', 'nav.book': 'Book',
    'hero.eyebrow': 'Restaurant · Slezská Ostrava', 'hero.t1': 'Czech cuisine', 'hero.t2': 'with a touch', 'hero.t3': 'of the French countryside',
    'hero.lead': 'We serve honest Czech cooking with a touch of the French countryside. Seasonal produce, herbs and wine from small wineries.',
    'hero.book': 'Book a table', 'hero.menu': 'See the menu',
    'marquee': 'lavender · thyme · rosemary · wild honey · goat cheese · olives · figs · sage · ',
    'about.eyebrow': 'About us', 'about.title': 'A place for flavour, <em>time</em> and conversation',
    'about.p1': 'Prostorica grew from a simple idea: cook honest Czech food, follow the seasons and respect the ingredients. We look to the French countryside for inspiration and buy from farmers around Ostrava.',
    'about.f1v': 'Mon–Sun', 'about.f1': 'open every day', 'about.f2': 'seasonal menus a year', 'about.f3': 'wineries on our wine list',
    'menu.eyebrow': 'À la carte', 'menu.drinks': 'Drinks list →', 'menu.wine': 'Wine list →', 'menu.title': 'Menu',
    'dishes.label': 'Czech cuisine, the modern way. Honest. Light. Full of flavour.',
    'gallery.eyebrow': 'Gallery', 'gallery.title': 'The feel of the <em>French countryside</em>', 'gallery.c1': 'Wild flowers on every table', 'gallery.c2': 'A festive table', 'gallery.c3': 'Lavender napkins', 'gallery.c4': 'The salon', 'gallery.c5': 'A hall for celebrations', 'gallery.c6': 'A long table for family gatherings',
    'rooms.eyebrow': 'Our spaces', 'rooms.title': 'Salons and a hall <em>for your celebration</em>', 'rooms.lead': 'Three spaces for ten to a hundred guests. Pick the one that suits your event and we’ll arrange the rest by phone.',
    'hall.eyebrow': 'Hall hire / catering', 'hall.title': 'Weddings, parties <em>and company evenings</em>', 'hall.lead': 'Hire the whole hall, decorated to suit your event, or let us cook and deliver catering wherever you celebrate.',
    'menu.note': 'Half portion 70 % of the price · weights are raw weights · ask our staff about allergens · takeaway box 15 Kč',
    'lunch.eyebrow': 'Lunch menu · Mon–Fri', 'lunch.title': 'A lunch that changes <em>every week</em>', 'lunch.lead': 'Soup of the day and six main courses to choose from. Weekdays 11:00–15:00.', 'lunch.from': 'mains from', 'lunch.cta': 'Full lunch menu →',
    'quote.text': '“Good food needs three things: the season, patience and a table where nobody is in a hurry.”', 'quote.by': '— Prostorica head chef',
    'book.eyebrow': 'Reservations', 'book.title': 'We’ll have a <em>table</em> ready for you',
    'book.lead': 'We take table reservations by phone. Hall hire and catering have their own number.', 'call.eyebrow': 'Table reservations', 'call.title': 'Book by phone', 'call.lead': 'Give us a call and we’ll agree the date, time and number of guests. We’re happy to help you choose a salon too.', 'call.show': 'Show phone number', 'call.dial': 'Call', 'call.note': 'Hall hire and catering: +420 602 530 838', 'foot.op': 'Operator', 'foot.reg': 'registered in the Trade Register', 'book.telBook': 'Table reservations', 'book.telCater': 'Hall hire / catering', 'book.hours': 'Opening hours',
    'form.date': 'Date', 'form.time': 'Time', 'form.guests': 'Guests', 'form.name': 'Name', 'form.phone': 'Phone',
    'form.note': 'Note (allergies, celebration…)', 'form.submit': 'Send request', 'form.doneTitle': 'Thank you!', 'form.again': 'New booking', 'form.gdpr': 'We only use your details to handle the booking.', 'form.gdprLink': 'Privacy policy', 'where.mapNote': 'The Google map loads only with your consent. Google then receives your IP address.', 'where.mapBtn': 'Show map', 'foot.cookies': 'Cookie settings',
    'where.eyebrow': 'Find us', 'where.title': 'Švédská 42/58a, <em>Slezská Ostrava</em>', 'where.lead': 'We are in Muglinov. Tell us where you’re coming from and Google Maps will show the way by car, public transport or on foot.', 'where.from': 'Where are you coming from?', 'where.fromPh': 'e.g. Ostrava main station', 'where.car': 'By car', 'where.transit': 'Transit', 'where.walk': 'Walking', 'where.go': 'Get directions ↗', 'where.here': 'From my location ↗',
    'foot.addr': 'Find us', 'foot.map': 'Open in Google Maps ↗', 'foot.route': 'Get directions', 'foot.contact': 'Contact', 'foot.copy': 'Copy', 'foot.telBook': 'Table reservations', 'foot.telCater': 'Hall hire / catering', 'foot.hours': 'Opening hours', 'foot.monsat': 'Monday – Saturday', 'foot.sun': 'Sunday', 'foot.tagline': 'We serve honest Czech cooking with a touch of the French countryside.', 'foot.gdpr': 'GDPR – Privacy policy',
  };

  const PL = {
    'nav.about': 'O nas', 'nav.menu': 'Menu', 'nav.lunch': 'Menu dnia', 'nav.rooms': 'Sale', 'nav.contact': 'Kontakt', 'nav.where': 'Dojazd', 'nav.gallery': 'Galeria', 'nav.book': 'Rezerwacja',
    'hero.eyebrow': 'Restauracja · Slezská Ostrava', 'hero.t1': 'Kuchnia czeska', 'hero.t2': 'z nutą', 'hero.t3': 'francuskiej wsi',
    'hero.lead': 'Gotujemy uczciwą kuchnię czeską z nutą francuskiej wsi. Sezonowe produkty, zioła i wino z małych winnic.',
    'hero.book': 'Zarezerwuj stolik', 'hero.menu': 'Zobacz menu',
    'marquee': 'lawenda · tymianek · rozmaryn · miód leśny · kozi ser · oliwki · figi · szałwia · ',
    'about.eyebrow': 'O nas', 'about.title': 'Miejsce na smak, <em>czas</em> i rozmowę',
    'about.p1': 'Prostorica powstała z prostej myśli: gotować uczciwą kuchnię czeską, zgodnie z sezonem i z szacunkiem do produktu. Inspiracji szukamy na francuskiej wsi, a produkty kupujemy od rolników z okolic Ostrawy.',
    'about.f1v': 'Pn–Nd', 'about.f1': 'otwarte codziennie', 'about.f2': 'sezonowe menu w roku', 'about.f3': 'winnic w karcie win',
    'menu.eyebrow': 'Karta dań', 'menu.drinks': 'Karta napojów →', 'menu.wine': 'Karta win →', 'menu.title': 'Menu',
    'dishes.label': 'Kuchnia czeska w nowoczesnym wydaniu. Uczciwie. Lekko. Ze smakiem.',
    'gallery.eyebrow': 'Galeria', 'gallery.title': 'Atmosfera <em>francuskiej wsi</em>', 'gallery.c1': 'Polne kwiaty na każdym stole', 'gallery.c2': 'Odświętny stół', 'gallery.c3': 'Lawendowe serwetki', 'gallery.c4': 'Salonik', 'gallery.c5': 'Sala na uroczystości', 'gallery.c6': 'Długi stół na rodzinne spotkania',
    'rooms.eyebrow': 'Sale', 'rooms.title': 'Saloniki i sala <em>na Wasze przyjęcie</em>', 'rooms.lead': 'Trzy przestrzenie dla dziesięciu do stu gości. Wybierzcie tę, która pasuje do Waszego wydarzenia, resztę ustalimy telefonicznie.',
    'hall.eyebrow': 'Wynajem sali / catering', 'hall.title': 'Wesela, przyjęcia <em>i imprezy firmowe</em>', 'hall.lead': 'Wynajmiemy całą salę z dekoracją dopasowaną do okazji albo przygotujemy i dowieziemy catering tam, gdzie świętujecie.',
    'menu.note': 'Pół porcji 70 % ceny dania · gramatura w stanie surowym · alergeny na życzenie u obsługi · opakowanie na wynos 15 Kč',
    'lunch.eyebrow': 'Menu dnia · pon.–pt.', 'lunch.title': 'Obiad, który zmienia się <em>co tydzień</em>', 'lunch.lead': 'Zupa dnia i sześć dań głównych do wyboru. W dni robocze 11:00–15:00.', 'lunch.from': 'dania od', 'lunch.cta': 'Całe menu dnia →',
    'quote.text': '„Dobre jedzenie potrzebuje trzech rzeczy: sezonu, cierpliwości i stołu, przy którym nikt się nie spieszy.”', 'quote.by': '— szef kuchni Prostoriki',
    'book.eyebrow': 'Rezerwacja', 'book.title': 'Przygotujemy dla Was <em>stolik</em>',
    'book.lead': 'Rezerwacje stolików przyjmujemy telefonicznie. Wynajem sali i catering ustalamy pod osobnym numerem.', 'call.eyebrow': 'Rezerwacja stolika', 'call.title': 'Zarezerwuj telefonicznie', 'call.lead': 'Zadzwoń do nas, a ustalimy datę, godzinę i liczbę gości. Chętnie pomożemy też wybrać salonik.', 'call.show': 'Pokaż numer telefonu', 'call.dial': 'Zadzwoń', 'call.note': 'Wynajem sali i catering: +420 602 530 838', 'foot.op': 'Właściciel', 'foot.reg': 'wpisana do rejestru działalności gospodarczej', 'book.telBook': 'Rezerwacja stolików', 'book.telCater': 'Wynajem sali / catering', 'book.hours': 'Godziny otwarcia',
    'form.date': 'Data', 'form.time': 'Godzina', 'form.guests': 'Liczba gości', 'form.name': 'Imię', 'form.phone': 'Telefon',
    'form.note': 'Uwagi (alergie, uroczystość…)', 'form.submit': 'Wyślij zapytanie', 'form.doneTitle': 'Dziękujemy!', 'form.again': 'Nowa rezerwacja', 'form.gdpr': 'Twoje dane wykorzystamy wyłącznie do obsługi rezerwacji.', 'form.gdprLink': 'Zasady przetwarzania danych osobowych', 'where.mapNote': 'Mapa Google załaduje się dopiero po Twojej zgodzie. Google otrzyma wtedy Twój adres IP.', 'where.mapBtn': 'Pokaż mapę', 'foot.cookies': 'Ustawienia cookies',
    'where.eyebrow': 'Dojazd', 'where.title': 'Švédská 42/58a, <em>Slezská Ostrava</em>', 'where.lead': 'Jesteśmy w dzielnicy Muglinov. Wpisz, skąd jedziesz, a Mapy Google pokażą trasę samochodem, komunikacją lub pieszo.', 'where.from': 'Skąd jedziesz?', 'where.fromPh': 'np. dworzec główny Ostrava', 'where.car': 'Samochodem', 'where.transit': 'Komunikacją', 'where.walk': 'Pieszo', 'where.go': 'Wyznacz trasę ↗', 'where.here': 'Z mojej lokalizacji ↗',
    'foot.addr': 'Dojazd', 'foot.map': 'Otwórz w Mapach Google ↗', 'foot.route': 'Wyznacz trasę', 'foot.contact': 'Kontakt', 'foot.copy': 'Kopiuj', 'foot.telBook': 'Rezerwacja stolików', 'foot.telCater': 'Wynajem sali / catering', 'foot.hours': 'Godziny otwarcia', 'foot.monsat': 'Poniedziałek – sobota', 'foot.sun': 'Niedziela', 'foot.tagline': 'Gotujemy uczciwą kuchnię czeską z nutą francuskiej wsi.', 'foot.gdpr': 'RODO – Zasady przetwarzania danych osobowych',
  };

  const DICT = { ru: RU, en: EN, pl: PL };

  const UI = {
    cs: {
      days: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
      closed: 'zavřeno', openNow: (t) => `Právě otevřeno · do ${t}`, opensAt: (d, t) => `Zavřeno · otevíráme ${d} v ${t}`,
      today: 'dnes', tomorrow: 'zítra',
      errors: { date: 'Vyberte prosím datum.', name: 'Napište prosím své jméno.', phone: 'Zadejte telefon, ať vám můžeme potvrdit rezervaci.', past: 'Toto datum už proběhlo.' },
      done: (n, g, d, t) => `${n}, poptávku na ${g} ${g === 1 ? 'osobu' : g < 5 ? 'osoby' : 'osob'} ${d} v ${t} jsme přijali. Ozveme se vám s potvrzením. (Ukázková stránka: zpráva se nikam neodesílá.)`,
      copied: 'Zkopírováno ✓',
      rooms: { unit: 'hostů', fit: 'Vhodné pro', priv: 'Nejvíce soukromí', cta: 'Poptat prostor', soon: 'Fotografie doplníme', scale: 'kapacita', tags: { birthday: 'Narozeniny', family: 'Rodinný oběd', reunion: 'Sraz absolventů', wedding: 'Svatby', ball: 'Maturitní plesy', company: 'Firemní večírky', business: 'Obchodní schůzky' } },
      lunch: { todaySoup: 'Dnešní polévka', weekend: 'O víkendu denní menu nevaříme, těšíme se v pondělí.', stale: 'Nové denní menu právě připravujeme.', soon: (d) => `Menu platí od ${d}` },
    },
    ru: {
      days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
      closed: 'выходной', openNow: (t) => `Сейчас открыто · до ${t}`, opensAt: (d, t) => `Закрыто · откроемся ${d} в ${t}`,
      today: 'сегодня', tomorrow: 'завтра',
      errors: { date: 'Выберите, пожалуйста, дату.', name: 'Укажите, пожалуйста, имя.', phone: 'Укажите телефон, чтобы мы могли подтвердить бронь.', past: 'Эта дата уже прошла.' },
      done: (n, g, d, t) => `${n}, запрос на столик для ${g} ${g === 1 ? 'персоны' : 'персон'} ${d} в ${t} принят. Мы свяжемся с вами для подтверждения. (Демо-страница: заявка никуда не отправляется.)`,
      copied: 'Скопировано ✓',
      rooms: { unit: 'гостей', fit: 'Подходит для', priv: 'Больше всего приватности', cta: 'Узнать о зале', soon: 'Фото скоро появятся', scale: 'вместимость', tags: { birthday: 'Дни рождения', family: 'Семейный обед', reunion: 'Встреча выпускников', wedding: 'Свадьбы', ball: 'Выпускные балы', company: 'Корпоративы', business: 'Бизнес-встречи' } },
      lunch: { todaySoup: 'Суп дня', weekend: 'В выходные дневного меню нет, ждём вас в понедельник.', stale: 'Новое дневное меню скоро появится.', soon: (d) => `Меню действует с ${d}` },
    },
    en: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      closed: 'closed', openNow: (t) => `Open now · until ${t}`, opensAt: (d, t) => `Closed · we open ${d} at ${t}`,
      today: 'today', tomorrow: 'tomorrow',
      errors: { date: 'Please choose a date.', name: 'Please enter your name.', phone: 'Please enter a phone number so we can confirm the booking.', past: 'This date has already passed.' },
      done: (n, g, d, t) => `${n}, we have your request for ${g} ${g === 1 ? 'guest' : 'guests'} on ${d} at ${t}. We will get back to you to confirm. (Demo page: the request is not sent anywhere.)`,
      copied: 'Copied ✓',
      rooms: { unit: 'guests', fit: 'Ideal for', priv: 'Most private', cta: 'Enquire', soon: 'Photos coming soon', scale: 'capacity', tags: { birthday: 'Birthdays', family: 'Family lunches', reunion: 'Class reunions', wedding: 'Weddings', ball: 'Graduation balls', company: 'Company parties', business: 'Business meetings' } },
      lunch: { todaySoup: 'Today’s soup', weekend: 'No lunch menu at weekends. See you on Monday.', stale: 'The new lunch menu is on its way.', soon: (d) => `Valid from ${d}` },
    },
    pl: {
      days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      closed: 'nieczynne', openNow: (t) => `Teraz otwarte · do ${t}`, opensAt: (d, t) => `Zamknięte · otwieramy ${d} o ${t}`,
      today: 'dziś', tomorrow: 'jutro',
      errors: { date: 'Wybierz datę.', name: 'Podaj swoje imię.', phone: 'Podaj numer telefonu, abyśmy mogli potwierdzić rezerwację.', past: 'Ta data już minęła.' },
      done: (n, g, d, t) => `${n}, przyjęliśmy zapytanie o stolik dla ${g} ${g === 1 ? 'osoby' : 'osób'} na ${d}, godz. ${t}. Odezwiemy się z potwierdzeniem. (Strona demonstracyjna: zapytanie nie jest nigdzie wysyłane.)`,
      copied: 'Skopiowano ✓',
      rooms: { unit: 'gości', fit: 'Idealna na', priv: 'Najwięcej prywatności', cta: 'Zapytaj o salę', soon: 'Zdjęcia wkrótce', scale: 'pojemność', tags: { birthday: 'Urodziny', family: 'Rodzinny obiad', reunion: 'Zjazd absolwentów', wedding: 'Wesela', ball: 'Studniówki', company: 'Imprezy firmowe', business: 'Spotkania biznesowe' } },
      lunch: { todaySoup: 'Zupa dnia', weekend: 'W weekend nie ma menu dnia. Zapraszamy w poniedziałek.', stale: 'Nowe menu dnia właśnie przygotowujemy.', soon: (d) => `Obowiązuje od ${d}` },
    },
  };

  // Stálý jídelní lístek. p = cena v Kč, nebo text (ve všech jazycích), když se cena mění.
  const I = (n, d, g, p) => ({ n, d, g, p });
  const MENU = [
    { cat: {"cs": "Předkrmy", "ru": "Закуски", "en": "Starters", "pl": "Przystawki"}, items: [
      I({"cs": "Hovězí tatarák", "ru": "Говяжий тартар", "en": "Beef tartare", "pl": "Tatar wołowy"}, {"cs": "sušený žloutek · petrželová majonéza · nakládané hřiby · domácí pečivo", "ru": "сушёный желток · петрушечный майонез · маринованные белые грибы · домашняя выпечка", "en": "dried egg yolk · parsley mayonnaise · pickled porcini · homemade bread", "pl": "suszone żółtko · majonez pietruszkowy · marynowane borowiki · domowe pieczywo"}, "90 g", 235),
      I({"cs": "Carpaccio z pomalu pečené vepřové krkovice", "ru": "Карпаччо из томлёной свиной шейки", "en": "Slow-roasted pork neck carpaccio", "pl": "Carpaccio z wolno pieczonej karkówki"}, {"cs": "křenová majonéza · nakládaná hořčičná semínka · domácí pečivo", "ru": "майонез с хреном · маринованные зёрна горчицы · домашняя выпечка", "en": "horseradish mayonnaise · pickled mustard seeds · homemade bread", "pl": "majonez chrzanowy · marynowane ziarna gorczycy · domowe pieczywo"}, "120 g", 189),
    ] },
    { cat: {"cs": "Polévky", "ru": "Супы", "en": "Soups", "pl": "Zupy"}, items: [
      I({"cs": "Hovězí vývar", "ru": "Говяжий бульон", "en": "Beef broth", "pl": "Rosół wołowy"}, {"cs": "domácí těstovina · kořenová zelenina · hovězí maso", "ru": "домашняя лапша · корнеплоды · говядина", "en": "homemade noodles · root vegetables · beef", "pl": "domowy makaron · warzywa korzeniowe · wołowina"}, "", 120),
      I({"cs": "Dýňový krém", "ru": "Тыквенный крем-суп", "en": "Pumpkin cream soup", "pl": "Krem z dyni"}, {"cs": "kokosové mléko · koriandr · nakládaná dýně", "ru": "кокосовое молоко · кинза · маринованная тыква", "en": "coconut milk · coriander · pickled pumpkin", "pl": "mleko kokosowe · kolendra · marynowana dynia"}, "", 119),
      I({"cs": "Krémová kyselica", "ru": "Сливочная киселица", "en": "Creamy kyselica sour soup", "pl": "Kremowa kwaśnica (kyselica)"}, {"cs": "brambory · uzenina", "ru": "картофель · копчёности", "en": "potatoes · smoked sausage", "pl": "ziemniaki · wędzonka"}, "", 115),
    ] },
    { cat: {"cs": "Hlavní chody", "ru": "Основные блюда", "en": "Main courses", "pl": "Dania główne"}, items: [
      I({"cs": "Svíčková na smetaně", "ru": "Свичкова на сметане", "en": "Svíčková – beef in cream sauce", "pl": "Svíčková – wołowina w sosie śmietanowym"}, {"cs": "loupaná hovězí plec · karlovarský knedlík · brusinky", "ru": "говяжья лопатка · карловарский кнедлик · брусника", "en": "braised beef shoulder · Carlsbad dumpling · cranberries", "pl": "łopatka wołowa · knedel karlowarski · żurawina"}, "200 g", 365),
      I({"cs": "Konfitované kachní stehno", "ru": "Утиная ножка конфи", "en": "Confit duck leg", "pl": "Udko kacze confit"}, {"cs": "červené zelí · povidlová omáčka · variace domácích knedlíků", "ru": "красная капуста · соус из повидла · ассорти домашних кнедликов", "en": "red cabbage · plum butter sauce · a choice of homemade dumplings", "pl": "czerwona kapusta · sos z powideł · wybór domowych knedli"}, "400 g", 389),
      I({"cs": "Daňčí hřbet", "ru": "Спинка лани", "en": "Fallow deer loin", "pl": "Comber z daniela"}, {"cs": "topinambur · bramborová roláda · omáčka z jalovce", "ru": "топинамбур · картофельный рулет · можжевёловый соус", "en": "Jerusalem artichoke · potato roulade · juniper sauce", "pl": "topinambur · rolada ziemniaczana · sos jałowcowy"}, "180 g", 489),
      I({"cs": "Čerstvé tagliolini", "ru": "Свежие тальолини", "en": "Fresh tagliolini", "pl": "Świeże tagliolini"}, {"cs": "krémová omáčka z lesních hub · podzimní lanýž", "ru": "сливочный соус из лесных грибов · осенний трюфель", "en": "creamy wild mushroom sauce · autumn truffle", "pl": "kremowy sos z leśnych grzybów · jesienna trufla"}, "", 289),
      I({"cs": "Čerstvé tagliolini s kuřecím prsem", "ru": "Свежие тальолини с куриной грудкой", "en": "Fresh tagliolini with chicken breast", "pl": "Świeże tagliolini z piersią kurczaka"}, {"cs": "krémová omáčka z lesních hub · podzimní lanýž", "ru": "сливочный соус из лесных грибов · осенний трюфель", "en": "creamy wild mushroom sauce · autumn truffle", "pl": "kremowy sos z leśnych grzybów · jesienna trufla"}, "", 339),
      I({"cs": "Vepřová panenka", "ru": "Свиная вырезка", "en": "Pork tenderloin", "pl": "Polędwiczka wieprzowa"}, {"cs": "pastiňákové pyré · divoká brokolice · bramborová kroketa s lanýžem", "ru": "пюре из пастернака · дикая брокколи · картофельная крокета с трюфелем", "en": "parsnip purée · wild broccoli · potato croquette with truffle", "pl": "purée z pasternaku · dzikie brokuły · krokiet ziemniaczany z truflą"}, "180 g", 369),
      I({"cs": "Králík", "ru": "Кролик", "en": "Rabbit", "pl": "Królik"}, {"cs": "pohanka · pečená červená řepa · slanina · hořčice", "ru": "гречка · печёная свёкла · бекон · горчица", "en": "buckwheat · roasted beetroot · bacon · mustard", "pl": "kasza gryczana · pieczony burak · boczek · musztarda"}, "180 g", 359),
      I({"cs": "Grilovaná vepřová krkovice", "ru": "Свиная шейка на гриле", "en": "Grilled pork neck", "pl": "Grillowana karkówka"}, {"cs": "bramborové noky · omáčka z pečeného česneku · restovaná sezónní zelenina", "ru": "картофельные ньокки · соус из печёного чеснока · обжаренные сезонные овощи", "en": "potato gnocchi · roasted garlic sauce · sautéed seasonal vegetables", "pl": "kluski ziemniaczane · sos z pieczonego czosnku · smażone warzywa sezonowe"}, "250 g", 349),
      I({"cs": "Pstruh duhový", "ru": "Радужная форель", "en": "Rainbow trout", "pl": "Pstrąg tęczowy"}, {"cs": "máslové brambory · kopr", "ru": "картофель со сливочным маслом · укроп", "en": "buttered potatoes · dill", "pl": "ziemniaki z masłem · koperek"}, "200 g", 368),
      I({"cs": "Smažená gouda", "ru": "Жареный сыр гауда", "en": "Fried Gouda", "pl": "Smażony ser gouda"}, {"cs": "máslové brambory · domácí tatarská omáčka", "ru": "картофель со сливочным маслом · домашний соус тартар", "en": "buttered potatoes · homemade tartar sauce", "pl": "ziemniaki z masłem · domowy sos tatarski"}, "150 g", 279),
      I({"cs": "Caesar salát s kuřecím masem", "ru": "Салат «Цезарь» с курицей", "en": "Caesar salad with chicken", "pl": "Sałatka Cezar z kurczakiem"}, {"cs": "římský salát · Caesar dresink · parmazán · slanina · domácí krutony · kuřecí prso", "ru": "салат ромэн · соус «Цезарь» · пармезан · бекон · домашние крутоны · куриная грудка", "en": "romaine · Caesar dressing · parmesan · bacon · homemade croutons · chicken breast", "pl": "sałata rzymska · sos Cezar · parmezan · boczek · domowe grzanki · pierś z kurczaka"}, "", 289),
    ] },
    { cat: {"cs": "Speciality", "ru": "Фирменное", "en": "Specialities", "pl": "Specjalności"}, items: [
      I({"cs": "Steak dne", "ru": "Стейк дня", "en": "Steak of the day", "pl": "Stek dnia"}, {"cs": "sezónní příloha · omáčka dle aktuální nabídky", "ru": "сезонный гарнир · соус по текущему предложению", "en": "seasonal side · sauce of the day", "pl": "sezonowy dodatek · sos według bieżącej oferty"}, "", {"cs": "cena dle aktuální nabídky", "ru": "цена по текущему предложению", "en": "price as per current offer", "pl": "cena według bieżącej oferty"}),
    ] },
    { cat: {"cs": "Dětské menu", "ru": "Детское меню", "en": "Kids' menu", "pl": "Menu dla dzieci"}, items: [
      I({"cs": "Kuřecí řízek", "ru": "Куриный шницель", "en": "Chicken schnitzel", "pl": "Sznycel z kurczaka"}, {"cs": "hranolky · bramborová kaše", "ru": "картофель фри · картофельное пюре", "en": "fries · mashed potatoes", "pl": "frytki · purée ziemniaczane"}, "100 g", 209),
      I({"cs": "Smažená gouda", "ru": "Жареная гауда", "en": "Fried Gouda", "pl": "Smażony ser gouda"}, {"cs": "hranolky · bramborová kaše", "ru": "картофель фри · картофельное пюре", "en": "fries · mashed potatoes", "pl": "frytki · purée ziemniaczane"}, "100 g", 209),
      I({"cs": "Tagliolini", "ru": "Тальолини", "en": "Tagliolini", "pl": "Tagliolini"}, {"cs": "rajčatová omáčka · parmazán", "ru": "томатный соус · пармезан", "en": "tomato sauce · parmesan", "pl": "sos pomidorowy · parmezan"}, "150 g", 189),
    ] },
    { cat: {"cs": "Dezerty", "ru": "Десерты", "en": "Desserts", "pl": "Desery"}, items: [
      I({"cs": "Éclair", "ru": "Эклер", "en": "Éclair", "pl": "Ekler"}, {"cs": "šlehaný pařížský krém · pistácie", "ru": "взбитый парижский крем · фисташки", "en": "whipped Parisian cream · pistachio", "pl": "ubity krem paryski · pistacje"}, "", 159),
      I({"cs": "Crème brûlée", "ru": "Крем-брюле", "en": "Crème brûlée", "pl": "Crème brûlée"}, {"cs": "pomeranč · crumble z bílé čokolády · perník", "ru": "апельсин · крамбл из белого шоколада · пряник", "en": "orange · white chocolate crumble · gingerbread", "pl": "pomarańcza · kruszonka z białej czekolady · piernik"}, "", 149),
    ] },
    { cat: {"cs": "Chuťovky a omáčky", "ru": "Снеки и соусы", "en": "Snacks & sauces", "pl": "Przekąski i sosy"}, items: [
      I({"cs": "Domácí hranolky", "ru": "Домашний картофель фри", "en": "Homemade fries", "pl": "Domowe frytki"}, null, "200 g", 69),
      I({"cs": "Domácí bramborové lupínky", "ru": "Домашние картофельные чипсы", "en": "Homemade potato crisps", "pl": "Domowe chipsy ziemniaczane"}, {"cs": "dip · naše tatarka + ďábelská omáčka", "ru": "дип · наш тартар + «дьявольский» соус", "en": "dip · our tartar + devil’s sauce", "pl": "dip · nasz sos tatarski + sos diabelski"}, "250 g", 189),
      I({"cs": "Pražené mandle", "ru": "Жареный миндаль", "en": "Roasted almonds", "pl": "Prażone migdały"}, null, "70 g", 99),
      I({"cs": "Domácí tatarka", "ru": "Домашний соус тартар", "en": "Homemade tartar sauce", "pl": "Domowy sos tatarski"}, null, "50 g", 49),
      I({"cs": "Ďábelská omáčka", "ru": "«Дьявольский» соус", "en": "Devil’s sauce", "pl": "Sos diabelski"}, null, "50 g", 49),
      I({"cs": "Kečup", "ru": "Кетчуп", "en": "Ketchup", "pl": "Keczup"}, null, "50 g", 39),
    ] },
  ];

  // Mon..Sun, [open, close] in hours; null = closed
  const HOURS = [[11, 21], [11, 21], [11, 21], [11, 21], [11, 21], [11, 21], [12, 20]];

  /* ---------- i18n ---------- */
  const LANGS = ['cs', 'ru', 'en', 'pl'];
  const LOCALE = { cs: 'cs-CZ', ru: 'ru-RU', en: 'en-GB', pl: 'pl-PL' };
  const stored = store.get('prostorica-lang');
  let lang = LANGS.includes(stored) ? stored : 'cs';
  const t = (key) => (DICT[lang] && DICT[lang][key]) || null;
  const nodes = $$('[data-i18n]');
  nodes.forEach((el) => { el.dataset.cs = el.innerHTML; });
  const phNodes = $$('[data-i18n-ph]');
  phNodes.forEach((el) => { el.dataset.csPh = el.placeholder; });

  function applyLang() {
    document.documentElement.lang = lang;
    nodes.forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = t(key) || el.dataset.cs;
    });
    phNodes.forEach((el) => { el.placeholder = t(el.dataset.i18nPh) || el.dataset.csPh; });
    $$('.lang__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    renderTabs(); renderMenu(false); renderLunch(); renderRooms(); renderHours(); renderStatus();
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
      b.textContent = tr(c.cat);
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
      const price = typeof it.p === 'number' ? fmt(it.p) : tr(it.p);
      return `
      <article class="dish" style="--i:${animate ? i : 0};${animate ? '' : 'animation:none'}">
        <div class="dish__top"><span class="dish__name">${tr(it.n)}${it.g ? ` <span class="dish__g">— ${it.g}</span>` : ''}</span><span class="dish__dots"></span><span class="dish__price${typeof it.p === 'number' ? '' : ' dish__price--text'}">${price}</span></div>
        ${it.d ? `<p class="dish__desc">${tr(it.d)}</p>` : ''}
      </article>`;
    }).join('');
  }

  /* ---------- Weekly lunch teaser (data: js/denni-menu-data.js) ---------- */
  const LUNCH = window.DENNI_MENU;
  const pragueISO = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const tr = (o) => o[lang] || o.cs;
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

  /* ---------- Rooms (data: js/prostory-data.js) ---------- */
  const ROOMS = window.PROSTORY;
  const SCALE = 100;
  function renderRooms() {
    const grid = $('#roomsGrid');
    if (!grid || !ROOMS) return;
    const R = UI[lang].rooms;
    let lb = 100;
    grid.innerHTML = ROOMS.map((r, i) => {
      const slots = [0, 1, 2].map((n) => {
        const src = r.photos[n];
        return src
          ? `<figure class="slot${n ? '' : ' slot--main'}"><img src="${src}" alt="${r.name}" loading="lazy" data-lb="${lb++}"><figcaption hidden>${r.name}</figcaption></figure>`
          : `<div class="slot slot--empty${n ? '' : ' slot--main'}" aria-hidden="true"><img src="assets/sprig-small.webp" alt="" width="145" height="288"><span>${n ? '' : R.soon}</span></div>`;
      }).join('');
      const left = (r.min / SCALE) * 100, width = ((r.max - r.min) / SCALE) * 100;
      return `
      <article class="room reveal${r.private ? ' room--private' : ''}" style="--i:${i}" id="prostor-${r.id}">
        <div class="room__photos">${slots}</div>
        <div class="room__body">
          ${r.private ? `<span class="room__badge">${R.priv}</span>` : ''}
          <h3 class="room__name">${r.name}</h3>
          ${lang !== 'cs' && r.sub[lang] ? `<p class="room__sub">${r.sub[lang]}</p>` : ''}
          <p class="room__cap"><span class="room__num">${r.min}–${r.max}</span> ${R.unit}</p>
          <div class="room__scale" role="img" aria-label="${R.scale}: ${r.min}–${r.max} ${R.unit}">
            <span class="room__range" style="left:${left}%;width:${width}%"></span>
          </div>
          <div class="room__ticks" aria-hidden="true"><span>0</span><span>50</span><span>100</span></div>
          <p class="room__fit">${R.fit}</p>
          <ul class="room__tags">${r.tags.map((t) => `<li>${R.tags[t]}</li>`).join('')}</ul>
          <p class="room__text">${tr(r.text)}</p>
          <a class="link room__cta" href="tel:+420602530838">${R.cta} · +420 602 530 838</a>
        </div>
      </article>`;
    }).join('');
    observeReveals($$('.room', grid));
    $$('[data-lb]', grid).forEach((im) => { im.tabIndex = 0; });
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

  /* ---------- Phone reservation card ---------- */
  const callBtn = $('#callReveal');
  callBtn?.addEventListener('click', () => {
    $('#callNumber').hidden = false;
    callBtn.hidden = true;
    callBtn.setAttribute('aria-expanded', 'true');
    $('#callNumber .callcard__tel').focus();
  });

  /* ---------- Copy phone numbers ---------- */
  $$('.copy-btn').forEach((btn) => btn.addEventListener('click', () => {
    const ok = () => { btn.textContent = UI[lang].copied; setTimeout(() => { btn.innerHTML = t('foot.copy') || btn.dataset.cs; }, 1800); };
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
  // open/close the mobile menu; the page underneath must not scroll while it is open
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('#navLinks a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 760 && nav.classList.contains('is-open')) setMenu(false); });

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
  // collected on every open, so photos rendered later (rooms, language switch) are included
  let shots = [], cur = 0, lastFocus = null;
  const collectShots = () => { shots = $$('[data-lb]').sort((a, b) => a.dataset.lb - b.dataset.lb); };
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
  const openFrom = (im) => { collectShots(); openLb(shots.indexOf(im)); };
  document.addEventListener('click', (e) => { const im = e.target.closest('[data-lb]'); if (im) openFrom(im); });
  document.addEventListener('keydown', (e) => {
    const im = e.target.closest?.('[data-lb]');
    if (im && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openFrom(im); }
  });
  const focusable = () => $$('[data-lb]').forEach((im) => { im.tabIndex = 0; });
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

  /* ---------- Google map, only with consent for external content ---------- */
  const MAP_SRC = 'https://www.google.com/maps?q=Restaurace%20Prostorica%2C%20%C5%A0v%C3%A9dsk%C3%A1%2042%2F58a%2C%20712%2000%20Slezsk%C3%A1%20Ostrava&z=15&output=embed';
  function showMap() {
    const gate = $('#mapGate');
    if (!gate) return;
    const f = document.createElement('iframe');
    f.className = 'where__iframe'; f.title = 'Mapa: Restaurace Prostorica'; f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade'; f.src = MAP_SRC;
    gate.replaceWith(f);
  }
  $('#mapLoad')?.addEventListener('click', () => { window.ProstoricaConsent ? window.ProstoricaConsent.grant('external') : showMap(); });
  window.ProstoricaConsent?.onChange((c) => { if (c.external) showMap(); });

  /* ---------- Boot ---------- */
  applyLang();
  observeReveals($$('.reveal, .photo-reveal'));
  focusable();
  petals();
})();
