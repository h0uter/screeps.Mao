module.exports = {
  /** @param {Creep} creep **/
  run: function () {
    //CONSOLE LOGGING
    for (let roomName in Game.rooms) {
      //ENERGY DATA
      let room = Game.rooms[roomName];
      console.log('>>Energy in room ' + roomName + ': ' + room.energyAvailable + "/" + room.energyCapacityAvailable);

      let popLog = '';
      let pop = Memory.rooms[roomName].roleList;
      //TODO also popLog active jobs with #
      for (let rol in pop) {
        popLog +=  rol + 's: ' + pop[rol] + ' | ';
      }
      console.log('>>Pops: ' + popLog);
    }
    console.log('>>CPU: ' + Game.cpu.tickLimit + '/' + Game.cpu.bucket);
  }
};
