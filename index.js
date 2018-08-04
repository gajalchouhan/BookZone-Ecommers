const express = require('express')
const appConfig = require('./config/appConfig')
const http = require('http')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser= require('cookie-parser')
const bodyParser = require('body-parser')
const globalErrorMiddleware = require('./middelwares/appErrorHandler')
const routeLoggerMiddleware = require('./middelwares/routeLogger')
const logger = require('./libs/loggerLib')
var helmet = require('helmet')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :false}))
app.use(cookieParser())
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())
// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file){
    if(~file.indexOf('.js')) {
        require(modelsPath + '/' + file)
    }
})

let routesPath = './routes'

fs.readdirSync(routesPath).forEach(function (file){
    if(~file.indexOf('.js')){
        console.log(routesPath+ '/' + file)
        let router = require(routesPath + '/' + file);
        router.setRouter(app);
    }
});

app.use(globalErrorMiddleware.globalNotFoundHandler)

const server = http.createServer(app)
// start listening to http server
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

// end server listening code

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elavated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use.', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        default:
            logger.error(error.code + ':some unknown error occured', 'serverOnErrorHandler', 10)
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    ('Listening on ' + bind)
    let db = mongoose.connect(appConfig.db.uri, { useMongoClient: true })
}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
    // application specific logging, throwing an error, or other logic here
})


// handling mongoose connection error
mongoose.connection.on('error' , function (err){
    console.log('database connection error');
    console.log(err)
});

// handling mongoose connection error
mongoose.connection.on('open',  function(err){
    if(err){
        console.log("database error");
        console.log(err);
    }
    else{
        console.log("database connections open success");
    }
});
