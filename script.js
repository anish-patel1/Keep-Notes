const addButton = document.getElementById('add');

function updateLocalStorage() {
    const textAreaData = document.querySelectorAll('textarea');
    const noteData = [];
    // console.log(textAreaData);
    // console.log(noteData);

    textAreaData.forEach((note) => {
        return noteData.push(note.value);
    });

    localStorage.setItem('noteData', JSON.stringify(noteData));
}

function addNewNote (text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = 
    `
        <div class="operation">
            <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div class="main ${text ? "" : "hidden"} "></div>
        <textarea class=" ${text ? "hidden" : ""} "></textarea>
    `;

    note.insertAdjacentHTML('afterbegin', htmlData);

    // getting referencce
    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //delete the note
    function deleteNote() {
        note.remove();
        updateLocalStorage();
    }

    deleteButton.addEventListener('click', deleteNote);

    // edit the note
    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorage();
    });

    document.body.appendChild(note)
}

// getting data from local storage
const getNoteData = JSON.parse(localStorage.getItem('noteData'));

if (getNoteData) { getNoteData.forEach((note) => addNewNote(note)) };

addButton.addEventListener('click', addNewNote);