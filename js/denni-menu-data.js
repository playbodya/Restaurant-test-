/*
 * DENNÍ MENU — upravujte jednou týdně jen tento soubor.
 *
 * from / to   … první a poslední den platnosti (RRRR-MM-DD)
 * soups       … polévka na každý den, day: 0 = pondělí … 4 = pátek
 * mains       … hlavní chody v pořadí, jak se objednávají (1., 2., …)
 * a           … čísla alergenů, p … cena v Kč
 * ru          … ruský překlad je nepovinný; když chybí, zobrazí se čeština
 */
window.DENNI_MENU = {
  from: '2026-10-12',
  to: '2026-10-16',
  hours: '11:00–15:00',
  soups: [
    { day: 0, cs: 'Smetanová polévka s čočkou Beluga', ru: 'Сливочный суп с чечевицей белуга', a: '1, 7, 9' },
    { day: 1, cs: 'Rajská polévka s rýží', ru: 'Томатный суп с рисом', a: '1, 7, 9' },
    { day: 2, cs: 'Krém z pečeného česneku s krutony', ru: 'Крем-суп из печёного чеснока с крутонами', a: '1, 7, 9' },
    { day: 3, cs: 'Masový vývar', ru: 'Мясной бульон', a: '1, 3, 7, 9' },
    { day: 4, cs: 'Boršč', ru: 'Борщ', a: '1, 7, 9' },
  ],
  mains: [
    { cs: 'Vepřová panenka Wellington', ru: 'Свиная вырезка «Веллингтон»', g: '150 g', side: { cs: 'bramborové pyré', ru: 'картофельное пюре' }, a: '1, 3, 7, 9', p: 259 },
    { cs: 'Pomalu pečený hovězí krk na mrkvi', ru: 'Томлёная говяжья шея на моркови', g: '150 g', side: { cs: 'pečené grenaille', ru: 'печёный молодой картофель' }, a: '1, 7, 9', p: 239 },
    { cs: 'Kuřecí soté', ru: 'Куриное соте', g: '150 g', side: { cs: 'žampiony · divoká brokolice · jasmínová rýže', ru: 'шампиньоны · дикая брокколи · жасминовый рис' }, a: '7, 9', p: 229 },
    { cs: 'Konfitovaný vepřový bok', ru: 'Свиная грудинка конфи', g: '180 g', side: { cs: 'grilované špičaté zelí · pečený brambor · omáčka z pečených paprik · kompot', ru: 'капуста на гриле · печёный картофель · соус из печёного перца · компот' }, a: '7, 9', p: 219 },
    { cs: 'Zvěřinové ragú', ru: 'Рагу из дичи', g: '150 g', side: { cs: 'brusinky · kynutá nádivka', ru: 'брусника · дрожжевая хлебная запеканка' }, a: '1, 3, 7, 9', p: 249 },
    { cs: 'Císařský trhanec', ru: 'Кайзершмаррн', g: '300 g', side: { cs: 'švestky · tvaroh', ru: 'сливы · творог' }, a: '1, 3, 7', p: 189 },
  ],
};
