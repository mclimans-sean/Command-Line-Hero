const HTTPRequest = {

  get : function (URL, callback) {
    // $.getJSON("https://cors-anywhere.herokuapp.com/" + URL, function(result) {
    //   callback();
    // });

    return $.getJSON("https://cors-anywhere.herokuapp.com/" + URL);
  }

}
