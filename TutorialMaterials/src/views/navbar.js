// src/views/navbar.js
import m from 'mithril';
import loginButton from './login-button';

const navbar = {
    view: vnode =>
      m("nav.navbar.navbar-default",
        m(".container-fluid", [
          m(".navbar-header", [
            m("button.navbar-toggle.collapsed", [
              m("span.sr-only",
                "Toggle navigation"
              ),
            ]),
            m("a.navbar-brand",
              "Middle Earth: Shadow of War Game News"
            ),
          ]),
          m(loginButton)
        ])
      )
  }

  export default navbar;