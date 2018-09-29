require('util-global');
// //PLUGINS
//require('plugin-creepTasks');


// //LOAD IN PROTOTYPES
require('prototype.creep');
require('prototype.spawn');
require('prototype.tower');
require('core-room');
//
//CUSTOM FUNCTIONS
require('util-functions');
// //UTILITIES
let logger = require('util-logger');

//const profiler = require('util-profiler');
//profiler.enable();

module.exports.loop = function () {
  // profiler.wrap(function() {
    //logger.cpu();
    //ROOMS
    for (let roomName in Game.rooms) {
      Game.rooms[roomName].director();
    }

    //UTILITIES
    logger.run();
    // cache.run();
  // })
};

