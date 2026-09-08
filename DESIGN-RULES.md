# Regole di layout — Home & Works

Convenzioni stabilite costruendo `index.html` (Home) e `progetti.html`
(Works) da export HTML reali di Figma. Vanno seguite per ogni pagina
futura basata su un export Figma con lo stesso canvas di riferimento
(1440px). Non sono regole teoriche: sono state validate a mano, riga per
riga, contro lo screenshot/export originale.

## Workflow (non negoziabile)

1. Parti sempre da un **export HTML reale di Figma**, mai da uno
   screenshot interpretato a occhio — uno screenshot porta a indovinare
   misure e a rifare il lavoro da capo (vedi il tentativo "grey card"
   scartato).
2. Costruisci prima in un file di prova isolato (`preview-*-test.html`,
   fuori dal sito reale), validalo a schermo con l'utente elemento per
   elemento.
3. Solo dopo l'ok, porta il codice validato dentro `style.css` e le
   pagine reali.
4. Committa solo dopo la verifica visiva nel browser reale (non solo
   "sembra giusto" dal codice).

## Griglia e scala

- Canvas di riferimento Figma: **1440px**. Ogni misura assoluta
  dell'export (px) si converte in `vw` con `px / 1440 * 100`, non in
  `rem`/`clamp` — deve restare in scala esatta con l'originale a
  qualunque larghezza di finestra.
- Token condivisi in `:root`:
  - `--hero-margin: 3.333vw` (48px)
  - `--hero-gutter: 1.667vw` (24px)
  - `--hero-col: 6.25vw` (90px)
  — corrispondono a una griglia 12 colonne, margine 48px, gutter 24px,
  colonne 90px su canvas 1440.
- Griglia di debug (`.debug-grid`) sempre presente in ogni pagina,
  modulo 12×12px, `position: fixed; inset: 0; z-index: -1; opacity: 0.3`.
  **Regola generale: la griglia sta sempre sotto a tutto** — questo si
  ottiene SOLO con lo z-index negativo sulla griglia stessa, mai con
  z-index positivi sparsi sugli elementi normali (rimossi come dead
  code quando trovati). La nav non ha `background`, così la griglia si
  vede anche dietro di lei.

## Allineamento testo/immagine: `align-items: baseline`

Quando una riga ha testo enorme (hero) affiancato a un'immagine, non si
calcolano offset a mano: si usa `align-items: baseline` nativo del
flexbox. La baseline del testo è la vera baseline delle lettere;
un'immagine (elemento replaced) usa il suo bordo inferiore come
baseline. Nei progetti fin qui, l'altezza dell'immagine (120px /
8.333vw) coincide con l'altezza-x/cap-height del font a quella scala,
quindi questa unica proprietà CSS allinea correttamente sia la testa
che la base dell'immagine col testo, senza offset manuali.

## Pattern "adesivo" per le etichette (chip)

Etichette come "Selected" / "Everyone" / "Wanna be" NON sono inline nel
flusso del testo (creerebbero spazi indesiderati): sono elementi
`position: absolute` separati, con `background: var(--paper)` opaco,
che si sovrappongono visivamente al testo continuo sottostante
mascherando le lettere sotto (es. "MY WORKS" resta un testo unico,
"SELECTED" ci sta sopra come un adesivo).

Struttura CSS condivisa in `style.css`:
- `.hero__chip` — regola base (posizione assoluta, sfondo, bordo,
  font, dimensioni comuni). Niente `left` qui: ogni pagina/etichetta
  aggiunge il proprio modificatore.
