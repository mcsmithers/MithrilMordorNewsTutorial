//src/viewslogin-button.css
import m from 'mithril';

const loginButton = {
  view: vnode =>
    m("a.btn.btn-secondary.btn-sm.active[href='https://csmithers.auth0.com/login?client=JmtydDtH2tlVjEWBlfl0H2EaY801BjTM']",
      "Login"
    )
}

export default loginButton;