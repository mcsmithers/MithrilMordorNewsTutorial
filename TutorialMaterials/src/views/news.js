//src/views/news.js
import m from 'mithril';
import stream from 'mithril/stream';

export const news = stream([]);

const cors = 'https://cors.now.sh/'

const News = {
    oninit: function(){
        m.request(cors + 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=3&maxlength=300&format=json')
            .then(data => {
                this.data = data
            })
    },
    view: function(){
        return m("li", JSON.stringify(this.data, undefined, 2))
    }
}

m.mount(document.body, News)


