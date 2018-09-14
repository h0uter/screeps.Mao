roles = {
  // CONTROL
  //claimer: require('role.claimer'),
  //ECONOMY INCOME
  //harvester: require('role.harvester'),       //blue
  //miner: require('role.miner'),
  //TRANSPORT
  //transporter: require('role.transport'),             //red
  //UPKEEP
  engineer: require('role.engineer')           //yellow
};
// //PLUGINS
// require('plugin-creepTasks');
//
// //LOAD IN PROTOTYPES
require('prototype.creep');
require('prototype.spawn');
// require('prototype.tower');
require('core-room');
//
//CUSTOM FUNCTIONS
require('util-functions');
//
// //UTILITIES
// let logger = require('util-logger');
// let cache = require('util-cache');
// let Config = require('util-config');

module.exports.loop = function () {
  let kop = {
    test1: function () {
      lg('1')
    },
    test2: function () {
      lg('2')
    }
  };
  let j = 'test1';

  kop[j];
  
  
  //UTILITIES

  //Game.spawns['Spawn1'].containerLR();
  // logger.run();
	// cache.run();

  	//ROOMS
  for (let roomName in Game.rooms) {
    Game.rooms[roomName].monitor();
  }
  // //TOWERS
  // let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
  // for (let tower of towers) {
  //   tower.defend();
  // }

};

