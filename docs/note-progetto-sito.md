# Note di progetto — sito e portfolio Aldo Marsiglia

Ultimo aggiornamento: 31 agosto 2026
Piano completo, giorno per giorno, su Notion: [Sito & Portfolio — Sprint 1-12 settembre](https://app.notion.com/p/3cd03b2941f9818d9f18c7b7d04ce179?pvs=204)

---

## Obiettivo

Entro il 12 settembre: sito pubblicato con identità visiva coordinata e portfolio aggiornato con i progetti nuovi, pronto da inviare agli atenei.

Flusso di lavoro: **Figma** (progettazione visiva e interazioni) → **Claude Design** (ponte tra design e prototipo) → **Claude Code** (implementazione reale sul sito statico).

## Palette colori

- **#CC0000** — rosso, sfondo principale
- **#FFFFFF** — bianco, testi
- **#0022FF** — blu, colore jolly che si "illumina" quando si seleziona qualcosa (menu, elementi interattivi)

## Struttura del sito (pagine)

- Home
- About
- Works
- Contacts

Contenuto attuale della sezione Works (dal vecchio portfolio cartaceo, da aggiornare graficamente e con nuovi progetti):

- Intreccio — Laboratorio di Progettazione 1, 2023
- Promenade
- Lanterne
- Podium — materiali e rivestimenti

## Riferimenti visivi e perché usarli

Cinque siti presi come riferimento, con cosa piace di ciascuno e come si collega al progetto:

### [Federico Martorana](https://federicomartorana.net/)
Piace: l'interazione col robottino, la musica, l'impostazione generale del sito.
Struttura: archivio a sezioni numerate (Academic / Professional / Papers / Info), tono asciutto.
Perché usarlo come riferimento: mostra come un sito minimale possa avere comunque un elemento interattivo forte e riconoscibile, senza saturare il resto del design.
Nota tecnica: l'interazione custom (robottino) va costruita passo dopo passo con Claude Code, non è un componente standard di Figma.

### [Atomaa — Work List](https://atomaa.eu/it/work/work-list/)
Piace: la lista progetti, l'effetto giallo che appare al passaggio del mouse, la freccia di selezione.
Struttura: lista tabellare (codice, anno, titolo, luogo, mq) invece delle classiche card con immagine.
Perché usarlo come riferimento: è un'alternativa più elegante ed essenziale alla griglia di immagini per la pagina Works, adatta al taglio rosso/bianco/blu del sito.

### [Kick Office — Progetti](https://www.kickoffice.net/progetti/)
Piace: la sistemazione dei progetti con i nomi che appaiono.
Perché usarlo come riferimento: rinforza l'idea che il nome del progetto può essere l'elemento grafico principale, invece dell'immagine.

### [9to5 Studio](https://www.9to5studio.it/)
Piace: la predominanza del colore, l'esperienza di ingresso ("Scroll & Discover").
Struttura: hero a colore pieno, progetti numerati in sequenza.
Perché usarlo come riferimento: è il caso più vicino al tuo hero attuale (sfondo rosso pieno), utile per capire come gestire lo scroll dopo l'ingresso.

### [Mosby's Files](https://www.mosbyfiles.com/)
Piace: l'aspetto archivistico.
Struttura: contenuti raggruppati per tema/movimento invece che in ordine cronologico.
Perché usarlo come riferimento: possibile modello per una futura sezione dedicata ad A.matter dentro al portfolio, organizzata per temi invece che per data.

## Video tutorial Figma (in ordine)

1. [Figma Auto Layout — ALL you NEED to understand in 2025](https://www.youtube.com/watch?v=bi7f84OFqVM) — base per rendere i frame flessibili
2. [Figma tutorial: Interactive Components](https://www.youtube.com/watch?v=ReNbXhaL3Xk) — per far "illuminare" i pulsanti del menu al click
3. [Ultimate Guide to Prototyping in Figma](https://www.uiprep.com/blog/ultimate-guide-to-prototyping-in-figma) — per collegare le pagine tra loro in modo cliccabile
4. [Turn Any Figma Design Into Code with Claude](https://www.youtube.com/watch?v=aAS_pZ5cgPA) — il ponte pratico da Figma al codice

## Problemi aperti sul sito attuale

- `contatti.html` ha una modifica non committata (footer con "Interior Design" troncato)
- Claude Code installato in doppia copia, causa errori di aggiornamento

## Metodo di lavoro

Un passo alla volta. Contenuti e struttura prima del design visivo. Wireframe a bassa fedeltà prima dell'alta fedeltà in Figma. Modalità piano in Claude Code, non modalità auto, finché non si conosce bene lo strumento.
