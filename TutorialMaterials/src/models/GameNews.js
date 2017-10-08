// src/models/GameNews.js
var m = require("mithril")
var steam = require('steam-web');


var steamApi = new steam({
    apiKey: 'yourApiKeyHere',
    format: 'json'
});

var GameNews = {
        newsList: [],
        loadList: function() {
            // TODO: return with Mithril now that Steam wrapper has this info into list
            return steamApi.getNewsForApp({
                    appid: 440,
                    count: 3,
                    maxlength: 300,
                    callback: function(err, data) {
                        console.log(data);
                    })
                .then(function(result) {
                    GameNews.newsList = result.data
                })
            },
        }