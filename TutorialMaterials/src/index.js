// index.js
import m from 'mithril';
import gameNewsList from './views/game-news-list';
import navbar from './views/navbar';

const App = {
    view: function(){
        return ('.container',
            m('h1', 'Hello Mithril'),
            m(navbar),
            m(gameNewsList)
        );
    }
};
m.mount(document.body, App);

loadNews();