// Add A book Class
class book {
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
        const books = [{
            title: "title 1",
            author: "author 1",
            isbn: "12345",
            recby: "Someone 1"
        }];
        const storedbooks = books;
        storedbooks.forEach((book) => UI.AddBookToList(book));

    };
    static AddBookToList(book) {
        const list = document.querySelector("#booklist");
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.recby}</td>
        <td><a href="#">X</a></td>`;

        list.appendChild(row);

    }


}