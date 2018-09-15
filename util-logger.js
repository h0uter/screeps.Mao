module.exports = {
  /** @param {Creep} creep **/
  run: function () {
    //let {claimers, harvesters, upgraders, builders, repairers, miners, haulers, wallers, remoteHarvesters} = unitCount();


    //CONSOLE LOGGING
    for (let roomName in Game.rooms) {
      //ENERGY DATA
      let kamer = Game.rooms[roomName];
      console.log('>>Energy in room ' + roomName + ': ' + kamer.energyAvailable + "/" + kamer.energyCapacityAvailable);
      //console.log('>>Harvesters: ' + harvesters.length,' | Upgraders: ' + upgraders.length, ' | Builders: ' + builders.length,' | Repairers: ' + repairers.length,' | Miners: ' + miners.length,' | Haulers: ' + haulers.length,' | Wallers: ' + wallers.length, ' | remoteHarvesters: ' + remoteHarvesters.length,' | claimers: ' + claimers.length);
    }
  }
};
