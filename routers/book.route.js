const bookController = require('../controllers/book.controller')
const guradAuth = require('./guardAuth')
const router = require('express').Router()
const multer = require('multer')
router.get('/',guradAuth.isAuth,bookController.getAllBooksController)
router.get('/addBook',guradAuth.isAuth,bookController.renderAddBookPage)
router.post('/addBook',multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'assets/uploads')
        },
        filename:(req,file,cb)=>{
        cb(null,Date.now()+'_'+Math.round(Math.random() * 1E9)+'.jpg')
        }
    })
}).single('image')
,guradAuth.isAuth,bookController.addNewBookController)

router.get('/myBooks',guradAuth.isAuth,bookController.getMyBooksController)
router.get('/:id',guradAuth.isAuth,bookController.getOneBookController)



router.get('/delete/:id',guradAuth.isAuth,bookController.deleteBookController)

router.get('/update/:id',guradAuth.isAuth,bookController.getUpdateBookpage)

router.post('/updateBook/:id',multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'assets/uploads')
        },
        filename:(req,file,cb)=>{
            cb(null,req.body.image)
        }
    })
}).single('image'),guradAuth.isAuth,bookController.updateBookController)


module.exports=router