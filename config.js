// config.js
var env        = require('./env.js');

module.exports = {

    port: 7500,
    db :{
        'url' : 'mongodb://localhost:27017/movieList'
    },
    secret : env.SECRET_SESSION
};