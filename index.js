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

class Features {
  static displayListBooks(array) {
    container.innerHTML = '';
    let backgroundColor = '';
    for (let i = 0; i < array.length; i += 1) {
      if (i % 2 === 0) {
        backgroundColor = 'white';
      } else {
        backgroundColor = 'gray';
      }
      const bookTemplate = `
        <div class="book ${backgroundColor}">
          <div class="title">
            <p>"${listOfBooks[i].title}"&ensp;by</p>
            <p>&ensp;${listOfBooks[i].author}</p>
          </div>
          <div>
            <button id="${i}" class="removeBtn">Remove</button>
          </div>
        </div>
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
  Features.add(title.value, author.value);
  Features.updateRemoveBtn();
  Features.saveData();
};

addBtn.addEventListener('click', addBtnNew);

window.addEventListener('load', () => {
  if (localStorage.getItem('listOfBooksKey') === null) return;
  listOfBooks = JSON.parse(localStorage.getItem('listOfBooksKey'));
  Features.displayListBooks(listOfBooks);
  Features.updateRemoveBtn();
});