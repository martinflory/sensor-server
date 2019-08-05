/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var sensors = require('../store/sensors');
const { body, query, validationResult } = require('express-validator')
  
module.exports = function (app) {
    
  // The method Validate uses express-validator to validate incoming parameters to the different requests and creates erorr message
  var validate = (method) => {
    switch (method) {
      case 'postReadings': {
        return [ 
          body('value').exists()
        ]   
      }
    }
  }
  
  app.route('/api/sense/:sensor')
    .post(validate('postReadings'), async function (req, res){
      const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
        return;
      }

      let sensor    = req.params.sensor
      let value     = req.body.value
      let timestamp = new Date()
      
      console.log(new Date() + '-INFO-'+ sensor + ': lectura de valor ' + value)
      //NOTE(Martin): Errors are catched so it never throws.
      res.json( await sensors.pushReading(sensor, value, timestamp))

  })
  .delete(async function (req,res){
    try{
      sensors.removeSensor(req.params.sensor);
      res.json({message: "ok"})
    }catch(err){
      res.json({messaje: "Could not delete sensor"})
    }
  })

};
