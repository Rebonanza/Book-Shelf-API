const {insertBook, getBooks, getBook,updateBook, deleteBook,} = require('./handler')
const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getBooks,
    },
    {
        method: 'POST',
        path: '/books',
        handler: insertBook,
    },
    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBook,
    },
    {
        method: 'PUT',
        path: '/books/{bookid}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{bookid}',
        handler: deleteBook,
    },
]