/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('expressprojectsec1conestoga:server');
var http = require('http');
const mongoose = require('mongoose');


const dburi = "mongodb+srv://f97aizan:Faizan@1@cluster0.zhj3z.mongodb.net/?retryWrites=true&w=majority"


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((results) => {
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
        console.log("Connected to DB");
    })
    .catch((error) => {
        console.log("error : " + error);
    });


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}