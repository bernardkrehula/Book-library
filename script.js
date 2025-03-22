const newBookBtn = document.querySelector('.newBookBtn');
const closeBookInfo = document.querySelector('.closeBookInfoBtn');
const sendBtn = document.querySelector('.sendBtn');
const main = document.querySelector('.main');

function bookCreator() {
    let id;
}

function manageBooks() {
    const books = [];

    const pushBooksInArray = (book) => {
        books.push(book);
    }
    return { pushBooksInArray }
}

function bookInfoDivCreator() {
    let html = `
    <div class="bookInfo">
            <button class="closeBookInfoBtn">X</button>
            <li>
                <h4>Title of the book:</h4>
                <input placeholder="Harry Potter">
            </li>
            <li>
                <h4>Author:</h4>
                <input placeholder="J.K. Rowling">
            </li>
            <li>
                <h4>Number of pages:</h4>
                <input placeholder="500">
            </li>
            
            <div class="checkBoxDiv">
                <input type="checkbox"><h4>Have you read this book?</h4>
                <button class="sendBtn">Send</button>
            </div>
        </div>
    `;
    main.insertAdjacentHTML('afterend', html);   
}
newBookBtn.addEventListener('click', () => {
    bookInfoDivCreator();
})

/* bookInfo.addEventListener('click', (event) => {
    console.log(event.target)
}) */