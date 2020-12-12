#foi utilizado crontab para execuçao desse algoritmo

class aux_class():
    def __init__(self):
        self.incendio = None
        self.temperatura = None

class matriz_sensores():
    def __init__(self):
        self.matriz_sensor = []
        self.alarme = False


import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["rede_sensores"]["sensores"]

respostas_banco = mydb.find()

matriz = matriz_sensores()

qtt_incendio = 0

for i in respostas_banco:
    aux = aux_class()
    aux.incendio = i["incendio"]
    aux.temperatura = i["temperatura"]
    matriz.matriz_sensor.append(aux.__dict__)

    if i["incendio"] == "true":
        qtt_incendio+=1

if qtt_incendio>4:
    matriz.alarme = True
    

# print(matriz.__dict__)

mydb = myclient["rede_sensores"]["matriz"]
mydb.delete_many({})
mydb.insert_one(matriz.__dict__)