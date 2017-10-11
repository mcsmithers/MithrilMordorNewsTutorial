// src/views/game-news-list.js
import m from 'mithril';
import navbar from './navbar';
import { 
    news
} from './news';

const url = 'https://cors.now.sh/http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=3&maxlength=300&format=json';

const gameNewsList = {
    oninit() {
        m.request(url).then(data => {
            this.data = data;
            console.log(this.data);
        });
    },
    view() {
        return m(".game-news-list",
            m(navbar),
            m(".container-fluid",
                m("img[alt='Game art'][src='http://cdn.wccftech.com/wp-content/uploads/2017/02/Middle-Earth-Shadow-of-War-Art.png']")
            ),
            this.data
                ? this.data.appnews.newsitems.map(newsItem => m(".newsItem", newsItem.title))
                : m(".loading", "Loading game news list...")
        );
    }
};

export default gameNewsList;