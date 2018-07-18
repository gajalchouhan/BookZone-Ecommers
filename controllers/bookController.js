const express = require('express')
const mongoose = require('mongoose')
const BookModel = mongoose.model('Book')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const time = require('./../libs/timeLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')

    
    let getAllBook = (req, res)=>{
        BookModel.find()
        .select('-__v -_id')
        .lean() 
        .exec((err, result)=>{
            if(err){
                logger.error(err.message, 'bookController : getAllBook', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.info('No Book Found', 'bookController : getAllBook', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 404, null)
                res.send(apiResponse)
            }else {
                logger.captureInfo('All Book Found Successfully !!', 'bookcontroller: getAllBook', 2)
                let apiResponse = response.generate(false, 'All Book are Found', 200, result)
                res.send(apiResponse)
            }
        })
    }  // end get all blogs


    let viewByBookID = (req ,res) => {
         BookModel.findOne({'bookId' : req.params.bookId}, (err, result) =>{
             if(err){
                 logger.error(err.message, 'bookController : viewByBookId', 10)
                 let apiResponse = response.generate(true, 'Failed To Find Book', 500, null)
                 res.send(apiResponse);
             } else if(check.isEmpty(result)){
                logger.captureInfo('No Book Found', 'bookController:viewByBookId', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 404, null)
                 res.send(apiResponse)
             }else{
                logger.captureInfo('Book Found Successfully', 'bookcontroller: viewByBookId', 2)
                 let apiResponse = response.generate(false,  'Book Found', 200, result)
                 res.send(apiResponse)
             }
         })
    }

    let viewByTitle = (req, res)=> {
        console.log(req.user);
        BookModel.findOne({'title' : req.params.title}, (err, result) =>{
            if(err){
                logger.error(err.message, 'bookController : viewByTitle', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 500, null)
                res.send(apiResponse);
            } else if(check.isEmpty(result)){
                logger.captureInfo('No Book Found', 'controller:viewByTitle', 10)
               let apiResponse = response.generate(true, 'Failed To Find Book', 404, null)
                res.send(apiResponse)
            }else{
                logger.captureInfo('Book Found Successfully !!', 'bookcontroller: viewByTitle', 10)
                let apiResponse = response.generate(false,  'Book Found', 200, result)
                res.send(apiResponse)
            }
        })
    }

    let viewByAuthor = (req, res) => {

        BookModel.find({ 'author': req.params.author }, (err, result) => {
            if (err) {
                logger.error(err.message, 'bookController : viewByAuthor', 10)
                let apiResponse = response.generate(true, 'Failed To Find Author', 500, null)
                res.send(apiResponse);
            }else if(check.isEmpty(result)){
                let apiResponse = response.generate(true, 'Failed To Find Author', 404, null)
                 res.send(apiResponse);
             } else {
                logger.captureInfo('Book Found Successfully !!', 'bookcontroller: viewByAuthor', 10)
                let apiResponse = response.generate(false, 'Author Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
    
    /**
     * This is the function where we can edit the book information.
     */
    let editBook = (req, res) => {
    
        let options = req.body;
        console.log(options);
        BookModel.update({ 'bookId': req.params.bookId }, options, { multi: true }).exec((err, result) => {
    
            if (err) {
                logger.error(err.message, 'bookController : editBook', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)){
                logger.captureInfo('No Book Found', 'bookController:editBook', 10)
                let apiResponse = response.generate(true, 'Failed To Edit the Book', 404, null)
                 res.send(apiResponse)
             }else {
                logger.captureInfo('Book Edited Successfully', 'bookcontroller: editBook', 10)
                let apiResponse = response.generate(false, 'All Book are Found', 200, result)
                res.send(apiResponse)
            }
        })
    }
    
    
    
    // This is the Function which use to delete the book from book store.
    let deleteBook = (req, res) => {
        BookModel.remove({ 'bookId': req.params.bookId }, (err, result) => {
            if (err) { 
                logger.error(err.message, 'bookController : deleteBook', 10)
                let apiResponse = response.generate(true, 'Failed To Find Book', 500, null)
                res.send(apiResponse)             
            } else if(check.isEmpty(result)){
                logger.captureInfo('No Book Found to Delete', 'bookController:deleteBook', 10)
                let apiResponse = response.generate(true, 'Failed To Delete the Book', 404, null)
                 res.send(apiResponse)
            } else {
                logger.captureInfo('Delete Book Successfully', 'bookcontroller: deleteBook', 10)
                let apiResponse = response.generate(false, 'All Book are Found', 200, result)
                res.send(apiResponse)
            }
        })
    }

    let createBook = (req, res) => {
        let today = Date.now()
        let bookId = shortid.generate()
    
        let newBook = new BookModel({
    
            bookId: bookId,
            title: req.body.title,
            author: req.body.author,
            isbn : req.body.isbn,
            publisher : req.body.publisher,
            publishedDate : today,
            isAvailable : req.body.isAvailable,
            price : req.body.price
        }) // end new blog model
    
        newBook.save((err, result) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
               res.send(result)
            }
        }) // end new blog save
    }

module.exports = {
   getAllBook : getAllBook,
   createBook : createBook,
   viewByBookId : viewByBookID,
   viewByAuthor : viewByAuthor,
   viewByTitle : viewByTitle,
   editBook : editBook,
   deleteBook : deleteBook
}