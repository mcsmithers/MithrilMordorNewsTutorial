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

We will use the [Steam  Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API).  If you don't have a Steam account already, it is free as is the API.  If you already have an account, sign in first.  Once you are logged into an account, you can get a key from [here](https://steamcommunity.com/dev/apikey).


### Scaffolding

Now it is time to get the skeleton parts made. Mithril uses HTML5, so you won't need the `html`, `head`, and `body` tags. The respective DOM elements are still there though implicitly when a browser renders the markup. This keeps with the theme of simplicity in Mithril. When you make a Mithril application, the application lives in a namespace and will contain modules. This is the model part of the MVC framework. Each module will represent a component or a page. In other words, we bind each HTML tag that exists in the DOM to the Mithril so you can get a virtual HTML page without having to actually write HTML. If you have worked with the popular frameworks, then this should feel similar. To demonstrate this, here's the main layout:

js
// index.js
var m = require("mithril")
var root = document.body
var steam = require('steam-web');
m.render(root, [
    m("main", [
        m("h1", { class: "title" }, "One Mithril App to Rule Them All"),
    ])
])


Which gives us this as a result:


{% highlight html %}
{% raw %}

{{<html>
    <head>
        <title>One Mithril App to Rule Them All</title>
    </head>
      <body>
        <script src="bin/app.js"></script>
      </body>
</html>}}

{% endraw %}
{% endhighlight %}


Not bad, eh? Almost time to make this app do cool stuff. You may have noticed the "m" object in the code. That's Mithril being called so it automatically figures out what we are doing. As we add the rest of our app, you will see why this is awesome. Now that we have the landing page ready, it is time to make the app work.  We will want to make a module to store the state of a game's news, so inside `src` directory, make a models directory.  This is where the [components](https://mithril.js.org/components.html) will live.

### Components

Let's now start making this app do something by adding the following code to our file:

``javascript
// This is our component
const GameNews = {
    newsList: [],
    loadList: function() {
        m.request({
                url: 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/',
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
        m('h1', 'Middle Earth: Shadow of War News'),
        m("ul",
            m("li.newsitem", [
                m(".title",
                    "Title"
                ),
                m(".contents",
                    "Contents"
                )
            ])
        )
    ]
})
``

Mithril treats components as objects with view methods. Another thing you can do is to use the `getElementByID` method and then use it to tie into an HTML tag.  If you want to try a nice tool using this approach, Arthur Clemens made a [tool](http://arthurclemens.github.io/mithril-template-converter/index.html) that will turn HTML into Mithril JS.  Now we have the basi structure set up for a list of news items.  We now need to get the data to populate it.

The method from the Steam API we will be using in this app will be the GetNewsForApp one and the app id for the Middle Earth: Shadow of War game is 241930.  We can check it against this [url](http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=5&maxlength=300&format=json) to see that things are correct. Let's do a quick test using [cors](https://cors.now.sh/)  to see what we get with what we have so far:

``javascript
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
})``

Well, it works, but it is ugly and inefficient and then of course we need to do real API calls.
