var procRdsQueue = require('../batch/proc-readings').procRdsQueue
var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
chai.use(chaiHttp);
var sensors = require('../store/sensors');
var ObjectId = require('mongodb').ObjectId;
var url = require('url')


describe('Unit Tests', function(){
    describe('Tests para funcion procRdsQueue', function() {
  
        it('POST - Prueba BadDelta 30 mediciones - promedio 8 - minimo 4 - maximo 12 y delta 8', function(done){
        let rds=[
        { timestamp: new Date(), value: 8 }, //1
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 4 },
        { timestamp: new Date(), value: 6 },
        { timestamp: new Date(), value: 7 },
        { timestamp: new Date(), value: 5 },
        { timestamp: new Date(), value: 9 },
        { timestamp: new Date(), value: 11 },
        { timestamp: new Date(), value: 12 }, //10
        { timestamp: new Date(), value: 8 }, 
        { timestamp: new Date(), value: 7 },
        { timestamp: new Date(), value: 4 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 9 },
        { timestamp: new Date(), value: 10 },
        { timestamp: new Date(), value: 11 },
        { timestamp: new Date(), value: 9 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 7 }, //20     
        { timestamp: new Date(), value: 7 },
        { timestamp: new Date(), value: 7 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 9 },
        { timestamp: new Date(), value: 10 },
        { timestamp: new Date(), value: 7 },
        { timestamp: new Date(), value: 8 },
        { timestamp: new Date(), value: 9 },
        { timestamp: new Date(), value: 8 } //30    
      ];
        
        let obj=procRdsQueue(rds);
        
        assert.property(obj, 'time');
        assert.instanceOf(obj.time, Date) // FIX: malo, pq un date creado mal tambien da true;
        assert.propertyVal(obj, 'min', 4);
        assert.propertyVal(obj, 'max', 12);
        assert.propertyVal(obj, 'avg', 8);
        assert.propertyVal(obj, 'badAvg', false);
        assert.propertyVal(obj, 'badDelta', true);
        done();
    });

  it('POST - 30 mediciones - promedio 8 - minimo 6 - maximo 10 y delta 4', function(done){
      let rds=[
      { timestamp: new Date(), value: 8 }, //1
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 6 },
      { timestamp: new Date(), value: 6 },
      { timestamp: new Date(), value: 7 },
      { timestamp: new Date(), value: 6 },
      { timestamp: new Date(), value: 9 },
      { timestamp: new Date(), value: 10 },
      { timestamp: new Date(), value: 9 }, //10
      { timestamp: new Date(), value: 8 }, 
      { timestamp: new Date(), value: 7 },
      { timestamp: new Date(), value: 6 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 9 },
      { timestamp: new Date(), value: 10 },
      { timestamp: new Date(), value: 10 },
      { timestamp: new Date(), value: 9 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 7 }, //20     
      { timestamp: new Date(), value: 7 },
      { timestamp: new Date(), value: 7 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 9 },
      { timestamp: new Date(), value: 10 },
      { timestamp: new Date(), value: 7 },
      { timestamp: new Date(), value: 8 },
      { timestamp: new Date(), value: 9 },
      { timestamp: new Date(), value: 8 } //30    
    ];
      
      let obj=procRdsQueue(rds);
      
      assert.property(obj, 'time');
      assert.instanceOf(obj.time, Date) // FIX: malo, pq un date creado mal tambien da true;
      assert.propertyVal(obj, 'min', 6);
      assert.propertyVal(obj, 'max', 10);
      assert.propertyVal(obj, 'avg', 8);
      assert.propertyVal(obj, 'badAvg', false);
      assert.propertyVal(obj, 'badDelta', false);
      done();
  });


  it('POST - Prueba badAVG - 30 mediciones - promedio 11 - minimo 10 - maximo 12 y delta 2', function(done){
    let rds=[
    { timestamp: new Date(), value: 11 }, //1
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 12 }, //10
    { timestamp: new Date(), value: 12 }, 
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 12 }, //20     
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 12 },
    { timestamp: new Date(), value: 11 },
    { timestamp: new Date(), value: 10 },
    { timestamp: new Date(), value: 11 } //30    
  ];
    
    let obj=procRdsQueue(rds);
    
    assert.property(obj, 'time');
    assert.instanceOf(obj.time, Date) // FIX: malo, pq un date creado mal tambien da true;
    assert.propertyVal(obj, 'min', 10);
    assert.propertyVal(obj, 'max', 12);
    assert.propertyVal(obj, 'avg', 11);
    assert.propertyVal(obj, 'badAvg', true);
    assert.propertyVal(obj, 'badDelta', false);
    done();
});

    })
  });

  describe('Functional Tests', function() {
 
    this.timeout(5000);
 
   function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
   }
   
   describe('API ROUTING FOR /api/threads/:board', function() {
     
    describe('POST - post a reading', function() {
       // El primer evento para un sensor hace el upsert
       // let newSensor='test' + new ObjectId();
       let newSensor='test'+ (new ObjectId()).toString();
       it('POST - post a reading - new sensor', function(done){
         chai.request('http://localhost:3000')
             .post('/api/sense/'+newSensor)
             .send({ value: 1 })
             .end(function(err, res){
               assert.equal(res.status, 200);
               assert.propertyVal(res.body, 'message', 'OK. Sensor created');                      
               done();
          });
       });
       
       it('POST - post a reading - existing sensor', function(done){
         chai.request('http://localhost:3000')
             .post('/api/sense/'+newSensor)
             .send({ value: 2 })
             .end(function(err, res){
               assert.equal(res.status, 200);
               assert.propertyVal(res.body, 'message', 'OK');                      
               done();
          });
       });
       
       // runs after all tests in this block
       after(async function() {
         this.timeout(5000);
         chai.request('http://localhost:3000')
         .del('/api/sense/'+newSensor)
         .send()
         .end(function(err, res){});
       });

 
   });
     });    
   
 
 });
 