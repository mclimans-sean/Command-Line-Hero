var utility = {

  getElement: function(_id) {
    return document.getElementById(_id);
  },

  getRandomColor: function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },


  getRandomRange : function (_max, _min) {
    return Math.floor(Math.random() * (_max - _min)) + _min;
  },

};
