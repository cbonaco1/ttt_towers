var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var $el = $(".ttt");
  var game = new Game();
  var view = new View(game, $el);

  console.log("ENTER");


});
