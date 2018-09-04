var express = require('express')
//var env = require('./env.js')
var app = express()
var hogan = require('hogan-express')
app.engine('html', hogan)
app.set('port', (process.env.PORT || 3000))
app.use('/', express.static(__dirname + '/public/'))
var Cosmic = require('cosmicjs')
var bucket_slug = process.env.COSMIC_BUCKET || 'ab02'
var read_key = process.env.COSMIC_READ_KEY || 'Dx3EzzXQxyUWTgOBQh9Y6NCrzzJM7H4TiBMi6sda3NEXRF94MH'
app.get('/', function(req, res) {
  Cosmic.getObjects({ bucket: { slug: bucket_slug, read_key: read_key } }, function(err, response) {
    res.locals.cosmic = response;
    res.render('index.html')
  })
});
app.listen(app.get('port'))
