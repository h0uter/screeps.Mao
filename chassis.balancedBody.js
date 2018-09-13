const balancedBody = {
  /** @param {Creep} creep **/
  run: function(creep) {

    if (!creep.memory.full) {
      creep.getEnergy(true, true);
    }
  }
};

module.exports = balancedBody;