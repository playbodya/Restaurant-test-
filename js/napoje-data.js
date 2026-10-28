/*
 * NÁPOJOVÝ A VINNÝ LÍSTEK
 *
 * Každá kategorie: cat (název), note (poznámka, nepovinná), items (položky).
 * Položka:
 *   n  … název (text, nebo { cs, ru, en, pl } když se překládá)
 *   d  … popis / složení (nepovinné)
 *   v  … objem, např. '0,5 l'
 *   p  … cena v Kč, NEBO víc velikostí: [['0,5 l', 55], ['0,3 l', 47]]
 * Vína navíc: s … typ (suché, pozdní sběr…), w … vinařství, nealko: true … nealkoholické
 * ru, en, pl jsou nepovinné; když chybí, zobrazí se čeština.
 */
(() => {
  const DRY = { cs: 'suché', ru: 'сухое', en: 'dry', pl: 'wytrawne' };
  const L = (cs, ru, en, pl) => ({ cs, ru, en, pl });
  const MILK = L('espresso, mléko, mléčná pěna', 'эспрессо, молоко, молочная пена', 'espresso, milk, milk foam', 'espresso, mleko, mleczna pianka');
  const HONEY = L('med, citron', 'мёд, лимон', 'honey, lemon', 'miód, cytryna');
  const RUM = (cs, ru, en, pl) => L(`${cs} rum`, `${ru} ром`, `${en} rum`, `rum ${pl}`);
  const HERB = L('bylinný likér', 'травяной ликёр', 'herbal liqueur', 'likier ziołowy');

  window.NAPOJE = {
    drinks: [
      {
        cat: L('Horké nápoje – káva', 'Горячие напитки — кофе', 'Hot drinks – coffee', 'Napoje gorące – kawa'),
        note: L('Všechny kávy lze připravit také v bezkofeinové verzi.', 'Любой кофе можно приготовить без кофеина.', 'All coffees are also available decaffeinated.', 'Każdą kawę przygotujemy także w wersji bezkofeinowej.'),
        items: [
          { n: 'Espresso', v: '30 ml', p: 65 },
          { n: 'Lungo', v: '60 ml', p: 65 },
          { n: 'Doppio', v: '60 ml', p: 85 },
          { n: 'Cappuccino', d: MILK, p: 75 },
          { n: 'Latte Macchiato', d: MILK, p: 79 },
          { n: 'Flat white', d: L('2× espresso, mléko, mléčná pěna', '2× эспрессо, молоко, молочная пена', '2× espresso, milk, milk foam', '2× espresso, mleko, mleczna pianka'), p: 85 },
          { n: L('Turecká káva', 'Кофе по-турецки', 'Turkish coffee', 'Kawa po turecku'), d: L('mletá káva, voda', 'молотый кофе, вода', 'ground coffee, water', 'kawa mielona, woda'), p: 65 },
          { n: L('Vídeňská káva', 'Кофе по-венски', 'Viennese coffee', 'Kawa po wiedeńsku'), d: L('lungo, šlehačka', 'лунго, взбитые сливки', 'lungo, whipped cream', 'lungo, bita śmietana'), p: 69 },
          { n: L('Alžírská káva', 'Кофе по-алжирски', 'Algerian coffee', 'Kawa po algiersku'), d: L('lungo, 0,02 l vaječný likér, šlehačka', 'лунго, 0,02 л яичного ликёра, взбитые сливки', 'lungo, 0.02 l egg liqueur, whipped cream', 'lungo, 0,02 l likieru jajecznego, bita śmietana'), p: 89 },
          { n: L('Baileys káva', 'Кофе с Baileys', 'Baileys coffee', 'Kawa z Baileys'), d: L('latte macchiato, 0,02 l Baileys', 'латте макиато, 0,02 л Baileys', 'latte macchiato, 0.02 l Baileys', 'latte macchiato, 0,02 l Baileys'), p: 99 },
          { n: L('Bezlaktózové mléko', 'Безлактозное молоко', 'Lactose-free milk', 'Mleko bez laktozy'), p: 19 },
        ],
      },
      {
        cat: L('Příchutě do kávy', 'Сиропы к кофе', 'Coffee flavours', 'Syropy do kawy'),
        items: [
          { n: L('Vanilka', 'Ваниль', 'Vanilla', 'Wanilia'), p: 15 },
          { n: L('Čokoláda', 'Шоколад', 'Chocolate', 'Czekolada'), p: 15 },
          { n: L('Karamel', 'Карамель', 'Caramel', 'Karmel'), p: 15 },
        ],
      },
      {
        cat: L('Studené kávy', 'Холодный кофе', 'Iced coffee', 'Kawy na zimno'),
        items: [
          { n: L('Ledová káva', 'Кофе гляссе', 'Iced coffee', 'Kawa mrożona'), d: L('lungo, vanilková zmrzlina, led, šlehačka', 'лунго, ванильное мороженое, лёд, взбитые сливки', 'lungo, vanilla ice cream, ice, whipped cream', 'lungo, lody waniliowe, lód, bita śmietana'), p: 99 },
          { n: 'Caffè Frappé', d: L('rozpustná káva, mléko, led', 'растворимый кофе, молоко, лёд', 'instant coffee, milk, ice', 'kawa rozpuszczalna, mleko, lód'), p: 89 },
          { n: 'Espresso Tonic', d: L('lungo, tonic, led, citrus', 'лунго, тоник, лёд, цитрус', 'lungo, tonic, ice, citrus', 'lungo, tonik, lód, cytrus'), p: 85 },
          { n: L('Ledové latté', 'Айс-латте', 'Iced latte', 'Latte na zimno'), d: L('lungo, mléko, led', 'лунго, молоко, лёд', 'lungo, milk, ice', 'lungo, mleko, lód'), p: 89 },
        ],
      },
      {
        cat: L('Horké nápoje – čaje, ostatní', 'Горячие напитки — чай и другое', 'Hot drinks – tea & more', 'Napoje gorące – herbaty i inne'),
        items: [
          { n: L('Teekane čaj', 'Чай Teekane', 'Teekane tea', 'Herbata Teekane'), d: HONEY, p: 69 },
          { n: L('Čaj z čerstvé máty', 'Чай из свежей мяты', 'Fresh mint tea', 'Herbata ze świeżej mięty'), d: HONEY, p: 89 },
          { n: L('Čaj z čerstvého zázvoru', 'Чай из свежего имбиря', 'Fresh ginger tea', 'Herbata ze świeżego imbiru'), d: HONEY, p: 89 },
          { n: L('Čaj z pečeného ovoce', 'Чай из печёных фруктов', 'Baked fruit tea', 'Herbata z pieczonych owoców'), d: HONEY, p: 89 },
          { n: L('Horká čokoláda', 'Горячий шоколад', 'Hot chocolate', 'Gorąca czekolada'), p: 75 },
          { n: L('Svařené víno', 'Глинтвейн', 'Mulled wine', 'Grzane wino'), d: L('červené / bílé, směs koření', 'красное / белое, смесь специй', 'red / white, spice blend', 'czerwone / białe, mieszanka przypraw'), p: 85 },
          { n: L('Horký džus', 'Горячий сок', 'Hot juice', 'Gorący sok'), p: 69 },
          { n: 'Grog', d: L('0,04 l Heffron, voda, citron', '0,04 л Heffron, вода, лимон', '0.04 l Heffron, water, lemon', '0,04 l Heffron, woda, cytryna'), p: 89 },
          { n: L('Šlehačka', 'Взбитые сливки', 'Whipped cream', 'Bita śmietana'), p: 15 },
          { n: L('Horké mléko', 'Горячее молоко', 'Hot milk', 'Gorące mleko'), v: '1 dcl', p: 15 },
        ],
      },
      {
        cat: L('Nealkoholické nápoje', 'Безалкогольные напитки', 'Soft drinks', 'Napoje bezalkoholowe'),
        items: [
          { n: 'Pepsi, Pepsi Zero, Schweppes', d: L('pink, klasik, zázvor, bitter lemon', 'pink, классик, имбирь, bitter lemon', 'pink, classic, ginger, bitter lemon', 'pink, klasyczny, imbir, bitter lemon'), v: '0,25 l', p: 54 },
          { n: L('Granini džus', 'Сок Granini', 'Granini juice', 'Sok Granini'), d: L('jahoda, jablko, pomeranč', 'клубника, яблоко, апельсин', 'strawberry, apple, orange', 'truskawka, jabłko, pomarańcza'), v: '0,20 l', p: 54 },
          { n: 'Mattoni', d: L('neperlivá, jemně perlivá', 'негазированная, слабогазированная', 'still, lightly sparkling', 'niegazowana, lekko gazowana'), v: '0,33 l', p: 45 },
          { n: L('Fresh pomeranč', 'Свежевыжатый апельсиновый сок', 'Fresh orange juice', 'Świeżo wyciskany sok pomarańczowy'), v: '0,20 l', p: 89 },
          { n: 'Red Bull', v: '0,25 l', p: 79 },
          { n: L('Perlivá voda', 'Газированная вода', 'Sparkling water', 'Woda gazowana'), d: L('filtrovaná kohoutková voda, ovoce, sodobar', 'фильтрованная водопроводная вода, фрукты, содобар', 'filtered tap water, fruit, soda bar', 'filtrowana woda z kranu, owoce, sodobar'), v: '1 l', p: 79 },
          { n: L('Neperlivá voda', 'Негазированная вода', 'Still water', 'Woda niegazowana'), d: L('filtrovaná kohoutková voda, ovoce, sodobar', 'фильтрованная водопроводная вода, фрукты, содобар', 'filtered tap water, fruit, soda bar', 'filtrowana woda z kranu, owoce, sodobar'), v: '1 l', p: 79 },
          { n: L('Poctivá čepovaná limonáda', 'Честный разливной лимонад', 'Honest draught lemonade', 'Uczciwa lemoniada z nalewaka'), d: L('dle nabídky', 'по предложению', 'ask for today’s flavours', 'według oferty'), p: [['0,3 l', 30], ['0,5 l', 50]] },
        ],
      },
      {
        cat: L('Domácí nízkoenergetické nealko', 'Домашние низкокалорийные напитки', 'Homemade low-calorie soft drinks', 'Domowe napoje niskokaloryczne'),
        items: [
          { n: L('Domácí limonáda', 'Домашний лимонад', 'Homemade lemonade', 'Domowa lemoniada'), d: L('jahoda, mango, malina, máta, dle aktuální nabídky', 'клубника, манго, малина, мята — по текущему предложению', 'strawberry, mango, raspberry, mint – as available', 'truskawka, mango, malina, mięta – według aktualnej oferty'), p: [['0,3 l', 65], ['1 l', 159]] },
          { n: L('Domácí ledový čaj', 'Домашний холодный чай', 'Homemade iced tea', 'Domowa mrożona herbata'), d: L('sezónní ovoce', 'сезонные фрукты', 'seasonal fruit', 'owoce sezonowe'), v: '0,3 l', p: 65 },
        ],
      },
      {
        cat: L('Pivo čepované', 'Разливное пиво', 'Draught beer', 'Piwo z beczki'),
        items: [
          { n: 'Mustang 11°', p: [['0,5 l', 55], ['0,3 l', 47]] },
          { n: 'Stella Artois', p: [['0,5 l', 65], ['0,3 l', 57]] },
          { n: L('Ochucené nealko pivo', 'Безалкогольное пиво со вкусом', 'Flavoured alcohol-free beer', 'Smakowe piwo bezalkoholowe'), p: [['0,5 l', 55], ['0,3 l', 47]] },
          { n: L('Láhvová nealkoholická Stella Artois', 'Безалкогольная Stella Artois, бутылка', 'Alcohol-free Stella Artois, bottle', 'Bezalkoholowa Stella Artois, butelka'), v: '0,33 l', p: 46 },
        ],
      },
      {
        cat: L('Aperitivy', 'Аперитивы', 'Aperitifs', 'Aperitify'),
        note: L('V nabídce také francouzská vína, viz vinný lístek.', 'Также в предложении французские вина — см. винную карту.', 'French wines are also available – see the wine list.', 'W ofercie także wina francuskie – zobacz kartę win.'),
        items: [
          { n: 'Martini Bianco, Martini Extra Dry', d: L('také nealko', 'есть и безалкогольный', 'also alcohol-free', 'także bezalkoholowe'), v: '1,0 dcl', p: 79 },
          { n: 'Crodino', d: L('nealko', 'безалкогольный', 'alcohol-free', 'bezalkoholowe'), v: '1,0 dcl', p: 69 },
          { n: 'Frizzante', d: L('bílé, šumivé, suché', 'белое, игристое, сухое', 'white, sparkling, dry', 'białe, musujące, wytrawne'), v: '1,5 dcl', p: 89 },
          { n: 'Bohemia sekt', d: L('nealko', 'безалкогольный', 'alcohol-free', 'bezalkoholowy'), v: '1,0 dcl', p: 69 },
        ],
      },
      {
        cat: L('Míchané nápoje alkoholické', 'Коктейли', 'Cocktails', 'Koktajle alkoholowe'),
        note: L('Objem míchaných nápojů se odvíjí od vámi zvoleného drinku.', 'Объём коктейля зависит от выбранного напитка.', 'The volume of mixed drinks depends on the drink you choose.', 'Objętość koktajli zależy od wybranego drinka.'),
        items: [
          { n: 'Aperol Spritz', d: L('0,04 l Aperol, 1 dcl Prosecco, soda, pomeranč, led', '0,04 л Aperol, 1 дл просекко, содовая, апельсин, лёд', '0.04 l Aperol, 0.1 l Prosecco, soda, orange, ice', '0,04 l Aperol, 0,1 l Prosecco, woda sodowa, pomarańcza, lód'), p: 169 },
          { n: 'Mojito', d: L('0,04 l Havana, třtinový cukr, limeta, máta, soda, led', '0,04 л Havana, тростниковый сахар, лайм, мята, содовая, лёд', '0.04 l Havana, cane sugar, lime, mint, soda, ice', '0,04 l Havana, cukier trzcinowy, limonka, mięta, woda sodowa, lód'), p: 169 },
          { n: 'Limoncello Spritz', d: L('0,04 l Limoncello, prosecco, soda, plátek limetky', '0,04 л лимончелло, просекко, содовая, ломтик лайма', '0.04 l Limoncello, prosecco, soda, slice of lime', '0,04 l Limoncello, prosecco, woda sodowa, plasterek limonki'), p: 169 },
          { n: 'Cuba Libre', d: L('0,04 l Havana, Pepsi, limeta, led', '0,04 л Havana, Pepsi, лайм, лёд', '0.04 l Havana, Pepsi, lime, ice', '0,04 l Havana, Pepsi, limonka, lód'), p: 159 },
          { n: 'Malfy gin & tonic', d: L('0,04 l Malfy gin rosa, tonic, citrus, led', '0,04 л джин Malfy Rosa, тоник, цитрус, лёд', '0.04 l Malfy gin rosa, tonic, citrus, ice', '0,04 l gin Malfy Rosa, tonik, cytrus, lód'), p: 159 },
          { n: 'Sarti Spritz', d: L('0,04 l Sarti Rosa, prosecco, soda, plátek limetky', '0,04 л Sarti Rosa, просекко, содовая, ломтик лайма', '0.04 l Sarti Rosa, prosecco, soda, slice of lime', '0,04 l Sarti Rosa, prosecco, woda sodowa, plasterek limonki'), p: 169 },
          { n: 'Italicus Spritz', d: L('0,04 l Italicus, 1 dcl prosecco, tonic, plátek grepu', '0,04 л Italicus, 1 дл просекко, тоник, ломтик грейпфрута', '0.04 l Italicus, 0.1 l prosecco, tonic, slice of grapefruit', '0,04 l Italicus, 0,1 l prosecco, tonik, plasterek grejpfruta'), p: 169 },
          { n: 'Hugo Spritz', d: L('0,02 l bezinkový sirup, 1,5 dcl Prosecco, soda, máta, limetka', '0,02 л бузинового сиропа, 1,5 дл просекко, содовая, мята, лайм', '0.02 l elderflower syrup, 0.15 l Prosecco, soda, mint, lime', '0,02 l syropu z czarnego bzu, 0,15 l Prosecco, woda sodowa, mięta, limonka'), p: 169 },
        ],
      },
      {
        cat: L('Míchané nápoje nealkoholické', 'Безалкогольные коктейли', 'Alcohol-free cocktails', 'Koktajle bezalkoholowe'),
        items: [
          { n: 'Orange Spritz', d: L('0,04 l Monin Orange Spritz, soda, pomeranč, led', '0,04 л Monin Orange Spritz, содовая, апельсин, лёд', '0.04 l Monin Orange Spritz, soda, orange, ice', '0,04 l Monin Orange Spritz, woda sodowa, pomarańcza, lód'), p: 119 },
          { n: 'Virgin Mojito', d: L('třtinový cukr, limeta, máta, soda, led', 'тростниковый сахар, лайм, мята, содовая, лёд', 'cane sugar, lime, mint, soda, ice', 'cukier trzcinowy, limonka, mięta, woda sodowa, lód'), p: 119 },
          { n: 'Gin free', d: L('0,04 l Beefeater 0 %, tonic, citrus, led', '0,04 л Beefeater 0 %, тоник, цитрус, лёд', '0.04 l Beefeater 0%, tonic, citrus, ice', '0,04 l Beefeater 0%, tonik, cytrus, lód'), p: 119 },
          { n: 'Crodino Spritz Rosso', d: L('0,04 l Crodino Rosso, soda, plátek pomeranče', '0,04 л Crodino Rosso, содовая, ломтик апельсина', '0.04 l Crodino Rosso, soda, slice of orange', '0,04 l Crodino Rosso, woda sodowa, plasterek pomarańczy'), p: 119 },
        ],
      },
      {
        cat: L('Alkohol', 'Крепкие напитки', 'Spirits', 'Alkohole'),
        note: L('Všechny podáváme po 0,04 l.', 'Все порции — 0,04 л.', 'All served as 0.04 l.', 'Wszystkie podajemy po 0,04 l.'),
        items: [
          { n: 'Slivovice Jelínek', d: L('slivovice', 'сливовица', 'plum brandy', 'śliwowica'), p: 79 },
          { n: 'Hruškovice Jelínek', d: L('hruškovice', 'грушевый бренди', 'pear brandy', 'gruszkówka'), p: 79 },
          { n: 'Absolut', d: L('vodka', 'водка', 'vodka', 'wódka'), p: 69 },
          { n: 'Diplomatico Reserva Exclusiva', d: RUM('karibský', 'карибский', 'Caribbean', 'karaibski'), p: 139 },
          { n: 'Havana Añejo 3 Años', d: RUM('kubánský', 'кубинский', 'Cuban', 'kubański'), p: 79 },
          { n: 'Havana Añejo Especial', d: RUM('kubánský', 'кубинский', 'Cuban', 'kubański'), p: 79 },
          { n: 'La Hechicera serie banánový', d: RUM('kolumbijský', 'колумбийский', 'Colombian', 'kolumbijski'), p: 159 },
          { n: 'Bumbu Original', d: RUM('barbadoský', 'барбадосский', 'Barbadian', 'barbadoski'), p: 129 },
          { n: 'Don Papa MassKara', d: RUM('filipínský', 'филиппинский', 'Filipino', 'filipiński'), p: 139 },
          { n: 'Meticho Rum a citrus', d: RUM('honduraský', 'гондурасский', 'Honduran', 'honduraski'), p: 139 },
          { n: 'Millonario Kuytchi', d: RUM('peruánský', 'перуанский', 'Peruvian', 'peruwiański'), p: 129 },
          { n: 'The Demon’s Share 3 y.o.', d: RUM('panamský', 'панамский', 'Panamanian', 'panamski'), p: 129 },
          { n: 'Gin Malfy Originale', d: 'gin', p: 109 },
          { n: 'Gin Malfy Rosa', d: 'gin', p: 109 },
          { n: 'Jameson', d: L('irská whisky', 'ирландский виски', 'Irish whiskey', 'whiskey irlandzka'), p: 79 },
          { n: 'Chivas Regal 12 YO', d: L('skotská whisky', 'шотландский виски', 'Scotch whisky', 'whisky szkocka'), p: 129 },
          { n: 'Jack Daniel’s', d: L('americká whisky', 'американский виски', 'American whiskey', 'whiskey amerykańska'), p: 89 },
          { n: 'Jack Daniel’s Honey', d: L('americká whisky', 'американский виски', 'American whiskey', 'whiskey amerykańska'), p: 89 },
          { n: 'Jack Daniel’s Fire', d: L('americká whisky', 'американский виски', 'American whiskey', 'whiskey amerykańska'), p: 89 },
          { n: 'Martell V.S.', d: L('koňak', 'коньяк', 'cognac', 'koniak'), p: 119 },
          { n: 'Bumbu Cream 15 %', d: L('likér', 'ликёр', 'liqueur', 'likier'), p: 129 },
          { n: 'Ramazzotti Amaro', d: HERB, p: 79 },
          { n: 'Italicus', d: L('levandulový likér', 'лавандовый ликёр', 'lavender liqueur', 'likier lawendowy'), p: 99 },
          { n: 'Jägermeister 35 %', d: HERB, p: 79 },
          { n: 'Becherovka 38 %', d: HERB, p: 79 },
        ],
      },
    ],

    wine: [
      {
        cat: L('Rozlévaná vína', 'Вина в розлив', 'Wines by the glass', 'Wina na kieliszki'),
        items: [
          {
            n: 'Rulandské šedé', s: L('moravské zemské, suché', 'моравское земское, сухое', 'Moravian regional wine, dry', 'morawskie wino regionalne, wytrawne'),
            w: 'Rodinné vinařství SEDLÁK, Velké Bílovice', p: [['0,15 l', 69], ['0,75 l', 295]],
            d: L('Už ve vůni je patrná vyzrálost a kvalita hroznů. Vůně je plná, bohatá, příjemně ovocná, s tóny kompotovaných hrušek a citrusů. Chuť je opět plná, dlouhá, harmonická, jemně zaobalená hroznovým cukrem s pikantním závěrem.',
              'Уже в аромате чувствуются зрелость и качество винограда. Аромат полный, богатый, приятно фруктовый, с нотами грушевого компота и цитрусов. Вкус полный, долгий, гармоничный, мягко обволакивающий виноградным сахаром, с пикантным послевкусием.',
              'The ripeness and quality of the grapes show already on the nose. The aroma is full, rich and pleasantly fruity, with notes of poached pears and citrus. The palate is full, long and harmonious, gently rounded by grape sugar, with a piquant finish.',
              'Już w zapachu wyczuwalna jest dojrzałość i jakość winogron. Aromat pełny, bogaty, przyjemnie owocowy, z nutami gruszek z kompotu i cytrusów. Smak pełny, długi, harmonijny, delikatnie otulony cukrem winogronowym, z pikantnym finiszem.'),
          },
          {
            n: 'Pálava', s: L('moravské zemské, polosladké', 'моравское земское, полусладкое', 'Moravian regional wine, semi-sweet', 'morawskie wino regionalne, półsłodkie'),
            w: 'Vinařství JIŘÍ UHEREK, Dolní Bojanovice', p: [['0,15 l', 79], ['0,75 l', 345]],
            d: L('Aromaticky výrazná Pálava s tóny mučenky a čerstvých broskví. Šťavnatá kyselinka navíc příjemně osvěžuje sladký pocit na jazyku a víno tak jistě doplní nejeden slunečný den.',
              'Выразительная ароматная Палава с нотами маракуйи и свежих персиков. Сочная кислотность приятно освежает сладость на языке — вино, которое дополнит не один солнечный день.',
              'An expressive, aromatic Pálava with notes of passion fruit and fresh peaches. Juicy acidity pleasantly refreshes the sweetness on the tongue – a wine for many a sunny day.',
              'Wyraziście aromatyczna Pálava z nutami marakui i świeżych brzoskwiń. Soczysta kwasowość przyjemnie odświeża słodycz na języku – wino na niejeden słoneczny dzień.'),
          },
          {
            n: 'Francesca Rosé „Village“', s: L('moravské zemské, suché', 'моравское земское, сухое', 'Moravian regional wine, dry', 'morawskie wino regionalne, wytrawne'),
            w: 'Vinařství VERÝSEK, Velké Bílovice', p: [['0,15 l', 79], ['0,75 l', 345]],
            d: L('Tato Frankovka Rosé přináší jemné tóny čerstvých jahod a malin, doplněné svěží kyselinkou, která dodává vínu skvělou rovnováhu.',
              'Это розовое из Франковки дарит нежные ноты свежей клубники и малины, дополненные свежей кислотностью, которая придаёт вину прекрасный баланс.',
              'This Frankovka (Blaufränkisch) rosé brings delicate notes of fresh strawberries and raspberries, with fresh acidity that gives the wine great balance.',
              'Ta Frankovka Rosé wnosi delikatne nuty świeżych truskawek i malin, uzupełnione rześką kwasowością, która nadaje winu świetną równowagę.'),
          },
          {
            n: 'Cabernet Cuvée', s: L('moravské zemské, suché', 'моравское земское, сухое', 'Moravian regional wine, dry', 'morawskie wino regionalne, wytrawne'),
            w: 'Rodinné vinařství SEDLÁK, Velké Bílovice', p: [['0,15 l', 69], ['0,75 l', 295]],
            d: L('Víno vzniklo scelením odrůd Cabernet Moravia a Cabernet Franc. Víno má tmavě rubínovou barvu, vůně je odrůdově charakteristická s typickým kabernetovým aroma, zároveň intenzivní, delikátní s fialkovou a až malinovou vůní. Chuť je suchá, sametová a harmonická s dobře vyváženým tělem.',
              'Купаж сортов Каберне Моравия и Каберне Фран. Тёмно-рубиновый цвет, типичный для каберне аромат — интенсивный и деликатный, с нотами фиалки и даже малины. Вкус сухой, бархатистый и гармоничный, с хорошо сбалансированным телом.',
              'A blend of Cabernet Moravia and Cabernet Franc. Deep ruby in colour, with a typical Cabernet nose that is intense yet delicate, with violet and even raspberry notes. Dry, velvety and harmonious on the palate, with a well-balanced body.',
              'Wino powstało z kupażu odmian Cabernet Moravia i Cabernet Franc. Ma ciemnorubinową barwę i typowy dla Cabernet aromat – intensywny, a zarazem delikatny, z nutą fiołków, a nawet malin. Smak wytrawny, aksamitny i harmonijny, o dobrze zrównoważonym ciele.'),
          },
        ],
      },
      {
        cat: L('Další vína rozlévaná', 'Другие вина в розлив', 'More wines by the glass', 'Inne wina na kieliszki'),
        items: [
          { n: 'Cuvée', s: L('bílé, suché', 'белое, сухое', 'white, dry', 'białe, wytrawne'), p: [['1,5 dcl', 69]] },
          { n: 'Pálava', s: L('bílé, polosladké', 'белое, полусладкое', 'white, semi-sweet', 'białe, półsłodkie'), p: [['1,5 dcl', 79]] },
          { n: 'Cuvée', s: L('červené, suché', 'красное, сухое', 'red, dry', 'czerwone, wytrawne'), p: [['1,5 dcl', 69]] },
          { n: 'Frizzante', s: L('bílé, šumivé, suché', 'белое, игристое, сухое', 'white, sparkling, dry', 'białe, musujące, wytrawne'), p: [['1,5 dcl', 89]] },
        ],
      },
      {
        cat: L('Odrůdová jakostní vína (láhev)', 'Сортовые качественные вина (бутылка)', 'Varietal quality wines (bottle)', 'Wina odmianowe jakościowe (butelka)'),
        items: [
          { n: L('Tramín červený', 'Траминер красный', 'Tramín červený (Gewürztraminer)', 'Tramín červený (Gewürztraminer)'), s: L('bílé, suché', 'белое, сухое', 'white, dry', 'białe, wytrawne'), p: [['0,75 l', 279]] },
          { n: 'Sauvignon', s: L('bílé, suché', 'белое, сухое', 'white, dry', 'białe, wytrawne'), p: [['0,75 l', 279]] },
          { n: L('Frankovka rosé', 'Франковка розе', 'Frankovka rosé', 'Frankovka rosé'), s: L('růžové, suché', 'розовое, сухое', 'rosé, dry', 'różowe, wytrawne'), p: [['0,75 l', 279]] },
          { n: 'Modrý Portugal', s: L('červené, suché', 'красное, сухое', 'red, dry', 'czerwone, wytrawne'), p: [['0,75 l', 279]] },
          { n: 'Frizzante', s: L('bílé, šumivé, suché', 'белое, игристое, сухое', 'white, sparkling, dry', 'białe, musujące, wytrawne'), p: [['0,75 l', 439]] },
          { n: 'Bohemia sekt', s: 'Demi / Brut', p: [['0,75 l', 429]] },
        ],
      },
      {
        cat: L('Bílá vína', 'Белые вина', 'White wines', 'Wina białe'),
        items: [
          {
            n: 'Ryzlink vlašský Plotny', s: L('pozdní sběr, suché', 'поздний сбор, сухое', 'late harvest, dry', 'późny zbiór, wytrawne'),
            w: 'Vinařství ŠOMAN, Dolní Dunajovice', p: [['0,75 l', 380]],
            d: L('Intenzivní vůně, ve které se objevuje žlutomasé ovoce. V plné lehce nasládlejší chuti lze nalézt ovocně-medové tóny s jemnou slanou mineralitou v závěru.',
              'Интенсивный аромат с нотами фруктов с жёлтой мякотью. В полном, слегка сладковатом вкусе — фруктово-медовые тона и тонкая солоноватая минеральность в послевкусии.',
              'An intense nose of yellow-fleshed fruit. The full, slightly sweeter palate shows fruity, honeyed notes with a delicate salty minerality on the finish.',
              'Intensywny aromat owoców o żółtym miąższu. W pełnym, lekko słodkawym smaku owocowo-miodowe nuty z delikatną słoną mineralnością w finiszu.'),
          },
          {
            n: 'Sauvignon Sexenberg', s: L('pozdní sběr, suché', 'поздний сбор, сухое', 'late harvest, dry', 'późny zbiór, wytrawne'),
            w: 'Vinařství PIÁLEK & JÄGER, Nový Šaldorf', p: [['0,75 l', 480]],
            d: L('Lehčí a svěží Sauvignon s intenzivním aroma angreštu, lučního kvítí, květů hluchavek a slaměnek. V chuti dominují tóny zelených jablek a nektarinek. Dlouhý minerální závěr.',
              'Лёгкий и свежий Совиньон с интенсивным ароматом крыжовника, луговых цветов, цветков яснотки и бессмертника. Во вкусе доминируют зелёные яблоки и нектарины. Долгое минеральное послевкусие.',
              'A lighter, fresh Sauvignon with an intense aroma of gooseberry, meadow flowers, dead-nettle blossom and everlasting flowers. Green apple and nectarine dominate the palate. Long mineral finish.',
              'Lżejszy, rześki Sauvignon o intensywnym aromacie agrestu, kwiatów łąkowych, kwiatów jasnoty i kocanek. W smaku dominują zielone jabłka i nektarynki. Długi, mineralny finisz.'),
          },
          {
            n: 'Tramín červený', s: L('pozdní sběr, polosuché', 'поздний сбор, полусухое', 'late harvest, off-dry', 'późny zbiór, półwytrawne'),
            w: 'Vinařství KOVÁŘ, Vlčnov', p: [['0,75 l', 350]],
            d: L('Víno zlatožluté barvy. Vůně fialek je doplněna tóny květů pivoněk a čajových růží. V plné a dlouhé kořenité chuti je náznak sušených hrozinek. Harmonické víno vhodné ke každé příležitosti.',
              'Вино золотисто-жёлтого цвета. Аромат фиалок дополнен нотами пиона и чайной розы. В полном, долгом, пряном вкусе — намёк на изюм. Гармоничное вино для любого случая.',
              'Golden yellow. A nose of violets complemented by peony blossom and tea roses. The full, long, spicy palate hints at raisins. A harmonious wine for any occasion.',
              'Wino o złotożółtej barwie. Aromat fiołków uzupełniają nuty kwiatów piwonii i róż herbacianych. W pełnym, długim, korzennym smaku nuta rodzynek. Harmonijne wino na każdą okazję.'),
          },
          {
            n: 'Hibernal', s: L('pozdní sběr, polosuché', 'поздний сбор, полусухое', 'late harvest, off-dry', 'późny zbiór, półwytrawne'),
            w: 'Vinařství ŠAMŠULA, Čejkovice', p: [['0,75 l', 460]],
            d: L('Uchvátí nás intenzivní žlutozelená barva s jemným olivovým odstínem, přecházející do průrazné vůně limety, máty, hluchavky a kvetoucího černého bezu. Chuť je plná, ale svěží – vynikne dynamické spojení citrusů, zeleného melounu, pistácií a angreštového sirupu.',
              'Покоряет интенсивный жёлто-зелёный цвет с лёгким оливковым оттенком и яркий аромат лайма, мяты, яснотки и цветущей бузины. Вкус полный, но свежий — динамичное сочетание цитрусов, зелёной дыни, фисташек и крыжовникового сиропа.',
              'An intense yellow-green colour with a subtle olive tint leads into a striking nose of lime, mint, dead-nettle and elderflower. Full yet fresh on the palate, with a lively mix of citrus, green melon, pistachio and gooseberry syrup.',
              'Zachwyca intensywną żółtozieloną barwą z delikatnym oliwkowym odcieniem, przechodzącą w wyrazisty aromat limonki, mięty, jasnoty i kwitnącego czarnego bzu. Smak pełny, ale świeży – dynamiczne połączenie cytrusów, zielonego melona, pistacji i syropu agrestowego.'),
          },
          {
            n: 'Grüner Veltliner Selection', s: DRY,
            w: L('NITTNAUS, Burgenland, Rakousko', 'NITTNAUS, Бургенланд, Австрия', 'NITTNAUS, Burgenland, Austria', 'NITTNAUS, Burgenland, Austria'), p: [['0,75 l', 490]],
            d: L('Světlá, slámově žlutá barva se zelenými odlesky. Ve vůni dominují kdoule a sladká jablka, s jemným podtónem bílého pepře. V chuti je víno krásně vyvážené, s delikátní kyselinkou. Dlouhý ovocný závěr.',
              'Светлый соломенно-жёлтый цвет с зелёными отблесками. В аромате доминируют айва и сладкие яблоки с лёгким оттенком белого перца. Вкус прекрасно сбалансированный, с деликатной кислотностью. Долгое фруктовое послевкусие.',
              'Pale straw yellow with green reflections. Quince and sweet apples dominate the nose, with a subtle undertone of white pepper. Beautifully balanced on the palate, with delicate acidity. Long fruity finish.',
              'Jasna, słomkowożółta barwa z zielonymi refleksami. W aromacie dominują pigwa i słodkie jabłka z delikatną nutą białego pieprzu. W smaku pięknie zrównoważone, z delikatną kwasowością. Długi, owocowy finisz.'),
          },
        ],
      },
      {
        cat: L('Červená vína', 'Красные вина', 'Red wines', 'Wina czerwone'),
        items: [
          {
            n: 'Merlot', s: L('pozdní sběr, suché', 'поздний сбор, сухое', 'late harvest, dry', 'późny zbiór, wytrawne'),
            w: 'Vinařství ŠOMAN, Dolní Dunajovice', p: [['0,75 l', 410]],
            d: L('Rubínová barva. Vůně rybízového kompotu a hořké čokolády. Jemná, plná chuť připomínající tmavé lesní ovoce s čokoládovou dochutí.',
              'Рубиновый цвет. Аромат смородинового компота и горького шоколада. Мягкий, полный вкус с нотами тёмных лесных ягод и шоколадным послевкусием.',
              'Ruby red. Aromas of redcurrant compote and dark chocolate. A smooth, full palate reminiscent of dark forest fruit, with a chocolate finish.',
              'Rubinowa barwa. Aromat kompotu z porzeczek i gorzkiej czekolady. Delikatny, pełny smak przypominający ciemne owoce leśne, z czekoladowym posmakiem.'),
          },
          {
            n: 'Giustiny-Qvid Primitivo Salento IGP', s: L('polosuché', 'полусухое', 'off-dry', 'półwytrawne'),
            w: L('TENUTA GIUSTINY, Puglia, Itálie', 'TENUTA GIUSTINY, Апулия, Италия', 'TENUTA GIUSTINY, Puglia, Italy', 'TENUTA GIUSTINY, Apulia, Włochy'), p: [['0,75 l', 470]],
            d: L('Víno má intenzivní rubínovou barvu a komplexní aroma zralých tmavých plodů, jako jsou švestky, třešně a ostružiny, doplněné o kořenité tóny. Chuť je plná, energická a svěží s příjemnými tříslovinami a dobře vyváženou kyselinkou.',
              'Интенсивный рубиновый цвет и сложный аромат спелых тёмных плодов — сливы, черешни и ежевики — с пряными нотами. Вкус полный, энергичный и свежий, с приятными танинами и хорошо сбалансированной кислотностью.',
              'Intense ruby colour and a complex aroma of ripe dark fruit – plums, cherries and blackberries – with spicy notes. Full, energetic and fresh on the palate, with pleasant tannins and well-balanced acidity.',
              'Wino o intensywnej rubinowej barwie i złożonym aromacie dojrzałych ciemnych owoców – śliwek, czereśni i jeżyn – z korzennymi nutami. Smak pełny, energiczny i świeży, z przyjemnymi taninami i dobrze zrównoważoną kwasowością.'),
          },
        ],
      },
      {
        cat: L('Šumivá vína', 'Игристые вина', 'Sparkling wines', 'Wina musujące'),
        items: [
          {
            n: 'Prosecco Pigia DOC Frizzante', s: 'Extra Dry',
            w: L('VAL D’OCA, Treviso, Itálie', 'VAL D’OCA, Тревизо, Италия', 'VAL D’OCA, Treviso, Italy', 'VAL D’OCA, Treviso, Włochy'), p: [['0,75 l', 270]],
            d: L('Lehké a svěží Prosecco postavené na primární aromatice připomínající čerstvé zahradní ovoce a květiny. Chuť je jemná, vyvážená a dobře srozumitelná.',
              'Лёгкое и свежее просекко с первичными ароматами свежих садовых фруктов и цветов. Вкус мягкий, сбалансированный и понятный.',
              'A light, fresh Prosecco built on primary aromas of fresh orchard fruit and flowers. Gentle, balanced and easy to enjoy.',
              'Lekkie i świeże Prosecco oparte na aromatach pierwotnych, przywodzących na myśl świeże owoce z sadu i kwiaty. Smak delikatny, zrównoważony i przystępny.'),
          },
          {
            n: 'Itinera Prosecco DOC', s: 'Brut',
            w: L('MONDO DEL VINO, Treviso, Itálie', 'MONDO DEL VINO, Тревизо, Италия', 'MONDO DEL VINO, Treviso, Italy', 'MONDO DEL VINO, Treviso, Włochy'), p: [['0,75 l', 480]],
            d: L('Světlejší slámově žlutá barva. Aroma bílých květů, hrušek, zahradního ovoce. Elegantní perlení, svěží chuť spojená s ovocným projevem letního zahradního ovoce a limetky.',
              'Светлый соломенно-жёлтый цвет. Аромат белых цветов, груш и садовых фруктов. Элегантная игра пузырьков, свежий вкус с нотами летних садовых фруктов и лайма.',
              'Pale straw yellow. Aromas of white flowers, pears and orchard fruit. Elegant bubbles and a fresh palate of summer orchard fruit and lime.',
              'Jaśniejsza słomkowożółta barwa. Aromat białych kwiatów, gruszek i owoców z sadu. Eleganckie perlenie, świeży smak z owocowym charakterem letnich owoców i limonki.'),
          },
          {
            n: 'Profondo Frizzante Sur Lie', s: 'Brut Nature',
            w: L('VINI TONON, Treviso, Itálie', 'VINI TONON, Тревизо, Италия', 'VINI TONON, Treviso, Italy', 'VINI TONON, Treviso, Włochy'), p: [['0,75 l', 280]],
            d: L('Přírodní, nefiltrované frizzante s typickým zákalem, které zaujme jemným perlením a komplexní vůní citrusů s nádechem chlebové kůrky. Na patře je díky zrání na kvasničních kalech dokonale suché, maximálně osvěžující a živé.',
              'Натуральное нефильтрованное фриццанте с характерной мутностью, нежной игрой пузырьков и сложным цитрусовым ароматом с ноткой хлебной корочки. Благодаря выдержке на дрожжевом осадке оно совершенно сухое, очень освежающее и живое.',
              'A natural, unfiltered frizzante with a typical haze, fine bubbles and a complex citrus nose with a hint of bread crust. Thanks to ageing on the lees it is bone dry, highly refreshing and lively on the palate.',
              'Naturalne, niefiltrowane frizzante z typowym zmętnieniem, delikatnym perleniem i złożonym aromatem cytrusów z nutą skórki chleba. Dzięki dojrzewaniu na osadzie drożdżowym na podniebieniu idealnie wytrawne, bardzo orzeźwiające i żywe.'),
          },
          {
            n: 'Pioppo Grigio Frizzante', s: L('polosuché', 'полусухое', 'off-dry', 'półwytrawne'), nealko: true,
            w: L('VINI TONON, Torino, Itálie', 'VINI TONON, Турин, Италия', 'VINI TONON, Turin, Italy', 'VINI TONON, Turyn, Włochy'), p: [['0,75 l', 300]],
            d: L('Prémiový nealkoholický šumivý nápoj z bílých hroznů, inspirovaný oblíbenou odrůdou Pinot Grigio. Potěší vás svou světle slámovou barvou, jemným perlením a čistou vůní zelených jablek, hrušek a bílých květů. V chuti je harmonický, příjemně polosuchý s osvěžujícím a čistým závěrem.',
              'Премиальный безалкогольный игристый напиток из белого винограда, вдохновлённый популярным сортом Пино Гриджо. Светло-соломенный цвет, нежная игра пузырьков и чистый аромат зелёных яблок, груш и белых цветов. Вкус гармоничный, приятно полусухой, с освежающим чистым послевкусием.',
              'A premium alcohol-free sparkling drink from white grapes, inspired by the popular Pinot Grigio. Pale straw colour, fine bubbles and a clean nose of green apples, pears and white flowers. Harmonious and pleasantly off-dry, with a fresh, clean finish.',
              'Premium bezalkoholowy napój musujący z białych winogron, inspirowany popularną odmianą Pinot Grigio. Jasnosłomkowa barwa, delikatne perlenie i czysty aromat zielonych jabłek, gruszek i białych kwiatów. W smaku harmonijny, przyjemnie półwytrawny, z orzeźwiającym, czystym finiszem.'),
          },
          {
            n: 'Sekt Mikrosvín', s: L('jakostní šumivé, Brut', 'качественное игристое, брют', 'quality sparkling wine, brut', 'jakościowe wino musujące, brut'),
            w: 'Vinařství MIKROSVÍN, Mikulov', p: [['0,75 l', 680]],
            d: L('Klasický sekt je cuvée odrůd z ročníku 2017 postavené na Vlašáku, který doplňuje Chardonnay a Rulandy bílé a modré. Dosáží byl bobulový výběr Ryzlinku vlašského ze Železné. Ležel celých 42 měsíců na kvasinkách.',
              'Классический сект — кюве урожая 2017 года на основе Рислинга итальянского, дополненного Шардоне, Пино блан и Пино нуар. Дозажем стал ягодный отбор Рислинга итальянского с виноградника Железна. Выдержка на дрожжах — целых 42 месяца.',
              'A classic sekt: a 2017 cuvée built on Welschriesling, complemented by Chardonnay, Pinot Blanc and Pinot Noir. The dosage was a berry selection of Welschriesling from the Železná vineyard. Aged a full 42 months on the lees.',
              'Klasyczny sekt – cuvée z rocznika 2017 oparte na Rieslingu włoskim, uzupełnione Chardonnay, Pinot Blanc i Pinot Noir. Dozaż stanowił wybór jagodowy Rieslinga włoskiego z winnicy Železná. Dojrzewał pełne 42 miesiące na drożdżach.'),
          },
        ],
      },
    ],

    recommend: { title: L('Prostorica doporučuje', 'Prostorica рекомендует', 'Prostorica recommends', 'Prostorica poleca'), text: 'Chodníčková > Navrátilova slivovica' },
    wineNote: L(
      'Všechna uvedená vína obsahují alergen č. 12 oxid siřičitý a siřičitany. Informace o obsahu alkoholu u jednotlivých vín žádejte u obsluhy.',
      'Все указанные вина содержат аллерген № 12 — диоксид серы и сульфиты. Информацию о содержании алкоголя в отдельных винах уточняйте у персонала.',
      'All wines listed contain allergen no. 12, sulphur dioxide and sulphites. Please ask our staff about the alcohol content of individual wines.',
      'Wszystkie wymienione wina zawierają alergen nr 12 – dwutlenek siarki i siarczyny. O zawartość alkoholu w poszczególnych winach zapytaj obsługę.'),
  };
})();
