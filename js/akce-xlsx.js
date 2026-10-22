/*
 * EXCEL S OBJEDNÁVKOU RAUTU – vytvoří se přímo v prohlížeči z js/raut-data.js,
 * takže ceny v tabulce jsou vždy stejné jako na webu.
 *
 * Zákazník může v souboru měnit jen žlutá pole (údaje, množství, poznámka).
 * List je zamčený náhodným heslem, aby nešly přepsat ceny a vzorce.
 *
 * Knihovna ExcelJS (MIT) je v js/vendor/ a načte se až po kliknutí na tlačítko.
 * Stejný kód umí běžet i v Node.js (viz README) pro vytvoření prázdné tabulky.
 */
(function (root) {
  const FONT = 'Arial';
  const INK = 'FF2E2540', MUT = 'FF6B6380', LAV = 'FFE9E3F5', LAV2 = 'FFC9BEE6', YEL = 'FFFFF6C7', LINE = 'FFCFC7E0';
  const KC = '#,##0" Kč"';
  const thin = { style: 'thin', color: { argb: LINE } };
  const box = { top: thin, left: thin, bottom: thin, right: thin };
  const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });
  const UNITS = '"kg,ks,porce,mísa,osoba,hod,akce"';

  /**
   * data:  window.RAUT ({ sections: [{ name, items: [{ name, price, unit }] }] })
   * order: { qty: { "sectionId:index": number }, name, phone, email, date (YYYY-MM-DD), persons, note }
   * opts:  { password, extraRows (prázdné řádky na konci sekce) }
   */
  async function build(ExcelJS, data, order = {}, opts = {}) {
    const qty = order.qty || {};
    const wb = new ExcelJS.Workbook();
    wb.creator = 'Restaurace Prostorica';
    wb.calcProperties.fullCalcOnLoad = true;
    const ws = wb.addWorksheet('Objednávka banketu', {
      views: [{ state: 'frozen', ySplit: 12, showGridLines: false }],
      pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
    });
    ws.columns = [{ width: 50 }, { width: 17 }, { width: 11 }, { width: 13 }, { width: 17 }];

    const put = (ref, value, o = {}) => {
      const c = ws.getCell(ref);
      if (value !== undefined && value !== null && value !== '') c.value = value;
      c.font = { name: FONT, size: o.size || 10, bold: !!o.bold, italic: !!o.italic, color: { argb: o.color || INK } };
      c.alignment = { horizontal: o.h || 'left', vertical: o.v || 'middle', wrapText: !!o.wrap };
      if (o.fill) c.fill = fill(o.fill);
      if (o.border) c.border = box;
      if (o.fmt) c.numFmt = o.fmt;
      if (o.open) c.protection = { locked: false };
      return c;
    };

    ws.mergeCells('A1:E1'); put('A1', 'Restaurace Prostorica – objednávka rautu / banketu', { size: 16, bold: true }); ws.getRow(1).height = 30;
    ws.mergeCells('A2:E2'); put('A2', 'Švédská 42/58a, 712 00 Slezská Ostrava · sál a catering: +420 602 530 838', { size: 9, color: MUT });

    // údaje zákazníka (řádky 4–8)
    const date = order.date ? new Date(order.date + 'T00:00:00Z') : null;
    const persons = parseInt(order.persons, 10) > 0 ? parseInt(order.persons, 10) : null;
    [['Jméno a příjmení', order.name], ['Telefon', order.phone], ['E-mail', order.email], ['Datum akce', date], ['Počet osob', persons]]
      .forEach(([label, value], i) => {
        const r = 4 + i;
        put(`A${r}`, label, { bold: true });
        ws.mergeCells(`B${r}:E${r}`);
        put(`B${r}`, value, { fill: YEL, border: true, open: true, fmt: label === 'Datum akce' ? 'd. m. yyyy' : undefined });
      });
    ws.getCell('B8').dataValidation = { type: 'whole', operator: 'greaterThanOrEqual', formulae: [1], allowBlank: true, showErrorMessage: true, errorTitle: 'Počet osob', error: 'Zadejte celé číslo (např. 40).' };

    ws.mergeCells('A10:E10');
    put('A10', 'Vyplňte pouze žlutá pole: své údaje nahoře a ve sloupci „Množství“ počet kusů, porcí nebo kilogramů. '
      + 'Cena se spočítá sama. Desetinná čísla pište s čárkou (např. 0,5). '
      + 'Příklad: pokrm za 1 000 Kč/kg × 2 kg = 2 000 Kč; × 0,5 kg = 500 Kč.', { size: 9, italic: true, wrap: true, color: MUT });
    ws.getRow(10).height = 40;

    const HEAD = 12;
    ['Název pokrmu', 'Cena za jednotku', 'Jednotka', 'Množství', 'Cena celkem'].forEach((t, i) => {
      put(`${'ABCDE'[i]}${HEAD}`, t, { bold: true, color: 'FFFFFFFF', fill: INK, border: true, h: i === 0 || i === 2 ? 'left' : 'right' });
    });
    ws.getRow(HEAD).height = 22;

    const qtyRule = { type: 'decimal', operator: 'greaterThanOrEqual', formulae: [0], allowBlank: true, showErrorMessage: true, errorTitle: 'Množství', error: 'Zadejte číslo 0 nebo větší (např. 2 nebo 0,5).' };
    let row = HEAD + 1;
    const first = row;
    let total = 0;
    data.sections.forEach((s) => {
      ws.mergeCells(`A${row}:E${row}`);
      put(`A${row}`, s.name, { bold: true, fill: LAV2, border: true });
      row++;
      const rows = s.items.map((it, i) => ({ it, q: qty[`${s.id}:${i}`] || 0 }));
      for (let k = 0; k < (opts.extraRows || 0); k++) rows.push({ it: null, q: 0 });
      rows.forEach(({ it, q }) => {
        const price = it && typeof it.price === 'number' && it.price > 0 ? it.price : null;
        const line = price && q > 0 ? Math.round(price * q * 100) / 100 : '';
        if (line) total += line;
        put(`A${row}`, it ? it.name : null, { border: true, bold: q > 0 });
        put(`B${row}`, price, { border: true, h: 'right', fmt: KC });
        put(`C${row}`, it ? it.unit : null, { border: true }).alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
        put(`D${row}`, q > 0 ? q : null, { border: true, h: 'right', open: true, bold: q > 0, fill: it ? YEL : undefined });
        const e = put(`E${row}`, undefined, { border: true, h: 'right', bold: true, fmt: KC });
        e.value = { formula: `IF(OR(B${row}="",D${row}=""),"",B${row}*D${row})`, result: line };
        ws.getCell(`D${row}`).dataValidation = qtyRule;
        ws.getCell(`C${row}`).dataValidation = { type: 'list', formulae: [UNITS], allowBlank: true };
        row++;
      });
    });
    const last = row - 1;

    const TOT = row;
    const strong = { style: 'medium', color: { argb: INK } };
    put(`A${TOT}`, 'Celková cena', { bold: true, size: 12, fill: LAV });
    ws.mergeCells(`B${TOT}:D${TOT}`); put(`B${TOT}`, null, { fill: LAV });
    const t = put(`E${TOT}`, undefined, { bold: true, size: 12, h: 'right', fill: LAV, fmt: KC });
    t.value = { formula: `SUM(E${first}:E${last})`, result: total };
    ['A', 'B', 'C', 'D', 'E'].forEach((c) => { ws.getCell(`${c}${TOT}`).border = { top: strong, bottom: strong }; });
    ws.getRow(TOT).height = 24;
    put(`A${TOT + 1}`, 'Cena na osobu (podle počtu osob nahoře)', { size: 9, color: MUT });
    const pp = put(`E${TOT + 1}`, undefined, { size: 9, color: MUT, h: 'right', fmt: KC });
    pp.value = { formula: `IF(N(B8)>0,E${TOT}/B8,"")`, result: persons && total ? total / persons : '' };
    put(`A${TOT + 2}`, 'Položky bez ceny se do součtu nepočítají – cenu vám sdělíme.', { size: 9, italic: true, color: MUT });

    const NOTE = TOT + 4;
    put(`A${NOTE}`, 'Poznámka (alergie, přání, čas servírování…)', { bold: true });
    ws.mergeCells(`A${NOTE + 1}:E${NOTE + 4}`);
    for (let r = NOTE + 1; r <= NOTE + 4; r++) ['A', 'B', 'C', 'D', 'E'].forEach((c) => { ws.getCell(`${c}${r}`).border = box; ws.getCell(`${c}${r}`).protection = { locked: false }; });
    put(`A${NOTE + 1}`, order.note, { fill: YEL, wrap: true, v: 'top', open: true, border: true });
    put(`A${NOTE + 6}`, 'Vyplněnou tabulku nám pošlete zpět nebo zavolejte na +420 602 530 838.', { size: 9, italic: true, color: MUT });

    ws.pageSetup.printArea = `A1:E${NOTE + 6}`;
    ws.pageSetup.printTitlesRow = `${HEAD}:${HEAD}`;

    const password = opts.password || Array.from({ length: 16 }, () => Math.random().toString(36)[2]).join('');
    await ws.protect(password, { selectLockedCells: true, selectUnlockedCells: true, spinCount: 1000 });
    return wb;
  }

  const api = { build };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ProstoricaXlsx = api;
})(typeof window !== 'undefined' ? window : globalThis);
