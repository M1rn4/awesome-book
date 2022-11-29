// eslint-disable-next-line max-classes-per-file
let listOfBooks = [];
const addBtn = document.querySelector('.add_button');
const title = document.getElementById('title');
const author = document.getElementById('author');
const container = document.querySelector('.container');
let removeBtn = document.querySelectorAll('.removeBtn');

class CreateObjectBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// eslint-disable-next-line no-unused-vars
class features {
  static displayListBooks(array) {
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

  static add(title, author) {
    if (title === '' || author === '') return;
    const newBook = new CreateObjectBook(title, author);
    listOfBooks.push(newBook);
    this.displayListBooks(listOfBooks);
  }

  static updateRemoveBtn() {
    removeBtn = document.querySelectorAll('.removeBtn');
    removeBtn.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        this.remove(event.target.id);/* eslint-disable-line */
      });
    });
  }

  static saveData() {
    localStorage.setItem('listOfBooksKey', JSON.stringify(listOfBooks));
  }

  static remove(id) {
    id = parseInt(id, 10);
    listOfBooks = listOfBooks.filter((book) => listOfBooks.indexOf(book) !== id);
    this.displayListBooks(listOfBooks);
    this.updateRemoveBtn();
    this.saveData();
  }
}

const addBtnNew = () => {
  features.add(title.value, author.value);
  features.updateRemoveBtn();
  features.saveData();
};

addBtn.addEventListener('click', addBtnNew);

window.addEventListener('load', () => {
  if (localStorage.getItem('listOfBooksKey') === null) return;
  listOfBooks = JSON.parse(localStorage.getItem('listOfBooksKey'));
  features.displayListBooks(listOfBooks);
  features.updateRemoveBtn();
});