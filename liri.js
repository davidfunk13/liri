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
