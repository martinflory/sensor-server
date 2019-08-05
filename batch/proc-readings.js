
const M = 10
const S = 7

var sensors = require('../store/sensors');

//recibe las lecturas del sensor, las procesas y genera un objeto con los resultados
function procRdsQueue(rds){
  //timestamp de la ultima lectura
  let lastTimestamp=rds[rds.length - 1].timestamp;
  
  //Hago un array de las lecturas solas
  let plainReadings=rds.map((reading)=>reading.value);
  
  //Maximo valor
  let max = Math.max.apply(Math, plainReadings);
  
  //Minimo valor
  let min = Math.min.apply(Math, plainReadings);
  
  //Valor promedio  
  let total = plainReadings.reduce((acc, c) => acc + c, 0);
  let avg =  total / plainReadings.length;

  
  let obj={
    //Timestamp de la ultima lectura
    time   : lastTimestamp, 
    //get max readings
    max    : max,
    //get min readings
    min    : min,
    //get avg readings
    avg    : avg,
    //Error si avg > M
    badAvg : avg > M ? true: false,
    //Error si Max - Min > S
    badDelta : max - min > S? true: false
  }
  
  return obj;
}

function procSensor(sensor){
  
  if (sensor.readings.length===0) {
    console.log(new Date() + '-INFO-'+ sensor.sensorName + ': sin lecturas para el sensor '  + sensor.sensorName)
    return;
  }
 
  let obj=procRdsQueue(sensor.readings);
  
  if (obj.badAvg)   console.log(new Date() + '-ERROR-'+ sensor.sensorName + ': Promedio '+ obj.avg +' superior a ' + M);
  if (obj.badDelta) console.log(new Date() + '-ERROR-'+ sensor.sensorName + ': Delta entre ' + obj.min + ' y ' + obj.max + ' superior a ' + S );
  console.log(new Date() + '-INFO-'+ sensor.sensorName + ': Se procesaron ' + sensor.readings.length + ' readings');
  //eliminio las lecturas viejas
  sensors.updateSensor(sensor.sensorName, obj);

}

async function procReadings () {
  console.log('Starting batch process...')
  try{
    
    let sens = await sensors.getSensors();
    
    for (let s in sens){
      procSensor(sens[s]);
    }
    
  } catch (err){
    console.log(err);
  }
  console.log('Finishing batch process...')
}

  
module.exports = {
  procReadings,
  procRdsQueue
};