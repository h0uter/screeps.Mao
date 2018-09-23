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
    lg('bijna uitgestorven');
    this.buildCreep('harvester', 200)
  } else {
    //TODO population import
    let RCL = this.room.controller.level;

    let spawnList = Config.spawnList[RCL.toString()]; //arr
    let pop = roomPopulation(this.room);
    //lgO(pop);

    for (let i = 0; i < spawnList.length; i++) {
      if (pop[spawnList[i]] < Config.populationSetting[spawnList[i]]) {
        lg(spawnList[i]);
        return this.buildCreep(spawnList[i]);
      }
    }
  }
  if (this.spawning) {
    let spawningCreep = Game.creeps[this.spawning.name];
    this.room.visual.text(
      '🛠️' + spawningCreep.memory.role,
      this.pos.x + 1,
      this.pos.y,
      {align: 'left', opacity: 0.8});
  }
};

StructureSpawn.prototype.buildCreep = function (role, spawnEnergy = this.room.energyCapacityAvailable) {
  this.cleanMemory();
  let body = [];
  let newName = _.capitalize(role) + Game.time;
  //TODO make smooth bodybuilder
  let WCM = {
    balanced: [1, 1, 1],
    miner: [1, 0, 1]

  };

  let baseCost = {
    harvester: 200,
    engineer: 200,
    miner: 150,
  };
  let bodyBuilder = {
    balanced: function () {
      return [1,1,1].map(function (x) { return x * _.floor(spawnEnergy/baseCost.harvester)});
    }
  };

  lg(bodyBuilder.balanced());

  let workParts = {
    harvester: _.floor(spawnEnergy/baseCost.harvester),
    engineer: _.floor(0.75*(spawnEnergy/baseCost.engineer))
  };
  let carryParts = {
    harvester: workParts.harvester,
    engineer: workParts.engineer,
  };
  let moveParts = {
    harvester: workParts.harvester,
    engineer: workParts.engineer,
  };

  for (let i = 0; i < workParts[role]; i++) {body.push(WORK)}
  for (let i = 0; i < carryParts[role]; i++) {body.push(CARRY)}
  for (let i = 0; i < moveParts[role]; i++) {body.push(MOVE)}

  //lg(body);
  return this.spawnCreep(body, newName, {
    memory: {
      role: role,
      full: false,
      target: false,
      home: this.room.name
    }
  });
};