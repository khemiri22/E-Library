const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const dbHost='mongodb://localhost:27017/library'

var authSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
})

var User = mongoose.model('user',authSchema)


exports.register=(user)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return User.findOne({email:user.email})
        }).then(async exist=>{
            if(exist) {
                reject('Already Exist !')
                mongoose.disconnect()
            }else { 
              bcrypt.hash(user.password,salt=await bcrypt.genSalt(10)).then(hpass=>{
                   User.insertMany({
                       ...user,
                       password:hpass
                   }).then(user=>{
                       resolve(user)
                       mongoose.disconnect()
                   })
               })
            }
        }).catch(err=>{
        reject(err)
        mongoose.disconnect()
        })

    }
    
    )  
}



exports.login=(user)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return User.findOne({email:user.email})
        }).then(log=>{
            if(!log){
                reject("Invalid email please register !")
                mongoose.disconnect()
            }
            else{
                bcrypt.compare(user.password,log.password).then((check)=>{
                    if(check===false){
                    reject('Wrong password !')
                    mongoose.disconnect()
                    }else {
                        mongoose.disconnect()
                        resolve(log.id)
                    }
                
                }).catch((err)=>{
                    reject(err)
                    mongoose.disconnect()
                
                })

            }

        }).catch(err=>reject(err))
    })
}