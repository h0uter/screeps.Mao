StructureSpawn.prototype.cleanMemory = function () {
  //DELETE UNUSED MEMORY
  for (let i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i];
      // console.log('Clearing non-existing creep memory:', name);
    }
  }
};


StructureSpawn.prototype.spawnLogic = function () {
  if (_.filter(Game.creeps, (creep) => (creep.memory.home === this.room.name)).length <= 1) {
    lg('bijna uitgestorven')
    this.buildCreep('harvester')
  } else {
    //TODO population import
    let RCL = this.room.controller.level;

    let spawnList = Config.spawnList[RCL.toString()]; //arr
    let pop = roomPopulation(this.room);
    lgO(pop);

    for (let i = 0; i < spawnList.length; i++) {
      if (pop[spawnList[i]] < Config.populationSetting[spawnList[i]]) {
        //lg(spawnList[i]);
        return this.buildCreep(spawnList[i]);
      }
    }
  }
};

StructureSpawn.prototype.buildCreep = function (role) {
  this.cleanMemory();
  //let newName = role + Game.time;

  let newName = _.capitalize(role) + Game.time;
  bodySettings = {
    harvester: {
      baseCost: 200,
    },
    engineer: {
      baseCost: 200,
    },
  };

  let body = [WORK, MOVE, CARRY];

  return this.spawnCreep(body, newName, {
    memory: {
      role: role,
      full: false,
      target: false,
      home: this.room.name
    }
  });
};