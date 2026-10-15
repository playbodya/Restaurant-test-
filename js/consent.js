/*
 * COOKIE LIŠTA + souhlas (GDPR)
 *
 * Kategorie:
 *   necessary … nezbytné (vždy zapnuté): uložení jazyka a této volby v prohlížeči
 *   marketing … Seznam Sklik retargeting (rtgId níže); kód se načte AŽ po souhlasu
 *   external  … externí obsah: mapa Google Maps
 *
 * Volba se ukládá do localStorage pod klíčem 'prostorica-consent'.
 * Lištu lze znovu otevřít jakýmkoli prvkem s atributem data-cookie-settings.
 */
(() => {
  const SKLIK_RTG_ID = 1704701;
  const KEY = 'prostorica-consent';
  const VERSION = 1;

  const T = {
    cs: {
      title: 'Cookies a soukromí',
      text: 'Používáme nezbytné technologie pro fungování webu. S vaším souhlasem také marketingové cookies Seznam Sklik (abychom vám mohli ukázat naši reklamu) a mapu Google. Souhlas můžete kdykoli změnit v patičce webu.',
      accept: 'Přijmout vše', reject: 'Odmítnout', settings: 'Nastavení', save: 'Uložit volbu',
      necessary: 'Nezbytné', necessaryD: 'Uložení jazyka a vaší volby cookies. Nelze vypnout.',
      marketing: 'Marketingové', marketingD: 'Seznam Sklik – retargeting, abychom vám mohli zobrazit naši reklamu na dalších webech.',
      external: 'Externí obsah', externalD: 'Mapa Google Maps v sekci „Kudy k nám“. Google při načtení získá vaši IP adresu.',
      policy: 'Zásady zpracování osobních údajů', always: 'vždy',
    },
    ru: {
      title: 'Cookies и приватность',
      text: 'Мы используем технологии, необходимые для работы сайта. С вашего согласия — также маркетинговые cookies Seznam Sklik (чтобы показывать вам нашу рекламу) и карту Google. Согласие можно изменить в любой момент внизу сайта.',
      accept: 'Принять все', reject: 'Отклонить', settings: 'Настройки', save: 'Сохранить выбор',
      necessary: 'Необходимые', necessaryD: 'Сохранение языка и вашего выбора cookies. Отключить нельзя.',
      marketing: 'Маркетинговые', marketingD: 'Seznam Sklik — ретаргетинг, чтобы показывать вам нашу рекламу на других сайтах.',
      external: 'Внешний контент', externalD: 'Карта Google Maps в разделе «Как добраться». Google получит ваш IP-адрес.',
      policy: 'Политика обработки персональных данных', always: 'всегда',
    },
    en: {
      title: 'Cookies & privacy',
      text: 'We use technologies the website needs to work. With your consent, we also use Seznam Sklik marketing cookies (to show you our ads) and a Google map. You can change your choice at any time in the footer.',
      accept: 'Accept all', reject: 'Reject', settings: 'Settings', save: 'Save choice',
      necessary: 'Necessary', necessaryD: 'Stores your language and cookie choice. Always on.',
      marketing: 'Marketing', marketingD: 'Seznam Sklik retargeting, so we can show you our ads on other websites.',
      external: 'External content', externalD: 'Google Maps in the “Find us” section. Google receives your IP address when it loads.',
      policy: 'Privacy policy', always: 'always',
    },
    pl: {
      title: 'Cookies i prywatność',
      text: 'Używamy technologii niezbędnych do działania strony. Za Twoją zgodą także marketingowych cookies Seznam Sklik (aby pokazywać Ci naszą reklamę) oraz mapy Google. Zgodę możesz zmienić w każdej chwili w stopce strony.',
      accept: 'Akceptuj wszystkie', reject: 'Odrzuć', settings: 'Ustawienia', save: 'Zapisz wybór',
      necessary: 'Niezbędne', necessaryD: 'Zapamiętanie języka i Twojego wyboru cookies. Nie można wyłączyć.',
      marketing: 'Marketingowe', marketingD: 'Seznam Sklik – retargeting, abyśmy mogli wyświetlać Ci naszą reklamę na innych stronach.',
      external: 'Treści zewnętrzne', externalD: 'Mapa Google Maps w sekcji „Dojazd”. Google otrzyma Twój adres IP.',
      policy: 'Zasady przetwarzania danych osobowych', always: 'zawsze',
    },
  };
  const lang = () => (T[document.documentElement.lang] ? document.documentElement.lang : 'cs');

  const read = () => {
    try { const c = JSON.parse(localStorage.getItem(KEY)); return c && c.v === VERSION ? c : null; } catch { return null; }
  };
  const write = (c) => { try { localStorage.setItem(KEY, JSON.stringify({ ...c, v: VERSION, ts: new Date().toISOString() })); } catch { /* storage unavailable */ } };

  let state = read();
  const listeners = [];

  /* ---------- Seznam Sklik retargeting (only after marketing consent) ---------- */
  let sklikSent = false;
  function sklik() {
    if (sklikSent || !state || !state.marketing) return;
    sklikSent = true;
    const s = document.createElement('script');
    s.src = 'https://c.seznam.cz/js/rc.js';
    s.async = true;
    s.onload = () => {
      try {
        if (window.sznIVA && window.sznIVA.IS) window.sznIVA.IS.updateIdentities({ eid: null });
        if (window.rc && window.rc.retargetingHit) window.rc.retargetingHit({ rtgId: SKLIK_RTG_ID, consent: 1 });
      } catch { /* ad blockers etc. */ }
    };
    document.head.appendChild(s);
  }

  function apply(next) {
    state = { marketing: !!next.marketing, external: !!next.external };
    write(state);
    hide();
    sklik();
    listeners.forEach((fn) => fn(state));
  }

  /* ---------- UI ---------- */
  let box = null;
  function render(showSettings) {
    const t = T[lang()];
    if (!box) {
      box = document.createElement('div');
      box.className = 'cc';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-live', 'polite');
      box.setAttribute('aria-label', 'Cookies');
      document.body.appendChild(box);
    }
    const cur = state || { marketing: false, external: false };
    box.innerHTML = `
      <div class="cc__inner">
        <p class="cc__title">${t.title}</p>
        <p class="cc__text">${t.text} <a href="gdpr.html">${t.policy}</a></p>
        <div class="cc__opts" ${showSettings ? '' : 'hidden'}>
          <label class="cc__opt"><input type="checkbox" checked disabled><span><b>${t.necessary}</b> <em>(${t.always})</em><small>${t.necessaryD}</small></span></label>
          <label class="cc__opt"><input type="checkbox" id="cc-marketing" ${cur.marketing ? 'checked' : ''}><span><b>${t.marketing}</b><small>${t.marketingD}</small></span></label>
          <label class="cc__opt"><input type="checkbox" id="cc-external" ${cur.external ? 'checked' : ''}><span><b>${t.external}</b><small>${t.externalD}</small></span></label>
        </div>
        <div class="cc__btns">
          <button type="button" class="cc__btn cc__btn--ghost" data-cc="reject">${t.reject}</button>
          ${showSettings
            ? `<button type="button" class="cc__btn cc__btn--ghost" data-cc="save">${t.save}</button>`
            : `<button type="button" class="cc__btn cc__btn--ghost" data-cc="settings">${t.settings}</button>`}
          <button type="button" class="cc__btn" data-cc="accept">${t.accept}</button>
        </div>
      </div>`;
    box.hidden = false;
    box.dataset.settings = showSettings ? '1' : '';
  }
  function hide() { if (box) box.hidden = true; }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cc]');
    if (b) {
      const a = b.dataset.cc;
      if (a === 'accept') apply({ marketing: true, external: true });
      if (a === 'reject') apply({ marketing: false, external: false });
      if (a === 'settings') render(true);
      if (a === 'save') apply({ marketing: box.querySelector('#cc-marketing').checked, external: box.querySelector('#cc-external').checked });
      return;
    }
    if (e.target.closest('[data-cookie-settings]')) { e.preventDefault(); render(true); }
  });

  // re-translate the open banner when the page language changes
  new MutationObserver(() => { if (box && !box.hidden) render(!!box.dataset.settings); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  window.ProstoricaConsent = {
    get: () => state,
    onChange: (fn) => { listeners.push(fn); if (state) fn(state); },
    grant: (cat) => apply({ ...(state || {}), [cat]: true }),
    open: () => render(true),
  };

  const boot = () => { if (!state) render(false); else sklik(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
