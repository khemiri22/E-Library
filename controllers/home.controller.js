const homeModel = require('../models/book.model')

exports.getLimitedBooksController=(req,res,next)=>{
    homeModel.getLimitBooks(3).then(books=>{
        res.render('index',{books,verifSession:req.session.userId})
    }).catch(err=>res.status(400).send(err))
}
