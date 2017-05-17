var utility = {

  getElement: function(_id) {
    return document.getElementById(_id);
  },

  getCoin: function(_row, _col) {
    for (var i = 0; i < factory.coinsArray.length; i++) {
      if (factory.coinsArray[i].row == _row && factory.coinsArray[i].col == _col) {

        return factory.coinsArray[i];
      }
    }
  },

  getGrid: function(_row, _col) {
    for (var i = 0; i < factory.gridArray.length; i++) {
      if (factory.gridArray[i].row == _row && factory.gridArray[i].col == _col) {

        return factory.gridArray[i];
      }
    }
  },

  getRandomColor: function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },

  setSelectionRange: function(input, selectionStart, selectionEnd) {

    // if (input.setSelectionRange) {
    //   input.focus();
    //   input.setSelectionRange(selectionStart, selectionEnd);
    // } else if (input.createTextRange) {
    //   var range = input.createTextRange();
    //   range.collapse(true);
    //   range.moveEnd('character', selectionEnd);
    //   range.moveStart('character', selectionStart);
    //   range.select();
    // }

  },

  getNonRepeatedRando: function (array) {

    var newArray = [];

    for (var i = 0; i < array.length; i++) {
      newArray[i] = array[i];
    }

    for (var j = 0; j < array.length; j++) {
      // array[j]
    }
  }

};
