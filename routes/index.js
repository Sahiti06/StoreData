var express = require('express');
var router = express.Router();
mongodb = require('mongodb');

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/storeData', function(req, res) {
    return res.render('storeData', {'order' : req.body.order} );

});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
