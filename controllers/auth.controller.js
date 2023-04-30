const authModel = require('../models/auth.model')

exports.registerController=(req,res,next)=>{
    authModel.register(req.body).then(user=>{
        res.redirect('/register')
        console.log(user)
    }
        ).catch(err=>{
            req.flash('error',err)
            res.redirect('/register')
            
        }
            )
}


exports.loginController=(req,res,next)=>{
     authModel.login(req.body).then(id=>{
         req.session.userId=id
         res.redirect('/')

     }).catch(err=>{
        req.flash('error',err)
         res.redirect('/login')
         
         
        })
}

exports.logoutCOntroller=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}


exports.renderRegisterPage=(req,res,next)=>{
    res.render('register',{verifSession:req.session.userId,message:req.flash('error')[0]})
}
exports.renderLoginPage=(req,res,next)=>{
    res.render('login',{verifSession:req.session.userId,message:req.flash('error')[0]})
}