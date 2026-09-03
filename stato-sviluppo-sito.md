# Stato sviluppo — sito Aldo Marsiglia

Ultimo aggiornamento: 3 settembre 2026 — commit `4bf7e22`, pushato su `origin/main`, live su https://aldomarsiglia.com

Contesto generale (obiettivo, deadline, workflow, riferimenti visivi) in `note-progetto-sito.md` — questo file traccia invece **cosa è stato effettivamente implementato**.

---

## Identità visiva

- **Palette**: `#CC0000` rosso (sfondo di tutto il sito, non solo la home), `#FFFFFF` bianco (testo), `#0022FF` blu.
- **Il blu è uno stato di interazione, non un colore statico.** Va usato solo su hover/focus/selezione/pagina-corrente (nav, riquadri card, focus ring, `::selection`, cursore custom) — mai come colore di testo fisso su sfondo rosso: il contrasto è troppo basso (~1.3:1), quasi illeggibile. Dove serve un'etichetta blu "sempre visibile" (es. categoria progetto), si usa un **chip pieno** (sfondo blu, testo bianco), non testo blu su rosso.
- **Font**: un'unica famiglia in tutto il sito, `Neue Haas Display` (`fonts/NeueHaasDisplay*.ttf` — di fatto una Neue Grotesk) — titoli (h1/h2, hero "ALDO MARSIGLIA", titoli progetto, logo "AM", footer brand) e corpo testo/nav/label/form/tag. `A Matter` (`fonts/A_MATTER_.otf`) non è più usato da nessuna pagina (file non rimosso, nel dubbio) da quando i titoli sono passati a Neue Haas Display. Tracking titoli (`--track-tight`) ridotto da `-0.4em` a `-0.02em`: il valore precedente era tarato sulle forme condensate di A Matter e con Neue Haas Display rendeva le scritte illeggibili (lettere sovrapposte). I file Manrope in `fonts/` restano inutilizzati.

## Struttura pagine e nav

- 4 pagine: `index.html` (Home), `progetti.html` (Works), `chi-sono.html` (About), `contatti.html` (Contacts).
- Nav **unificata** su tutte e 4 (anche la Home, che prima aveva un pill-nav separato): stessa `<header class="site-header">` con logo "AM" (A Matter bold) + nav Home/Works/About/Contacts — niente più numerazione ("01 Progetti" ecc.) né descrizioni sotto le voci.
- Voce selezionata/hover = **riquadro blu pieno stondato** (10px), testo bianco — stesso trattamento su bottoni (`.btn`, `.view-switch__btn`) e sulle project card.
- Hero Home: solo il titolo "ALDO MARSIGLIA", ancorato in basso (`min-height: 82vh`), sfondo rosso.
- Footer: tagline "Portfolio / Archivio" (non più "Studio di Architettura & Interior Design"). Sotto al footer, un colophon minimale: `Aggiornato — 02.09.2026`.

## Pagina Works (progetti.html)

- **Toggle Griglia/Lista** (`works-view.js`), persistito in `localStorage` (chiave `worksView`). Vista lista in stile Atomaa (riga per progetto, riquadro blu + freccia `→` al hover).
- **8 progetti reali** (sostituiti tutti i placeholder), ognuno con: copertina reale, titolo (A Matter bold), etichetta accademica (mono, sotto il titolo, elemento separato — non più concatenato con "—"), categoria (chip blu pieno), descrizione breve.

| # | Titolo | Categoria | Etichetta accademica |
|---|---|---|---|
| 1 | Intreccio | Residenziale | Laboratorio di Progettazione 1 — I anno Triennale |
| 2 | Koinè | Residenziale | Laboratorio finale — III anno Triennale |
| 3 | Spina Abitata | Ristrutturazione | Laboratorio di Costruzione — I anno Magistrale |
| 4 | S.P.A.C.E. | Interior Design | Laboratorio di Interni — I anno Magistrale |
| 5 | Padiglione | Commerciale | Concorso — Fuorisalone 2026 |
| 6 | The IE Series | Interior Design | Laboratorio di Interni — I anno Magistrale |
| 7 | Promenade | Residenziale | Laboratorio — II anno Triennale |
| 8 | On:Off Line | Interior Design | Laboratorio di Interni — Magistrale |

- Home ("Una selezione"): 3 progetti in evidenza — Padiglione, Spina Abitata, Promenade.
- **Le card puntano ancora a `href="#"`** — non esistono pagine di dettaglio per singolo progetto.

## Copertine progetti (`covers/`)

8 immagini ottimizzate (JPEG, ~1400px, 60-500KB l'una) generate a partire dagli originali in `works/`:
- Dove esisteva già un render JPG/PNG in `0N_PROGETTO/00_viste/`, è stato ridimensionato/compresso con `sips`.
- Dove c'erano solo PDF tecnici, la vista migliore è stata convertita in PNG con `qlmanage -t` (thumbnail QuickLook) e poi compressa.
- Nomi: `01-intreccio.jpg` … `08-onoffline.jpg`.
- **`works/` NON è in git** (47GB — impossibile su GitHub Pages). Contiene ancora tutti gli elaborati originali (piante, sezioni, assonometrie, schemi) per ogni progetto, utile se in futuro si costruiscono pagine di dettaglio.

## Pagina Contatti

Campi: Nome (Aldo Marsiglia), Email (`aldomarsiglia75@gmail.com`, mailto cliccabile), Sede (Milano). Rimossi Tel e P.IVA. Social: Instagram e Pinterest con link reali; **LinkedIn rimosso su richiesta** (non fornito).

## Micro-interazioni / dettagli UI

- **Cursore custom**: cerchio blu che segue il mouse (`cursor.js`), si allarga su hover di elementi interattivi (link, bottoni, card, toggle). Solo desktop (`pointer:fine`), disattivo su touch.
- **Selezione testo** (`::selection`): sfondo blu, testo bianco, ovunque nel sito (stile Atomaa).
- **Angoli stondati** (10px) su nav, bottoni, project card (griglia e lista); categoria progetto è un chip completamente stondato (999px).

## Cose aperte / possibili prossimi passi

- Nessuna pagina di dettaglio per i singoli progetti (le card sono ancora `href="#"`).
- `works/` ha ancora `DA_VALUTARE/` da rivedere in 6 degli 8 progetti (vedi `works/STATO_RINOMINA.md`).
- `inspo portfolio/` (screenshot di riferimento) non è in git, resta locale.
- Font Manrope in `fonts/` non più usato da nessuna pagina — non rimosso.
- Se in futuro si aggiungono altre pagine, replicare esattamente lo `<header class="site-header">` di `chi-sono.html`/`progetti.html`/`contatti.html`/`index.html` per restare coerenti con la nav unificata.
