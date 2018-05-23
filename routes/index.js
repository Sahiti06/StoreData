var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res) {
    var order_value = req.body.order;
    var shipping_value = req.body.shipping;
    var billing_value = req.body.billing;
    var customer_value = req.body.customer;
    res.send("Order:" + order_value);
    res.send("Shipping info:" + shipping_value);
    res.send("Billing info:" + billing_value);
    res.send("Customer info:" + customer_value);
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
