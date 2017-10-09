// index.js
var m = require("mithril")
var root = document.body

// This our main landing area
m.render(root, [
    m("main", [
        m("h1", { class: "Header" }, "One App to Rule Them All"),
        m("nav.navbar.navbar-light.bg-faded",
            m("h1.navbar-brand.mb-0",
                "Middle Earth: Shadows of Mordor"
            )
        )
    ])
])


// TODO: Take out cors for final API endpoints
const cors = 'https://cors.now.sh/'
const GameNews = {
    newsList: [],
    error: "Error - something went wrong!",
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
        m("h1", { class: "GameHeader" },
            "Game News"
        ),
        m("ul.list-group",
            m("li.list-group-item", { class: "GameGroup" }, [
                GameNews.newsList.map(n => m('li', n.title))
            ])
        )
    ]
})

// Authorization component with its params
const Authorization = {
    responseType: 'token id_token',
    redirectUri: 'http://localhost:3000/',
    audience: 'http://localhost:3030/api/',
    scope: 'openid profile',
    error: "Error - something went wrong!"
}

//TODO:  Get how Authorization objet will work and fill it in here so it mounts
// This part will get filled in
// m.mount(document.body, {
//             oninit: => Auth0.authorize(),
//             view: () => [
//                 m("p", { class: "Authorization" },
//                     "Authorization info will go here"
//                 )
//             ]

//         }


//Login component
const User = {
    profile: '',
    profileId: ''
}


// This is the user component being rendered into the navbar
// TODO: Make this all render well so it is all in one line and 
// m("ul.nav.navbar-nav.navbar-right",
//     m("li.dropdown", {class: "User"}, [
//         m("a.dropdown-toggle[data-toggle='dropdown'][href='#']", [
//             m("span.glyphicon.glyphicon-user"),
//				m(("img[alt='User profile pic'][src='user_img.jpg']", {style: {"width": "128px", "height": "128px"}}))
//             m("strong",
//                 "Name"
//             ),
//             m("span.glyphicon.glyphicon-chevron-down")
//         ]),
//         m("ul.dropdown-menu", [
//             m("li",
//                 m(".navbar-login",
//                     m(".row", [
//                         m(".col-lg-4",
//                             m("p.text-center",
//                                 m("span.glyphicon.glyphicon-user.icon-size")
//                             )
//                         ),
//                         m(".col-lg-8", [
//                             m("p.text-left",
//                                 m("strong",
//                                     "First Last"
//                                 )
//                             ),
//                             m("p.text-left.small",
//                                 "userEmail@email.com"
//                             ),
//                             m("p.text-left",
//                                 m("a.btn.btn-primary.btn-block.btn-sm[href='#']",
//                                     "Change Settings"
//                                 )
//                             )
//                         ])
//                     ])
//                 )
//             ),
//             m("li.divider"),
//             m("li",
//                 m(".navbar-login.navbar-login-session",
//                     m(".row",
//                         m(".col-lg-12",
//                             m("p",
//                                 m("a.btn.btn-danger.btn-block[href='#']",
//                                     "Logout"
//                                 )
//                             )
//                         )
//                     )
//                 )
//             )
//         ])
//     ])
// )