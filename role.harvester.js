module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    creep.identifyJob();
    creep.fullState();

    if (creep.hasJob()) {
      creep.executeJob();
    } else {
      //TODO job assignment logic
      creep.assignJob('harvest');
    }
  },
  harvest: function (creep) {
    if (creep.isIdle) {
      if (creep.memory.full) {
        let targets = creep.room.find(FIND_MY_STRUCTURES, {
          filter: (s) => {
            return (
              ((s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_TOWER)
                && s.energy < s.energyCapacity)
            );
          }
        });
        if (targets.length) {
          targets = assignPriority(targets, 'extension', 'spawn', 'tower');
          targets = prioritizeType(targets);
          creep.task = Tasks.transfer(creep.findClosest(targets));
        }
      } else {
        creep.harvestSource();
      }
    }
    creep.run();
  }
};
