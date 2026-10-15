# Prostorica Restaurace

Animovaný web restaurace Prostorica, Slezská Ostrava (CZ / RU / EN / PL). Statický web: otevřete `index.html`.

- `index.html`: hlavní stránka (menu, galerie, rezervace, sál, kudy k nám)
- `denni-menu.html`: samostatná stránka s týdenním denním menu
- `css/style.css`, `css/denni.css`: styly a animace
- `js/main.js`: jídelní lístek, rezervace, trasa, přepínání jazyka
- `js/denni.js`: stránka denního menu
- `assets/`: akvarelové levandule a fotografie

## Jak každý týden změnit denní menu

Upravte jen soubor **`js/denni-menu-data.js`**:

1. `from` / `to`: první a poslední den (např. `'2026-10-19'` a `'2026-10-23'`).
2. `soups`: polévka pro každý den (`day: 0` = pondělí … `4` = pátek) a alergeny.
3. `mains`: hlavní chody v pořadí 1–6, gramáž (`g`), přílohy (`side`), alergeny (`a`) a cena (`p`).
4. Pole `ru`, `en`, `pl` (překlady) jsou nepovinná. Když chybí, zobrazí se čeština.

Hlavní stránka i stránka denního menu se z tohoto souboru vyplní samy. Dnešní polévka se zvýrazní automaticky.
Po datu `to` web místo starého menu ukáže „Nové denní menu právě připravujeme“.

## Prostory (salónky a sál)

Upravte soubor **`js/prostory-data.js`**. Fotky nahrajte do `assets/photos/prostory/` a cesty vepište do `photos`:

```js
photos: ['assets/photos/prostory/modry-1.webp', 'assets/photos/prostory/modry-2.webp', 'assets/photos/prostory/modry-3.webp'],
```

První fotka je velká, další dvě menší. Dokud fotka chybí, zobrazí se rámeček „Fotografie doplníme“.

## Nápojový a vinný lístek

Stránka `napoje.html` (odkaz `napoje.html#vina` otevře rovnou vína). Ceny a položky upravujte v **`js/napoje-data.js`**:
`drinks` = nápojový lístek, `wine` = vinný lístek. Návod k položkám je nahoře v souboru.

## GDPR a cookies

- `gdpr.html`: Zásady zpracování osobních údajů (text z PDF ze dne 23. 2. 2026, PDF je v `assets/docs/`).
- `js/consent.js`: cookie lišta. Kategorie: nezbytné / marketingové (Seznam Sklik retargeting, `rtgId 1704701`) / externí obsah (Google Maps).
  Kód Sklik se načte vždy a posílá `consent: 1` (souhlas) nebo `0` (bez souhlasu) podle návodu Seznamu. Mapa Google se načte až po souhlasu.
  Volbu lze změnit odkazem „Nastavení cookies“ v patičce.
- Fonty jsou uložené přímo na webu (`assets/fonts/`, `css/fonts.css`) – web se kvůli nim nepřipojuje ke Googlu.
