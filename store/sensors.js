const MDB=require('./db')
var ObjectID = require('mongodb').ObjectID;

async function removeTestSensors(){
  let db=MDB.get();
  
  console.log('im going to remove test sensors');
  try{
   let res=await db.collection('readings').deleteMany({"sensorName" : { $regex : /^test/ }});
   console.log('Deleted ' + res.deletedCount);
  } catch(err){
    console.log(err);
  }
}

async function removeSensor(name){
  let db=MDB.get();
  
  try{
   let res=await db.collection('readings').deleteMany({"sensorName" : name });
  } catch(err){
    console.log(err);
  }
}

async function pushReading(name, value, timestamp){
  var db=MDB.get();

  try{

    var obj={
      timestamp: timestamp, 
      value: value
    }

    let doc=await db.collection('readings').findOneAndUpdate(
                                        { sensorName: name}, 
                                        {  $push: {readings: obj }},
                                        {returnOriginal: false, upsert: true});
    
    if (doc.lastErrorObject.updatedExisting==false) return { message: 'OK. Sensor created', reading:  obj };
    else return {message: 'OK', reading: obj };

  } catch(err){
    console.log(err);
    return {message: err};
  }
}

async function getSensors(){
  let db=MDB.get();
  try{
    let sensors = await db.collection('readings') 
      .find({},{ process: 0 })
      .toArray();
    return sensors;
  } catch(err){
    console.log(err.message);
    throw ('DB error');
  }
}

async function updateSensor (sensorName, obj){
  let db=MDB.get();
 
  try{
    let doc= await db.collection('readings').updateOne(
      { sensorName: sensorName}, 
      {$pull: { readings : { timestamp: { $lte: obj.time }}},$push: { process: obj }}); 
         
  }catch(err){
    console.log(err);
  }
}

module.exports = {
  removeSensor,
  removeTestSensors,
  pushReading,
  getSensors,
  updateSensor
};
