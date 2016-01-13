var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
  this.setupBoard();
  this.bindEvents();
};

View.prototype.bindEvents = function () {
  // var $li = this.$el.find("li");
  $("li").on("click", function(e) {
    var $square = $(e.currentTarget);
    console.log("Row: " + $square.attr("row"));
    console.log("Col: " + $square.attr("col"));

    var row = parseInt($square.attr("row"));
    var col = parseInt($square.attr("col"));
    try {
      this.game.playMove([row, col]);
      this.makeMove($square, row, col);
    }
    catch(MoveError){
      alert("Invalid move!");
    }

  }.bind(this));

};

View.prototype.makeMove = function ($square, row, col) {
  $square.css("background", "white");
  var mark = this.game.board.grid[row][col];
  $square.text(mark);

  //check if someone won
  var winner = this.game.winner();
  if (winner) {
    // alert("You win: " + winner);
    var $winNotification = $("<h2>").text("You win: " + winner.toUpperCase() + "!!!!");
    this.$el.append($winNotification);
  }

};

View.prototype.setupBoard = function () {

  var $list = $("<ul></ul>");
  $list.addClass("group");

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var $square = $("<li></li>");
      $square.attr("row", i);
      $square.attr("col", j);
      $list.append($square);
    }
  }

  this.$el.append($list);
};

module.exports = View;
