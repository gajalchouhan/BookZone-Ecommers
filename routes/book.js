const express = require('express')
const bookController = require ('./../controllers/bookController')
const userController = require('./../controllers/userController')
const appConfig = require('./../config/appConfig')
const auth = require('./../middelwares/auth')

let setRouter = (app) => {

   let baseUrl =  appConfig.apiVersion; 


   app.get(baseUrl+'/all',auth.isAuthenticated, bookController.getAllBook);

    /**
   * @api {get}  /api/v1/all   View all Books
   * @apiVersion 0.0.1
   * @apiName  view all books
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */
   
   app.get(baseUrl+'/view/:bookId',auth.isAuthenticated, bookController.viewByBookId);

      /**
   * @api {get}  /api/v1/view/:bookId   View Particular Books
   * @apiVersion 0.0.1
   * @apiName  view By BookID
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.get(baseUrl+'/title/:title',auth.isAuthenticated, bookController.viewByTitle);

      /**
   * @api {get}  /api/v1/title/:title   view Books
   * @apiVersion 0.0.1
   * @apiName  view Book By Title
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */
   
   app.get(baseUrl+'/author/:author',auth.isAuthenticated, bookController.viewByAuthor);

      /**
   * @api {get}  /api/v1/author/:author   Create a Product
   * @apiVersion 0.0.1
   * @apiName  view Books By Author
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */
   
   app.post(baseUrl+'/:bookId/delete',auth.isAuthenticated, bookController.deleteBook);

      /**
   * @api {post}  /api/v1/:bookId/delete   delete a book
   * @apiVersion 0.0.1
   * @apiName  Delete Books
   * @apiGroup delete
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.put(baseUrl+'/:bookId/edit',auth.isAuthenticated, bookController.editBook);

      /**
   * @api {put}  /api/v1/:bookId/edit   edit the books
   * @apiVersion 0.0.1
   * @apiName  Edit Book
   * @apiGroup Edit
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.post(baseUrl+'/book/create', bookController.createBook);

      /**
   * @api {post}  /api/v1/book/create   Create a Product
   * @apiVersion 0.0.1
   * @apiName  create Book
   * @apiGroup create
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.get(baseUrl+'/users', auth.isAuthenticated, userController.getAllUser);

      /**
   * @api {get}  /api/v1/users   view all users
   * @apiVersion 0.0.1
   * @apiName  view all users
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "title": "String",
   *                           "isAvailable": "Boolean,
   *                           "author": "String",
   *                           "isbn": number,
   *                            "price": number,
   *                           "bookId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.get(baseUrl+'/view/user/:userId',auth.isAuthenticated, userController.viewUser);

      /**
   * @api {get}  /api/v1/view/user/:userId   get information about user
   * @apiVersion 0.0.1
   * @apiName  user info
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "userName": "String",
   *                           "contactNumber": "number",
   *                           "address": "String",
   *                           "booksInCart": [],
   *                            "numberOf Books": number,
   *                           "userId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.post(baseUrl+'/:userId/user/delete',auth.isAuthenticated, userController.deleteUser);

        /**
   * @api {post}  /api/v1/view/user/:userId   get information about user
   * @apiVersion 0.0.1
   * @apiName  user info
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "userName": "String",
   *                           "contactNumber": "number",
   *                           "address": "String",
   *                           "booksInCart": [],
   *                            "numberOf Books": number,
   *                           "userId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.post(baseUrl+'/user/create',auth.isAuthenticated, userController.createUserDetails);

        /**
   * @api {post}  /api/v1/view/user/create   create user
   * @apiVersion 0.0.1
   * @apiName  create user info
   * @apiGroup create
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "userName": "String",
   *                           "contactNumber": "number",
   *                           "address": "String",
   *                           "booksInCart": [],
   *                            "numberOf Books": number,
   *                           "userId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */
   
   app.post(baseUrl + '/addBook/:bookId/user/:userId',auth.isAuthenticated, userController.addBooksToCart);

        /**
   * @api {post}  /api/v1/view/addBook/:bookId/user/:userId   get information about book
   * @apiVersion 0.0.1
   * @apiName  add book in cart
   * @apiGroup information
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "userName": "String",
   *                           "contactNumber": "number",
   *                           "address": "String",
   *                           "booksInCart": [],
   *                            "numberOf Books": number,
   *                           "userId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

   app.post(baseUrl + '/removeBook/:bookId/user/:userId',auth.isAuthenticated, userController.removeBookFromCart);
        /**
   * @api {post}  /api/v1/view/removeBook/:bookId/user/:userId   remove book in cart
   * @apiVersion 0.0.1
   * @apiName  remove Book
   * @apiGroup remove
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name title of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} isbn isbn of the book passed as a body parameter.
   * @apiParam {String} author author of the book passed as a body parameter.
   * @apiParam {Number} price Price of the book passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "userName": "String",
   *                           "contactNumber": "number",
   *                           "address": "String",
   *                           "booksInCart": [],
   *                            "numberOf Books": number,
   *                           "userId": "String",
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */
}// end setRouter function

module.exports = {
    setRouter : setRouter
}