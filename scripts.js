function Book (title, author, pages, completed=false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.completed = completed;
}

Book.prototype.changeCompleted = function () {
  this.completed = this.completed ? false : true;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien','295');
const tuesdays = new Book('Tuesdays with Morrie', 'Mitch Albom','192', true);

const books = [];

books.push(theHobbit);
books.push(tuesdays);

const tableBody = document.querySelector('tbody');

updateTable();

function updateTable(){
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
    const buttonToModifyBookStatus = document.createElement('button');
    buttonToModifyBookStatus.className = 'status';
    buttonToModifyBookStatus.innerText = 'status';
    newCell.appendChild(buttonToModifyBookStatus);
    newRow.appendChild(newCell);
  }
}

function success() {
  console.log(`${this.innerText} success`);
};

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

const addButton = document.querySelector('button#add');
const deleteAllButton = document.querySelector('button#delete-all');
const statusButtons = document.querySelectorAll('button.status');

console.log(addButton);
console.log(deleteAllButton);

for (const button of statusButtons) {
  button.addEventListener('click', statusInput);
}

addButton.addEventListener('click', success);
deleteAllButton.addEventListener('click', success);

// I wish you luck man
// I am sorry I didn't use git
// This place is basically a pile of code without comments or git messages
// Trying to communicate next steps...
// Well, I am trying to get a pop up when I hit add that will take...
//...the parameters needed to create a new Book object
// I'd like to push that new Book to the books array
// Then I suppose you might use the updateTable function to update the table...
//...sounds too easy, I agree. Let's see what happens...
// I'd like the delete all button to delete everything in that array
// I guess if that all works... the assignment is done...
// I have lots of feature ideas
// Being able to interact with the table directly would be cool
// The UI still needs some love to look modern
// Apparently, I need to be able to change each book's read status directly