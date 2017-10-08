# Learn MithrilJS with a game News App
![Mithril logo](https://mithril.js.org/logo.svg "Mithril Logo")


## TL;DR:  
This tutorial will  introduce you to [Mithril](https://Mithril.js.org/), a JavaScript framework.  Mithril is a client-side JavaScript framework for building single page applications (SPAs).  Mithril has efficiency in mind.  

We are going to make an app that will retrieve news of a game using the [Valve Steam API](https://developer.valvesoftware.com/wiki/Steam_Web_API).  After that, we will use [Auth0](https://auth0.com/) to authenticate with a login.

### Meet Mithril 

Mithril is a client-side JavaScript MVC framework created by Leo Horie. Mithril is light and speedy.  It's named after the metal used in armor from J.R.R. Tolkein's Lord of the Rings trilogy.  You will find it used in the Guild Wars 2 game, Nike, and Udemy. 

### Purpose and Features

It's small, fast, and provides routing and XHR (AJAX) out of the box.  The creators describe the framework as "pragmatic."  Mithril shows a [tremendous performance boost](https://Mithril.js.org/framework-comparison.html) compared to VueJS, Angular, and React counterparts.  The Mithril documentation is detailed so that you will feel confident while using the framework.  It also supports browsers back until Internet Explorer 9 with no polyfills required. What you are left with is code that's easy to read, maintain, and document. 

### Learning Resources

You can check out Mithril on its [Github page](https://github.com/MithrilJS/Mithril.js/) or [website](https://Mithril.js.org/).  The site provides information on how to get set up as well as having a simple Hello world tutorial, documentation, and examples.  You can join the [Gitter group](https://gitter.im/Mithriljs/Mithril.js) to get help or ask about it on Stack Overflow with the Mithril tag. The GitHub page has examples including one by [Dave Gauer](http://ratfactor.com/Mithril1.html?/shire) which has a thorough, humorous tutorial taking the framework to its Lord of the Rings roots.

## Tutorial

The [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API) is a way to get information on other games, players, updates, and more.  We will make an app to explore Mithril hands-on to create something that will tell us news on the new Middle Earth: Shadow of War game.  When we have the main app done, we will then add authentication to it with Auth0.  We will also do styling so that your app is attractive and easy to use.  This tutorial assumes that you have worked with JavaScript before and are agnostic or don't use frameworks for it.

### Setup

We will begin the tutorial by setting up our tools we will be using. Without further ado, let's get started!

### Dependencies

Again, part of Mithril's beauty is that it frees you of a long list of dependencies so this will be brief. To start with, I will need to have [Node](https://nodejs.org/en/) installed on your system.   If you don't have it already, you can download it from their [website](https://nodejs.org/en/download/).  There are many ways to install Mithril on your system if you prefer [other](https://Mithril.js.org/installation.html) such as with Bower is you prefer that instead. We will use Webpack like the Mithril page does: `npm install mithril --save`, run `npm install webpack --save` and then `npm init --yes` to generate the `package.json` file. 

Using npm, we will use the `npm --install yes`. Update the package file to call up the script with `"start": "webpack src/index.js bin/app.js -d --watch"` in the scripts.

One of the advantages of Mithril is that it is fairly boilerplate-free. The reason why is to preserve the tiny size of Mithril so you only use what you need. You won't be locked into a long list of dependencies which makes everything lighter. If you want to use a boilerplate, there are several of them listed in the [developer resources](https://github.com/MithrilJS/Mithril.js/wiki/Developer-Tools#starter-kits) on the Github page. We will keep this tutorial simple as well as with the spirit of Mithril and keep frameworks minimal. You will need a `src/index.js` file and an `index.html`. 

As developers, we value a good production app and minify things where we can so we will do the same here. The webpack bundle can be minified so we can make this follow best practices. Add `"build": "webpack src/index.js bin/app.js -p"` to the packages file in the scripts.

For styling, we will use [Bootstrap](http://getbootstrap.com/). For this tutorial, I am going to use a CDN. If you want a local installation, run `npm install bootstrap -g` to make Bootstrap global on your system and then import it in the `index.js` file.

We will use the [Steam  Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API).  If you don't have a Steam account already, it is free as is the API.  If you already have an account, sign in first.  Once you are logged into an account, you can get a key from [here](https://steamcommunity.com/dev/apikey).  To keep things simple, we will then use a Node wrapper for the Steam API.  To get this, `npm install steam-web` is all you need.


### Scaffolding

Now it is time to get the skeleton parts made. Mithril uses HTML5, so you won't need the `html`, `head`, and `body` tags. The respective DOM elements are still there though implicitly when a browser renders the markup. This keeps with the theme of simplicity in Mithril. When you make a Mithril application, the application lives in a namespace and will contain modules. This is the model part of the MVC framework. Each module will represent a component or a page. In other words, we bind each HTML tag that exists in the DOM to the Mithril so you can get a virtual HTML page without having to actually write HTML. If you have worked with the popular frameworks, then this should feel similar. To demonstrate this, here's the main layout:

``javascript
// index.js
var m = require("mithril")
var root = document.body
var steam = require('steam-web');
m.render(root, [
    m("main", [
        m("h1", { class: "title" }, "One Mithril App to Rule Them All"),
    ])
])``


Which gives us this as a result:

<html>
	<head>
	    <title>One Mithril App to Rule Them All</title>
	</head>
	  <body>
	    <script src="bin/app.js"></script>
	  </body>
</html>


Not bad, eh? Almost time to make this app do cool stuff. You may have noticed the "m" object in the code. That's Mithril being called so it automatically figures out what we are doing. As we add the rest of our app, you will see why this is awesome. Now that we have the landing page ready, it is time to make the app work.  We will want to make a module to store the state of a game's news, so inside `src` directory, make a models directory.  This is where the [components](https://mithril.js.org/components.html) will live.

### Components

Let's add in a button and change a few things. Inside the directory, create a `GameNews.js` file and put this code in:

``javascript
// src/models/GameNews.js
var m = require("mithril")
var steam = require('steam-web');
var GameNews = {
    list: [],
    loadList: function() {
        return m.request({
            method: "GetNewsForApp",
            url: "http://api.steampowered.com/ISteamNews/",
            withCredentials: true,
            format: json,
            count: 5
        })
        .then(function(result) {
            GameNews.list = result.data
        })
    },
}
module.exports = GameNews``


Mithril treats components as objects with view methods. Create a `views` directory nested in the `src` one and then add in a `.js` file. In the `index.js` file, we will call the Message component.  In the `GameNews.js` file, we will code in `m.mount(root, GameNews)`. Mount is how you call your components in Mithril. If you haven't used a JavaScript framework before, this framework will save you from coding objects over and over again by making them into reusable templates.  Components also keep things organized which is great for project maintenance.  

The method we will be using in this app will be the GetNewsForApp one and the app id for the Middle Earth: Shadow of War game is 241930.  The default output will be json and let's limit the new to three for now with a maximal length of 300.  We can check it against this [url](http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=5&maxlength=300&format=json) t see that things are correct.
