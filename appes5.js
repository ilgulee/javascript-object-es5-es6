// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
}

// Delete Book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
       // console.log(target.parentElement.parentElement);
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.showAlert = function (message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    //console.log(div);
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 3 sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}


// Clear Fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listeners to form
document.getElementById('book-form').addEventListener('submit', function (e) {
    // console.log('test');
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

    // Instantiate UI
    const ui = new UI();

    //Validate fiells
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Instantiate book
        const book = new Book(title, author, isbn);
        // Add book to list
        ui.addBookToList(book);

        ui.showAlert('Book Added!', 'success')
        // Clear fields
        ui.clearFields();
    }
    e.preventDefault();
});

// Event Listener for delete
document.getElementById('list').addEventListener('click', function (e) {

    // Instantiate UI
    const ui = new UI();
   // console.log(e.target);
    // Delete book
    ui.deleteBook(e.target);

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
});