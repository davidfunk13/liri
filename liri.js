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
        console.log('Heres user davefunk135s tweets:')
        for (var i = 0; i < tweets.length; i++) {
            console.log('Tweet ' + i + ": " + tweets[i].text)
        }
        // console.log(response);
    })
};

//Spotify Functionality
function callSpotify(fileParam = 0) {
    // console.log(fileParam)
    var songName = process.argv[3]
    spotify.search({
        type: 'track',
        query: songName || fileParam
    }).then(function (response) {
        // console.log(response.tracks.items)
        // console.log({'Artists: ' : response.tracks.items[1].album.artists[0].name}, {'Preview Url: ': response.tracks.items[1].preview_url}, {'Song Name: ': response.tracks.items[1].name});
        //artistsloop
        for (var i = 0; i < 5; i++) {
            console.log('Result ' + i + ':')
            console.log(
                {
                    'Artist Name: ': response.tracks.items[i].artists[0].name
                }, 
                {
                    'Preview URL: ': response.tracks.items[i].preview_url
                }, 
                {
                    'Song Name: ': response.tracks.items[i].name
                },
                {
                    'album: ': response.tracks.items[i].album.name
                }
            );
        };
    })
        .catch(function (err) {
            console.log(err);
        });
}

//function for omdb
function callOmdb() {
    var movieName = process.argv[3];
    var omdbQueryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(omdbQueryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200){
            // console.log(JSON.parse(body));
            console.log(
                {
                    'Movie Name: ': JSON.parse(body).Title
                }, 
                {
                    'Release: ': JSON.parse(body).Year
                }, 
                {
                    'IMDB Rating: ': JSON.parse(body).Ratings[0].Value
                },
                {
                    'Rotten Tomatoes: ': JSON.parse(body).Ratings[1].Value
                },
                {
                    'Country of Production: ': JSON.parse(body).Country
                },
                {
                    'Language: ': JSON.parse(body).Language
                },
                {
                    'Plot: ': JSON.parse(body).Plot
                },
                {
                    'Featured Actors: ': JSON.parse(body).Actors
                }
            );
        }
    })

// console.log(omdbQueryUrl);

}

// functionality for fs read

function callTheFile() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log(error);
        }
        // console.log(data);
        var contentArray = data.split(",");
        console.log('It says: ' + contentArray[0] + " " + contentArray[1])
        //Capture Index 2 as Argument
        var fileArg = contentArray[0];
        var fileParam = contentArray[1];
                callSpotify(fileParam);

    })
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
