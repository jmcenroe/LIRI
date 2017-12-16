# LIRI

Similar to iPhone's Speech Interpretation and Recognition Interface (SIRI), LIRI  is a _Language_ Interpretation and Recognition Interface. It takes in commands through the command line in node to take in parameters and return data based on one of four commands:

  * `my-tweets`

  * `spotify-this-song`

  * `movie-this`

  * `do-what-it-says`

## Getting Started

- Clone repo.
- Run command 'npm install' in Terminal or GitBash
- Run command 'node liri.js' or one of the commands below.

## What Each Command Does

1. `node liri.js my-tweets`

  * Displays my last 20 tweets and when they were created in terminal/bash window

2. `node liri.js spotify-this-song <song name>`

  * Shows the following information about the song in terminal/bash window
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from

  * Or if no song is passed through, it will default to
    *"The Sign" by Ace of Base

3. `node liri.js movie-this <movie name>`

  * Shows the following information in terminal/bash

    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie

  * Or if no movie is passed through, it will default to "Mr. Nobody"

4. `node liri.js do-what-it-says`

  * Takes the text from random.txt and runs the song through spotify-this-song command

## Tech used
- Node.js
- Twitter NPM Package - https://www.npmjs.com/package/twitter
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request

## Prerequisites
```
- Node.js - Download the latest version of Node https://nodejs.org/en/
```