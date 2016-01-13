var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
};

View.prototype.bindEvents = function () {
};

View.prototype.makeMove = function ($square) {
};

View.prototype.setupBoard = function () {

  var $list = $("<ul></ul>");
  $list.addClass("group");

  for (var i = 1; i <= 9; i++) {
    $list.append("<li></li>");
  }
  this.$el.append($list);


};

module.exports = View;
