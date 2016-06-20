// app/models/movie.js

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var movieSchema = new Schema({
    name: String,
    director: String,
    yearReleased: Number,
    rating: { type: Number, max: 5},
    lastUpdated: String
});

module.exports = mongoose.model('Movie', movieSchema);