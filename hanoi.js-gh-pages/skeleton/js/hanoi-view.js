var View = function(game, el) {
  this.game = game;
  this.el = el;
  this.setupTowers();
  this.fromTower = null;
  this.clickTower();
};

View.prototype.setupTowers = function() {
  var $tower1 = $("<ul></ul>").addClass("0");
  var $tower2 = $("<ul></ul>").addClass("1");
  var $tower3 = $("<ul></ul>").addClass("2");

  for (var i=1; i<=3; i++) {
    var $disc = $("<li></li>");
    $disc.addClass("disk-" + i);
    $tower1.append($disc);

    $tower2.append($("<li></li>").addClass("invisible"));
    $tower3.append($("<li></li>").addClass("invisible"));
    // $tower3.append("<li></li>");
  }
  this.el.append($tower1);
  this.el.append($tower2);
  this.el.append($tower3);
};

View.prototype.render = function($tower, topDisk) {
  //replace the first child that is not a disk
  var disk = topDisk;
  for (var i=2; i>=0; i--) {
    var child = $($tower.children()[i]);
    if (child.hasClass("invisible")) {
      child.removeClass("invisible");
      var topdiskclass = topDisk.attr("class");
    }
  }
  // for (var i=2; i>=0; i--) {
  //   if ()
  // }
  // $tower.prepend(topDisk);
};

View.prototype.clickTower = function () {
  $("ul").on("click", function(e){
    var $tower = $(e.currentTarget);
    //second click
    if (this.fromTower) {
      var topDisk = this.fromTower.children()[0];

      //validate move
      var startTowerIdx = parseInt(this.fromTower.attr('class'));
      var endTowerIdx = parseInt($tower.attr('class'));

      if (this.game.move(startTowerIdx, endTowerIdx)) {
        this.render($tower, topDisk);
      } else {
        alert("Invalid move!");
      }

      this.fromTower.removeClass("selected");
      this.fromTower = null;
    }
    //first click
    else {
      console.log(this.fromTower);
      this.fromTower = $tower;
      $tower.addClass("selected");
    }
  }.bind(this));
};

module.exports = View;
