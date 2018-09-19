module.exports = {
  //Role.Job.Task
  /** @param {Creep} creep **/
  run: function (creep) {
    //creep.memory.job = 'upgrade';
    creep.identifyJob();
    creep.fullState();
    if (creep.hasJob()) {
      creep.executeJob();
    } else {
      //TODO job assignment logic
      creep.assignJob('upgrade');
    }
  },
  upgrade: function (creep) {
    if (creep.isIdle) {
      if (creep.memory.full) {
        creep.task = Tasks.upgrade(Game.rooms[creep.memory.home].controller);
      } else {
        creep.harvestSource();
      }
    }
    creep.run();
  },
  maintenance: function (creep) {

  },
  fortificate: function (creep) {

  }
};