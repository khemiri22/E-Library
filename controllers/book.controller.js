const bookModel = require('../models/book.model')
const fs = require('fs')
exports.getAllBooksController=(req,res,next)=>{
    bookModel.getAllBooks().then(books=>{
        res.status(200).render('books',{books,verifSession:req.session.userId})
    }).catch(err=>res.status(404).send(err))
}

exports.getOneBookController=(req,res,next)=>{
    bookModel.getOneBook(req.params.id).then(book=>{
        res.status(200).render('details',{book,verifSession:req.session.userId})
    }).catch(err=>res.status(404).send(err))
}


exports.addNewBookController=(req,res,next)=>{
    bookModel.addNewBook(req.body,req.file.filename,req.session.userId).then(book=>{
        res.redirect('/books/'+book.id)
    }).catch(err=>{
        req.flash('error',err)
        res.redirect('/books/addbook')
    })
    
}

exports.deleteBookController=(req,res,next)=>{
    bookModel.deleteBook(req.params.id).then(bookImg=>{
        fs.unlinkSync('assets/uploads/'+bookImg)
        res.redirect('/books/myBooks')
    }).catch(err=>res.status(404).send(err))
}


exports.updateBookController=(req,res,next)=>{
    bookModel.updateBook(req.params.id,req.body).then(()=>{
        res.redirect('/books/myBooks')
    }).catch(err=>res.status(404).send(err))
}


exports.renderAddBookPage=(req,res,next)=>{
    res.render('addBook',{verifSession:req.session.userId,message:req.flash('error')[0]})
}

exports.getMyBooksController=(req,res,next)=>{
    bookModel.getMybooks(req.session.userId).then(books=>{
        res.render('myBooks',{books,verifSession:req.session.userId})
    }).catch(err=>res.status(404).send(err))
}



exports.getUpdateBookpage=(req,res,next)=>{
    bookModel.getOneBook(req.params.id).then(book=>{
        res.render('updateBook',{book,verifSession:req.session.userId})
    }).catch(err=>res.status(404).send(err))
}




