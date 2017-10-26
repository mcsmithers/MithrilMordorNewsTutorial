// //src/viewslogin-button.css
import m from 'mithril';
import auth0 from 'auth0-js';


const webAuth = {
  setclientId: function (value) {
    webAuth.client_id = value
  },
  setDomain: function (value) {
    webAuth.Domain = value
  },
  logout: function () {
   webAuth.token(false);
    delete localStorage.token;
  },

  login: function (value) {
    return m.request({
        method: 'POST',
        url: 'https://csmithers.auth0.com/login?client=JmtydDtH2tlVjEWBlfl0H2EaY801BjTM',
        data: {
          email: email,
          password: password
        },
        unwrapSuccess: function (res) {
          localStorage.token = res.token;
          return res.token;
        }
      })
      .then(webAuth.token);
  },
}

  const loginButton = {
    view: function () {
      return m("a.btn.btn-secondary.btn-sm.active[type=button]", {
          oninput: m.withAttr("value", webAuth.client_id),
          value: webAuth.domain
        }),
        m("button[type=button]", {
          onclick: webAuth.login
        }, "Login")
    }
  }

m.route(document.body, "/secret", {
      "/secret": {
        onmatch: function () {
          if (!isLoggedIn) m.route.set("/login")
          else return Home
        }
      },
      "/login": Login
    }

    export default loginButton;