//src/views/news.js
import m from 'mithril';
import stream from 'mithril/stream';

export const news = stream([]);

var News = {
    oninit: function(vnode) {
        this.data = vnode.attrs.data
        m.request({ url: 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=241930&count=3&maxlength=300&format=json' }).then(data => {
            this.data = data
        })
    },
    view: function() {
        return m("li", this.data)
    }
}

m(News, { data: "The game news titles" })