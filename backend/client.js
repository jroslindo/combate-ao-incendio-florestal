var sleep = require('sleep');
const mqtt = require('mqtt'); //instanciar objeto mqtt
const client = mqtt.connect("mqtt://localhost:1883"); //local da conexao
var id = 80; //id referente a aplicaç~ao da porta, onde cada porta possui um id




client.on('connect', function () {
    client.subscribe('rede_sensores', function (err) {
        if (!err) {
            while (id < 100) {
                var bool_incendio = false;
                client.publish('rede_sensores', id + '/' + bool_incendio); // Envio da mensagem para o aedes 
                client.publish('rede_sensores', "a");
                id+=1;
                sleep.msleep(100);

            }
        }
    })
    return;
})

