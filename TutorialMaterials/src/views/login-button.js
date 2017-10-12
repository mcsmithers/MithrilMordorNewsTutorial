//src/viewslogin-button.css
import m from 'mithril';

const loginButton = {
  view: vnode =>
  m("a.btn.btn-secondary.btn-lg.active[aria-pressed='true'][href='https://csmithers.auth0.com/login?client=2ecADhMHDzAUsVJIXUJAxeI1wreBxbno'][role='button']", 
  "Login"
  )
}



export default loginButton;