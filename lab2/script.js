"use strict";
const searchInput = document.getElementById('search-input');
const caseSensitiveCheckbox = document.getElementById('case-insensitive');
const newNoteInput = document.getElementById('new-note');
const newNoteListSection = document.getElementById('wybor-listy');
const addNoteButton = document.getElementById('new-note-button');
const newListInput = document.getElementById('new-list');
const addListButton = document.getElementById('new-list-button');
const undoButton = document.getElementById('cofnij-button');
const deleteModal = document.getElementById('delete-modal');
const modalText = document.getElementById('modal-text');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');
const noteListContainer = document.getElementById('wszystkie-listy');

const tasks = {
    Ważne: [],
    Zwykłe: [],
};
let lastDeleted = null;


function toggleListCollapse(headerElement) {
    const wrapList = headerElement.closest('.lista-notatek');
    const itemsContainer = wrapList.querySelector('.lista-items');
    if (itemsContainer) {
        itemsContainer.classList.toggle('ukryte');
    }
}
function createNote(){
    const noteText = newNoteInput.value;
    const selectedList = newNoteListSection.value;
    if (noteText === ''){
        alert('Nie można dodać pustej notatki!');
        return;
    }else if (!tasks[selectedList]) {
        alert('Wybrana lista nie istnieje!');
        return;
    }else {
        const newNote = {
            text: noteText,
            done: false,
            date: null,    
        };
        tasks[selectedList].push(newNote);
        renderNotesList(selectedList);
        newNoteInput.value = '';
    }
}
function createList(nameFromArgument = null){
    const listName = nameFromArgument || newListInput.value;
    if (listName === ''){
        alert('Nie można dodać listy bez nazwy!');
        return;
    }
    if (tasks.hasOwnProperty(listName) && !nameFromArgument) {
        alert('Lista o tej nazwie już istnieje!');
        return;
    }
    if (!tasks[listName]) {
        tasks[listName] = [];
    }
    if (!document.getElementById(`${listName}-list`)) {
        const listHtml = `<div class="lista-notatek">
            <h2 class="lista-header">${listName}</h2>
            <div class="lista-items" id="${listName}-list"></div>
        </div>`;
        noteListContainer.insertAdjacentHTML('beforeend', listHtml);
        newNoteListSection.insertAdjacentHTML('beforeend', `<option value="${listName}">${listName}</option>`);
    }
    renderNotesList(listName);
    newListInput.value = '';
}
function renderNotesList(listType) {
    const listContainer = document.getElementById(`${listType}-list`);
    if (!listContainer) {
        return;
    }
    if (!tasks[listType]) {
        tasks[listType] = [];
    }
    listContainer.innerHTML = ''; 

    const searchTerm = searchInput.value;
    const isCaseSensitive = caseSensitiveCheckbox.checked;
    const filteredNotes = tasks[listType].filter(note => {
        if (!searchTerm) return true;
        
        if (isCaseSensitive) {
            return note.text.includes(searchTerm);
        }else {
            return note.text.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    filteredNotes.forEach(note => {
        const noteElement = document.createElement('article');
        noteElement.classList.add('notatka');
        if (note.done) {
            noteElement.classList.toggle('zrobione');
        }
        noteElement.innerHTML = `<p>${note.text}</p>
            <span class="completion-date">${note.done ? note.date : ''}</span>
            <button class="delete-button">X</button>
            `;
        listContainer.appendChild(noteElement);
    });
}

function renderAllLists() {
    Object.keys(tasks).forEach(listType => {
        renderNotesList(listType);
    });
}

function showModal(text, elementToDelete, listType) {
    modalText.innerText = `Czy na pewno chcesz usunąć: ${text}?`;
    deleteModal.style.display = "flex"; 
    confirmDeleteButton.onclick = () => {
        const note = tasks[listType].find(n => n.text === text);
        lastDeleted = { listType: listType, note: note };
        tasks[listType].splice(tasks[listType].findIndex(n => n.text === text), 1);
        elementToDelete.remove();
        undoButton.disabled = false;
        deleteModal.style.display = "none";
    }
    cancelDeleteButton.onclick = () => {
        deleteModal.style.display = "none";
    };  
}

function init() {
    Object.keys(tasks).forEach(listType => {
        createList(listType);
    });
    noteListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('lista-header')) {
            toggleListCollapse(e.target);
        }
        if (e.target.classList.contains('delete-button')) {
            const noteText = e.target.parentElement.querySelector('p').innerText;
            const listType = e.target.closest('.lista-notatek').querySelector('.lista-header').innerText;
            showModal(noteText, e.target.parentElement, listType);
        }
        
        if (e.target.tagName === 'P' || e.target.classList.contains('notatka')) {
            const notatka = e.target.closest('.notatka');
            const note = tasks[notatka.closest('.lista-notatek').querySelector('.lista-header').innerText].find(n => n.text === notatka.querySelector('p').innerText);
            note.done = !note.done;
            note.date = note.done ? new Date().toLocaleString() : null;
            renderAllLists();
        }
    });
    searchInput.addEventListener('input', () => {
        renderAllLists();
    });
    caseSensitiveCheckbox.addEventListener('change', () => {
        renderAllLists();
    });
    addNoteButton.addEventListener('click', () => {
        const text = newNoteInput.value;
        const listType = newNoteListSection.value;
        if (text) {
            createNote();
        }
    });
    addListButton.addEventListener('click', () => {
        const listName = newListInput.value;
        createList(listName);
    });
    undoButton.addEventListener('click', () => {
        if(lastDeleted) {
            const { listType, note } = lastDeleted;
            tasks[listType].push(note);
            renderNotesList(listType);
            lastDeleted = null;
            undoButton.disabled = true;
        }
    });
}

init();