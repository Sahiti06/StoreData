var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res, next) {
    var value_name = req.body.order;
    console.log(value_name);
    var obj = JSON.stringify(value_name);
        // res.setHeader('Content-Type', 'text/html');
        // res.setHeader('X-Foo', 'bar');
        // res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('');
    res.send("Order successfully received" + obj);
    res.render('storeData', {'order' : obj} );

});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
