// KONFIG
const ANZAHL_SPALTEN = 7;
const ANZAHL_REIHEN = 6;
const SPIELFELD = [];
let aktuellerSpieler = "rot";

// Neues Spiel starten
function newGame() {
  // Array updaten
  for (let spalte = 0; spalte < ANZAHL_SPALTEN; spalte++) {
    SPIELFELD[spalte] = [];
    for (let zeile = 0; zeile < ANZAHL_REIHEN; zeile++) {
      SPIELFELD[spalte][zeile] = "frei";
    }
  }

  // UI updaten
  const spieldiv = document.querySelector("#spielfeld");
  const belegteFelderRot = spieldiv.querySelectorAll("circle.rot");
  const belegteFelderGelb = spieldiv.querySelectorAll("circle.gelb");
  for (let i = 0; i < belegteFelderRot.length; i++) {
    belegteFelderRot[i].classList.remove("rot");
    belegteFelderRot[i].classList.remove("gelb");
    belegteFelderRot[i].classList.add("frei");
  }
  for (let i = 0; i < belegteFelderGelb.length; i++) {
    belegteFelderGelb[i].classList.remove("rot");
    belegteFelderGelb[i].classList.remove("gelb");
    belegteFelderGelb[i].classList.add("frei");
  }
}

// Spielfeld updaten (nach Zug eines Spielers)
function updateSpielfeld() {
  // Daten ins Spielfeld zeichnen
  const spielfeldDiv = document.getElementById("spielfeld");
  const spielfeldSpalten = spielfeldDiv.children;
  for (let i = 0; i < spielfeldSpalten.length; i++) {
    let spielfeldZeilen = spielfeldSpalten[i].children;
    for (let j = 0; j < spielfeldZeilen.length; j++) {
      let aktuelleSpalte = document.getElementById("column-" + i);
      let aktuelleZeile = aktuelleSpalte.querySelector(".row-" + j);
      aktuelleZeile.children[0].classList.remove("frei");
      aktuelleZeile.children[0].classList.add(SPIELFELD[i][j]);
    }
  }
}

// Stein in nächste freie Stelle der markierten Spalte setzen
function setzeStein(spalte, spieler) {
  let naechsteFreieZelle = SPIELFELD[spalte].findIndex(
    (zelle) => zelle === "frei"
  );
  SPIELFELD[spalte][naechsteFreieZelle] = spieler;
  updateSpielfeld();
}

// DOM Elemente selektieren
const spielstein1 = document.querySelector("#spielstein-rot");
const spielstein2 = document.querySelector("#spielstein-gelb");
const spalten = document.querySelectorAll(".column");
const neustartButton = document.getElementById("neustartbutton");
neustartButton.onclick = (e) => {
  newGame();
};

// EventListener für die Spielsteine (Spieler 1 und 2)
spielstein1.addEventListener("dragstart", dragStart);
spielstein1.addEventListener("dragend", dragEnd);

spielstein2.addEventListener("dragstart", dragStart);
spielstein2.addEventListener("dragend", dragEnd);

// Eventlistener für jede Spalte (für das Droppen der Spielsteine)
for (const spalte of spalten) {
  spalte.addEventListener("dragover", dragOver);
  spalte.addEventListener("dragenter", dragEnter);
  spalte.addEventListener("dragleave", dragLeave);
  spalte.addEventListener("drop", dragDrop);
}

// Drag Funktionen
function dragStart(e) {
  const spielmuenze = e.target.id;
  spielmuenze === "spielstein-rot"
    ? (aktuellerSpieler = "rot")
    : (aktuellerSpieler = "gelb");
}

function dragEnd(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("spalte-hover");
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {
  e.preventDefault();
  this.classList.remove("spalte-hover");
}
function dragDrop(e) {
  e.preventDefault();
  this.classList.remove("spalte-hover");
  setzeStein(this.dataset.spalte, aktuellerSpieler);
}

newGame();
