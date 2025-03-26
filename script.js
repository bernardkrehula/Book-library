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
//Uzet u obzir je li knjiga procitana ili nije, na unreadBtn dodati X ili kvacicu 
//Dodat edit dugme, na click se svi podaci pretvaraju u input
//Dodat da se moze izbrisati knjiga
//Napraviti formu umjesto diva
//Dodam varijablu sa state true ili false

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
          
            if(!clickedBook) return 

                let titleElement = bookDiv.querySelector('h3');
                let authorElement = bookDiv.querySelector('h4');
                let pagesElement = bookDiv.querySelector('p');

            //Ako je editBtn nadi tu knjigu u arrayu 
            //Provjeri je li knjiga vec editing
            //Ako nije, stavi joj da jeste 
            //Zamijeni trenutnu knjigu div za formu sa inputima 
            //Zakaci submit eventListener na tu formu (taj listener treba da bude zaduzen da updejtuje knjigu)
            //Ako jeste knjiga (editing) mice se eventListener sa forme, forma se pretvara u div i isEditing false
            //Ako je editing false tekst dugmeta je "edit" ako je true "save"
              
               
                if (!clickedBook.isEdited()) {
                    clickedBook.toggleIsEdited(true);
                    
                    titleElement.outerHTML = `<input type="text" class="editTitle" value="${titleElement.innerText}">`;
                    authorElement.outerHTML = `<input type="text" class="editAuthor" value="${authorElement.innerText}">`;
                    pagesElement.outerHTML = `<input type="number" class="editPages" value="${pagesElement.innerText}">`;

                    bookBtns.innerText = 'Save';
                }
                else {
                    let newTitle = bookDiv.querySelector('.editTitle').value;
                    let newAuthor = bookDiv.querySelector('.editAuthor').value;
                    let newPages = bookDiv.querySelector('.editPages').value;
                   

                    clickedBook.getBookTitle = () => newTitle;
                    clickedBook.getBookAuthor = () => newAuthor;
                    clickedBook.getBookPages = () => newPages;

                    bookDiv.querySelector('.editTitle').outerHTML = `<h3>${newTitle}</h3>`;
                    bookDiv.querySelector('.editAuthor').outerHTML = `<h4>${newAuthor}</h4>`;
                    bookDiv.querySelector('.editPages').outerHTML = `<p>${newPages}</p>`;
                   
                    bookBtns.innerText = 'Edit';
                    clickedBook.toggleIsEdited(false)
                    console.log(clickedBook.isEdited())
                }
                
                
        }
        if(bookBtns.className === 'isRead'){
            let clickedBook = manager.findBook(bookDiv.id);
            clickedBook.toggleBookRead(!clickedBook.isBookRead()); 
            bookBtns.innerHTML = manager.renderBooks(clickedBook.isBookRead()); 
        }
    }
})