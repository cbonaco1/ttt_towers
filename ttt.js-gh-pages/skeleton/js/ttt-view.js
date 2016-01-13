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
    $square.addClass("clicked");
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

  var mark = this.game.board.grid[row][col];
  $square.text(mark);
  $square.addClass(mark);

  //check if someone won
  if (this.game.isOver()) {
    var $endNotification = $("<h2>");
    var winner = this.game.winner();
    if (winner) {
      $endNotification.text("You win: " + winner.toUpperCase() + "!!!!");
    } else {
      $endNotification.text("It's a draw!!");
    }
    this.$el.append($endNotification);
    //winner is green with white colors, loser is red text
    //change all squares to non clickable
    this.finishGame(winner);
  }

};

View.prototype.finishGame = function(winner) {
  $("." + winner).addClass("winner");
  $("li").not(".winner").addClass("loser");


  $("li").off("click");
};

View.prototype.setupBoard = function () {

  var $list = $("<ul></ul>");
  $list.addClass("group");

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var $square = $("<li></li>");
      $square.attr("row", i);
      $square.attr("col", j);
      $square.addClass("ttt-square")
      $list.append($square);
    }
  }

  this.$el.append($list);
};

module.exports = View;
