const roleEngineer = {
  /** @param {Creep} creep **/
  run: function(creep) {
    creep.memory.job = 'upgrade';
    for (let name in Game.creeps) {
        creep.executeJob();
      // if (creep.hasJob) {
      //   creep.executeJob();
      // } else {
      //   creep.assignJob();
      // }
    }
  },
  upgrade: function (creep) {
    //lg('upgradeeeee');
    creep.fullState();
    if (creep.memory.full) {
      if (creep.upgradeController(Game.rooms[creep.memory.home].controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.rooms[creep.memory.home].controller, {visualizePathStyle: {stroke: '#ff5400'}});
      }
    }
    else {
      creep.harvestSource();
    }
  }
};

module.exports = roleEngineer;