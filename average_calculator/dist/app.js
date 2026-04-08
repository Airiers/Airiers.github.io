"use strict";
var _a, _b, _c;
const moyenneElement = document.querySelector("#moyenne");
let moyenne = 0;
let coefDivision = 0;
let moyenneString = moyenne.toString();
let coefDivisionString = coefDivision.toString();
let somme = 0;
let notesList = {
  notes: [],
};
function calculate(list) {
  const notesSection = document.querySelector("#notes");
  if (notesSection) {
    notesSection.innerHTML = "";
  }
  let sommeNotes = 0;
  let sommeBaremes = 0;
  let sommeCoefs = 0;
  for (let n of list.notes) {
    sommeNotes += n.note * n.coef;
    sommeBaremes += n.noteOn * n.coef;
    sommeCoefs += n.coef;
    if (notesSection) {
      notesSection.innerHTML += `<div class="note"><div class="noteInfos"><h3><span class="noteNumber">${n.note}</span><span class="noteOn">/${n.noteOn}</span></h3><h4 class="coef">Coefficient ${n.coef}</h4></div></div>`;
    }
  }
  moyenne = (sommeNotes / sommeBaremes) * 20;
  moyenneString = moyenne.toFixed(2).toString();
  if (moyenneElement) {
    moyenneElement.textContent = moyenneString;
  }
}
(_a = document.querySelector("#addNote")) === null || _a === void 0
  ? void 0
  : _a.addEventListener("click", (e) => {
      e.preventDefault();
      const noteInput = document.querySelector("#note");
      const noteOnInput = document.querySelector("#noteOn");
      const coefInput = document.querySelector("#coef");
      if (noteInput && noteOnInput && coefInput) {
        const note = parseFloat(noteInput.value) || null;
        const noteOn = parseFloat(noteOnInput.value) || null;
        const coef = parseFloat(coefInput.value) || null;
        if (note && noteOn && coef) {
          notesList.notes.push({ note, noteOn, coef });
          calculate(notesList);
        }
      }
    });
const textArea = document.querySelector("#area");
(_b = document.querySelector("#export")) === null || _b === void 0
  ? void 0
  : _b.addEventListener("click", (e) => {
      e.preventDefault();
      if (notesList && textArea) {
        textArea.value = JSON.stringify(notesList.notes, null, 2);
      }
    });
(_c = document.querySelector("#import")) === null || _c === void 0
  ? void 0
  : _c.addEventListener("click", (e) => {
      e.preventDefault();
      if (textArea && textArea.value.trim() !== "") {
        notesList.notes = [];
        notesList.notes = JSON.parse(textArea.value);
        calculate(notesList);
      }
    });
