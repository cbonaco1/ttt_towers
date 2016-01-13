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
  // var list = document.createElement("ul");
  // var square = document.createElement("li");

  var list = this.$el.append("<ul></ul>");

  for (var i = 1; i <= 9; i++) {
    list.append("<li></li>");
  }
};

module.exports = View;
