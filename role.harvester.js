module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    creep.identifyJob();
    creep.fullState();

    if (creep.hasJob()) {
      creep.executeJob();
    } else {
      //TODO job assignment logic
      creep.assignJob('jobHarvest');
    }
  },
  jobHarvest: function (creep) {
    if (creep.isIdle) {
      if (creep.memory.full) {
        let targets = creep.room.find(FIND_MY_STRUCTURES, {
          filter: (s) => {
            return (
              ((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
                && s.energy < s.energyCapacity)
              || (s.structureType === STRUCTURE_STORAGE && s.storeCapacity > s.store.energy)

            );
          }
        });
        if (targets.length) {
          targets = assignPriority(targets, 'tower', 'extension', 'spawn', 'storage');
          targets = prioritizeType(targets);
          creep.task = Tasks.transfer(creep.pos.findClosestByPath(targets));
        }
      } else {
        creep.harvestSource();
      }
    }

  }
};
