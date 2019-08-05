'use strict';

const TIMER     = 30000 // 
var express     = require('express');
var bodyParser  = require('body-parser');
var expect      = require('chai').expect;
var cors        = require('cors');
var MDB               = require('./store/db');
var helmet            = require('helmet')
var apiRoutes         = require('./routes/api.js');
var fixme             = require('fixme');
var batchProc          = require('./batch/proc-readings.js');

var app = express();

require('dotenv').config();

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({origin: '*'})); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

// All values below are Fixme default values unless otherwise overridden here.
fixme({
  path:                 process.cwd(),
  ignored_directories:  ['node_modules/**', '.git/**', '.hg/**'],
  file_patterns:        ['**/*.js'],
  file_encoding:        'utf8',
  line_length_limit:    1000,
  skip:                 []
});

let inter=null; // declaro la variable para el intervalo

//CONNECT TO DE DB
MDB.connect(()=>{

  //Start our server and tests!
  app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port " + process.env.PORT);
  //Start the batch process
  inter=setInterval(()=> batchProc.procReadings(), TIMER);
  
  });
})

process.on('SIGINT', function(){
    MDB.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
       process.exit(0);
      });
     clearInterval(inter); // limpio la variable intervalo
});

module.exports = app; //for testing
