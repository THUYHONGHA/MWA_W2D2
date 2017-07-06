var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');
var dbAccess = require('./db_access');

router.get('/', function(req, res) {
    var urlStr = req.url;
    var query = url.parse(urlStr).query;
    var long = querystring.parse(query).long;
    var lat = querystring.parse(query).lat;

    dbAccess().then(db => {

        var locations = db.collection('points');
        locations.createIndex({ address: '2dsphere' });
        var cursor = locations.find({
            "address": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [long, lat]
                    },
                    "$maxDistance": 2000
                }
            }
        }, function (err, result) {
            if(err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
        var data = cursor.limit(1);
        console.log(data.length);
        res.render('find', { data: data }, function(err, html) {
            if (err)
                throw err;
            res.end(html);
        });
    }).catch(err => {
        res.render('error', { message: 'Error', error: err }, function(err, html) {
            if (err)
                throw err;
            res.end(html);
        });
    });
});

module.exports = router;