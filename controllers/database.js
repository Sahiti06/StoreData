var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://sahiti:test123@ds225010.mlab.com:25010/heroku_w1zxv8n0';

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
