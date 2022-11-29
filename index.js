let listOfBooks = [];
const addBtn = document.querySelector('.add_button');
const title = document.getElementById('title');
const author = document.getElementById('author');
const container = document.querySelector('.container');
let removeBtn = document.querySelectorAll('.removeBtn');

function displayListBooks(array) {
  container.innerHTML = '';
  for (let i = 0; i < array.length; i += 1) {
    const bookTemplate = `
      <p>${listOfBooks[i].title}</p>
      <p>${listOfBooks[i].author}</p>
      <button id="${i}" class="removeBtn">Remove</button>
      <hr>
    `;
    container.innerHTML += bookTemplate;
  }
}

class CreateObjectBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function add(title, author) {
  if (title === '' || author === '') return;
  const newBook = new CreateObjectBook(title, author);
  listOfBooks.push(newBook);
  displayListBooks(listOfBooks);
}

function updateRemoveBtn() {
  removeBtn = document.querySelectorAll('.removeBtn');
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      remove(event.target.id);/* eslint-disable-line */
      displayListBooks(listOfBooks);
    });
  });
}

function saveData() {
  localStorage.setItem('listOfBooksKey', JSON.stringify(listOfBooks));
}

const addBtnNew = () => {
  add(title.value, author.value);
  updateRemoveBtn();
  saveData();
};

addBtn.addEventListener('click', addBtnNew);

function remove(id) {
  id = parseInt(id, 10);
  listOfBooks = listOfBooks.filter((book) => listOfBooks.indexOf(book) !== id);
  displayListBooks(listOfBooks);
  updateRemoveBtn();
  saveData();
}

window.addEventListener('load', () => {
  if (localStorage.getItem('listOfBooksKey') === null) return;
  listOfBooks = JSON.parse(localStorage.getItem('listOfBooksKey'));
  displayListBooks(listOfBooks);
  updateRemoveBtn();
});