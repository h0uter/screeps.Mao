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
      let upgradeJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'upgrade' && creep.memory.home === this.name)).length;
      let fortificateJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'fortificate' && creep.memory.home === this.name)).length;
      //TODO job assignment logic
      if (upgradeJobs < 3) {
        creep.assignJob('upgrade');
      } else if (fortificateJobs < 2 ) {
        creep.assignJob('fortificate');
      }

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
    if (creep.isIdle) {
      if (creep.memory.full) {
        let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (s) => {
            return (
              (s.structureType === STRUCTURE_RAMPART && s.hits < creep.structureTypeAvgHits(STRUCTURE_RAMPART) + 5)
              || (s.structureType === STRUCTURE_WALL && s.hits < creep.structureTypeAvgHits(STRUCTURE_WALL) + 5)
            )
          }
        });
        targets.sort(function (a, b) {
          return a.hits - b.hits
        });
        let target = creep.pos.findClosestByPath(targets.splice(3));
        creep.task = Tasks.fortify(target);
      } else {
        creep.harvestSource();
      }
    }
    creep.run();
  }
};