# Learn MithrilJS: Build a Game News App with Authentication
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

Again, part of Mithril's beauty is that it frees you of a long list of dependencies so this will be brief. To start with, I will need to have [Node](https://nodejs.org/en/) installed on your system.   If you don't have it already, you can download it from their [website](https://nodejs.org/en/download/).  There are many ways to install Mithril on your system if you prefer [other](https://Mithril.js.org/installation.html) such as with Bower is you prefer that instead. We will use Webpack like the Mithril page does: `npm install mithril --save`, run `npm install webpack --save` and then `npm init --yes` to generate the `package.json` file. We will be using es6 syntax, so if you don't have [Babel](https://babeljs.io/blog/2015/10/31/setting-up-babel-6) set up you will want to do so.

Using npm, we will use the `npm --install yes`. Update the package file to call up the script with `"start": "webpack src/index.js bin/app.js -d --watch"` in the scripts.

One of the advantages of Mithril is that it is fairly boilerplate-free. The reason why is to preserve the tiny size of Mithril so you only use what you need. You won't be locked into a long list of dependencies which makes everything lighter. If you want to use a boilerplate, there are several of them listed in the [developer resources](https://github.com/MithrilJS/Mithril.js/wiki/Developer-Tools#starter-kits) on the Github page. We will keep this tutorial simple as well as with the spirit of Mithril and keep frameworks minimal. You will need a `src/index.js` file and an `index.html`. 

As developers, we value a good production app and minify things where we can so we will do the same here. The webpack bundle can be minified so we can make this follow best practices. Add `"build": "webpack src/index.js bin/app.js -p"` to the packages file in the scripts.

For styling, we will use [Bootstrap](http://getbootstrap.com/). For this tutorial, I am going to use a CDN. If you want a local installation, run `npm install bootstrap -g` to make Bootstrap global on your system and then import it in the `index.js` file.

We will use the [Steam  Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API).  If you don't have a Steam account already, it is free as is the API.  If you already have an account, sign in first.  Once you are logged into an account, you can get a key from [here](https://steamcommunity.com/dev/apikey).


### Scaffolding

Now it is time to get the skeleton parts made. Mithril uses HTML5, so you won't need the `html`, `head`, and `body` tags. The respective DOM elements are still there though implicitly when a browser renders the markup. This keeps with the theme of simplicity in Mithril. When you make a Mithril application, the application lives in a namespace and will contain modules. This is the model part of the MVC framework. Each module will represent a component or a page. In other words, we bind each HTML tag that exists in the DOM to the Mithril so you can get a virtual HTML page without having to actually write HTML. If you have worked with the popular frameworks, then this should feel similar. To demonstrate this, here's the main layout:

```javascript
// index.js
import m from 'mithril';

const App = {
    view: function() {
        return ('.container',
            m('h1', 'Hello Mithril'),
            m(gameNewsList)
        );
    }
};
m.mount(document.body, App);
```

Which gives us this as a result:


{% highlight html %}
{% raw %}

{{<html>
	<head>
	    <title>Hello Mithril</title>
	</head>
	  <body>
	    <script src="bin/app.js"></script>
	  </body>
</html>}}

{% endraw %}
{% endhighlight %}


Not bad, eh? Almost time to make this app do cool stuff. You may have noticed the "m" object in the code. That's Mithril being called so it automatically figures out what we are doing. As we add the rest of our app, you will see why this is awesome. Now that we have the landing page ready, it is time to make the app work.  We will want to make a module to store the state of a game's news, so inside `src` directory, make a models directory.  This is where the [components](https://mithril.js.org/components.html) will live.

### Components

Let's now start making this app do something by adding a file named `game-news-list.js` that contains:

```javascript
// src/views/game-news-list.js
import m from 'mithril';
import { news } from './news';

const gameNewsList = {
    view() {
        return m(".game-news-list",
            m("h1", "List of Game News"),
            m("img[alt='Game art'][src='http://cdn.wccftech.com/wp-content/uploads/2017/02/Middle-Earth-Shadow-of-War-Art.png']", {style: {"width": "258px", "height": "228px"}}),
            news() && news().length > 0 ?
            news().map(
                newsItem => m(".newsItem", newsItem.title)
            ) :
            m(".loading", "Loading game news list...")
        );
    }
};

export default gameNewsList;
```

Mithril treats components as objects with view methods. Another thing you can do is to use the `getElementByID` method and then use it to tie into an HTML tag.  If you want to try a nice tool using this approach, Arthur Clemens made a [tool](http://arthurclemens.github.io/mithril-template-converter/index.html) that will turn HTML into Mithril JS.  Now we have the basic structure set up for a list of news items.  We now need to get the data to populate it.

We will also want to be able to handle the state of our game news list changing at unpredictable times when someone publishes an article about it.  

Let's create a file called `news.js`:

```javascript
//src/views/news.js
import m from 'mithril';
import stream from 'mithril/stream';

export const news = stream([]);

var News = {
    oninit: function(vnode) {
        this.data = vnode.attrs.data
        m.request({ url: 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=3&maxlength=300&format=json' }).then(data => {
            this.data = data
        })
    },
    view: function() {
        return m("li", this.data)
    }
}

m(News, { data: this.data })
```

It's looking better already.  The method from the Steam API we will be using in this app will be the GetNewsForApp one and the app id for the Middle Earth: Shadow of War is 241930.  We can check it against this [url](http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=5&maxlength=300&format=json) to see that things are correct. 


### Styling
Now that we have what we need from Steam, it's time to make this look nicer and become responsive.  

This app can really use a nav bar where the header is.  Delette the header from the `game-news-list.js` file since we are going to make this a navbar instead.  Let's take care of the navbar component:

```javascript
// src/views/navbar.js
import m from 'mithril';

const navbar = {
    view: vnode =>
      m("nav.navbar.navbar-default",
        m(".container-fluid", [
          m(".navbar-header", [
            m("button.navbar-toggle.collapsed[aria-controls='navbar'][aria-expanded='false'][data-target='#navbar'][data-toggle='collapse'][type='button']", [
              m("span.sr-only",
                "Toggle navigation"
              ),
              m("span.icon-bar"),
              m("span.icon-bar"),
              m("span.icon-bar")
            ]),
            m("a.navbar-brand[href='#']",
              "Middle Earth: Shadow of War Game News"
            ),
          ]),
          m(".navbar-collapse.collapse[id='navbar']", [
            m("ul.nav.navbar-nav", [
              m("li.active",
                m("a[href='#']",
                  "User"
                )
              )
            ])
          ])
        ])
      )
  }
  
  m.mount(document.body, {
    view: () => [
      m(navbar),
      m('h1', 'Some other content')
    ]
  })
  export default navbar;

```

Import the navbar component and call it up with `m(navbar)` in `game-news-list.js` and `index.js` inside the `view` function.  It is starting to look appealing, but we should change the styling some more to give it a modern look (and maybe a touch of Mordor).  The header became a navbar, so let's add an indigo palette from the [Google Material Design guidelines](https://material.io/guidelines/style/color.html#color-color-palette).  We can also make some elements have a little padding so the page looks nicer.

```css
body {
   background-color: #E8EAF6; 
}

img {
    padding: 15px 15px;
}

.container-fluid {
    background-color: #3F51B5;
    color: #E8EAF6;
}

.container-fluid {
}

.navbar-brand {
    color: #E8EAF6;
}

.loading {
    padding: 15px 15px 15px 15px;
    background-color: #E8EAF6;
}

.navbar-default, .navbar-brand {
    background-color: #3F51B5;
}

.navbar>.container-fluid .navbar-brand {
    margin-left: -15px;
    color: #E8EAF6;
}

.navbar-collapse.collapse{
    background-color: #3F51B5;
}
```


### Authentication

The final parts of our work will be to add authentication. This will help with authentication for secured endpoints.  

Let's go the the [Auth0 dashboard](https://manage.auth0.com/#/) to begin. We want to start by setting up the client.

1. Click on the client menu part of the dashboard and you will want to choose the single page web applications option.  YOu will also have to name the application.  After you choose the single page option, click on "Create".

2. You will be prompted to choose a technology, so choose "JavaScript".  Mithril isn't on there right now, but since it uses pure JavaScript, it will process well.

3. The next thing that needs to be set are the callback parameters.  `http://localhost:3000` is what you will want to put into the Allowed Callback URLs.  The same goes for the Allowed Origins.

4. Since we are going to be dealing with JSON, we will need to then use a JsonWebToken Algorithm.  To do this, scroll to the bottom of your settings to get to the advanced settings.  Select the OAuth tab and then verify that the algorithm is set to `RS256`.  If not, click on the dropdown and select R256. 
 
5. If you want to use a social connection such as your GitHub account, you can do that on the left at the connctions menu and toggle the connections you would like to use.

6. Now we will need to set up an API.  On the upper right-hand corner where your account icon is, click on the menu arrow and select Settings. You can fill in your company information and then the API authorization settings.  Click Save so your changes are kept.

7. Go back to the left menu and click on the "Create API" button. Enter a name for the API. Set the Identifier to your API endpoint URL. You can use something like `localhost:3030/api/`. The Signing Algorithm should be RS256 as we set earlier.  Please note that you are advised to set up protection for your Node API.  The routes we have set don't have protection yet, so you can keep everything secure by making an Authorization header.  You can view how to do this by checking out the Node example on the [Quick Start](https://auth0.com/docs/quickstart/backend/nodejs).

It's time to head back into into our work and add the authentication logic.  Install [auth0-js] (https://github.com/auth0/auth0.js) with the `npm install auth0-js --save` command.

Let's dive into our `index.js` file we have been working with and get the logic set up into two components.  Start out by importing Auth0: `import auth0 from 'auth0-js';`.


Now let's create a new component for a login.
