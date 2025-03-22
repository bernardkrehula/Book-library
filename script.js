const newBookBtn = document.querySelector('.newBookBtn');
const main = document.querySelector('.main');
const booksDiv = document.querySelector('.books');

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
    const books = [];

    const pushBooksInArray = (book) => {
        books.push(book);
    }
    const removeBookFromArray = () => {
        // books.filter(book => book.getId() != );
    }
    const returnArray = () => { return books };

    return { pushBooksInArray, returnArray };
}
const manager = manageBooks();

function displayNewBook(book){
    let html = `
    <div class="addedBook">
            <h3>${book.getBookTitle()}</h3>
            <h4>${book.getBookAuthor()}</h4>
            <p>${book.getBookPages()}</p>
            <div class="addedBookButtons">
                <button>Unread</button>
                <button>Delete Book</button>
                <button>Edit</button>
            </div>
        </div>
    `
    booksDiv.insertAdjacentHTML('beforeend', html)
}
newBookBtn.addEventListener('click', () => {
    bookInfoDivCreator();
})

main.addEventListener('click', (e) => {
    let bookInfoBtn = e.target.closest('button');
    let bookInfo = document.querySelector('.bookInfo');
    let id = e.target.id;
  
    
    if(bookInfoBtn && bookInfoBtn.classList.contains('sendBtn')){
        let bookTitle = document.querySelector('.bookTitle').value;
        let author = document.querySelector('.author').value;
        let bookPages = document.querySelector('.pages').value;

        const newBook = bookCreator(bookTitle, author, bookPages);
        manager.pushBooksInArray(newBook);
        displayNewBook(newBook);
      
        main.removeChild(bookInfo);
    }
    if(bookInfoBtn && bookInfoBtn.classList.contains('closeBookInfoBtn')){
        main.removeChild(bookInfo);
    } 
})
