var HanoiView = require('./hanoi-view.js'); //...require appropriate file
var HanoiGame = require('../../hanoi-core-solution/game.js');

$(function () {
  var rootEl = $('.hanoi');
  var game = new HanoiGame();
  new HanoiView(game,rootEl);
});
