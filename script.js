const main = document.querySelector('.main');
const booksDiv = document.querySelector('.books');
const bookForm = document.querySelector('.bookForm')
const newBookBtn = document.querySelector('.newBookBtn');
const closeBookFormBtn = document.querySelector('.closeBookFormBtn');
const sendBtn = document.querySelector('.sendBtn');
const checkBoxField = document.querySelector('.checkBox');


function bookCreator(title, author, pages, checkBoxField) {
    let id = crypto.randomUUID();
    let bookTitle = title;
    let bookAuthor = author;
    let bookPages = pages;
    let checkBox = checkBoxField;
    let edited;
 
    const getId = () => { return id };
    const getBookTitle = () => { return bookTitle };
    const toggleBookTitle = (value) => { bookTitle = value };
    const getBookAuthor = () => { return bookAuthor };
    const toggleBookAuthor = (value) => { bookAuthor = value };
    const getBookPages = () => { return bookPages };
    const toggleBookPages = (value) => { bookPages = value };
    const isBookRead = () => { return checkBox }
    const toggleBookRead = (value) =>  checkBox = value;
    const isEdited = () => { return edited };
    const toggleIsEdited = (value) => edited = value;
    return { getId, getBookTitle, toggleBookTitle, getBookAuthor, toggleBookAuthor, getBookPages, toggleBookPages, isBookRead, toggleBookRead, isEdited, toggleIsEdited };
}

function manageBooks() {
    let books = [];

    const pushBooksInArray = (book) => {
        books.push(book);
    }
    const removeBookFromArray = (bookId) => {
        books = books.filter(book => book.getId() != bookId);
        return books;
    }
    const findBook = (id) => {
        let filter = books.find(book => book.getId() == id);
        return filter;
    }
    const iterateThroughArray = () => {
        booksDiv.innerHTML = '';
        books.forEach((book) => {
            displayNewBook(book);
        })
    }
    const returnArray = () => { return books };

    return { pushBooksInArray, returnArray, removeBookFromArray, findBook, iterateThroughArray };
}
const manager = manageBooks();

function displayNewBook(book){
    let html = book.isEdited() ? `<form class="addedBook" id="${book.getId()}">
    <input type="text" class="editTitle" value="${book.getBookTitle()}">
                <input type="text" class="editAuthor" value="${book.getBookAuthor()}">
                <input type="number" class="editPages" value="${book.getBookPages()}">
                <div class="addedBookButtons">
                    <button type="button" class="isRead">${book.isBookRead() ? "Read ✅" : "Unread ❌"}</button>
                    <button type="button" class="delete">Delete Book</button>
                    <button type="submit" class="editBtn">Save</button>
                </div>
    </form>` 
    : 
    `
    <div class="addedBook" id="${book.getId()}">
            <h3>${book.getBookTitle()}</h3>
            <h4>${book.getBookAuthor()}</h4>
            <p>${book.getBookPages()}</p>
            <div class="addedBookButtons">
                <button class="isRead">${book.isBookRead() ? "Read ✅" : "Unread ❌"}</button>
                <button class="delete">Delete Book</button>
                <button class="editBtn">Edit</button>
            </div>
        </div>
    `
    booksDiv.insertAdjacentHTML('beforeend', html)
}

newBookBtn.addEventListener('click', () => {
    bookForm.style.display = 'block';
})

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookForm.style.display = 'none';

    let bookTitle = document.querySelector('.bookTitle').value;
    let author = document.querySelector('.author').value;
    let bookPages = document.querySelector('.pages').value;
    
    const newBook = bookCreator(bookTitle, author, bookPages, checkBoxField.checked);
    manager.pushBooksInArray(newBook);

    bookTitle = document.querySelector('.bookTitle').value = '';
    author = document.querySelector('.author').value = '';
    bookPages = document.querySelector('.pages').value = '';
    
    checkBoxField.checked = false;
    manager.iterateThroughArray();
})

closeBookFormBtn.addEventListener('click', () => {
    bookForm.style.display = 'none';
}) 

main.addEventListener('click', (e) => {
    let bookBtns = e.target.closest('button');
    let bookDiv = e.target.closest('.addedBook');
    if(!bookBtns) return
        if(bookBtns.className === 'delete'){
            manager.removeBookFromArray(bookDiv.id);
            manager.iterateThroughArray();
        }
        if(bookBtns.className === 'editBtn'){
            const clickedBook = manager.findBook(bookDiv.id);
            if (!clickedBook) return;
   
                if (!clickedBook.isEdited()) {
                    clickedBook.toggleIsEdited(true);
                    booksDiv.innerHTML = '';
                    displayNewBook(clickedBook);

                    const editForm = document.getElementById(clickedBook.getId());
                    if (!editForm) return;

                    function handleFormEvent(e) {
                        e.preventDefault();

                        let newTitle = editForm.querySelector('.editTitle').value;
                        let newAuthor = editForm.querySelector('.editAuthor').value;
                        let newPages = editForm.querySelector('.editPages').value;

                        clickedBook.toggleBookTitle(newTitle);
                        clickedBook.toggleBookAuthor(newAuthor);
                        clickedBook.toggleBookRead(newPages);

                        clickedBook.toggleIsEdited(false);
                        booksDiv.innerHTML = ''; 
                        manager.iterateThroughArray(); 

                        editForm.removeEventListener('submit', handleFormEvent);
                    }

        editForm.addEventListener('submit', handleFormEvent);
    }
}
        if(bookBtns.className === 'isRead'){
            let clickedBook = manager.findBook(bookDiv.id);
            clickedBook.toggleBookRead(!clickedBook.isBookRead());
            manager.iterateThroughArray();
        }
})