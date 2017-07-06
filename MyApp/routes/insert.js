var express = require('express');
var router = express.Router();
var dbAccess = require('./db_access');

/* GET index page*/
router.post('/', function(req, res, next) {

    let name = req.body.name;
    let category = req.body.category;
    let lat = Number(req.body.lat);
    let long = Number(req.body.long);

    dbAccess().then(db => {
        var doc = { name: name, category: category, location: [long, lat] };
        db.collection('points').insert(doc, function(err, docInserted) {
            if (err) throw err;
            db.close();
            res.render('insert', doc, function(err, doc) {
                if (err)
                    throw err;
                res.end(doc);
            });
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