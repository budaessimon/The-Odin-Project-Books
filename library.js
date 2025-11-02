const library = [];

const template = document.createElement("template");

template.innerHTML = `
<div class ="book-card">
  <h1 class="title"></h1>
  <h2 class="author"></h2>
  <h2 class="genre"></h2>
  <input type="checkbox" class="read" > 
  <button class="close-button-card" onClick=deleteBook(this)> X </button>
</div>
`;

function Book(name, author, genre, previewed = false) {
  if (!new.target) console.log("can't create object without --new-- keyword");
  //properties
  this.name = name;
  this.author = author;
  this.genre = genre;
  this.previewed = previewed;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, genre, previewed) {
  let book = new Book(name, author, genre, previewed);
  library.push(book);
}

addBookToLibrary("Harry Potter", "J.K. Rowling", "Fantasy", true);
addBookToLibrary("Terminator", "Unknown", "Action");
const libraryHolder = document.getElementById("library-display");

const popupButton = document.getElementById("formButton");
const popup = document.getElementById("bookFormBg");
const closeButton = document.getElementById("closeButton");
const addBookButton = document.getElementById("addBookButton");
const bookInput = document.getElementById("bookName");
const authorInput = document.getElementById("bookAuthor");
const genreInput = document.getElementById("bookGenre");
const readInput = document.getElementById("bookRead");

function renderCards() {
  libraryHolder.innerHTML = "";
  library.forEach((book) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".book-card").id = book.id;
    clone.querySelector(".title").textContent = `${book.name}`;
    clone.querySelector(".author").textContent = `${book.author}`;
    clone.querySelector(".genre").textContent = `${book.genre}`;
    clone.querySelector(".read").disabled = true;
    clone.querySelector(".read").checked = book.previewed;
    clone.querySelector(".close-button-card").id = book.id;
    console.log(`${book.previewed}`);
    libraryHolder.appendChild(clone);
  });
}
renderCards();
function popUp() {
  popup.style.display = "flex";
}
function popDown() {
  popup.style.display = "none";
  bookInput.value = "";
  authorInput.value = "";
  genreInput.value = "";
  readInput.value = false;
}

function sendBook() {
  addBookToLibrary(
    `${bookInput.value}`,
    `${authorInput.value}`,
    `${genreInput.value}`,
    `${readInput.value}`
  );
  renderCards();
  popDown();
}
function deleteBook(button) {
  library.forEach((book, index) => {
    if (book.id === button.id) {
      library.splice(index, 1);
    }
  });
  renderCards();
}
