const express = require('express')

const mongoose = require('mongoose')

const  userModel = mongoose.model('User')
const BookModel = mongoose.model('Book')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

let getAllUser = (req, res)=>{
    userModel.find()
    .select('-__v -_id')
    .lean() 
    .exec((err, result)=>{
        if(err){
            logger.error(err.message, 'userController : getAlluser', 10)  
            res.send(err)
        } else if(result == undefined || result == null || result == ''){
            console.log('No user Found')
            res.send('No user Found')
        }else {
            logger.captureInfo('All User Found Successfully !!', 'userController: getAlluser', 2)
            let apiResponse = response.generate(false, 'All User are Found', 200, result)
            res.send(apiResponse)
        }
    })
} 

let viewUser = (req,  res) => {
    userModel.findOne({'userId' : req.params.userId}, (err,result)=>{
       if(err){
        logger.error(err.message, 'userController : viewUser', 10)
           res.send(err)
       }else if(result == undefined || result == null || result == ''){
           console.log('No user found')
           res.send('No User Found')
       }else{
        logger.captureInfo('user Found Successfully !!', 'userController: viewUser', 2)
        let apiResponse = response.generate(false, 'User Found', 200, result)
        res.send(apiResponse)
       }
    })
}

let createUserDetails = (req, res) => {
    let userId = shortid.generate()

    let userDetails = new userModel({
        userId : userId,
        userName : req.body.userName,
        contactNumber : req.body.contactNumber,
        address : req.body.address
    })// end the user details
    userDetails.save((err, result) => {
        if(err){
            logger.error(err.message, 'userController : createUser', 10)
            res.send(err)
        }else{
            logger.captureInfo('create User Successfully !!', 'userController: createBook', 2)
            let apiResponse = response.generate(false, 'Create User Details', 200, result)
            res.send(apiResponse)
        }
    })// end new blog save
}

let addBooksToCart = (req, res) =>{
    let items = {};
    BookModel.findOne({'bookId' : req.params.bookId}, (err ,  result) =>{
        if(err){
            logger.error(err.message, 'userController : addBooksInCart', 10)
            res.send(err)
        }else if(result == undefined || result == null || result == ''){
            console.log('No Book found')
            res.send('No Book Found')
        }
        else{
            console.log(result);
            items.name = result.title;
            items.isbn = result.isbn;
            items.author = result.author;
            items.price = result.price;
            items.id = result.bookId;
        }
    });

    userModel.findOne({'userId' : req.params.userId}, (err , result)=>{
       if(err){
           console.log(err)
           res.send(err)
       }else if(result == undefined || result == null || result == ''){
        console.log('No user found')
        res.send('No User Found')
       }else{
         let bookFound = false;
         result.booksInCart.forEach((product) => {
             if(product !== null){
                 if(product.bookId === items.id){
                     bookFound = true;
                     product.numberOfBook += 1;
                 }
             }
         });
         if(!bookFound){
             result.booksInCart.push(items)
             result.numberOfBook += 1 ;
             result.save((err,result) =>{
                 if(err){
                    logger.error(err.message, 'userController : addBooksInCart', 10)
                     response.send(err)
                 }else{
                     res.send(result)
                 }
             });
         }
       }
    })
} // end add book on cart

let removeBookFromCart = (req , res) =>{
    let BookId = req.params.bookId;
    userModel.findOne({ 'userId' : req.params.userId},  (err , result) =>{
       if(err){
        logger.error(err.message, 'userController : removeBook', 10)
           res.send(err)
       }else if(result == undefined || result == null || result == ''){
        console.log('No Book found')
        res.send('No Book Found')
       }else{
             let bookFound = false;
             result.booksInCart.forEach((product) =>{
               if(product.id === BookId){
                  bookFound = true;
                  result.booksInCart.remove(product);
               }
           });
           if(bookFound){
                result.numberOfBook = result.booksInCart.length;
                result.save((err , result) =>{
                    if(err){
                        console.log(err)
                        res.send(err)
                    }
                    else{
                        console.log(result)
                        res.send(result);
                    }
                })
           }
       }
    })

}// end remove book from cart

let deleteUser = (req, res) => {
    BookModel.remove({ 'userId': req.params.userId }, (err, result) => {
        if (err) {
            logger.error(err.message, 'userController : deleterUser', 10)
            res.send(err)
        } else if (result == undefined || result == null || result == '') {
            console.log('user Not Found')
            res.send("user Not Found")
        } else {
            logger.captureInfo('Delete User Successfully', 'userController: getAlluser', 2)
            let apiResponse = response.generate(false, 'Delete User Successfully', 200, result)
            res.send(apiResponse)
        }
    })
} // delete the user

module.exports = {
    getAllUser : getAllUser,
    viewUser : viewUser,
    deleteUser : deleteUser,
    createUserDetails : createUserDetails,
    addBooksToCart : addBooksToCart,
    removeBookFromCart : removeBookFromCart
}