//Require Dotenv
require("dotenv").config();

//Require Keys
var keys = require('./keys.js');
//Reference to Keys
var spotify = new Spotify(keys.spotify);
var twitterClient = new Twitter(keys.twitter);

//Require Twitter
var twitter = require('twitter');
//Require Spotify
var requireSpotify = require('node-spotify-api');

//Capture Index 2 as Argument
var theArg = process.argv[2];

switch (theArg) {
    case 'my-tweets':
        callTwitter();
        break;
    case 'spotify-this-song':
        callSpotify();
        break;
    case 'movie-this':
        callOmdb();
        break;
    case 'do-what-it-says':
        callTheFile();
        break;
}
