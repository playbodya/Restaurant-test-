(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const ROOMS = window.PROSTORY || [];
  const RENT = ((window.RAUT && window.RAUT.sections) || []).find((s) => s.id === 'pronajem');
  const TAGS = { birthday: 'Narozeniny', family: 'Rodinný oběd', reunion: 'Sraz absolventů', wedding: 'Svatby', ball: 'Maturitní plesy', company: 'Firemní večírky', business: 'Obchodní schůzky' };
  const kc = (n) => `${Math.round(n).toLocaleString('cs-CZ')} Kč`;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // which room: prostor.html#velky (falls back to the first one)
  const current = () => ROOMS.find((r) => r.id === location.hash.slice(1)) || ROOMS[0];

  function render() {
    const r = current();
    if (!r) return;
    document.title = `${r.name} · Prostorica`;
    $('#prTabs').innerHTML = ROOMS.map((x) => `<a class="pr-tab${x.id === r.id ? ' is-on' : ''}" href="#${x.id}"${x.id === r.id ? ' aria-current="page"' : ''}>${esc(x.name)}</a>`).join('');
    $('#prEyebrow').textContent = r.private ? 'Prostory · nejvíce soukromí' : 'Prostory';
    $('#prTitle').textContent = r.name;
    $('#prCap').innerHTML = `<b>${r.min}–${r.max}</b> hostů`;

    const prices = (r.rent || []).map((name) => {
      const it = RENT && RENT.items.find((i) => i.name === name);
      return `<li><span>${esc(name)}</span><b>${it && typeof it.price === 'number' ? kc(it.price) : 'cena na dotaz'}</b></li>`;
    });
    // no rental items (e.g. Modrý salónek is free): show no price block at all
    $('#prPrices').innerHTML = prices.join('');
    $('#prPrices').hidden = !prices.length;

    const photos = r.photos || [];
    $('#prPhotos').innerHTML = photos.map((src, i) => `<a class="pr-photo${i ? '' : ' pr-photo--main'}" href="${src}" target="_blank" rel="noopener"><img src="${src}" alt="${esc(r.name)} – fotografie ${i + 1}" loading="${i ? 'lazy' : 'eager'}"></a>`).join('');
    $('#prPhotos').hidden = !photos.length;

    $('#prText').textContent = (r.text && r.text.cs) || '';
    $('#prSuits').textContent = r.suits ? `Vhodné pro: ${r.suits}` : '';
    $('#prSuits').hidden = !r.suits;
    $('#prTags').innerHTML = (r.tags || []).map((t) => `<li>${TAGS[t] || t}</li>`).join('');
    const info = r.info || [];
    $('#prInfo').innerHTML = info.map((t) => `<li>${esc(t)}</li>`).join('');
    $('#prInfoWrap').hidden = !info.length;
    scrollTo(0, 0);
  }

  $('#prPartners').innerHTML = (window.PARTNERI || []).map((p) => `
    <li class="pr-partner">
      <p class="pr-partner__kind">${esc(p.kind)}</p>
      <h3 class="pr-partner__name">${esc(p.name)}</h3>
      <p class="pr-partner__text">${esc(p.text)}</p>
      <a class="pr-partner__go" href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.link || p.name)} ↗</a>
    </li>`).join('');

  addEventListener('hashchange', render);
  render();
})();
