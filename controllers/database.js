var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sahiti:test123@ds225010.mlab.com:25010/heroku_w1zxv8n0';

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

            // response.render('getAllOrders', {results: docs});

        });

        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function

module.exports.storeData = function (request, response) {

    const { parse } = require('querystring');
    if (request.method === 'POST') {
        // response.setHeader('Content-Type: application/json');
        var finalOrder = request.body.order;
        response.send(finalOrder);
    }

    mongodb.MongoClient.connect(mongoDBURI, function(err,  client) {
        if(err) throw err;

        //get handle to the databse
        var theDatabase = client.db('heroku_w1zxv8n0');

        //get collection of Orders
        var Customers = theDatabase.collection('CUSTOMERS');
        var Billing = theDatabase.collection('BILLING');
        var Shipping = theDatabase.collection('SHIPPING');
        var Orders = theDatabase.collection('ORDERS');

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);

        var customerdata = {
            CID: customerID,
            FIRSTNAME: JSON.parse(finalOrder).firstname,
            LASTNAME: JSON.parse(finalOrder).lastname,
            STREET: JSON.parse(finalOrder).address1 + ' ' + JSON.parse(finalOrder).address2,
            CITY: JSON.parse(finalOrder).city,
            STATE: JSON.parse(finalOrder).state,
            EMAIL: JSON.parse(finalOrder).email
         };

        var shippingdata = {
            SID: shippingID,
            STREET: JSON.parse(finalOrder).address1 + ' ' + JSON.parse(finalOrder).address2,
            CITY: JSON.parse(finalOrder).city,
            STATE: JSON.parse(finalOrder).state
        };

        var billingdata = {
            BID: billingID,
            CREDITCARDTYPE: JSON.parse(finalOrder).cardtype,
            CREDITCARDNUM: JSON.parse(finalOrder).cardnumber,
            CREDITCARDEXP: JSON.parse(finalOrder).cardexpmonth,
            CREDITCARDYR: JSON.parse(finalOrder).cardexpyear,
            CREDITCARDSECURITYNUM: JSON.parse(finalOrder).cardcvv
        };

        var orders = {
               order_CID: customerdata.CID,
               order_SID: shippingdata.SID,
               order_BID: billingdata.BID,
               PRODUCT_VECTOR: JSON.parse(finalOrder)['productdetails']
        };

        Customers.insertOne(customerdata, function (err, result) {
            if (err) throw err;
        });
        //
        // Billing.insertOne(billingdata, function (err, result) {
        //     if (err) throw err;
        // });
        //
        // Shipping.insertOne(shippingdata, function (err, result) {
        //     if (err) throw err;
        // });
        //
        // Orders.insertOne(orders, function (err, result) {
        //     if (err) throw err;
        // });

      //   Customers.find({}).toArray(function(err,result){
      //       var finalResult = {};
      //       if(err){
      //           console.log("Error retrieving records");
      //           response.send(err);
      //       } else if (result.length){
      //           console.log("Success");
      //           finalResult.plist = result;
      // //           // collection.find({/* another query */}).toArray(function(err,result){
      // //           //     finalResult.anotherKey = result;
      //                 response.render('storeData',{results:finalResult});
      //             // });
      //       }else{
      //           response.send('No Documents');
      //       }
      //       client.close();
      // });

        Customers.find().toArray(function (err, docs) {
            if(err) throw err;

            response.end('/storeData', {results: docs});
        });

        //close connection when your app is terminating.
        client.close(function (err) {
            if(err) throw err;
        });
  });
};
