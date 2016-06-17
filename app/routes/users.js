// app/routes/auth.js

module.exports = function(passport, router) {

    // process the signup form
    router.route('/signup')

        .post(passport.authenticate('local-signup', {

            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));

    // process the login form
    router.route('/login')

            .post(passport.authenticate('local-login', {

                successRedirect: '/profile', // redirect to the secure profile section
                failureRedirect: '/login', // redirect back to the signup page if there is an error
                failureFlash: true // allow flash messages
            }));

    // Logout the user and clear session data
    router.route('/logout')

        .get(function (req, res) {

            req.logout();
            res.redirect('/');
        });
};