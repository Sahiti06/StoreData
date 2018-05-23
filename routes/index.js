var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res) {
    var value_name = req.body.order;
    res.send("Order successfully received" + value_name);
    // res.render('storeData', { value : value_name });
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
