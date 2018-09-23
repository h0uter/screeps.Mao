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
};

Creep.prototype.assignJob = function (job) {
  this.memory.job = job;
};

Creep.prototype.hasJob = function () {
  return !!this.memory.job;
};

Creep.prototype.harvestSource = function () {
  let sources = this.room.find(FIND_SOURCES);
  let unattendedSource = _.filter(sources, source => source.targetedBy.length == 0)[0];
  if (unattendedSource) {
    this.task = Tasks.harvest(unattendedSource);
  } else {
    this.task = Tasks.harvest(sources[0]);
  }
  // let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  // if (this.harvest(source) === ERR_NOT_IN_RANGE) {
  //   this.moveTo(source, {reusePath: 10, visualizePathStyle: {stroke: '#00ff23'}});
  // }
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

