// Add A book Class
class Book {
    constructor(title, author, isbn, recby) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.recby = recby;
    };
};

// add a class to handle the UI (displaying and removing books)

class UI {
    static DisplayBooks() {
        const storedbooks = Store.getBooks();
        storedbooks.forEach((book) => UI.AddBookToList(book));

    }
    static AddBookToList(book) {
        const list = document.querySelector("#booklist");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.recby}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);


    }
    static ClearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#recom').value = '';
    }

    static showAlert(message, status) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(message));
        div.className = `alert alert-${status}`;
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static DeleteBook(el) {
        el.parentElement.parentElement.remove();
    }


}

//Storage class
class Store {
    static getBooks() {
        let storedbooks;
        if (localStorage.getItem('storedbooks') === null) {
            storedbooks = [];
        } else {
            storedbooks = JSON.parse(localStorage.getItem('storedbooks');
            }
            return storedbooks;
        }

        static storebook(book) {
            const storedbooks = Store.getBooks();

            storedbooks.push(book);

            localStorage.setItem('storedbooks', JSON.stringify(storedbooks));
        }

        static removeBook(isbn) {
            const storedbooks = localStorage.getItem('storedbooks');
            storedbooks.forEach((book, index) => {
                if (book.isbn === isbn) {
                    storedbooks.splice(index, 1);
                }
            });
            localStorage.setItem('storedbooks', JSON.stringify(storedbooks));

        }

    }



    //Event Listeners

    // Event listener to grab submissions   
    document.addEventListener('DOMContentLoaded', UI.DisplayBooks);

    //Submission
    document.querySelector('#book-form').addEventListener('submit', (e) => {

        //Prevent default
        e.preventDefault();

        //Grab Values
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;
        const recby = document.querySelector('#recom').value;

        //Validate
        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('please fill all required fields', 'danger');
        } else {
            UI.showAlert('Book Submitted', 'success');
        }

        //Instantiate book
        const book = new Book(title, author, isbn, recby);
        //Store Book
        Store.storebook(book);
        //Add book to table
        UI.AddBookToList(book);
        //Clear Fields
        UI.ClearFields();
    });

    //Remove A book From Storage and UI

    document.querySelector("#booklist").addEventListener('click', (e) => {
        UI.DeleteBook(e.target);

        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    })