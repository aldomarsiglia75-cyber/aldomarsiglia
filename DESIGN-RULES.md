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

## Composizione libera (About, 09/09/2026): canvas per sezione

A differenza di Works/Home (righe flex ripetute), l'export Figma di About
è una composizione libera — ogni elemento ha solo `left`/`top` assoluti,
nessuna riga ripetuta. Pattern usato per portarla in codice restando
fedeli all'export senza un unico blocco assoluto da 2484px:

- La pagina è divisa in sezioni normal-flow che si impilano una sotto
  l'altra (`.about-hero`, `.about-intro`, `.about-bio`, `.about-cards`),
  ciascuna `position: relative` e alta quanto il suo contenuto
  nell'export (bottom-più-basso meno top-più-alto, convertito in vw).
- Dentro una sezione, ogni figlio è `position: absolute` con:
  - `left` **sempre assoluto-di-pagina** (`px/1440*100`, stesso valore
    per qualsiasi sezione) — così l'allineamento orizzontale fra sezioni
    diverse resta corretto per costruzione, senza fare i conti a mano.
  - `top` **relativo all'origine della propria sezione** (il punto più
    alto del suo contenuto nell'export) — permette a ogni sezione di
    avere un'altezza propria e di impilarsi in flusso normale.
- I due divisori orizzontali (`.about-divider`, semplici `<hr>`) NON
  riproducono il `top` esatto dell'export: la loro posizione è già
  determinata dai margini delle sezioni adiacenti, bastano margini
  approssimati (l'export li usa solo come separatori visivi, non hanno
  bisogno di un `top` pixel-perfect).

## Due pattern di chip, non uno solo — scegliere in base alla sezione

Costruendo About (09/09/2026, due round di revisione) sono emersi DUE
modi diversi di trattare le etichette-annotazione ("Hope I", "Syndrome",
"Master of broken hatches", ecc.), a seconda della sezione. Non sono
intercambiabili — usare quello sbagliato rompe l'effetto voluto.

### 1. Adesivo: copre il testo sotto (solo claim e intro)

Nel claim ("I Know What I'm Doing") e nella riga "As a Junior
Architect...", i chip sono `position: absolute` e stanno FISICAMENTE
SOPRA al testo continuo, coprendone parte — il testo di base non ha
spazi riservati (es. "my HIGHLY ORGANIZED mind is..." per intero), il
chip con sfondo opaco (`var(--paper)`) maschera le lettere sotto,
lasciando intravedere solo i frammenti ai lati (es. "...ANIZED",
"...onstantly..."). Per funzionare il chip deve venire DOPO l'elemento
che copre nell'ordine del DOM (stacking naturale, nessun z-index). Nel
claim si ottiene gratis riusando `.hero__chip` dentro una
`.hero-row--overlay` (si centra da solo con `top:50%`); nell'intro un
componente dedicato (`.about-intro__chip`) con `top`/`left` propri.

### 2. Incorporato nel testo: scorre come parte della frase (bio, card)

Nella bio ("Main Character"), in Hard Skills e in Education, i chip
sono invece `<span>` NORMALI dentro il flusso del testo/della lista —
`position: static; display: inline-flex`, scritti nell'HTML esattamente
nel punto in cui devono apparire (es. `<li>3D & BIM: ... Sketchup
<span class="hero__chip">Actively testing...</span></li>`). Vanno a capo
insieme al testo circostante, non lo coprono mai. Verificato contro uno
screenshot di riferimento fornito dall'utente (chip che "invadono lo
spazio come se fossero incorporati nel testo", non sovrapposti).
Ottenuto con un override scoped: `.about-bio .hero__chip, .about-cards
.hero__chip { position:static; display:inline-flex; transform:none }`
— stesso componente `.hero__chip` del pattern 1, cambia solo il
contesto (dentro `.about-bio`/`.about-cards` invece che dentro una
`.hero-row--overlay`).

**Come decidere quale usare su una pagina nuova**: se l'export Figma
mostra il chip sovrapposto a lettere del testo sotto → pattern 1
(adesivo). Se il chip sta acccostato/dopo un pezzo di testo senza
coprire nulla, e il testo intorno si riorganizza per fargli spazio →
pattern 2 (incorporato). Nel dubbio, chiedere: la differenza non è
sempre ovvia da uno screenshot statico.

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
- Un contenitore con figli `position:absolute; inset:0` (es. immagine +
  velo di uno slideshow/thumb) DEVE restare `position:relative` (mai
  `static`) in QUALSIASI breakpoint, anche mobile — se diventa `static`,
  i figli assoluti "risalgono" al prossimo antenato posizionato e
  coprono un'area enorme invece di restare dentro il contenitore. Preso
  e risolto su `.about-hero__thumb` nel breakpoint mobile: la regola
  sbagliata era `position:static`, corretta in `position:relative` (più
  `left/top:auto` per annullare l'assoluto desktop).
