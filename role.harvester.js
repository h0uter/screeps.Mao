module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    creep.fullState();
    creep.identify();
    if (creep.hasJob()) {
      creep.executeJob();
    } else {
      //TODO job assignment logic
      creep.assignJob('harvest');
    }
  },
  harvest: function (creep) {
    if (creep.memory.full) {

    } else {
      creep.harvestSource();
    }
  }
};
