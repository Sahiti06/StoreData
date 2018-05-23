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
    // res.send("Order successfully received" + value_name);
    // res.render('storeData', {'order' : value_name} );
    const server = http.createServer((req,res)=>{
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('X-Foo', 'bar');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('');
      }).listen(port,()=>{
        console.log('your app is started');
    });
});

router.get('/getAllOrders', controllerMongoCollection.getAllOrders);

module.exports = router;
