// index.js
var m = require("mithril")
var root = document.body
var morse = require('morse-node').create("ITU");


m.render(root, [
    m("main", [
        m("h1", { class: "Message" }, "Hello Mithril")

    ])
])

m.mount(root, Message)