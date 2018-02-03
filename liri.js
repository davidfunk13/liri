//Require Dotenv
require("dotenv").config();

// Require Request
var request = require('request');

//Require File System
var fs = require('fs');

//Require Twitter
var twitter = require('twitter');

//Require Spotify
var requireSpotify = require('node-spotify-api');

//Require Keys
var keys = require('./keys.js');

//Reference to Keys
var spotify = new requireSpotify(keys.spotify);
var twitterClient = new twitter(keys.twitter);

//Capture Index 2 as Argument
var theArg = process.argv[2];

//Twitter Function
function callTwitter() {
    twitterClient.get('statuses/user_timeline', {
        screen_name: 'davefunk135'
    }, function (error, tweets, response) {
        if (error) {
            console.log('there was an error getting tweets');
            console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log('Heres user davefunk135s tweets:')
            console.log(tweets[i].text)
        }
        // console.log(response);
    })
};

//Spotify Functionality
function callSpotify() {
    var songName = process.argv[3]
    spotify.search({
            type: 'track',
            query: songName
        }).then(function (response) {
            // console.log(response.tracks.items)
            // console.log({'Artists: ' : response.tracks.items[1].album.artists[0].name}, {'Preview Url: ': response.tracks.items[1].preview_url}, {'Song Name: ': response.tracks.items[1].name});
            //artistsloop
            for (var i = 0; i < 5; i++) {
                console.log('yoyo' + i)
                console.log(
                    {
                    'Artist Name: ': response.tracks.items[i].artists[0].name
                }
                , {
                    'Preview URL: ': response.tracks.items[i].preview_url
                }, {
                    'Song Name: ': response.tracks.items[i].name
                },
            {
                'album: ' : response.tracks.items[i].album.name
            }
            );
            };
        })
        .catch(function (err) {
            console.log(err);
        });
}

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
