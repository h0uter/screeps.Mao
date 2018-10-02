//ROOM LOGIC
Room.prototype.monitor = function () {
  //SPAWNING
  for (let spawnName in Game.spawns) {
    if (Game.spawns[spawnName].room === this) {
      Game.spawns[spawnName].spawnLogic();
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

//TODO: use this
Room.prototype.isMine = function() {
  return this.controller && this.controller.my
};

Room.prototype.level = function() {
  if (this.isMine()) {
    return this.controller.level
  } else {
    return 0
  }
};

roomPopulation = function (room) {
  let RCL = room.controller.level;
  let pop = {};
  let spawnList = Config.spawnList[RCL.toString()];

  for (let i = 0; i < spawnList.length; i++) {
    pop[spawnList[i]] = _.filter(Game.creeps, (creep) => (creep.memory.role === spawnList[i] && creep.memory.home === room.name)).length;
  }
  //lgO(pop);
  return pop
};