// app/models/profile.js

var mongoose = require('mongoose');

var profileSchema = mongoose.Schema({

    firstName    : String,
    lastName     : String,
    birthdate    : String,
    userId       : String
});

module.exports = mongoose.model('Profile', profileSchema);