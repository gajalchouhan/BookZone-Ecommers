const mongoose = require('mongoose')

const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        userId : {
            type :  String,
            unique : true
        },
        userName : {
            type : String,
            default : 'Not Available'
        },
        contactNumber : {
            type : String,
            default : 'Not Available'
        },
        address : {
            type : String,
            defulat : 'Address not Available'
        },
        booksInCart : [],
        numberOfBook : {
            type : Number,
            default : 0
        }
    }
)

mongoose.model('User',  userSchema);
