#Learn MithrilJS with a Morse Code Encoder App
<Mithril LOGO HERE>

##TL;DR:  
This tutorial will  introduce you to [Mithril](https://Mithril.js.org/), a JavaScript framework.  Mithril is a client-side JavaScript framework for building single page applications (SPAs).  Mithril has efficiency in mind.  

We are going to make an app that will translate text to Morse code alphabet and power it with Mithril.  After that, we will use [Auth0](https://auth0.com/) to authenticate with a login.

###Meet Mithril

Mithril is a client-side JavaScript MVC framework created by Leo Horie. Mithril is light and speedy.  It's named after the metal used in armor from J.R.R. Tolkein's Lord of the Rings trilogy.  You will find it used in the Guild Wars 2 game, Nike, and Udemy. 

###Purpose and Features

It's small, fast, and provides routing and XHR (AJAX) out of the box.  The creators describe the framework as "pragmatic."  Mithril shows a [tremendous performance boost](https://Mithril.js.org/framework-comparison.html) compared to VueJS, Angular, and React counterparts.  The Mithril documentation is detailed so that you will feel confident while using the framework.  It also supports browsers back until Internet Explorer 9 with no polyfills required.  What you are left with is code that's easy to read, maintain, and document. 

###Learning Resources

You can check out Mithril on its [Github page](https://github.com/MithrilJS/Mithril.js/) or [website](https://Mithril.js.org/).  The site provides information on how to get set up as well as having a simple Hello world tutorial, documentation, and examples.  You can join the [Gitter group](https://gitter.im/Mithriljs/Mithril.js) to get help or ask about it on Stack Overflow with the Mithril tag.    The GitHub page has examples including one by [Dave Gauer](http://ratfactor.com/Mithril1.html?/shire) which has a thorough, humorous tutorial taking the framework to its Lord of the Rings roots.

##Tutorial

[Morse code](https://en.wikipedia.org/wiki/Morse_code) is the international way to communicate through visual and sound ticks.  We will make an app to explore Mithril hands-on to create Morse code messages from text.  When we have the main app done, we will then add authentication to it with Auth0\.  We will also do styling so that your app is attractive and easy to use.  This tutorial assumes that you have worked with JavaScript before and are agnostic on frameworks for it.

###Setup

We will begin the tutorial by setting up our tools we will be using. Without further ado, let's get started!

###Dependencies

Again, part of Mithril's beauty is that it frees you of a long list of dependencies so this will be brief.  To start with, I will need to have [Node](https://nodejs.org/en/) installed on your system.   If you don't have it already, you can download it from their [website](https://nodejs.org/en/download/).  There are many ways to install Mithril on your system if you prefer [other](https://Mithril.js.org/installation.html) such as with Bower is you prefer that instead. We will use Webpac like the Mithril page does: `npm install Mithril --save`, run `npm install webpack --save` and then `npm init --yes` to generate the `package.json` file.  

<NPM PICTURE HERE>

Using npm, we will use the `npm --install yes`.  Update the package file to call up the script with `"start": "webpack src/index.js bin/app.js -d --watch"` in the scripts.

One of the advantages of Mithril is that it is fairly boilerplate-free.  The reason why is to preserve the tiny size of Mithril so you only use what you need.  You won't be locked into a long list of dependencies which makes everything lighter.  If you want to use a boilerplate, there are several of them listed in the [developer resources](https://github.com/MithrilJS/Mithril.js/wiki/Developer-Tools#starter-kits) on the Github page.  We will keep this tutorial simple as well as with the spirit of Mithril and keep frameworks minimal.  You will need a `src/index.js` file and an `index.html`.  

As developers, we value a good production app and minify things where we can so we will do the same here.  The webpack bundle can be minified so we can make this follow best practices.  Add `"build": "webpack src/index.js bin/app.js -p"` to the packages file in the scripts.

For styling, we will use [Bootstrap](http://getbootstrap.com/).  For this tutorial, I am going to use a CDN.  If you want a local installation, run `npm install bootstrap -g` to make Bootstrap global on your system and then import it in the `index.js` file.

We will use the [Morse Node API](https://github.com/calvindn/morse-node) since it's tiny like Mithril is and easy to use as well as not requiring any dependenncies.  To install it, all you need is to `npm install morse-node`.  Set up the API in your index file `var morse = require('morse-node').create("ITU");`


###Scaffolding

Now it is time to get the skeleton parts made.  Mithril uses HTML5, so you won't need the `html`, `head`, and `body` tags.  The respective DOM elements are still there though implicitly when a browser renders the markup.  This keeps with the theme of simplicity in Mithril.  When you make a Mithril application, the application lives in a namespace and will contain modules.  This is the model part of the MVC framework.  Each module will represent a component or a page.  In other words, we bind each HTML tag that exists in the DOM to the Mithril so you can get a virtual HTML page without having to actually write HTML.  If you have worked with the popular frameworks, then this should feel similar.  To demonstrate this, here's the main layout:

When I do this:
<WHEN I DO THIS JS>

You get this:
<YOU GET THIS HTML>

Which gives us this as a result:
<HELLO Mithril>

Not bad, eh?  Almost time to make this app do cool stuff.  You may have noticed the "m" object in the code.  That's Mithril being called so it automatically figures out what we are doing.  As we add the rest of the components to our app, you will see why this is awesome.  Let's add in a button and change a few things we proceed to the components.  We will want to make a module to store the state of a message, so inside `src` directory, make a models directory.  Inside the directory, create a `Message.js` file and put this code in:

<MESSAGE SKELETON CODE>

###Components

Mithril treats components as objects with view methods. Create a `views` directory nested in the `src` one and then add in a `.js` file.  We will require Mithril in this file, create the code object, and make a function for it so we should end up with this:

<>

In the Message file, we will call it up with `m.mount(root, Message)`.  Mount is how you call your components in Mithril.

















