(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const R = window.RAUT || { sections: [] };
  const KEY = 'prostorica-raut-v2';
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  const kc = (n) => `${Math.round(n).toLocaleString('cs-CZ')} Kč`;
  const num = (n) => n.toLocaleString('cs-CZ', { maximumFractionDigits: 2 });
  const UNIT = { kg: 'kg', ks: 'ks', porce: 'porce', 'mísa': 'mísa', osoba: 'os.', hod: 'hod.', akce: 'akce' };
  const stepOf = (it) => (it.unit === 'kg' ? 0.5 : 1);
  const priced = (it) => typeof it.price === 'number' && it.price > 0;
  const parse = (v) => {
    const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : 0;
  };

  // flat index: key = "sectionId:i"
  const items = [];
  R.sections.forEach((s) => s.items.forEach((it, i) => items.push({ ...it, key: `${s.id}:${i}`, sid: s.id })));
  const byKey = Object.fromEntries(items.map((it) => [it.key, it]));

  // quantities: demo data carries its own example quantities; the live site remembers the visitor's draft
  let qty = {};
  const saved = R.demo ? null : store.get();
  if (saved && saved.q) qty = saved.q;
  else items.forEach((it) => { if (it.qty) qty[it.key] = it.qty; });
  qty = Object.fromEntries(Object.entries(qty).filter(([k, v]) => byKey[k] && v > 0));
  // "choice: one" sections (room rental): at most one item, always quantity 1
  const oneOf = R.sections.filter((s) => s.choice === 'one');
  oneOf.forEach((s) => {
    let kept = false;
    s.items.forEach((_, i) => { const k = `${s.id}:${i}`; if (qty[k] && !kept) { qty[k] = 1; kept = true; } else delete qty[k]; });
  });

  if (R.demo) { $('#akDemo').hidden = false; document.body.classList.add('has-demo'); }

  /* ---------- rooms ---------- */
  const rooms = $('#akRooms');
  if (rooms && window.PROSTORY) {
    const scale = Math.ceil(Math.max(...window.PROSTORY.map((p) => p.max)) / 10) * 10;
    const pct = (n) => `${(n / scale) * 100}%`;
    rooms.innerHTML = window.PROSTORY.map((p) => `
      <li class="ak-room">
        <p class="ak-room__name">${p.name}</p>
        <p class="ak-room__cap"><b>${p.min}–${p.max}</b>hostů</p>
        <span class="ak-room__bar" aria-hidden="true"><i style="--a:${pct(p.min)};--b:${pct(p.max)}"></i></span>
        ${p.private ? '<span class="ak-room__priv">Nejvíce soukromí</span>' : ''}
      </li>`).join('');
  }

  /* ---------- list ---------- */
  const list = $('#akList');
  const priceLabel = (it) => (priced(it) ? `${kc(it.price)} / ${UNIT[it.unit] || it.unit || 'jedn.'}` : 'cena na dotaz');
  list.innerHTML = R.sections.map((s) => `
    <section class="ak-sec" id="sec-${s.id}" data-sec="${s.id}">
      <h3 class="ak-sec__name">${s.name} <small>${s.choice === 'one' ? `${s.required ? 'povinné · ' : ''}vyberte jeden` : s.items.length}</small></h3>
      <ul class="ak-items">
        ${s.items.map((it, i) => {
          const k = `${s.id}:${i}`, id = `q-${s.id}-${i}`, f = byKey[k];
          if (s.choice === 'one') {
            return `<li class="ak-item ak-item--pick" data-key="${k}" data-name="${it.name.toLowerCase()}">
            <span class="ak-item__name" id="${id}-n">${it.name}</span>
            <span class="ak-item__price${priced(f) ? '' : ' is-ask'}">${priceLabel(f)}</span>
            <label class="ak-pick" for="${id}"><input id="${id}" type="radio" name="pick-${s.id}" value="${k}" aria-labelledby="${id}-n"><span>Vybrat</span></label>
            <span class="ak-item__total"></span>
          </li>`;
          }
          return `<li class="ak-item" data-key="${k}" data-name="${it.name.toLowerCase()}">
            <span class="ak-item__name" id="${id}-n">${it.name}</span>
            <span class="ak-item__price${priced(f) ? '' : ' is-ask'}">${priceLabel(f)}</span>
            <span class="ak-step">
              <button type="button" data-d="-1" aria-label="Ubrat: ${it.name}">−</button>
              <label for="${id}"><input id="${id}" type="text" inputmode="decimal" autocomplete="off" aria-labelledby="${id}-n" placeholder="0"><small>${UNIT[f.unit] || ''}</small></label>
              <button type="button" data-d="1" aria-label="Přidat: ${it.name}">+</button>
            </span>
            <span class="ak-item__total"></span>
          </li>`;
        }).join('')}
      </ul>
    </section>`).join('') + '<p class="ak-noresult" id="akNoRes" hidden>Nic jsme nenašli. Zkuste jiné slovo.</p>';

  /* ---------- chips + search ---------- */
  const chips = $('#akChips');
  chips.innerHTML = R.sections.map((s) => `<a class="ak-chip" href="#sec-${s.id}" data-chip="${s.id}">${s.name}<b></b></a>`).join('');

  const search = $('#akSearch');
  const norm = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  search.addEventListener('input', () => {
    const q = norm(search.value.trim());
    let any = false;
    $$('.ak-sec', list).forEach((sec) => {
      let n = 0;
      $$('.ak-item', sec).forEach((li) => { const hit = !q || norm(li.dataset.name).includes(q); li.hidden = !hit; if (hit) n++; });
      sec.hidden = n === 0; if (n) any = true;
    });
    $('#akNoRes').hidden = any;
  });

  /* ---------- quantities ---------- */
  function setQty(key, v) {
    if (v > 0) qty[key] = v; else delete qty[key];
    paintRow(key); summary(); save();
  }
  function paintRow(key) {
    const li = list.querySelector(`[data-key="${key}"]`); if (!li) return;
    const it = byKey[key], q = qty[key] || 0;
    const input = $('input', li);
    if (input.type === 'radio') { input.checked = q > 0; $('.ak-pick span', li).textContent = q > 0 ? 'Vybráno' : 'Vybrat'; }
    else if (document.activeElement !== input) input.value = q ? num(q) : '';
    li.classList.toggle('is-on', q > 0);
    $('.ak-item__total', li).textContent = q && priced(it) ? kc(q * it.price) : (q ? 'na dotaz' : '');
  }
  list.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-d]'); if (!b) return;
    const key = b.closest('.ak-item').dataset.key, it = byKey[key];
    const next = Math.max(0, Math.round(((qty[key] || 0) + stepOf(it) * Number(b.dataset.d)) * 100) / 100);
    setQty(key, next);
  });
  list.addEventListener('input', (e) => {
    if (!e.target.matches('.ak-step input')) return;
    setQty(e.target.closest('.ak-item').dataset.key, parse(e.target.value));
  });
  list.addEventListener('change', (e) => {
    if (e.target.matches('.ak-pick input')) { pick(e.target.value); return; }
    if (e.target.matches('.ak-step input')) paintRow(e.target.closest('.ak-item').dataset.key);
  });
  function pick(key) {
    const sid = byKey[key].sid;
    items.filter((it) => it.sid === sid).forEach((it) => { if (it.key === key) qty[it.key] = 1; else delete qty[it.key]; paintRow(it.key); });
    summary(); save();
  }
  // a required "choose one" section with nothing chosen (null when all is fine)
  const missing = () => R.sections.find((s) => s.required && !items.some((it) => it.sid === s.id && qty[it.key] > 0)) || null;
  function demandRequired() {
    const s = missing(); if (!s) return false;
    const sec = $(`#sec-${s.id}`);
    sec.classList.remove('is-missing'); void sec.offsetWidth; sec.classList.add('is-missing');
    sec.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    toast(`Vyberte prosím: ${s.name} (povinné).`);
    return true;
  }
  list.addEventListener('focusout', (e) => {
    if (e.target.matches('.ak-step input')) setTimeout(() => paintRow(e.target.closest('.ak-item').dataset.key));
  });

  /* ---------- summary ---------- */
  const persons = $('#akPersons'), date = $('#akDate');
  if (saved) { if (saved.p) persons.value = saved.p; if (saved.d) date.value = saved.d; }
  else if (R.demo) persons.value = 40;
  persons.addEventListener('input', () => { summary(); save(); });
  date.addEventListener('input', save);

  function selected() { return items.filter((it) => qty[it.key] > 0).map((it) => ({ ...it, q: qty[it.key] })); }
  function summary() {
    const sel = selected();
    const total = sel.reduce((a, it) => a + (priced(it) ? it.q * it.price : 0), 0);
    const ask = sel.filter((it) => !priced(it));
    $('#akLines').innerHTML = sel.map((it) => `<li><span>${it.name}</span><small>${num(it.q)} ${UNIT[it.unit] || ''}${priced(it) ? ` × ${kc(it.price)}` : ''}</small><b>${priced(it) ? kc(it.q * it.price) : 'na dotaz'}</b></li>`).join('');
    $('#akEmpty').hidden = sel.length > 0;
    $('#akTotal').textContent = kc(total);
    const p = parseInt(persons.value, 10);
    $('#akPerPerson').textContent = p > 0 && total > 0 ? kc(total / p) : '–';
    const need = missing();
    $('#akNeed').hidden = !(need && sel.length);
    R.sections.forEach((s) => { if (s.required && !(need && need.id === s.id)) $(`#sec-${s.id}`).classList.remove('is-missing'); });
    const askEl = $('#akAsk');
    askEl.hidden = !ask.length;
    askEl.textContent = ask.length ? `+ ${ask.length} ${ask.length === 1 ? 'položka' : ask.length < 5 ? 'položky' : 'položek'} s cenou na dotaz (${ask.length === 1 ? 'není' : 'nejsou'} v součtu)` : '';
    // chips: count of chosen dishes per section
    R.sections.forEach((s) => {
      const n = sel.filter((it) => it.sid === s.id).length;
      const c = chips.querySelector(`[data-chip="${s.id}"]`);
      c.classList.toggle('is-on', n > 0); $('b', c).textContent = n || '';
    });
    const bar = $('#akBar');
    bar.hidden = sel.length === 0;
    $('#akBarTotal').textContent = kc(total);
    $('#akBarCount').textContent = `· ${sel.length} ${sel.length === 1 ? 'položka' : sel.length < 5 ? 'položky' : 'položek'}`;
    $('#akXlsxLabel').textContent = sel.length ? 'Stáhnout vyplněnou objednávku (Excel)' : 'Stáhnout prázdnou tabulku (Excel)';
    return { sel, total, p };
  }
  function save() { if (!R.demo) store.set({ q: qty, p: persons.value, d: date.value }); }

  /* ---------- actions ---------- */
  const toast = (t) => { const el = $('#akToast'); el.textContent = t; clearTimeout(toast.t); toast.t = setTimeout(() => { el.textContent = ''; }, 4000); };

  // contact fields are not stored in the browser, they only go into the copied text and the Excel file
  const contact = () => ({ name: $('#akName').value.trim(), phone: $('#akPhone').value.trim(), email: $('#akEmail').value.trim(), note: $('#akNote').value.trim() });
  function contactLines() {
    const c = contact();
    return [c.name && `Jméno: ${c.name}`, c.phone && `Telefon: ${c.phone}`, c.email && `E-mail: ${c.email}`, c.note && `Poznámka: ${c.note}`].filter(Boolean);
  }

  function inquiry() {
    const { sel, total, p } = summary();
    const d = date.value ? new Date(date.value + 'T12:00').toLocaleDateString('cs-CZ') : '…';
    const lines = sel.map((it) => `• ${it.name}: ${num(it.q)} ${UNIT[it.unit] || ''}${priced(it) ? ` × ${kc(it.price)} = ${kc(it.q * it.price)}` : ' (cena na dotaz)'}`);
    return [
      'Poptávka rautu – Restaurace Prostorica', '',
      ...contactLines(),
      `Datum akce: ${d}`, `Počet osob: ${p > 0 ? p : '…'}`, '',
      ...lines, '',
      `Celkem (orientačně): ${kc(total)}${p > 0 && total > 0 ? ` · na osobu ${kc(total / p)}` : ''}`,
    ].join('\n');
  }
  $('#akCopy').addEventListener('click', () => {
    if (!selected().length) { toast('Nejdřív zadejte množství u alespoň jednoho pokrmu.'); return; }
    if (demandRequired()) return;
    const text = inquiry();
    const fallback = () => {
      const buf = $('#akCopyBuf'); buf.value = text; buf.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch { /* ignore */ }
      toast(ok ? 'Poptávka je zkopírovaná. Vložte ji do zprávy.' : 'Kopírování se nepovedlo. Označte text ručně.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('Poptávka je zkopírovaná. Vložte ji do zprávy.'), fallback);
    } else fallback();
  });
  /* Excel: ExcelJS (~1 MB) loads only on the first click */
  let excelLib = null;
  const loadExcel = () => excelLib || (excelLib = new Promise((ok, fail) => {
    if (window.ExcelJS) { ok(window.ExcelJS); return; }
    const s = document.createElement('script');
    s.src = 'js/vendor/exceljs.min.js';
    s.onload = () => (window.ExcelJS ? ok(window.ExcelJS) : fail(new Error('ExcelJS missing')));
    s.onerror = () => { excelLib = null; fail(new Error('ExcelJS failed to load')); };
    document.head.appendChild(s);
  }));
  const xlsxBtn = $('#akXlsx');
  xlsxBtn.addEventListener('click', async () => {
    if (R.demo) { toast('V náhledu se soubor nestáhne. Na webu se stáhne tabulka Excel.'); return; }
    if (xlsxBtn.disabled) return;
    if (selected().length && demandRequired()) return;
    xlsxBtn.disabled = true;
    toast('Připravujeme tabulku…');
    try {
      const ExcelJS = await loadExcel();
      const filled = selected().length > 0;
      const wb = await window.ProstoricaXlsx.build(ExcelJS, R, { qty, persons: persons.value, date: date.value, ...contact() });
      const blob = new Blob([await wb.xlsx.writeBuffer()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const filename = filled ? `Prostorica-objednavka-${date.value || new Date().toISOString().slice(0, 10)}.xlsx` : 'Prostorica-banket-objednavka.xlsx';
      // inside the claude.ai preview downloads go through its own save dialog
      const viewer = window.claude && window.claude.use ? await window.claude.use('downloads') : null;
      if (viewer) {
        try { await viewer.save({ filename, data: blob }); } catch (err) {
          toast(err && err.code === 'declined' ? 'Stažení jste zrušili.' : 'Soubor se nepodařilo uložit.');
          return;
        }
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 10000);
      }
      toast(filled ? 'Objednávka je stažená. Pošlete nám ji nebo zavolejte.' : 'Tabulka je stažená.');
    } catch {
      toast('Tabulku se nepodařilo vytvořit. Zkuste to znovu nebo nám zavolejte.');
    } finally { xlsxBtn.disabled = false; }
  });
  $('#akClear').addEventListener('click', () => {
    qty = {}; items.forEach((it) => paintRow(it.key)); summary(); save(); toast('Výběr je vymazaný.');
  });

  items.forEach((it) => paintRow(it.key));
  summary();
})();
