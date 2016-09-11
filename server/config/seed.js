/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Sweetymeow',
    email: 'Sweetymeow@test.com',
    password: '1234',
    assessmentId: '08b8de35-7503-4744-89d2-c5ff5b353f38'
  }, {
    provider: 'local',
    name: 'oveou',
    email: 'oveou@test.com',
    password: '1234',
    assessmentId: '07fb0d98-8ff8-4d2f-b881-9c85a020017b'
  },{
    provider: 'local',
    name: 'judithyueli',
    email: 'judithyueli@test.com',
    password: '1234',
    assessmentId: 'd9bdd65c-412e-4591-823e-4b850c85c140'
  },{
    provider: 'local',
    name: 'y1y',
    email: 'y1y@test.com',
    password: '1234',
    assessmentId: 'd8cdde5f-163b-436d-8c89-df1ddd0fc109'
  },{
    provider: 'local',
    role: 'admin',
    name: 'paszin',
    email: 'admin@admin.com',
    password: 'admin',
    assessmentId: 'd51384a7-1ea8-43a8-8383-3dae4abffee1'
  }, function() {
      console.log('finished populating users');
    }
  );
});


//Sweetymeow
