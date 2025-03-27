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
    const getBookAuthor = () => { return bookAuthor };
    const getBookPages = () => { return bookPages };
    const isBookRead = () => { return checkBox }
    const toggleBookRead = (value) =>  checkBox = value;
    const isEdited = () => { return edited };
    const toggleIsEdited = (value) => edited = value;
    return { getId, getBookTitle, getBookAuthor, getBookPages, isBookRead, toggleBookRead, isEdited, toggleIsEdited };
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
    const renderBooks = (isChecked) => {
        return isChecked ? "Read ✅" : "Unread ❌";
    }
    const returnArray = () => { return books };

    return { pushBooksInArray, returnArray, removeBookFromArray, findBook, renderBooks };
}
const manager = manageBooks();

function displayNewBook(book){
    let html = `
    <div class="addedBook" id="${book.getId()}">
            <h3>${book.getBookTitle()}</h3>
            <h4>${book.getBookAuthor()}</h4>
            <p>${book.getBookPages()}</p>
            <div class="addedBookButtons">
                <button class="isRead">${manager.renderBooks(book.isBookRead())}</button>
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
    displayNewBook(newBook); 

    bookTitle = document.querySelector('.bookTitle').value = '';
    author = document.querySelector('.author').value = '';
    bookPages = document.querySelector('.pages').value = '';
    
    checkBoxField.checked = false;
})

closeBookFormBtn.addEventListener('click', () => {
    bookForm.style.display = 'none';
}) 

main.addEventListener('click', (e) => {
    let bookBtns = e.target.closest('button');
    let bookDiv = e.target.closest('.addedBook');
   
    if(bookBtns){
        if(bookBtns.className === 'delete'){
            manager.removeBookFromArray(bookDiv.id);
            booksDiv.removeChild(bookDiv);
        }
        if(bookBtns.className === 'editBtn'){
            const clickedBook = manager.findBook(bookDiv.id);
            if (!clickedBook) return;

            if (!clickedBook.isEdited()) {
                clickedBook.toggleIsEdited(true);

                const editForm = document.createElement('form');
                editForm.id = bookDiv.id;
                editForm.classList = bookDiv.classList;

                editForm.innerHTML = `
                    <input type="text" class="editTitle" value="${clickedBook.getBookTitle()}">
                    <input type="text" class="editAuthor" value="${clickedBook.getBookAuthor()}">
                    <input type="number" class="editPages" value="${clickedBook.getBookPages()}">
                    <div class="addedBookButtons">
                        <button type="button" class="isRead">${manager.renderBooks(clickedBook.isBookRead())}</button>
                        <button type="button" class="delete">Delete Book</button>
                        <button type="submit" class="editBtn">Save</button>
                    </div>
                `;

                bookDiv.replaceWith(editForm);

                editForm.addEventListener('submit', function (event) {
                    event.preventDefault();

                    let newTitle = editForm.querySelector('.editTitle').value;
                    let newAuthor = editForm.querySelector('.editAuthor').value;
                    let newPages = editForm.querySelector('.editPages').value;

                    clickedBook.getBookTitle = () => newTitle;
                    clickedBook.getBookAuthor = () => newAuthor;
                    clickedBook.getBookPages = () => newPages;

                    const newBookDiv = document.createElement('div');
                    newBookDiv.id = editForm.id;
                    newBookDiv.classList = editForm.classList;
                    newBookDiv.innerHTML = `
                        <h3>${newTitle}</h3>
                        <h4>${newAuthor}</h4>
                        <p>${newPages}</p>
                        <div class="addedBookButtons">
                            <button class="isRead">${manager.renderBooks(clickedBook.isBookRead())}</button>
                            <button class="delete">Delete Book</button>
                            <button class="editBtn">Edit</button>
                        </div>
                    `;

                    editForm.replaceWith(newBookDiv);
                    clickedBook.toggleIsEdited(false);
                });
            }
        }
        if(bookBtns.className === 'isRead'){
            let clickedBook = manager.findBook(bookDiv.id);
            clickedBook.toggleBookRead(!clickedBook.isBookRead()); 
            bookBtns.innerHTML = manager.renderBooks(clickedBook.isBookRead()); 
        }
    }
})