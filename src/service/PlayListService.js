const SpotifyConstant = require("../constants/SpotifyConstant")

module.exports.recomendationGenreMusic = (temp) => {
    const  {
        SPOTIFY_GENRE_SEED_CLASSIC_MUSIC,
        SPOTIFY_GENRE_SEED_PARTY,
        SPOTIFY_GENRE_SEED_ROCK,
        SPOTIFY_GENRE_SEED_POP,
        SPOTIFY_GENRES_MIXIN
    } = SpotifyConstant

    // If not exist temperature then use mixin music
    if (!temp) return SPOTIFY_GENRES_MIXIN

    //If temperature (celcius) is above 30 degrees, suggest tracks for party
    if (temp > 30) {
        return SPOTIFY_GENRE_SEED_PARTY
        //In case temperature is between 15 and 30 degrees, suggest pop music tracks
    } else if (temp >= 15 && temp <= 30) {
        return SPOTIFY_GENRE_SEED_POP
        //If it's a bit chilly (between 10 and 14 degrees), suggest rock music tracks
    } else if (temp >= 10 && temp <= 14) {
        return SPOTIFY_GENRE_SEED_ROCK
        //Otherwise, if it's freezing outside, suggests classical music tracks
    } else {
        return SPOTIFY_GENRE_SEED_CLASSIC_MUSIC
    }
}