module.exports = function (router) {

    var path     = require('path');
    var Profile  = require(path.join(__dirname, '../models/profile'));
    var moment   = require('moment');

    router.route('/profile')

        // create a profile (accessed at POST http://localhost:8080/api/profile)
        .post(function (req, res) {

            var profile = new Profile();
            profile.firstName = req.body.firstName;
            profile.lastName  = req.body.lastName;
            profile.birthDate = moment().format('LLLL');
            profile.userId    = req.session.passport.user;

            // save the bear and check for errors
            profile.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Profile created for: ' + profile.firstName});
            });

        })

        .get(function (req, res) {
            Profile.findById(req.session.passport.user, function (err, profile) {
                if (err)
                    res.send(err);
                res.json(profile);
            });
        });

    router.route('/profile/:profile_id')

        .put(function (req, res) {

            Profile.findById(req.params.profile_id, function (err, profile) {

                if (err)
                    res.send(err);

                profile.firstName = req.body.firstName || profile.firstName;
                profile.lastName = req.body.lastName || profile.lastName;
                profile.birthDate = req.body.birthDate || profile.birthDate;

                // save the profile
                profile.save(function (err) {

                    if (err)
                        res.send(err);

                    res.json({message: 'Profile updated!'});
                });
            });
        })
};