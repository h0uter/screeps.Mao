module.exports = {
  //Role.Job.Task
  /** @param {Creep} creep **/
  run: function (creep) {
    //creep.memory.job = 'upgrade';
    creep.identifyJob();
    creep.fullState();

    //TODO job assignment logic
    // let upgradeJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'upgrade' && creep.memory.home === creep.room.name)).length;
    // let fortificateJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'fortificate' && creep.memory.home === creep.room.name)).length;
    // let maintenanceJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'maintenance' && creep.memory.home === creep.room.name)).length;
    // let constructJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'construct' && creep.memory.home === creep.room.name)).length;

    if (creep.room.memory.jobList.upgrade < 3) {
      creep.assignJob('upgrade');
    } else if (creep.room.memory.jobList.maintenance < 1 ) {
      creep.assignJob('maintenance');
    } else if (creep.room.memory.jobList.fortificate < 1 ) {
      creep.assignJob('fortificate');
    }

    let constructJobs = _.filter(Game.creeps, (creep) => (creep.memory.job === 'construct' && creep.memory.home === creep.room.name)).length;
    if (creep.room.memory.constructionSites && creep.room.memory.constructionSites.length && constructJobs < 2) {
      //construction job available
      lg('construction TIME!!!!');
      creep.memory.job = 'construct';
    } else if (creep.memory.job === 'construct') {
      creep.memory.job = null;
    }
    if (creep.hasJob()) {
      creep.executeJob()
    }

  },
  construct: function(creep) {
    if (creep.isIdle) {
      if (creep.memory.full) {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
          targets = assignPriority(targets, 'tower', 'extension', 'container', 'road', 'constructedWall');
          targets = prioritizeType(targets);
          let target = creep.findMostProgressed(targets);
          //console.log('target: ' + target + ' | targets: ' + targets);
          //creep.memory.buildTarget = target.id;
          //creep.memory.targetName = target.structureType;
          creep.task = Tasks.build(target)
        }
      } else {
        creep.harvestSource();
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
  },
  maintenance: function (creep) {
    if (creep.isIdle) {
      if (creep.memory.full) {
        let roadHP = 1000;
        let containerHP = 1000;
        let targets = creep.room.find(FIND_STRUCTURES, {
          filter: (s) => {
            return (
              ((s.structureType === 'container' || s.structureType === 'storage') && s.hitsMax - s.hits > containerHP)
              || (s.structureType === 'road' && s.hitsMax - s.hits > roadHP)
              // || (s.structureType === 'rampart' && creep.structureTypeAvgHits(STRUCTURE_RAMPART) - s.hits > 2000)
              // || (s.structureType === 'constructedWall' && s.hits < creep.structureTypeAvgHits(STRUCTURE_WALL))
            )
          }
        });
        if (targets.length) {
          targets = assignPriority(targets, 'container', 'storage', 'road', 'rampart', 'constructedWall');
          targets = prioritizeType(targets);
          let target = findLowestHits(targets);
          creep.task = Tasks.repair(target);
        }
      } else {
        creep.harvestSource();
      }
    }
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
  }
};