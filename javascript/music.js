var search;

$('#searchButton').on('click', function () {
    search = $('#songsearch').val();
    console.log(search);
    var queryurl = 'https://api.musixmatch.com/ws/1.1/track.search?q=' + search + '&apikey=97e346e9b545a7dab54fae058f0f85cc';
    //var queryurl = 'https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it';

    $.ajax({
        url: queryurl,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response);
        })

    /*var searchAlbums = function (query) {
        $.ajax({
            method: 'GET',
            url: 'https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp',
            data: {
                q: 'artist:' + query,
                type: 'album',
                market: 'US'
            },
            success: function (response) {
                resultsPlaceholder.innerHTML = template(response);
            }
        });
    };

    searchAlbums('adele'); */

    /*unirest.get("https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/artist.search?s_artist_rating=desc&q_artist=coldplay&page=1&page_size=5")
        .header("X-RapidAPI-Host", "musixmatchcom-musixmatch.p.rapidapi.com")
        .header("X-RapidAPI-Key", " d22a43378cmsh0ee003e995f5450p165404jsnc21c3c10458c")
        .end(function (result) {
            console.log(result.status, result.headers, result.body);
        }); */

    /*var MusixmatchApi = require('../../build/javascript-client/src/index')
    var defaultClient = MusixmatchApi.ApiClient.instance;
    var key = defaultClient.authentications['key'];
    key.apiKey = "97e346e9b545a7dab54fae058f0f85cc"; // {String}
    var opts = {
        format: "json", // {String} output format: json, jsonp, xml.
    };
    trackId = 15445219; // {number}
    (new MusixmatchApi.TrackApi()).trackGetGet(trackId, opts, (error, data, response) => {
        if (error) {
            console.error(error);
        } else if (response.text) {
            data = JSON.parse(response.text);
            console.log('Returned data:\n%s', JSON.stringify(data, null, 2));
        }
        else {
            throw new Error('bad response')
        }
    });*/
})




$('.play').on('click', function () {

})

$('.heart').on('click', function () {

})

//Search results, limit to 10
//user chooses the proper track
//track displays in song section
//get lyrics using matcher.lyrics.get
//use chart.artists.get for top 5 artists



