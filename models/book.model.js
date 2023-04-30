const mongoose=require('mongoose')
const dbHost='mongodb://localhost:27017/library'

var bookSchema=mongoose.Schema({
    uid:String,
    title:String,
    description:String,
    price:Number,
    author:String,
    image:String
})

var Book = mongoose.model('book',bookSchema)




exports.getLimitBooks=(limit)=>{
    return new Promise ((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return Book.find().limit(limit)
        }).then(books=>{
            resolve(books)
            mongoose.disconnect()
        }).catch(err=>reject(err))
    })
    
    }






exports.getAllBooks=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
          return  Book.find({})
        }).then(books=>{
            resolve(books)
            mongoose.disconnect()
        }).catch(err=>reject(err))
    })
}

exports.getOneBook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
           return Book.findById(id)
        }).then(book=>{
            resolve(book)
            mongoose.disconnect()
        }).catch(err=>reject(err))
    })
}

exports.addNewBook=(book,bookImg,uid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
           return Book.findOne({title:book.title})
        }).then(exist=>{
            if(exist){
                reject('Book already exist !')
                mongoose.disconnect()
            } else {
                Book.insertMany({
                    ...book,
                    image:bookImg,
                    uid
                }).then(book=>{
                    resolve(book[0])
                    mongoose.disconnect()
                }).catch(err=>{
                    console.log(err)
                    mongoose.disconnect()
                })
            }
        }).catch(err=>console.log(err))
    })
}

exports.getMybooks=(uid)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return Book.find({uid})
        }).then(books=>{
            resolve(books)
            mongoose.disconnect()
        }).catch(err=>resolve(err))
    })
}

exports.deleteBook=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return Book.findByIdAndDelete(id)
        }).then(book=>{
            resolve(book.image)
            mongoose.disconnect()
            console.log(book)
        }).catch(err=>reject(err))
    })
}

exports.updateBook=(id,update)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(dbHost).then(()=>{
            return Book.findByIdAndUpdate(id,update)
        }).then(book=>{
            resolve(book)
            mongoose.disconnect()
            console.log(update)
        }).catch(err=>reject(err))
    })
}
