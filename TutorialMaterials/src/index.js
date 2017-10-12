// index.js
import m from 'mithril';
import gameNewsList from './views/game-news-list';
import navbar from './views/navbar';
import loginButton from './views/login-button';

const App = {
    view: function () {
        return ('.container',
            m('h1', 'Hello Mithril'),
            m(navbar),
            m(loginButton),
            m(gameNewsList)
        );
    }
};
m.mount(document.body, App);

loadNews();