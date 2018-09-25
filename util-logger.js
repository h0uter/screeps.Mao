module.exports = {
  /** @param {Creep} creep **/
  run: function () {
    //let {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters} = unitCount();


    //CONSOLE LOGGING
    for (let roomName in Game.rooms) {
      //ENERGY DATA
      let room = Game.rooms[roomName];
      console.log('>>Energy in room ' + roomName + ': ' + room.energyAvailable + "/" + room.energyCapacityAvailable);

      let pop = roomPopulation(room);
      let log = '';
      //TODO also log active jobs with #
      for (let rol in pop) {
        //for (let job in
        log +=  rol + 's: ' + pop[rol] + ' | ';
      }
      console.log('>>Pops: ' + log);
    }
  }
};
