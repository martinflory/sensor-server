## Supuestos 
1. Asumo que se quiere evaluar las medidas de los 4 sensores por separado. 

## Lineamientos

1. Se utiliza una colección mongoDB para guardar los datos de de los sensores del ejercicio del siguiente formato. Se utiliza store/db.js para manejar el pool de conexiones, y store/sensors.js para encapsular el uso de la DB. 

    Coleccion "readings"
```
{
    _id:        ObjectID
    sensorName: String,
    readings:   [{ 
                    time: Date,
                    value: Number
                }],
    process:    [{
                    time: Date,
                    max: Number,
                    min: Number,
                    avg: Number,
                    badAvg: Boolean,
                    badDelta: Boolean 
    }]
}
```
2. Se utiliza una interfaz REST para recibir las lecturas. Cada vez que se recibe una se hace push en el array de lecturas del sensor. Los métodos se implementan en routes/api.js

3. Cada 30 segundos se ejecuta un proceso (batch/proc-readings.js) que:
    1. Toma los sensores y sus lecturas.
    2. Procesa las lecturas.
    3. Genera un evento y lo guarda en la DB.
    4. Elimina las lecturas con timestamp menor o igual al último procesado para cada sensor.
4. Genera por pantalla los mensajes de consola solicitados en el enunciado. 

## Instalación y Ejecución
1. Clonar los repositorios. 
2. Ejecutar npm install en los directorios.
3. Copiar archivo .env enviado en el directorio de sensor-server.
4. Ejecutar el servidor con npm start.
5. Ejecutar las pruebas con npm test. 

## Pruebas
* En tests/tests.js implementé prueba la función que evalúa las mediciones, y prueba funcional de envío de valores (sensor no creado y uno ya creado). Se ejecutan con npm test. 

## Limitaciones
* Serían necesarias muchas más pruebas. 
* Actualmente funcionan tanto el batch como el listener en el mismo proceso. Podría separarse, pero no se justifica para el tráfico y la frecuencia de proceso batch estipuladas.

