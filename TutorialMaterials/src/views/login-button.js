//src/viewslogin-button.css
import m from 'mithril';

const loginButton = {
  view: vnode =>
  m("a.btn.btn-secondary.btn-lg.active[href='https://csmithers.auth0.com/login?client=2ecADhMHDzAUsVJIXUJAxeI1wreBxbno']", 
  "Login"
  )
}

export default loginButton;