//src/viewslogin-button.css
import m from 'mithril';

const loginButton = {
  view: vnode =>
    m("button.btn.btn-primary-outline[type='button']",
      "Login"
    )
}

m.mount(document.body, {
  view: () => [
    m(loginButton)
  ]
})

export default loginButton;