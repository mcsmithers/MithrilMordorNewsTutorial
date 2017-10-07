// src/views/Message.js
var m = require("mithril")
var Message = require("../models/Message")

module.exports = {
    view: function() {
         return m("main", [
            m("h1", {class: "title"}, "Mithril Morse Code"),
            // Button does stuff
            m("Magic Button", {
            	onclick: function() {
            	//le Code
            }}),
        ])
    }
}
}