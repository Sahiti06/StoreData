var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sahiti:test123@ds225010.mlab.com:25010/heroku_w1zxv8n0';

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

        c.forEach(
            function(myDoc) {
                console.log( "name: " + myDoc.name );  //just logging the output to the console
            }
        );


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

//
//     mongodb.MongoClient.connect('mongodb://sahiti:test123@ds225010.mlab.com:25010/heroku_w1zxv8n0', function(err, db) {
//         if(err) throw err;
//
//         var dbo = db.db('heroku_jw552rkk');
//         var myobj =
//             { _id: getRandomArbitrary(10000, 20000),
//                 FIRSTNAME: firstname, LASTNAME: lastname,
//                 STREET: street, CITY: city, STATE: bstate,
//                 ZIP: zip, EMAIL: email};
//
//         dbo.collection("CUSTOMERS").insertOne(myobj, function(err, res) {
//             if (err) throw err; });
//
//         var dbi = db.db('heroku_jw552rkk');
//         var myobj1 =
//             {_id: getRandomArbitrary(20001, 30000),
//                 CUSTOMER_ID: myobj._id, CREDITCARDTYPE: cardtype,
//                 CREDITCARDNUM: cardnumber, CREDITCARDEXP: cardexp,
//                 CREDITCARDSECURITYNUM: cardcvv};
//         dbi.collection("BILLING").insertOne(myobj1, function(err, res) {
//             if (err) throw err; });
//
//         var dba = db.db('heroku_jw552rkk');
//         var myobj2 =
//             {_id: getRandomArbitrary(30001, 40000),
//                 CUSTOMER_ID: myobj._id, SHIPPING_STREET: shipstreet,
//                 SHIPPING_CITY: shipcity, SHIPPING_STATE: shipstate,
//                 SHIPPING_ZIP: shipzip
//             };
//
//         dbo.collection("SHIPPING").insertOne(myobj2, function(err, res)
//         { if (err) throw err; });
//
//         var d = new Date(jsonDate);
//         var dbc = db.db('heroku_jw552rkk');
//         var myobj3 =
//             {_id: getRandomArbitrary(40001, 50000),
//                 CUSTOMER_ID: myobj._id, BILLING_ID: myobj1._id,
//                 SHIPPING_ID: myobj2._id, DATE: d,
//                 PRODUCT_VECTOR: order, ORDER_TOTAL: total};
//         dbc.collection("ORDERS").insertOne(myObj3, function(err, res)
//         { if (err) throw err; });
//
//         var dbk = db.db('heroku_jw552rkk');
//         dbk.collection("ORDERS").find({}).toArray(function(err, result) {
//             if (err) throw err;
//             console.log("THANK YOU FOR YOUR SUBMITTED ORDER");
//             db.close(); }; //end of connect
//     }; //end function
};