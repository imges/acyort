
// generate rss

var config = require('../config.js'),
    fs = require('fs'),
    mustache = require('mustache'),
    rss = require('rss');

module.exports = function(data) {

    config.url = config.url[config.url.length - 1] == '/' ? config.url.substr(0, config.url.length - 1) : config.url;

    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    })

    var feed = new rss({
        title: config.title,
        description: config.about,
        feed_url: config.url +'/rss.xml'),
        site_url: config.url,
        cdata: true,
        pubDate: new Date().toISOString()
    })

    data.forEach(function(e) {
        feed.item({
            title: e.title,
            url: config.url + e.file,
            author: e.user.login,
            date: e.updated_at,
            description: marked(e.body)
        })
    })

    fs.writeFileSync('./rss.xml', feed.xml(), 'utf8')
    console.log('Success build ./rss.xml')

}
