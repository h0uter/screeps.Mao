let Tasks = require('plugin-creepTasks');

module.exports = {
  /** @param {Creep} creep **/
  run: function (creep) {
    creep.fullState();

    if (creep.isIdle) {
      if (creep.memory.full) {
        //TODO jobAssignment Logic
        creep.assignJob('jobHarvest');

        if (!!creep.memory.job) {
          creep.executeJobLogic();
        }
      } else {
        creep.harvestSource()
      }
    }
    creep.identifyJob();
    creep.run();
  },
  jobHarvest: function (creep) {
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
  }
};
