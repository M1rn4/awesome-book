let list_of_books = [];
const addBtn = document.querySelector('.add_button');
let title = document.getElementById('title');
let author = document.getElementById('author');
let container = document.querySelector('.container');
let removeBtn =  document.querySelectorAll('.removeBtn');

function displayListBooks(array) {
  container.innerHTML = '';
  for (let i = 0; i < array.length; i += 1) {
    const bookTemplate = `
      <p>${list_of_books[i].title}</p>
      <p>${list_of_books[i].author}</p>
      <button id="${i}" class="removeBtn">Remove</button>
      <hr>
    `;
    container.innerHTML += bookTemplate;
  }
}

class createObjectBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

function add(title,author) {
  if (title == '' || author == '') return;
  let newBook = new createObjectBook(title,author);
  console.log(newBook);
  list_of_books.push(newBook);
  displayListBooks(list_of_books);
};

function updateRemoveBtn() {
  removeBtn =  document.querySelectorAll('.removeBtn');
  removeBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      remove(event.target.id);
    });
  });
};

const addBtnNew = () => {
  add(title.value,author.value);
  updateRemoveBtn();
  saveData();
};

addBtn.addEventListener('click', addBtnNew);

function remove(id) {
  list_of_books = list_of_books.filter(book => list_of_books.indexOf(book) != id);
  displayListBooks(list_of_books);
  updateRemoveBtn();
  saveData();
}

function saveData(){
  localStorage.setItem('list_of_books_key',JSON.stringify(list_of_books));
}

window.addEventListener("load", function() {
  if (localStorage.getItem('list_of_books_key') === null) return;
  list_of_books = JSON.parse(localStorage.getItem('list_of_books_key'));
  displayListBooks(list_of_books);
  updateRemoveBtn();
});