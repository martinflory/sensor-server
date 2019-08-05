# Ejercicio Atix
Existen 4 sensores en un sistema que miden un valor numérico y deben enviarlo para su
procesamiento. El sistema de monitoreo, toma estos valores y calcula tres parámetros:
promedio, valor máximo y valor mínimo buscando alguna de las siguientes anomalías:
* La diferencia entre el valor mínimo y máximo recibido sea mayor a una constante S
(configurable)
* El valor promedio sea superior a una constante M (configurable)
En caso de detectar alguna de las situaciones mencionadas en los puntos anteriores, debe
mostrar por pantalla un mensaje de error indicando esta situación.Es importante tener en cuenta que:
* Los sensores envían 2 mediciones por segundo (en forma independiente y
potencialmente simultánea).
* El sistema de procesamiento, por limitaciones de hardware, sólo puede procesar
información 2 veces por minuto.
* Se debe respetar el orden de ingreso de los mensajes al sistema de monitoreo.
* Todos los mensajes recibidos deben ser loggeados asi como también registrar
información al momento de su procesamiento.

En Java o C#, desarrolle un programa que se ejecute desde consola y que modele este
sistema.

Para probarlo,
1. Escribir al menos dos tests que validen la funcionalidad alguna de las funcionalidades
requeridas.
2. Desde la consola se deberá poder ejecutar un caso en el los 4 sensores generen
información aleatoria que será procesada por el sistema de monitoreo.

PLUS: Permitir que el sistema de monitoreo reciba los mensajes mediante HTTP.

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

