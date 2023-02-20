console.log('hello world!');

// declare a book class
class Book {
  constructor(title, author, pages, completed = false) {
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

// render the current array of books
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


// variables

// query selectors

// add event listeners
const allBookCardsView = document.querySelector('div.all-book-cards-view');

// initial functions we need to run for page content

// functions
function toTitleCase(str) {
  const lowercaseCharArray = str.toLowerCase().split('');
  lowercaseCharArray[0] = lowercaseCharArray[0].toUpperCase();
  return lowercaseCharArray.join('');
}

function createCompletedComponents(newComponent) {
  // add edit svg
  const newEditSvg = document.createElement('img');
  newEditSvg.className = 'edit-svg svg';
  newEditSvg.src = 'resources/edit.svg';
  // add checkbox
  const newCheckboxInput = document.createElement('input');
  newCheckboxInput.type = 'checkbox';
  newCheckboxInput.name = 'is-read';
  newCheckboxInput.id = 'is-read';
  newCheckboxInput.checked = true;
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
    createCompletedComponents(newComponent);
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
      console.log(prop);
      const newComponent = createCardComponent(prop, book);
      newCard.appendChild(newComponent);
    }
  }
  return newCard;
}

function deleteAllBookCards(books) {
  while (allBookCardsView.lastElementChild) {
    allBookCardsView.removeChild(allBookCardsView.lastElementChild);
  }
};

function renderBooks(books) {
  console.log('render');
}


