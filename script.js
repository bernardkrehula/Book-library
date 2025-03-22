const main = document.querySelector('.main');
const booksDiv = document.querySelector('.books');
const bookForm = document.querySelector('.bookForm')
const newBookBtn = document.querySelector('.newBookBtn');
const closeBookFormBtn = document.querySelector('.closeBookFormBtn');
const sendBtn = document.querySelector('.sendBtn');


function bookCreator(title, author, pages) {
    let id = crypto.randomUUID();
    let bookTitle = title;
    let bookAuthor = author;
    let bookPages = pages;
    const getId = () => { return id };
    const getBookTitle = () => { return bookTitle };
    const getBookAuthor = () => { return bookAuthor };
    const getBookPages = () => { return bookPages };
    return { getId, getBookTitle, getBookAuthor, getBookPages };
}
//Uzet u obzir je li knjiga procitana ili nije, na unreadBtn dodati X ili kvacicu 
//Dodat edit dugme, na click se svi podaci pretvaraju u input
//Dodat da se moze izbrisati knjiga
//Napraviti formu umjesto diva

function manageBooks() {
    let books = [];

    const pushBooksInArray = (book) => {
        books.push(book);
    }
    const removeBookFromArray = (bookId) => {
        books = books.filter(book => book.getId() != bookId);
        return books;
    }
    const returnArray = () => { return books };

    return { pushBooksInArray, returnArray, removeBookFromArray };
}
const manager = manageBooks();

function displayNewBook(book){
    let html = `
    <div class="addedBook" id="${book.getId()}">
            <h3>${book.getBookTitle()}</h3>
            <h4>${book.getBookAuthor()}</h4>
            <p>${book.getBookPages()}</p>
            <div class="addedBookButtons">
                <button>Unread</button>
                <button class="delete">Delete Book</button>
                <button>Edit</button>
            </div>
        </div>
    `
    booksDiv.insertAdjacentHTML('beforeend', html)
}
newBookBtn.addEventListener('click', (e) => {
    bookForm.style.display = 'block';
})
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookForm.style.display = 'none';

    let bookTitle = document.querySelector('.bookTitle').value;
    let author = document.querySelector('.author').value;
    let bookPages = document.querySelector('.pages').value;

    const newBook = bookCreator(bookTitle, author, bookPages);
    manager.pushBooksInArray(newBook);
    displayNewBook(newBook); 

})

closeBookFormBtn.addEventListener('click', () => {
    bookForm.style.display = 'none';
}) 

main.addEventListener('click', (e) => {
    let deleteBtn = e.target.closest('button');
    let bookDiv = e.target.closest('.addedBook');
 
    if(deleteBtn){
        if(deleteBtn.className === 'delete'){
            manager.removeBookFromArray(bookDiv.id);
        }
    }
})