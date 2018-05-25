var express = require('express');
var router = express.Router();

var controllerMongoCollection = require('../controllers/database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* POST storeData */
router.post('/storeData', controllerMongoCollection.storeData);

router.get('/storeData', function(req, res) {
    res.render('storeData', { title: 'Getting results from DB' });
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;