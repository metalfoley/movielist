// app/routes.js

module.exports = function(passport, router) {
// process the signup form
    router.route('/signup')
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile', // redirect to the secure profile section
            failureRedirect: '/signup', // redirect back to the signup page if there is an error
            failureFlash: true // allow flash messages
        }));
};