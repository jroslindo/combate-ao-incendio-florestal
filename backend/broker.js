const aedes = require('aedes')()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const server = require('net').createServer(aedes.handle)
const port = 1883
const regex = /(\d*\/false)|(\d*\/true)/gm;


aedes.on('publish', async function (packet, client) {
    let mensagem = packet.payload.toString();
    let regex_resposta = regex.exec(mensagem);

    if (regex_resposta) {
        mensagem = regex_resposta[0].split('/');
        console.log(mensagem);

        let mensagem_final = {};
        mensagem_final.id = mensagem[0];
        mensagem_final.incendio = mensagem[1];

        console.log(mensagem_final);

        /**envio para o mongo */
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("rede_sensores");

            dbo.collection("sensores").insertOne(mensagem_final, function (err, res) {
                if (err) throw err;
                db.close();
            });
        });
    } else {
        // console.log(packet.payload.toString());
    }

});


server.listen(port, function () {
    console.log('server started and listening on port ', port)
})