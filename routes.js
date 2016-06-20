module.exports = function (passport, express) {

    var router = express.Router();

    // middleware to use for all requests
    router.use(function (req, res, next) {

        var userObj = req.session.passport;

        // do logging
        console.log('Completed ' + req.method + ' request for ' + req.originalUrl);
        console.log(req.session);
        // Block access to all endpoints, except api/login && api/signup, if user is not logged in
        if ( !userObj || (Object.keys(userObj).length === 0 && userObj.constructor === Object) )  {

            if (req.originalUrl !== '/api/login' && req.originalUrl !== '/api/signup') {

                res.statusCode = 403;
                res.send('You do not have access to this page');

            } else {

                next();
            }
        } else {

            next();
        }

        //next();
    });

    require(__dirname + '/app/routes/users.js')(passport, router);
    require(__dirname + '/app/routes/movies.js')(router);
    require(__dirname + '/app/routes/profile.js')(router);

    return router;
};