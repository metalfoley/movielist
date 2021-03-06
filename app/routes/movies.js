module.exports = function (router) {

    var path     = require('path');
    var Movie    = require(path.join(__dirname, '../models/movie'));
    var moment   = require('moment');

// more routes for our API will happen here
    router.route('/movies')

        // create a bear (accessed at POST http://localhost:8080/api/bears)
        .post(function (req, res) {

            var movie = new Movie();      // create a new instance of the Bear model
            movie.name = req.body.name;  // set the bears name (comes from the request)
            movie.director = req.body.director;
            movie.yearReleased = req.body.yearReleased;
            movie.rating = req.body.rating;
            movie.lastUpdated = moment().format('LLLL');

            // save the bear and check for errors
            movie.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Movie created with title: ' + movie.name});
            });

        })

        // get all the bears (accessed at GET http://localhost:8080/api/bears)
        .get(function (req, res) {
            Movie.find(function (err, movies) {
                if (err)
                    res.send(err);

                res.json(movies);
            });
        });

    router.route('/movies/:movie_id')

        // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
        .get(function (req, res) {
            Movie.findById(req.params.movie_id, function (err, movie) {
                if (err)
                    res.send(err);
                res.json(movie);
            });
        })

        .put(function (req, res) {

            // use our bear model to find the bear we want
            Movie.findById(req.params.movie_id, function (err, movie) {

                if (err)
                    res.send(err);

                movie.name = req.body.name || movie.name;  // update the bears info
                movie.director = req.body.director || movie.director;
                movie.yearReleased = req.body.yearReleased || movie.yearReleased;
                movie.rating = req.body.rating || movie.rating;
                movie.lastUpdated = moment().format('LLLL');

                // save the bear
                movie.save(function (err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Movie updated!'});
                });

            });
        })

        .delete(function (req, res) {
            Movie.remove({
                _id: req.params.movie_id
            }, function (err, movie) {
                if (err)
                    res.send(err);

                res.json({message: 'Successfully deleted'});
            });
        });

};