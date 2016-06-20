// server.js

var express    = require('express');
var app        = express();
var helmet     = require('helmet');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport   = require('passport');
var flash      = require('connect-flash');
var morgan     = require('morgan');
var session    = require('express-session');
var config   = require('./config.js');

var port     = normalizePort(process.env.PORT || config.port);

mongoose.connect(config.db.url, function(err, res){
    if(err){
        console.log('Error connecting to the database: ' + err);
    } else{
        console.log('Connected to database: ' + config.db.url);
    }
});

require('./config/passport')(passport); // pass passport for configuration

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// required for passport
app.use(session({ secret: config.secret })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Set up security
app.use(helmet());

var routes = require('./routes')(passport, express);

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