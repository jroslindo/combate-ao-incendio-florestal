var MongoClient = require('mongodb').MongoClient;
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

var url = "mongodb://localhost:27017/";

app.get('/pega_dados', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("rede_sensores");

        dbo.collection("matriz").find({}).toArray(function (err, data) {
            if (err) throw err;
            res.status(200);
            res.send(data);
            db.close();
        });
    });
})

app.listen(3000)