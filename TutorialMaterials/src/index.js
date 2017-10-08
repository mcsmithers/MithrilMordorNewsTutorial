// index.js
var m = require("mithril")
var steam = require('steam-web');
var root = document.body

m.render(root, [
    m("main", [
        m("h1", { class: "Header" }, "One App to Rule Them All")
    ]),

    //Game News will show up here
    m("ul.nav", [
        m("li", links.map(function(link) {
            return m("a", {href: link.url, config: m.route}, link.title)
        }))
    ])
])