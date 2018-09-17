module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    //creep.memory.job = 'upgrade';
    creep.identify();
    creep.fullState();
    if (creep.hasJob()) {
      creep.executeJob();
    } else {
      //TODO job assignment logic
      creep.assignJob('upgrade');
    }
  },
  upgrade: function (creep) {
    if (creep.memory.full) {
      if (creep.upgradeController(Game.rooms[creep.memory.home].controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.rooms[creep.memory.home].controller, {visualizePathStyle: {stroke: '#ff5400'}});
      }
    } else {
      creep.harvestSource();
    }

  }
};