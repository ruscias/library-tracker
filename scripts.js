function Book(title, author, pages, completed = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

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

function addBook(form) {
  console.log(form);
  if (!form.title.value ||
      !form.author.value ||
      !form.pages.value) {
    return;
  }
  modal.style.display = 'none';
  const newTitle = form.title.value;
  const newAuthor = form.author.value;
  const newPages = form.pages.value;
  const newBook = new Book(newTitle, newAuthor, newPages);
  console.log(newBook);
  books.push(newBook);
  updateTable();
}

const addButton = document.querySelector('button#add');
const deleteAllButton = document.querySelector('button#delete-all');

addButton.addEventListener('click', success);
deleteAllButton.addEventListener('click', clearTable);

console.log(addButton);
console.log(deleteAllButton);

// I wish you luck man
// I am sorry I didn't use git
// This place is basically a pile of code without comments or git messages
// Trying to communicate next steps...
// Well, I am trying to get a pop up when I hit add that will take...
// ...the parameters needed to create a new Book object
// I'd like to push that new Book to the books array
// Then I suppose you might use the updateTable function to update the table...
// ...sounds too easy, I agree. Let's see what happens...
// I'd like the delete all button to delete everything in that array
// I guess if that all works... the assignment is done...
// I have lots of feature ideas
// Being able to interact with the table directly would be cool
// The UI still needs some love to look modern
// Apparently, I need to be able to change each book's read status directly


// Get the modal
const modal = document.querySelector('div#add-book-modal');
// Get the button that opens the modal
const add = document.querySelector('button#add');
// Get the <span> element that closes the modal
const modalClose = document.querySelector('span.close');

console.log(modalClose);

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
