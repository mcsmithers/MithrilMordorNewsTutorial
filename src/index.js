// index.js
var m = require("mithril")
var root = document.body
var morse = require('morse-node').create("ITU");


m.render(root, [
    m("main", [
        m("h1", { class: "title" }, "Hello Mithril"),
        m("button", "Magic Button"),

    ])
])

m.mount(root, Message)