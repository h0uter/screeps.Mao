Creep.prototype.identifyJob =
  function () {
    if (Game.time % 5 === 0) {
      let idSymbol;
      let idSymbols = {
        construct:  function () {idSymbol = '🔨'},
        harvest:    function () {idSymbol = '🌾'},
        haul:       function () {idSymbol = '🚛'},
        mine:       function () {idSymbol = '⛏'},
        maintenance:function () {idSymbol = '🔧'},
        upgrade:    function () {idSymbol = '⚡'},
        fortificate:function () {idSymbol = '🛡'},
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
      // this.clearTargets();
      this.say('💯');
    }
  };

Creep.prototype.executeJob = function () {
  //lg('heyyeye'+Roles[this.memory.role][this.memory.job](this));
  Roles[this.memory.role][this.memory.job](this);
  this.run();
};

Creep.prototype.assignJob = function (job) {
  this.memory.job = job;
};

Creep.prototype.hasJob = function () {
  return !!this.memory.job;
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
Creep.prototype.structureTypeAvgHits =
  function (structureType) {

    let hitsTot = 0;
    let structures = this.room.find(FIND_STRUCTURES, {
      filter: (s) => (s.structureType === structureType)
    });
    // console.log('found ' + structures);
    for(let structure in structures) {
      // console.log('la ' + structures[structure].hits);
      hitsTot += structures[structure].hits
    }
    return hitsTot/structures.length
  };

