
let myLibrary = [];

function Book(title, author, pages, isRead, imgSrc) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.imgSrc = imgSrc
}

myBook = new Book('LOTR: The Hobbit', 'JR Tolkien', 245, true, 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg');
myBook1 = new Book('Fellowship Of The Ring', 'JR Tolkien', 279, false, 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg');
myBook2 = new Book('LOTR: Two Towers', 'JR Tolkien', 312, true, 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg');

function addBookToLibrary(book) {
    myLibrary.push(book)
}

addBookToLibrary(myBook);
addBookToLibrary(myBook1);
addBookToLibrary(myBook2);

window.addEventListener('DOMContentLoaded', () => {

    // Add button event to handle show Modal (need to make still in html)
    const addBookBtn = document.querySelector('.addBook')
    addBookBtn.addEventListener('click', () => {
        alert('you clicked add book');
    })

    const root = document.querySelector('.books')
    
    myLibrary.forEach(book => {
        const el = document.createElement('div')
        el.classList.add('card')
        el.setAttribute('data-id', myLibrary.indexOf(book))
        
        const coverImg = document.createElement('img')
        coverImg.setAttribute('src', book.imgSrc)

        const title = document.createElement('h3')
        title.innerText = `Title: ${book.title}`

        const author = document.createElement('p')
        author.innerText = `Author: ${book.author}`

        const pages = document.createElement('p')
        pages.innerText = `Pages: ${book.pages}`

        const readBtn = document.createElement('button')
        book.isRead ? readBtn.classList.add('read') : readBtn.classList.add('unread')
        book.isRead ? readBtn.innerText = "Read" : readBtn.innerText = "Unread"

        const delBtn = document.createElement('button')
        delBtn.classList.add('delete')
        delBtn.innerText = "Delete"

        const btnContainer = document.createElement('div')
        btnContainer.classList.add('btnContainer')

        btnContainer.appendChild(readBtn)
        btnContainer.appendChild(delBtn)

        el.appendChild(coverImg)
        el.appendChild(title)
        el.appendChild(author)
        el.appendChild(pages)
        el.appendChild(btnContainer)
        
        root.appendChild(el)
    });

})