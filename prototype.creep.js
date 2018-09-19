

Creep.prototype.fullState =
  function () {
    if (this.memory.full && this.carry.energy === 0) {
      this.memory.full = false;
      // this.clearTargets();
      this.say('🔄');
    }
    if (!this.memory.full && this.carry.energy === this.carryCapacity) {
      this.memory.full = true;
      // this.clearTargets();
      this.say('💯');
    }
  };

Creep.prototype.executeJob = function () {
  //lg('heyyeye'+Roles[this.memory.role][this.memory.job](this));
  Roles[this.memory.role][this.memory.job](this);
};

Creep.prototype.assignJob = function (job) {
  this.memory.job = job;
};

Creep.prototype.hasJob = function () {
  return !!this.memory.job;
};

Creep.prototype.harvestSource = function () {
  let sources = this.room.find(FIND_SOURCES);
  let unattendedSource = _.filter(sources, source => source.targetedBy.length == 0)[0];
  if (unattendedSource) {
    this.task = Tasks.harvest(unattendedSource);
  } else {
    this.task = Tasks.harvest(sources[0]);
  }
  // let source = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  // if (this.harvest(source) === ERR_NOT_IN_RANGE) {
  //   this.moveTo(source, {reusePath: 10, visualizePathStyle: {stroke: '#00ff23'}});
  // }
};

//TODO Object literal: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
Creep.prototype.identify =
  function () {
    if (Game.time % 5 === 0) {
      switch (this.memory.job) {
        case 'construct':
          this.say('🔨');
          break;
        case 'harvest':
          this.say('🌾');
          break;
        case 'haul':
          this.say('🚛');
          break;
        case 'mine':
          this.say('⛏');
          break;
        case 'remoteHarvest':
          this.say('🚛 🌾');
          break;
        case 'repair':
          this.say('🔧️');
          break;
        case 'upgrade':
          this.say('⚡');
          break;
        case 'fortify':
          this.say('🛡️');
          break;
        default:
          this.say('**')
          break;
      }
    }
  };

function getDrink (type) {
  var drinks = {
    'coke': function () {
      return 'Coke';
    },
    'pepsi': function () {
      return 'Pepsi';
    },
    'lemonade': function () {
      return 'Lemonade';
    },
    'default': function () {
      return 'Default item';
    }
  };
  return (drinks[type] || drinks['default'])();
}