- `.hero__chip--selected` (Works), `--everyone` / `--wannabe` (Home) —
  solo `left` (e per Works, larghezza fissa `7.361vw` perché il testo
  "Selected" ha una larghezza fissa nell'export originale; le altre
  usano padding perché nell'export non hanno una larghezza fissa).

Quando si aggiunge una nuova etichetta: NON toccare `.hero__chip`,
aggiungere solo un nuovo modificatore `--nome` con la sua `left`.

## Componente slideshow/tint (rettangoli-progetto)

`.hero-thumb` — contenitore generico (`position: relative; overflow:
hidden; border-radius: 0.417vw` cioè 6px). Le dimensioni (`width`/
`height`) sono SEMPRE in un modificatore separato, mai nella classe
base, perché ogni pagina ha rettangoli di larghezza diversa:
`.hero-thumb--small` (Works), `.hero-thumb--junior` /
`--architect` (Home). L'altezza è quasi sempre `8.333vw` (120px).

Dentro, N immagini impilate (`<img class="hero-thumb__img">`),
crociate via `hero-slideshow.js` (`setInterval` 1200ms, classe
`.is-active`, transizione di opacità). Sopra, un velo rosso
(`.hero-thumb__tint`, `background: var(--accent); opacity: 0.45;
mix-blend-mode: multiply`) che sparisce a `opacity: 0` su `:hover` o
tocco (`.is-touched`, gestito in JS con `touchstart`/`touchend`).

Per aggiungere un nuovo rettangolo-slideshow in una pagina nuova:
riusa `.hero-thumb` + un nuovo modificatore di sola larghezza, riusa
`hero-slideshow.js` via `data-slideshow` sul contenitore, non
duplicare la logica JS.

## Righe hero (`.hero-row`)

- `.hero-row` — riga generica: `display:flex; align-items:baseline;
  justify-content:space-between; padding:0 var(--hero-margin); gap:
  1.667vw`.
- `.hero-row + .hero-row { margin-top: -1.71vw }` — passo reale tra le
  righe (~144px), più stretto dell'altezza del box di testo (169px):
  è così nell'export originale, non un bug.
- `.hero-row--overlay` — modificatore generico (`position: relative`)
  per ogni riga che contiene un'etichetta-adesivo assoluta sopra di
  sé. Nome generico apposta: usato sia dalla riga "My Works" di Works
  che dalle due righe con chip di Home. Non ricreare varianti
  page-specific tipo `--mywork`.

**Attenzione contenitore esterno**: Works usa un `.hero` con
`position:absolute` sulle righe (hero fixed-height, con
`overflow:hidden` e bordo inferiore) perché nell'export Figma
originale la sezione ha un'altezza fissa voluta. Home invece riserva
davvero lo spazio nel flusso (niente altezza fissa): il modificatore
`.hero--home` sovrascrive `height:auto; border-bottom:none;
overflow:visible` e forza `.hero-rows` a `position:static` con
`margin-top` (NON `position:relative;top`, che non riserva spazio nel
flusso — vedi bug sotto). Quando arriva una pagina nuova con hero,
decidere subito se il contenitore deve essere "fixed-height + assoluto"
(stile Works) o "riserva spazio reale" (stile Home), e usare il
modificatore giusto invece di duplicare `.hero`.

## Nav (uguale in tutte le pagine)

- `.site-nav` — non sticky, `position: relative; min-height: 5rem`,
  nessun `background` (per far vedere la griglia sotto).
- Tre elementi diretti figli di `.site-nav` (NON dentro un wrapper
  `.wrap`/`.site-nav__inner` — un wrapper intermedio crea due contesti
  di centratura diversi e disallinea gli elementi verticalmente, bug
  già preso e risolto):
  - `.brand-mark` (logo "AM") — `position:absolute; left:
    var(--hero-margin); top:50%; transform:translateY(-50%)`.
  - `.nav-clock` — orologio digitale (HH:MM, si aggiorna ogni
    secondo via `nav-clock.js`), stessa logica di posizionamento ma
    `right: var(--hero-margin)`. Font sempre `var(--font)` (Alte Haas
    Grotesk), mai `monospace`.
  - `.nav-pills` — centrata `left:50%; top:50%;
    transform:translate(-50%,-50%)`.
- Selettori con specificità corretta: `.site-nav a` (element+class)
  batte silenziosamente `.brand-mark`/`.nav-pill` (single-class) — usa
  sempre `.site-nav a.brand-mark` / `.site-nav a.nav-pill` per ogni
  nuova regola su un link della nav.
- Pagine con pannello `position:fixed` sotto la nav (project-detail):
  la nav non è sticky ma occupa comunque spazio reale nel flusso sopra
  il pannello fisso — serve un offset `--nav-h` (misurato a runtime con
  `nav.offsetHeight`) indipendentemente dal fatto che la nav sia
  sticky o no.

## Footer (uguale in tutte le pagine)

- Nessun bordo/linea separatrice.
- Tutto il testo rosso (`var(--accent)`).
- Il nome "Aldo Marsiglia" è un link cliccabile verso la Home, come il
  logo "AM" in alto.

## Palette: eccezione rosso statico

Regola generale del sito (vedi memoria
`feedback_blue_as_selection_state.md`): rosso/blu dovrebbero essere
solo stati interattivi/di selezione, mai colore statico a riposo.
**Home e Works sono un'eccezione deliberata e confermata**: `#CC0000`
è l'inchiostro principale a riposo per hero, nav e footer di queste due
pagine, validato più volte contro l'export Figma reale. Le altre
pagine (About/Journal, finché non arriva un export Figma dedicato)
restano sulla palette grafite (`--ink`).

## Font

Alte Haas Grotesk (freeware, uso commerciale ok), solo pesi 400/700.
Mai `font-weight: 900` (convertito a 700 ovunque). Mai `monospace` per
etichette/orologio — sempre `var(--font)`/`var(--font-mono)`, che in
questo sito puntano entrambe ad Alte Haas Grotesk.

## Bug ricorrenti da NON ripetere

- `position: relative; top: Xvw` non riserva spazio nel flusso
  normale (sposta solo visivamente) — se l'offset deve anche spingere
  giù il contenuto successivo (es. il footer), usare `margin-top`.
- Un wrapper intermedio vuoto tra `.site-nav` e i suoi tre elementi
  crea due contesti di centratura diversi → disallineamento verticale.
  Tienili tutti diretti figli di `.site-nav`.
- Copia-incolla da preview a sito reale: confrontare SEMPRE proprietà
  per proprietà (non a campione) — differenze già capitate: `left`
  del chip, `color`/`border` non aggiornati, dimensione frecce vecchia.
