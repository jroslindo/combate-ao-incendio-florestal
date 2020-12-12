var sleep = require('sleep');
const mqtt = require('mqtt'); //instanciar objeto mqtt
const client = mqtt.connect("mqtt://localhost:1883"); //local da conexao
var id = 0; //id referente a aplicaç~ao da porta, onde cada porta possui um id




client.on('connect', function () {
    client.subscribe('rede_sensores', function (err) {
        if (!err) {
            while (id < 16) {
                var bool_incendio = false;
                var temperatura = 25;
                client.publish('rede_sensores', id + '/'+  temperatura + '/' + bool_incendio); // Envio da mensagem para o aedes 
                client.publish('rede_sensores', "a");
                id+=1;
                sleep.msleep(100);
            }
        }
    })
    return;
})

