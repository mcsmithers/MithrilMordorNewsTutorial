// src/views/navbar.js
import m from 'mithril';
import loginButton from './login-button'

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
          m(loginButton)
        ])
      ]),
    )
}

m.mount(document.body, {
  view: () => [
    m(navbar)
  ]
})
export default navbar;