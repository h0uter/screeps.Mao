require('util-global');
// //PLUGINS
require('plugin-creepTasks');
require('plugin-loDash');
// //LOAD IN PROTOTYPES
require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');
require('core-room');
//
//CUSTOM FUNCTIONS
require('util-functions');
//
// //UTILITIES
let logger = require('util-logger');
// let cache = require('util-cache');
// let Config = require('util-config');

//PROFILER
const profiler = require('util-profiler');
profiler.enable();

module.exports.loop = function () {
  profiler.wrap(function() {
    //UTILITIES
    logger.run();
    // cache.run();
    //ROOMS
    for (let roomName in Game.rooms) {
      Game.rooms[roomName].monitor();
    }
  })
};

