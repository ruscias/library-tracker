// global variables
// declare a book class
class Book {
  constructor(title = '', author = '', pages = '', completed = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.completed = completed;
  }
}

// add changeCompleted function to Book class
Book.prototype.changeCompleted = function() {
  this.completed = this.completed ? false : true;
};

// create dummy books
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295');
const tuesdays = new Book('Tuesdays with Morrie', 'Mitch Albom', '192', true);

// dummy array for testing
const dummyArray = [
  theHobbit, tuesdays,
];

// get books value from local storage (or null if it doesn't exist)
const localStorageBooks = localStorage.getItem('books');
// set books array to localStorage value if they exist, else to dummy values
const books = localStorageBooks ? localStorageBooks : dummyArray;

// when add button is clicked, open the modal to add a book
// ... call prepareModal to populate it correctly
// ... upon submission, add that book to the array
// ... clear the current view
// ... render the updated array of books
// when the upload button is clicked, upload books to local storage
// when delete all is clicked, delete all books in local storage
// ... clear the books in the current view
// when a link is clicked in footer, navigate to that page

// when there are books, when a user clicks edit icon, open modal to edit current book
// ... call prepareModal to populate the modal with the current book's values
// ... when the user submits changes, update that book in the array
// ... edit the current html element to reflect the changes
// when there are books, when a user clicks delete icon, delete book from view, the array, and from local storage
// when user clicks current book checkbox, update whether current book has been read or not

// query selectors
const allBookCardsView = document.querySelector('div.all-book-cards-view');
const addButton = document.querySelector('.add-book-btn');
const uploadButton = document.querySelector('.upload-books-btn');
const deleteAllButton = document.querySelector('.delete-all-books-btn');
const searchSvg = document.querySelector('.search-svg');
const inputSearch = document.querySelector('.input-search');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const form = document.querySelector('.actual-modal-form-element');

// add event listeners
deleteAllButton.addEventListener('click', deleteAllBookCards);
addButton.addEventListener('click', showModal);
modal.addEventListener('click', hideModal);
closeModal.addEventListener('click', hideModal);
form.addEventListener('submit', processModalSubmit);

// initial functions we need to run for page content
// render the current array of books
renderBooks(books);

// functions
function toTitleCase(str) {
  const lowercaseCharArray = str.toLowerCase().split('');
  lowercaseCharArray[0] = lowercaseCharArray[0].toUpperCase();
  return lowercaseCharArray.join('');
}

// function for checking if a book already exists in the books array...
// ... based on its title
function getBookIndex(title) {
  // loop through the books array, using entries to get index and book
  for (const [index, book] of books.entries()) {
    // loop through each property by each book class in the array
    for (const prop in book) {
      // if the prop is title...
      if (prop === 'title') {
        console.log(book);
        // then check if the book's title prop is equal to...
        // ... the title we passed as a parameter
        if (book['title'].toLowerCase() === title.toLowerCase()) {
          // if it is, return the index of the book
          return index;
        }
      }
    }
  }
}

function addEventListenersToEditSvgs() {
  const allEditSvgs = document.querySelectorAll('img.edit-svg');

  for (const item of allEditSvgs) {
    item.addEventListener('click', showModal);
  }
}

function createCompletedComponents(newComponent, completed) {
  // add edit svg
  const newEditSvg = document.createElement('img');
  newEditSvg.className = 'edit-svg svg';
  newEditSvg.src = 'resources/edit.svg';
  // add checkbox
  const newCheckboxInput = document.createElement('input');
  newCheckboxInput.type = 'checkbox';
  newCheckboxInput.name = 'is-read';
  newCheckboxInput.id = 'is-read';
  newCheckboxInput.checked = completed ? true : false;
  // add delete svg
  const newDeleteSvg = document.createElement('img');
  newDeleteSvg.className = 'delete-svg svg';
  newDeleteSvg.src = 'resources/delete.svg';
  newComponent.appendChild(newEditSvg);
  newComponent.appendChild(newCheckboxInput);
  newComponent.appendChild(newDeleteSvg);
  return newComponent;
}

function createCardComponent(prop, book) {
  const newComponent = document.createElement('div');
  newComponent.className = `card-field ${prop}`;
  if (prop === 'completed') {
    createCompletedComponents(newComponent, book[prop]);
    return newComponent;
  }
  newComponent.innerText = `${book[prop]}`;
  return newComponent;
}

function createBookCard(book) {
  const newCard = document.createElement('div');
  newCard.className = 'card';
  for (const prop in book) {
    if (book.hasOwnProperty(prop)) {
      const newComponent = createCardComponent(prop, book);
      newCard.appendChild(newComponent);
    }
  }
  return newCard;
}

function deleteAllBookCards() {
  while (allBookCardsView.lastElementChild) {
    allBookCardsView.removeChild(allBookCardsView.lastElementChild);
  }
}

function renderBooks(books) {
  deleteAllBookCards();
  for (const book of books) {
    const newCard = createBookCard(book);
    allBookCardsView.appendChild(newCard);
  }
  addEventListenersToEditSvgs();
}

function prepareModal(modalType) {
  console.log(modal);
  const formTitle = document.querySelector('h1.form-title');
  if (modalType === 'add') {
    formTitle.innerText = 'Add Book';
  } else {
    formTitle.innerText = 'Edit Book';
    // update form with current book's fields
  }
}

function showModal(e) {
  modal.style.display = 'block';
  if (e.target.className === 'add-book-btn') {
    prepareModal('add');
  } else {
    prepareModal('update');
  }
}

function addBookToBooks() {
  console.log('add');
}

function updateBooksArray() {
  console.log('update');
}

function processModalSubmit(e) {
  e.preventDefault();

  // this gets the form inputs and turns it into an object
  const data = new FormData(e.target);
  const newBook = new Book();

  // loop through the data object of form data and update the newBook object
  for (const [nameRaw, value] of data) {
    const nameModified = nameRaw.split('-')[1];
    if (nameRaw === 'book-read') {
      newBook['completed'] = true;
    } else {
      newBook[nameModified] = value ? value : '';
    }
  }

  // set bookExists to index of book in books or undefined if it doesn't exist
  const bookExists = getBookIndex(newBook.title);

  // logic for handling add or update
  if (bookExists >= 0) {
    updateBooksArray(bookExists, newBook);
  } else {
    addBookToBooks(newBook);
  }
}

function hideModal(e) {
  if (e.target === modal || e.target === closeModal) {
    modal.style.display = 'none';
  }
}
