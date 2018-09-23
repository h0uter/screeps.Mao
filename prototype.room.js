
/** @function
 @param {array} structureTypes
 @param {string} capacity
 @param {string} contents
 @param {int} stock
 */
Room.prototype.priorityFind = function (structureTypes, capacity, contents, stock=0) {

  let targets = this.find(FIND_MY_STRUCTURES, {
    filter: (s) => {
      return (
        ((s.structureType === structureTypes[0] || s.structureType === structureTypes[1] || s.structureType === structureTypes[2])
          && stock >= s[capacity] - s[contents])
      );
    }
  });
}
