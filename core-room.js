//ROOM LOGIC

Room.prototype.director = function() {
  roomInfo = this.monitor();

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

Room.prototype.monitor = function () {
  //INFO
  Memory.rooms[this.name] = {
    constructionSites: this.find(FIND_CONSTRUCTION_SITES),
    population: this.getPopulation(),
  }
};

Room.prototype.jobs = function() {

}

Room.prototype.getRCL = function() {
  return this.controller.level
}

Room.prototype.getPopulation = function () {
  let RCL = this.getRCL();
  let pop = {};
  let spawnList = Config.spawnList[RCL.toString()];

  for (let i = 0; i < spawnList.length; i++) {
    pop[spawnList[i]] = _.filter(Game.creeps, (creep) => (creep.memory.role === spawnList[i] && creep.memory.home === this.name)).length;
  }
  //lgO(pop);
  return pop
};