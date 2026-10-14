/*
 * DENNÍ MENU — upravujte jednou týdně jen tento soubor.
 *
 * from / to   … první a poslední den platnosti (RRRR-MM-DD)
 * soups       … polévka na každý den, day: 0 = pondělí … 4 = pátek
 * mains       … hlavní chody v pořadí, jak se objednávají (1., 2., …)
 * a           … čísla alergenů, p … cena v Kč
 * ru, en, pl  … překlady (RU, EN, PL) jsou nepovinné; když chybí, zobrazí se čeština
 */
window.DENNI_MENU = {
  from: '2026-10-12',
  to: '2026-10-16',
  hours: '11:00–15:00',
  soups: [
    { day: 0, cs: 'Smetanová polévka s čočkou Beluga', ru: 'Сливочный суп с чечевицей белуга', en: 'Cream soup with Beluga lentils', pl: 'Zupa śmietanowa z soczewicą Beluga', a: '1, 7, 9' },
    { day: 1, cs: 'Rajská polévka s rýží', ru: 'Томатный суп с рисом', en: 'Tomato soup with rice', pl: 'Zupa pomidorowa z ryżem', a: '1, 7, 9' },
    { day: 2, cs: 'Krém z pečeného česneku s krutony', ru: 'Крем-суп из печёного чеснока с крутонами', en: 'Roasted garlic cream soup with croutons', pl: 'Krem z pieczonego czosnku z grzankami', a: '1, 7, 9' },
    { day: 3, cs: 'Masový vývar', ru: 'Мясной бульонрпр', en: 'Meat broth', pl: 'Rosół mięsny', a: '1, 3, 7, 9' },
    { day: 4, cs: 'Boršč', ru: 'Борщ', en: 'Borscht', pl: 'Barszcz', a: '1, 7, 9' },
  ],
  mains: [
    { cs: 'Vepřová panenka Wellington', ru: 'Свиная вырезка «Веллингтон»', en: 'Pork tenderloin Wellington', pl: 'Polędwiczka wieprzowa Wellington', g: '150 g', side: { cs: 'bramborové pyré', ru: 'картофельное пюре', en: 'mashed potatoes', pl: 'purée ziemniaczane' }, a: '1, 3, 7, 9', p: 259 },
    { cs: 'Pomalu pečený hovězí krk na mrkvi', ru: 'Томлёная говяжья шея на моркови', en: 'Slow-roasted beef neck on carrots', pl: 'Wolno pieczony karczek wołowy na marchwi', g: '150 g', side: { cs: 'pečené grenaille', ru: 'печёный молодой картофель', en: 'roasted grenaille potatoes', pl: 'pieczone ziemniaki grenaille' }, a: '1, 7, 9', p: 239 },
    { cs: 'Kuřecí soté', ru: 'Куриное соте', en: 'Chicken sauté', pl: 'Kurczak sauté', g: '150 g', side: { cs: 'žampiony · divoká brokolice · jasmínová rýže', ru: 'шампиньоны · дикая брокколи · жасминовый рис', en: 'mushrooms · wild broccoli · jasmine rice', pl: 'pieczarki · dzikie brokuły · ryż jaśminowy' }, a: '7, 9', p: 229 },
    { cs: 'Konfitovaný vepřový bok', ru: 'Свиная грудинка конфи', en: 'Confit pork belly', pl: 'Boczek wieprzowy confit', g: '180 g', side: { cs: 'grilované špičaté zelí · pečený brambor · omáčka z pečených paprik · kompot', ru: 'капуста на гриле · печёный картофель · соус из печёного перца · компот', en: 'grilled pointed cabbage · roast potato · roasted pepper sauce · compote', pl: 'grillowana kapusta szpiczasta · pieczony ziemniak · sos z pieczonej papryki · kompot' }, a: '7, 9', p: 219 },
    { cs: 'Zvěřinové ragú', ru: 'Рагу из дичи', en: 'Venison ragout', pl: 'Ragout z dziczyzny', g: '150 g', side: { cs: 'brusinky · kynutá nádivka', ru: 'брусника · дрожжевая хлебная запеканка', en: 'cranberries · yeast bread stuffing', pl: 'żurawina · drożdżowy farsz chlebowy' }, a: '1, 3, 7, 9', p: 249 },
    { cs: 'Císařský trhanec', ru: 'Кайзершмаррн', en: 'Kaiserschmarrn (shredded pancake)', pl: 'Kaiserschmarrn (cesarski omlet)', g: '300 g', side: { cs: 'švestky · tvaroh', ru: 'сливы · творог', en: 'plums · quark', pl: 'śliwki · twaróg' }, a: '1, 3, 7', p: 189 },
  ],
};
