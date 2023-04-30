const express = require('express');
const path = require('path')
const session=require('express-session')
const MongodbStore=require('connect-mongodb-session')(session)
const routerHome=require('./routers/home.route')
const routerBook=require('./routers/book.route')
const routerAuth = require('./routers/auth.route')
const flash = require('express-flash')
const app = express()




app.use(express.static(path.join(__dirname,'assets')))
app.set('view engine','ejs')
app.set('views','views')

var Store=new MongodbStore({
    uri:"mongodb://localhost:27017/library",
    collection:'sessions'
})



app.use(session({
    secret:'this is my secret key fzgzebjeibjiebjiob',
    store:Store,
    resave:true,
    saveUninitialized:true
}))


app.use(flash())

app.use('/',routerHome,routerAuth)
app.use('/books',routerBook)


app.get('/about',(req,res,next)=>{
    res.render('about',{verifSession:req.session.userId})
})
 
app.get('/contact',(req,res,next)=>{
    res.render('contact',{verifSession:req.session.userId})
})


app.listen(4000,()=>{console.log('Server is litening on 4000 !')})
