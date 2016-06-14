// server.js

var express    = require('express');
var app        = express();
var helmet     = require('helmet');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var routes     = require('./routes.js')(express);

const uri = 'mongodb://localhost:27017/movieList';

mongoose.connect(uri, function(err, res){
    if(err){
        console.log('Error connecting to the database: ' + err);
    } else{
        console.log('Connected to database: ' + uri);
    }
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = normalizePort(process.env.PORT || 7500);

// Set up security
app.use(helmet());

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

// ROUTES FOR OUR API
// =============================================================================
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);