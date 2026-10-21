/*
 * PROSTORY — salónky a sál.
 *
 * min / max … kapacita (počet hostů)
 * tags      … pro co se prostor hodí (klíče: birthday, family, reunion, wedding, ball, company, business)
 * private   … true = zvýrazní se jako „nejvíce soukromí“
 * photos    … cesty k fotkám, např. 'assets/photos/prostory/modry-1.webp'
 *             První fotka je velká, další dvě menší. Prázdné místo zobrazí rámeček „Fotografie doplníme“.
 * text      … krátký popis; ru, en, pl jsou nepovinné (když chybí, zobrazí se čeština)
 */
window.PROSTORY = [
  {
    id: 'modry',
    name: 'Modrý salónek',
    sub: { ru: 'Синий салон', en: 'Blue salon', pl: 'Niebieski salonik' },
    min: 10, max: 15,
    tags: ['birthday', 'family', 'reunion'],
    private: false,
    photos: [],
    text: {
      cs: 'Útulný salónek pro menší společnost. Oslavte narozeniny, sejděte se s rodinou u oběda nebo s bývalými spolužáky.',
      ru: 'Уютный салон для небольшой компании. Отметьте день рождения, соберитесь семьёй на обед или встретьтесь с одноклассниками.',
      en: 'A cosy salon for smaller groups. Celebrate a birthday, gather the family for lunch or meet up with old classmates.',
      pl: 'Przytulny salonik dla mniejszego grona. Świętujcie urodziny, spotkajcie się z rodziną na obiedzie albo z dawnymi kolegami ze szkoły.',
    },
  },
  {
    id: 'velky',
    name: 'Velký sál',
    sub: { ru: 'Большой зал', en: 'Grand hall', pl: 'Duża sala' },
    min: 30, max: 140,
    tags: ['wedding', 'ball', 'company'],
    private: false,
    photos: [],
    text: {
      cs: 'Náš největší prostor pro velké oslavy a společenské akce. Výzdobu i menu připravíme na míru vaší události.',
      ru: 'Наше самое большое помещение для больших праздников и светских мероприятий. Оформление и меню подготовим под ваше событие.',
      en: 'Our largest space, made for big celebrations and social events. We tailor the decoration and menu to your occasion.',
      pl: 'Nasza największa przestrzeń na duże uroczystości i wydarzenia. Dekorację i menu przygotujemy pod Wasze wydarzenie.',
    },
  },
  {
    id: 'spodni',
    name: 'Spodní salónek',
    sub: { ru: 'Нижний салон', en: 'Lower salon', pl: 'Dolny salonik' },
    min: 10, max: 25,
    tags: ['birthday', 'family', 'reunion', 'business'],
    private: true,
    photos: [],
    text: {
      cs: 'Nejsoukromnější z našich prostor. Ideální, když chcete být jen mezi svými, nebo potřebujete v klidu a nerušeně jednat.',
      ru: 'Самое уединённое из наших помещений. Идеально, если хочется побыть только своим кругом или спокойно, без помех провести переговоры.',
      en: 'The most private of our spaces. Ideal when you want to be among your own people, or need to talk business in peace.',
      pl: 'Najbardziej kameralna z naszych przestrzeni. Idealna, gdy chcecie być tylko we własnym gronie albo potrzebujecie spokojnie i bez zakłóceń porozmawiać o interesach.',
    },
  },
];
