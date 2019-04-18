var search;

$('#searchButton').on('click', function () {
    search = $('#songsearch').val().trim();
    $('#results').text('Sorry there was an error!');
    if (search == '') {
        $('#results').text('Please enter a song name and/or artist.');

    }
    console.log(search);
    //var queryurl = 'https://api.musixmatch.com/ws/1.1/track.search?q=' + search + '&apikey=97e346e9b545a7dab54fae058f0f85cc';
    //var queryurl = 'https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=3&country=it';
    //var queryurl = 'https://api.musixmatch.com/ws/1.1/matcher.track.get?q_track=eminem' + '&apikey=97e346e9b545a7dab54fae058f0f85cc';
    //var queryurl = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao' + '&apikey=97e346e9b545a7dab54fae058f0f85cc';
    var queryurl = 'https://api.napster.com/v2.2/search?query=' + search + '&type=track&apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&per_type_limit=10';
    $.ajax({
        url: queryurl,
        method: 'GET'
    })
        .then(function (response) {
            console.log(response);
            $('#results').empty();
            response.search.data.tracks.forEach(function (currentValue) {

                var artist = currentValue.artistName;
                var song = currentValue.name;
                var album = currentValue.albumName;
                var songurl = currentValue.previewURL;
                $('#results').append('<div class="selectsong" data-song="' + song + '" data-artist="' + artist + '" data-songurl="'+songurl+'">' + song + ' - ' + artist + ', Album: ' + album + '</div>');

            })
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

$('body').on('click', '.selectsong', function () {
    $('#songTitle').text(this.dataset.song);
    //console.log(this.dataset.song);
    $('#artist').text(this.dataset.artist);
    console.log(this.dataset.songurl);
    $('#mainsong').attr('data-song', this.dataset.songurl);
    var queryurl = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=' + this.dataset.song + '&q_artist=' + this.dataset.artist + '&apikey=97e346e9b545a7dab54fae058f0f85cc';
    $.ajax({
        url: queryurl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        var lyrics = response.message.body.lyrics.lyrics_body;
        lyrics = lyrics.replace(/\r?\n/g, "<br />");
        console.log(lyrics);
        if (lyrics != '') {
            $('#lyrics').html(lyrics);
        }
        else{
            $('#lyrics').html('Sorry no lyrics were found!');
        }

    })
})
//&#8629 the return character
// \r\n characters

$('.play').on('click', function () {

})

$('.heart').on('click', function () {

})

//load top 5 songs of US
$.ajax({
    url: 'https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=us&apikey=97e346e9b545a7dab54fae058f0f85cc',
    method: 'GET'
}).then(function(response){
    console.log(response);
    response.message.body.track_list.forEach(function(currentValue, index){
        var artist = currentValue.track.artist_name;
        var song = currentValue.track.track_name;
        console.log(song);
        $('#song'+(index+1)).text(song);
        $('#artist'+(index+1)).text(artist);

    });
})

function playSong(songurl){
    $('#player').attr('src', songurl);
    $('#player')[0].play();
}

$('.playbtn').on('click', function(){
    playSong(this.dataset.song);
})

//search using napster api query type track /done
//display 10 results and user selects one /done
//use musicxmatch matcher.lyrics.get to get the lyrics /done
// use mxm chart.artists.get to get the top 5 songs
//save username, password, and favorites to firebase




