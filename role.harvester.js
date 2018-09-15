module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    creep.memory.job = 'harvest';
    for (let name in Game.creeps) {
      creep.executeJob();
      // if (creep.hasJob) {
      //   creep.executeJob();
      // } else {
      //   creep.assignJob();
      // }
    }
  },
  harvest: function (creep) {
    creep.fullState();
    if (creep.memory.full) {

    }
    else {
      creep.harvestSource();
    }
  }
};
