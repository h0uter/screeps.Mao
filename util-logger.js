module.exports = {
  /** @param {Creep} creep **/
  run: function () {
    //CONSOLE LOGGING
    for (let roomName in Game.rooms) {
      //ENERGY DATA
      let room = Game.rooms[roomName];
      console.log('--------------------------------------------------------------------------------')
      console.log('>>Room: ' + roomName + ' - RCL: ' + room.controller.level +' (' + Math.round(room.controller.progress*100/room.controller.progressTotal) + '%) - E: ' + room.energyAvailable + "/" + room.energyCapacityAvailable);

      
      let roleListLog = '';
      let roleList = Memory.rooms[roomName].roleList;
      //TODO also roleListLog active jobs with #
      for (let rol in roleList) {
        roleListLog += rol + 's: ' + roleList[rol] + ' | ';
      }
      console.log('>>Pops: ' + roleListLog);

      let jobListLog = '';
      let jobList = Memory.rooms[roomName].jobList;
      _.forIn(jobList, function (value, key) {
        jobListLog += key + ': ' + value + ' | ';
      });
      console.log('>>Jobs: ' + jobListLog);
    }
    // console.log('>>CPU: ' + Game.cpu.tickLimit + '/' + Game.cpu.bucket);
  },
  cpu: function() {
    console.log('>>CPU: ' + Game.cpu.tickLimit + '/' + Game.cpu.bucket + ' used: ' + Game.cpu.getUsed());
  }
};
