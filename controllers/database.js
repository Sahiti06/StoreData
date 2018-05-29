const mongodb = require('mongodb');
const mongoDBURI = process.env.MONGODB_URI || 'mongodb://sahiti:test123@ds225010.mlab.com:25010/heroku_w1zxv8n0';

// var myModule = require('./modules');

var bodyParser = require('body-parser');
var path = require ('path'); //to work with separtors on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
//########################################
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/** getAllOrders controller logic that current does model logic too -connects to Mongo database and
 * queries the Orders collection to retrieve all the orders and build the output using the
 * ejs template mongodb.ejs found in views directory
 * @param request
 * @param response
 *
 */
module.exports.getAllOrders =  function (request, response) {

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;

        //get handle to the databse
        var theDatabase = client.db('heroku_w1zxv8n0');


        //get collection of Orders
        var Orders = theDatabase.collection('ORDERS');


        //FIRST showing you one way of making request for ALL orders and cycle through with a forEach loop on returned Cursor
        //   this request and loop  is to display content in the  console log
        var c = Orders.find({});


        //SECOND -show another way to make request for ALL Orders and simply collect the  documents as an
        //   array called docs that you  forward to the  getAllorders.ejs view for use there
        Orders.find().toArray(function (err, docs) {
            if(err) throw err;

            response.render('getAllOrders', {results: docs});

        });

        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function

module.exports.storeData = function (request, response) {

    // var results = request.body;
    // response.send(results);

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;

        //get handle to the database
        const db = client.db('heroku_w1zxv8n0');

        //get collection of Orders
        const Customers = db.collection('CUSTOMERS');
        const Billing = db.collection('BILLING');
        const Shipping = db.collection('SHIPPING');
        const Orders = db.collection('ORDERS');

        //random function to generate IDs
        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);


        //variable for customer info
        var customerdata = {
            CID: customerID,
            FIRSTNAME: request.body.firstname,
            LASTNAME: request.body.lastname,
            STREET: request.body.address1 + ' ' + request.body.address2,
            CITY: request.body.city,
            STATE: request.body.state,
            EMAIL: request.body.email
         };

        //variable for shipping info
        var shippingdata = {
            SID: shippingID,
            STREET: request.body.address1 + ' ' + request.body.address2,
            CITY: request.body.city,
            STATE: request.body.state
        };

       //variable for billing info
        var billingdata = {
            BID: billingID,
            CREDITCARDTYPE: request.body.cardtype,
            CREDITCARDNUM: request.body.cardnumber,
            CREDITCARDEXP: request.body.cardexpmonth,
            CREDITCARDYR: request.body.cardexpyear,
            CREDITCARDSECURITYNUM: request.body.cardcvv
        };

       //variable for order info
        var orders = {
               order_CID: customerdata.CID,
               order_SID: shippingdata.SID,
               order_BID: billingdata.BID,
               DATE: Date.now(),
               PRODUCT_VECTOR: request.body['productdetails']
        };

        //functions to do the insert operations into various collections

        Customers.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });

        Billing.insertOne(billingdata, function (err, result) {
            if (err) throw err;
        });

        Shipping.insertOne(shippingdata, function (err, result) {
            if (err) throw err;
        });

        Orders.insertOne(orders, function (err, result) {
            if (err) throw err;
        });

        //nested queries to get the data from each and every collection
        // db.query(Customers.find(), function(err, result1) {
        //     db.query(Shipping.find(), function(err, result2) {
        //         db.query(Billing.find(), function(err, result3) {
        //             db.query(Orders.find(), function(err, result4) {
        //           response.render('storeData', { rows1 : result1, rows2: result2, rows3: result3, rows4: result4 });
        //         });
        //       });
        //     });
        // });

        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
  });
};
