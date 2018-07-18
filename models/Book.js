const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let bookSchema = new Schema(
    {
       bookId : {
           type : String,
           unique : true
       },
       title : {
         type : String,
         default : ''
       },
       isbn : {
           type : Number,
           default : 0
       },
       author : {
           type : String,
           default : ''
       },
       publisher : {
           type : String,
           default : ''
       },
       publishedDate : {
           type : Date,
           default : Date.now
       },
       isAvailable : {
           type : Boolean,
           default : true
       },
       price : {
           type : Number,
           default : 0
       }
         
    }
)

mongoose.model('Book', bookSchema);