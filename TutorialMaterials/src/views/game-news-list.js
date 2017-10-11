// src/views/game-news-list.js
import m from 'mithril';
import navbar from './navbar';
import {news} from './news';

const gameNewsList = {
    view() {
        return m(".game-news-list",
            m(navbar),
            m(".container-fluid",
                m("img[alt='Game art'][src='http://cdn.wccftech.com/wp-content/uploads/2017/02/Middle-Earth-Shadow-of-War-Art.png']")
            ),
            news() && news().length > 0 ?
            news().map(
                newsItem => m(".newsItem", newsItem.title)
            ) :
            m(".loading", "Loading game news list...")
        );
    }
};

export default gameNewsList;