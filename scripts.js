// declare Book class
function Book(title, author, pages, completed = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

// add changeCompleted function to Book class
Book.prototype.changeCompleted = function() {
  this.completed = this.completed ? false : true;
};

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295');
const tuesdays = new Book('Tuesdays with Morrie', 'Mitch Albom', '192', true);

const books = [];

books.push(theHobbit);
books.push(tuesdays);

const tableBody = document.querySelector('tbody');

updateTable();

function clearTable() {
  tableBody.replaceChildren();
}

function getNewStatusButton() {
  const newButton = document.createElement('button');
  newButton.className = 'status';
  newButton.innerText = 'status';
  newButton.addEventListener('click', statusInput);
  return newButton;
}

function updateTable() {
  clearTable();
  for (const book of books) {
    const newRow = tableBody.appendChild(document.createElement('tr'));
    for (const prop in book) {
      if (book.hasOwnProperty(prop)) {
        const newCell = document.createElement('td');
        newCell.innerHTML = book[prop];
        newRow.appendChild(newCell);
      }
    }
    const newCell = document.createElement('td');
    const buttonToModifyBookStatus = getNewStatusButton();
    newCell.appendChild(buttonToModifyBookStatus);
    newRow.appendChild(newCell);
  }
}

function success() {
  console.log(`${this.innerText} success`);
}

function updateBook(title) {
  for (const book of books) {
    if (book.title === title) {
      book.changeCompleted();
    }
  }
}

function statusInput() {
  const title = this.parentElement.parentElement.firstElementChild.innerText;
  updateBook(title);
  updateTable();
}

function deleteTable() {
  clearTable();
  while (books.length > 0) {
    books.pop();
  }
}

function addBook() {
  const form = this.parentElement;
  if (!form.pages.value||
    !form.author.value ||
    !form.title.value) {
    window.alert('All fields are required!');
    return;
  }
  modal.style.display = 'none';
  const newTitle = form.title.value;
  const newAuthor = form.author.value;
  const newPages = form.pages.value;
  const newBook = new Book(newTitle, newAuthor, newPages);
  console.log(newBook);
  const findTitle = (book) => book.title === newTitle;
  const bookExists = books.some(findTitle);
  console.log(bookExists);
  if (!bookExists) {
    books.push(newBook);
  }
  updateTable();
  form.reset();
}

const addButton = document.querySelector('button#add');
const deleteAllButton = document.querySelector('button#delete-all');

addButton.addEventListener('click', success);
deleteAllButton.addEventListener('click', deleteTable);

console.log(addButton);
console.log(deleteAllButton);

// Get the modal
const modal = document.querySelector('div#add-book-modal');
// Get the button that opens the modal
const add = document.querySelector('button#add');
// Get the <span> element that closes the modal
const modalClose = document.querySelector('span.close');
// eslint-disable-next-line max-len
const updateBooksArrayButton = document.querySelector('button#update-books-array');
console.log(updateBooksArrayButton);

const getModalAddBook= function() {
  modal.style.display = 'block';
};

const closeModal = function(event) {
  if (event.target === modal || event.target === modalClose) {
    modal.style.display = 'none';
  }
};

// When the user clicks the button, open the modal
add.addEventListener('click', getModalAddBook);
// When the user clicks on <span> (x), close the modal
modalClose.addEventListener('click', closeModal);
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', closeModal);

updateBooksArrayButton.addEventListener('click', addBook);
