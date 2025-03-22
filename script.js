const newBookBtn = document.querySelector('.newBookBtn');
const sendBtn = document.querySelector('.sendBtn');
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

function manageBooks() {
    const books = [];

    const pushBooksInArray = (book) => {
        books.push(book);
    }
    const returnArray = () => { return books };

    const showBooksOnScreen = () => { books.map(book => displayNewBook(book))};

    return { pushBooksInArray, returnArray, showBooksOnScreen };
}
const manager = manageBooks();

function bookInfoDivCreator() {
    let html = `
    <div class="bookInfo">
            <button class="closeBookInfoBtn">X</button>
            <li>
                <h4>Title of the book:</h4>
                <input placeholder="Harry Potter" class="bookTitle">
            </li>
            <li>
                <h4>Author:</h4>
                <input placeholder="J.K. Rowling" class="author"> 
            </li>
            <li>
                <h4>Number of pages:</h4>
                <input type="number" placeholder="500" class="pages">
            </li>
            
            <div class="checkBoxDiv">
                <input type="checkbox"><h4>Have you read this book?</h4>
                <button class="sendBtn">Send</button>
            </div>
        </div>
    `;
    main.insertAdjacentHTML('beforeend', html);   
}

function displayNewBook(book){
    let html = `
    <div class="addedBook">
            <h3>${book.getBookTitle()}</h3>
            <h4>${book.getBookAuthor()}</h4>
            <p>${book.getBookPages()}</p>
            <div class="addedBookButtons">
                <button>Unread</button>
                <button>Delete Book</button>
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
    
    if(bookInfoBtn && bookInfoBtn.classList.contains('sendBtn')){
        let bookTitle = document.querySelector('.bookTitle').value;
        let author = document.querySelector('.author').value;
        let bookPages = document.querySelector('.pages').value;

        bookCreator(bookTitle, author, bookPages);
        const newBook = bookCreator();
        manager.pushBooksInArray(newBook);
        main.removeChild(bookInfo);
    }
    if(bookInfoBtn && bookInfoBtn.classList.contains('closeBookInfoBtn')){
        main.removeChild(bookInfo);
    } 
})
/* bookInfo.addEventListener('click', (event) => {
    console.log(event.target)
}) */