var command = {

  commands : ["left", "right", "up", "down", "clear", "help", "ls", "pause", "history", "slow", "attack", "reset"],
  currentCommand: "",
  historyList: [],

  left : function () {

  },

  right : function () {

  },

  up : function () {

  },

  down : function () {

  },

  clear : function () {

  },

  help : function () {

  },

  ls : function () {

  },

  pause : function () {

  },

  slow : function () {

  },

  attack : function () {

  },

  reset : function () {
    
  },

  history : function () {
    // console.log(this.historyList);
    return this.historyList;
  },

  checkCommand : function (_command) {
    for (var i = 0; i < this.commands.length; i++) {
      if (_command == this.commands[i]) {
        return true;
      }
    }
  },

  checkCommandSubString : function (substring) {
    for (var i = 0; i < this.commands.length; i++) {
      if(this.commands[i].includes(substring)) {
        return [true, this.commands[i]];
      }
    }
    return [false, null];
  }

}
