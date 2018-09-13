//Behaviour for different creep types
let bodies = {
  balancedBody: require('chassis.balancedBody'),
  logisticBody: require('chassis.logisticBody'),
  minerBody: require('chassis.minerBody')
};

//PLUGINS
require('plugin-creepTasks');

//LOAD IN PROTOTYPES
require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');

//CUSTOM FUNCTIONS
require('util-functions');

//UTILITIES
let logger = require('util-logger');
let cache = require('util-cache');
let Config = require('util-config');

module.exports.loop = function () {
		//UTILITIES

    //Game.spawns['Spawn1'].containerLR();
		logger.run();
		cache.run();
		//TOWERS
		let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
		for (let tower of towers) {
			tower.defend();
		}

    //SPAWNING
    for (let spawnName in Game.spawns) {
      Game.spawns[spawnName].spawnLogic();
    }

    //CREEPS
		for (let name in Game.creeps) {
			let creep = Game.creeps[name];
			roles[creep.memory.role].run(creep);
		}
};

