// index.js
var m = require("mithril")
var root = document.body

// This our main landing area
m.render(root, [
    m("main", [
        m("h1", { class: "Header" }, "One App to Rule Them All")
    ])
])

// This is our component
const cors = 'https://cors.now.sh/'
const GameNews = {
    newsList: [],
    loadList: function() {
        m.request({
                url: cors + 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/',
                data: { appid: 241930, name: "Middle Earth: Shadow of War" }
            })
            .then(function(result) {
                GameNews.newsList = result.appnews.newsitems
            })
            .catch(error => console.log(error.message))
    }
}

m.mount(document.body, {
    oninit: () => GameNews.loadList(),
    view: () => [
        m("ul", [
            GameNews.newsList.map(n => m('ul', n.title)),
            m("li",
                GameNews.newsList.map(n => m('li', n.contents))
            )
        ])
    ]
})