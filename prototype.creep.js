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
  let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (this.harvest(source) === ERR_NOT_IN_RANGE) {
    this.moveTo(source, {reusePath: 10, visualizePathStyle: {stroke: '#00ff23'}});
  }
};