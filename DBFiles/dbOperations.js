var Connection = require('tedious').Connection;
const config = require('./dbConfig');

var connection = new Connection(config);

var connect = function(){
    connection.on('connect', function(err){
        if (err){
            console.log(err);
        }

        console.log("connected");
        connection.close();
    })

    connection.connect()
}

module.exports = {'connect': connect}