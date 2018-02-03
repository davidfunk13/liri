//Require Dotenv
require("dotenv").config();
//Require Twitter
var twitter = require('twitter');
//Require Keys
var keys = require('./keys.js');
//Reference to Keys
// var spotify = new Spotify(keys.spotify);
var twitterClient = new twitter(keys.twitter);

//Require Spotify
var requireSpotify = require('node-spotify-api');

//Capture Index 2 as Argument
var theArg = process.argv[2];

//Twitter Function
function callTwitter() {
    twitterClient.get('statuses/user_timeline', {screen_name: 'davefunk135'}, function (error, tweets, response) {
        if (error) {
            console.log('there was an error getting tweets');
            console.log(error);
        }
        console.log(tweets);
        console.log(response);
    } )
};

//Switch Case Scenarios for theArg
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
