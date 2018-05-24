var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res) {
    var finalOrder = req.body.order;
    res.send("From POST call: " + finalOrder);
    res.render('storeData', { title: 'Final Order Details' });
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
