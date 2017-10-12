//src/viewslogin-button.css
import m from 'mithril';

const loginButton = {
  view: vnode =>
    m("a.btn.btn-secondary.btn-sm.active[href='your auth0 url']",
      "Login"
    )
}

export default loginButton;