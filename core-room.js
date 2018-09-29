//ROOM LOGIC
Room.prototype.director = function() {
  roomInfo = this.monitor();

  //CREEPS
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.room === this) {

      Roles[creep.memory.role].run(creep);
    }
  }

  //SPAWNING
  for (let spawnName in Game.spawns) {
    if (Game.spawns[spawnName].room === this) {
      Game.spawns[spawnName].spawnLogic();
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
  //TODO job targets: repair, construct

  Memory.rooms[this.name] = {
    creeps: this.creepList(),
    RCL: this.getRCL(),
    constructionSites: this.find(FIND_CONSTRUCTION_SITES),
    roleList: this.howManyOfEach('role'),
    jobList: this.howManyOfEach('job'),
  }
};

Room.prototype.creepList = function() {
  let creeps = _.filter(Game.creeps, { memory: { home: this.name } } );
  lg(creeps)
}


Room.prototype.howManyOfEach = function(key) {
  //counts the occurance of the specified key in creep memory per room
  //getJobs en get Population zijn het zelfde
  let list = {};
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.room === this) {
      list[creep.memory[key]] = list[creep.memory[key]] + 1 || 1;
    }
  }
  return list
}

Room.prototype.getRCL = function() {
  return this.controller.level
};