
Creep.prototype.identifyJob =
  function () {
    if (Game.time % 5 === 0) {
      let idSymbol;
      let idSymbols = {
        jobConstruct:  function () {idSymbol = '🔨'},
        jobHarvest:    function () {idSymbol = '🌾'},
        haul:       function () {idSymbol = '🚛'},
        mine:       function () {idSymbol = '⛏'},
        jobMaintenance:function () {idSymbol = '🔧'},
        jobUpgrade:    function () {idSymbol = '⚡'},
        jobFortify:function () {idSymbol = '🛡'},
        default:    function () {idSymbol = '**'}
      };
      (idSymbols[this.memory.job] || idSymbols['default'])();
      this.say('job: ' + idSymbol)
    }
  };

Creep.prototype.fullState =
  function () {
    if (this.memory.full && this.carry.energy === 0) {
      this.memory.full = false;
      // this.clearTargets();
      this.say('🔄');
    }
    if (!this.memory.full && this.carry.energy === this.carryCapacity) {
      this.memory.full = true;
      this.memory.job = false;
      // this.clearTargets();
      this.say('💯');
    }
  };

Creep.prototype.executeJobLogic = function () {
  //lg('heyyeye'+Roles[this.memory.role][this.memory.job](this));
  Roles[this.memory.role][this.memory.job](this);
};

Creep.prototype.assignJob = function (job) {
  this.memory.job = job;
  this.room.memory.jobList[job]++
};

Creep.prototype.harvestSource = function () {
  let sources = this.room.find(FIND_SOURCES);
  // lg('before: ' + sources);
  sources.sort(function (a, b) {
    return a.targetedBy.length - b.targetedBy.length
  });
  // lg('after: ' +sources);
  this.task = Tasks.harvest(sources[0]);
};

/** @function
 @param {object} targets
 */
Creep.prototype.findClosest =
  function (targets) {
    let target = this.pos.findClosestByPath(targets);
    //pos.findClosestByPath acts weird if it's only 1 long
    if (!target) {
      target = targets[0];
    }
    return target
  };

/** @function
 @param {string} structureType
 */
Creep.prototype.structureTypeAvgHits = function (structureType) {
  let hitsTot = 0;
  let structures = this.room.find(FIND_STRUCTURES, {
    filter: (s) => (s.structureType === structureType)
  });
  // console.log('found ' + structures);

  for (let structure in structures) {
    // console.log('la ' + structures[structure].hits);
    hitsTot += structures[structure].hits
  }
  // _.forIn(structures, function (value, key) {
  //   hitsTot += structures[key].hits;
  // });

  return hitsTot/structures.length
};

/** @function
 @param {object} targets
 */
Creep.prototype.findMostProgressed =
  function (targets) {
    targets.sort(function (a, b) {
      return a.progress - b.progress
    });
    if (targets.length > 3) {
      targets = targets.splice(2)
    }
    return this.pos.findClosestByPath(targets)
  };
