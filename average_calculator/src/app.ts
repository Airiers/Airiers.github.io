const moyenneElement: HTMLSpanElement | null =
    document.querySelector("#moyenne");

let moyenne: number = 0;
let coefDivision: number = 0;
let moyenneString: string = moyenne.toString();
let coefDivisionString: string = coefDivision.toString();
let somme: number = 0;

interface Note {
    note: number;
    noteOn: number;
    coef: number;
}

interface Notes {
    notes: Note[];
}

let notesList: Notes = {
    notes: [],
};

function calculate(list: Notes) {
    const notesSection: HTMLElement | null = document.querySelector("#notes");
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

document.querySelector("#addNote")?.addEventListener("click", (e) => {
    e.preventDefault();
    const noteInput: HTMLInputElement | null = document.querySelector("#note");
    const noteOnInput: HTMLInputElement | null =
        document.querySelector("#noteOn");
    const coefInput: HTMLInputElement | null = document.querySelector("#coef");
    if (noteInput && noteOnInput && coefInput) {
        const note: number | null = parseFloat(noteInput.value) || null;
        const noteOn: number | null = parseFloat(noteOnInput.value) || null;
        const coef: number | null = parseFloat(coefInput.value) || null;
        if (note && noteOn && coef) {
            notesList.notes.push({ note, noteOn, coef });
            calculate(notesList);
        }
    }
});

const textArea: HTMLInputElement | null = document.querySelector("#area");

document.querySelector("#export")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (notesList && textArea) {
        textArea.value = JSON.stringify(notesList.notes, null, 2);
    }
});

document.querySelector("#import")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (textArea && textArea.value.trim() !== "") {
        notesList.notes = [];
        notesList.notes = JSON.parse(textArea.value);
        calculate(notesList);
    }
});
