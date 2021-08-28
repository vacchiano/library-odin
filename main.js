// RESET LOCAL STORGE IF NEEDED
localStorage.clear()
let myLibrary = [];

function Book(title, author, pages, isRead, imgSrc) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.imgSrc = imgSrc
}


function addBookToLibrary(book) {
    myLibrary.push(book)
    RefreshStorage()
}

function RefreshStorage() {
    localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary))
    //console.log(JSON.parse(localStorage.getItem('myLibrary')));
}

// PRE-POPULATE WITH DATA IF NEEDED (uncommet below first time running)
function seedDummyData() {

    myBook = new Book('LOTR: The Hobbit', 'JR Tolkien', 245, true, 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg');
    myBook1 = new Book('Fellowship Of The Ring', 'JR Tolkien', 279, false, 'https://i.pinimg.com/originals/b0/9f/7f/b09f7f6a1abbabe397541bd01a902801.png');
    myBook2 = new Book('LOTR: Two Towers', 'JR Tolkien', 312, true, 'https://d3525k1ryd2155.cloudfront.net/h/227/649/1336649227.0.x.jpg');
    
    addBookToLibrary(myBook);
    addBookToLibrary(myBook1);
    addBookToLibrary(myBook2);
}

window.addEventListener('DOMContentLoaded', () => {

    // If you want to re-seed data
    // seedDummyData()

    // checks for local storage and seeds if empy
    if (localStorage.getItem('myLocalLibrary') === null) {
    } else {
        if (JSON.parse(localStorage.getItem('myLocalLibrary')).length === 0) {
            myLibrary = []
            seedDummyData()
            localStorage.setItem("myLocalLibrary", JSON.stringify(myLibrary))
            //renderBooks()
        } else {
            myLibrary = JSON.parse(localStorage.getItem('myLocalLibrary'))
            //renderBooks()
        }
    }

    renderBooks()




    

    const modal = document.querySelector('.modalView')

    // Add button event to handle show Modal (need to make still in html)
    const addBookModalBtn = document.querySelector('.addBook')
    addBookModalBtn.addEventListener('click', () => {
        // alert('you clicked add book');
        modal.style.display = "block";
    })

    const closeModal = document.querySelector('#closeModal')
    closeModal.addEventListener('click', event => {
        // Prevents form from submitting
        event.preventDefault();
        modal.style.display = "none";
    })

    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    })

    const addBookBtn = document.querySelector('#addBook')
    addBookBtn.addEventListener('click', event => {
        // alert('add book clicked')

        event.preventDefault();
        
        
        const newBookTitle = document.querySelector('.titleInput').value
        const newBookAuthor = document.querySelector('.authorInput').value
        const newBookPages = parseInt(document.querySelector('.pageInput').value)
        const newBookUrl = document.querySelector('.urlInput').value
        const newBookIsRead = document.querySelector('.isReadInput').checked
        console.log({ newBookTitle, newBookAuthor, newBookPages, newBookIsRead, newBookUrl })

        const newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookIsRead, newBookUrl)

        document.querySelector('.titleInput').value = ""
        document.querySelector('.authorInput').value = ""
        document.querySelector('.pageInput').value = ""
        document.querySelector('.urlInput').value = ""
        document.querySelector('.isReadInput').checked = false

        addBookToLibrary(newBook)
        RefreshStorage()
        renderBooks()
        modal.style.display = "none"
        // console.log(myLibrary);

    })


})

function renderBooks() {
    const root = document.querySelector('.books')

    // reset all the child nodes when changed
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }
    
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
        readBtn.setAttribute('id', 'readBookBtn')

        const delBtn = document.createElement('button')
        delBtn.classList.add('delete')
        delBtn.innerText = "Delete"
        delBtn.setAttribute('id', 'deleteBookBtn')

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
    addDeleteListener()
    addReadListener()
}

function addReadListener() {
    if (myLibrary.length > 0) {
        const readButtons = document.querySelectorAll('#readBookBtn')
        readButtons.forEach(readBtn => {
            readBtn.addEventListener('click', event => {
                const indexToRead = event.target.parentNode.parentNode.getAttribute('data-id')

                myLibrary[indexToRead].isRead = !myLibrary[indexToRead].isRead

                event.target.classList.toggle('Read')
                event.target.classList.toggle('Unread')
                RefreshStorage()
                renderBooks()

            })
        })
    }
}

function addDeleteListener() {

    if(myLibrary.length > 0) {

        const deleteBookBtn = document.querySelectorAll('#deleteBookBtn')
        //console.log(deleteBookBtn[0].parentNode.parentNode.getAttribute('data-id'));
    
        deleteBookBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', event => {
                //console.log(`clicked ${event.target.parentNode.parentNode.getAttribute('data-id')}`);
                const indexToDelete = event.target.parentNode.parentNode.getAttribute('data-id')
    
                myLibrary.splice(indexToDelete, 1)
                RefreshStorage()
                renderBooks()
            })
        })
    }
    // deleteBookBtn.addEventListener('click', event => {
    //     console.log(event);
    // })
}
