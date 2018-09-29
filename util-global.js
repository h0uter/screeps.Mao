//GLOBAL VARIABLES
Config = require('util-config');
Tasks = require('plugin-creepTasks');
//_ = require('plugin-loDash');

Roles = {
  // CONTROL
  //claimer: require('role.claimer'),
  //ECONOMY INCOME
  harvester: require('role.harvester'),       //blue
  miner: require('role.miner'),
  //TRANSPORT
  //transporter: require('role.transport'),             //red
  //UPKEEP
  engineer: require('role.engineer')           //yellow
};

//MEMORY
Memory.rooms = {};
//Memory.roles = {};