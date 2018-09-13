let monitor = {
  /** @param {Room} room **/
  run: function(room) {

  }
};

module.exports = monitor;

roomPopulation = function(room) {
  let balancedUnits = _.filter(Game.creeps, (creep) => (creep.memory.chassis === 'balancedBody' && creep.memory.home === room.name)).length;

  return balancedUnits
};