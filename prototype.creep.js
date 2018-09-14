
Creep.prototype.executeJob = function () {
  //lg('heyyeye'+roles[this.memory.role][this.memory.job](this));
  roles[this.memory.role][this.memory.job](this);
};

Creep.prototype.assignJob = function () {

};
Creep.prototype.harvestSource = function () {
  let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (this.harvest(source) === ERR_NOT_IN_RANGE) {
    this.moveTo(source, {reusePath: 10, visualizePathStyle: {stroke: '#00ff23'}});
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