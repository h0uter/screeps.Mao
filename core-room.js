//ROOM LOGIC
Room.prototype.monitor = function () {
  //SPAWNING
  for (let spawnName in Game.spawns) {
    if (Game.spawns[spawnName].room === this) {
      Game.spawns[spawnName].cleanMemory();
      let harvesters = _.filter(Game.creeps, (creep) => (creep.memory.role === 'harvester' && creep.memory.home === this.name)).length;
      let engineers = _.filter(Game.creeps, (creep) => (creep.memory.role === 'engineer' && creep.memory.home === this.name)).length;
      if (harvesters < Config.harvesterPop) {
        Game.spawns[spawnName].buildTestCreep('harvester');
      } else if (engineers < Config.engineerPop) {
        Game.spawns[spawnName].buildTestCreep('engineer');
      }
      // Game.spawns[spawnName].spawnLogic();
    }
  }

  //CREEPS
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.room === this) {
      Roles[creep.memory.role].run(creep);
    }
  }

  //TOWERS
  let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
  for (let tower of towers) {
    tower.defend();
  }

};


roomPopulation = function (room) {
  let balancedUnits = _.filter(Game.creeps, (creep) => (creep.memory.chassis === 'balancedBody' && creep.memory.home === room.name)).length;

  return balancedUnits
};