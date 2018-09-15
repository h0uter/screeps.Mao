StructureSpawn.prototype.cleanMemory = function () {
  //DELETE UNUSED MEMORY
  for (let i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i];
      // console.log('Clearing non-existing creep memory:', name);
    }
  }
};

StructureSpawn.prototype.buildTestCreep = function () {
  this.cleanMemory();
  let newName = 'Test' + Game.time;
  let body = [WORK, MOVE, CARRY];
  return this.spawnCreep(body, newName, {
    memory: {
      role: 'engineer',
      full: false,
      target: false,
      home: this.room.name
    }
  });
}