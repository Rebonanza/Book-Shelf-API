const { nanoid } = require("nanoid")
const books = require('./data');

const insertBook = (request, h) => {
        const 
         {  name, 
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading, 
        } = request.payload
        const bookId = nanoid(18)
        const finished = false
        const insertedAt = new Date().toISOString()
        const updatedAt = insertedAt

        const book = {
            bookId, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
        }
        if(name == null || name == ""){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku',
              });
              response.code(400);
              return response;
        }
        if(readPage > pageCount){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
              });
              response.code(400);
              return response;
        }
        data.push(book)
        const isSuccess = books.filter((book) => book.id === id).length > 0;
        if(!isSuccess) {
            const response = h.response({
                status: 'error',
                message: 'Buku gagal ditambahkan',
              });
              response.code(500);
              return response;
        }
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: bookId,
            }
          });
          response.code(201);
          return response;
}

const getBooks = (request, h) => ({
  status: 'success',
  data: {
    id:books.bookId,
    name:books.name,
    publisher:books.publisher,
  } 
})

const getBook = (request, h) => {
   const { bookId } = request.params;
 
  const book = books.filter((b) => b.bookId === bookId)[0];
 
 if (book !== undefined) {
    return {
      status: 'success',
      data: {
        books
      },
    };
  }
  const response = h.response({
    status: 'failed',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

const updateBook = (request, h) => {
    const { bookId } = request.params;
 
    const 
         {  name, 
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading, 
        } = request.payload
    const updatedAt = new Date().toISOString();
    const bookLoc = books.findIndex((book) => book.bookId === bookId);
   
    if(name == null || name == ""){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
          });
          response.code(400);
          return response;
    }
    if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
          });
          response.code(400);
          return response;
    }
    if (bookLoc !== -1) {
       books[bookLoc] = {
        ...books[bookLoc],
        name, 
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
   
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui catatan. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

const deleteBook = (request, h) => {
    const { id } = request.params;
 
    const bookLoc = books.findIndex((book) => book.id === id);
   
    if (bookLoc !== -1) {
      books.splice(bookLoc, 1);
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
      });
      response.code(200);
      return response;
    }
   
   const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
}

module.exports = {
    insertBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
}