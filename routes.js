module.exports = function (passport, express) {

    var router = express.Router();

    // middleware to use for all requests
    router.use(function (req, res, next) {

        var userObj = req.session.passport;

        // do logging
        console.log('Completed ' + req.method + ' request for ' + req.originalUrl);

        // Block access to all endpoints if user is not logged in
        if ( !userObj || (Object.keys(userObj).length === 0 && userObj.constructor === Object) ) {
            //res.status(403).send('Forbidden');
            //res.redirect('/login');
            console.log('not logged in');
        }
        next(); // make sure we go to the next routes and don't stop here
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function (req, res) {
        res.json({message: 'hooray! welcome to our api!'});
    });

    require(__dirname + '/app/routes/users.js')(passport, router);
    require(__dirname + '/app/routes/movies.js')(router);
    require(__dirname + '/app/routes/profile.js')(router);

    return router;
};