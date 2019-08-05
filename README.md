## Supuestos 
1. Asumo que se quiere evaluar las medidas de los 4 sensores por separado. 

## Lineamientos

1. Se utiliza una colección mongoDB para guardar los datos de de los sensores del ejercicio del siguiente formato.

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
2. Se utiliza una interfaz REST para recibir las lecturas. Cada vez que se recibe una se hace push en el array de lecturas del sensor.
3. Cada 30 segundos se ejecuta un proceso que:
    1. Toma los sensores y sus lecturas.
    2. Procesa las lecturas.
    3. Genera un evento y lo guarda en la DB.
    4. Elimina las lecturas con timestamp menor o igual al último procesado para cada sensor.
4. Genera por pantalla los mensajes solicitados en el enunciado. 

## Pruebas
* En tests/tests.js implementé prueba la función que evalúa las mediciones, y prueba funcional de envío de valores (sensor no creado y uno ya creado). 

## Limitaciones
* Serían necesarias muchas más pruebas. 
* Actualmente funcionan tanto el batch como el listener en el mismo proceso. Podría separarse, pero no hace falta para un tráfico y con la frecuencia de proceso batch estipuladas... el servidor no tiene atraso.

