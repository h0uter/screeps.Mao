//ROOM LOGIC
Room.prototype.director = function() {
  this.monitor();

  //TOWERS
  let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
  for (let tower of towers) {
    tower.defend();
  }

  //DIRECTING
  // if (this.memory.constructionSites.length) {
  //   //construction job available
  // }


  //CREEPS
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    // creep.memory.job = false;
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
Room.prototype.monitor = function () {
  //INFO
  //TODO job targets: repair, jobConstruct

  // Memory.rooms[this.name] = {
  this.memory = {
    creeps: this.roomCreeps(),
    RCL: this.getRCL(),
    constructionSites: this.find(FIND_CONSTRUCTION_SITES),
    roleList: this.howManyOfEach('role'),
    jobList: this.howManyOfEach('job'),

  }
};

Room.prototype.roomCreeps = function() {
  //_.filter(Game.creeps, (creep) => (creep.memory.home === this.room.name))
  let list = {};
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.home === this.name) {
      list[creep.name] = creep.id
    }
  }
  return list
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