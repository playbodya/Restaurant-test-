# Prostorica Restaurace

Animovaný web restaurace Prostorica, Slezská Ostrava (CZ / RU). Statický web: otevřete `index.html`.

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
4. Pole `ru` (ruský překlad) jsou nepovinná. Když chybí, zobrazí se čeština.

Hlavní stránka i stránka denního menu se z tohoto souboru vyplní samy. Dnešní polévka se zvýrazní automaticky.
Po datu `to` web místo starého menu ukáže „Nové denní menu právě připravujeme“.
