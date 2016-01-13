var View = function(game, el) {
  this.game = game;
  this.el = el;
  this.setupTowers();
  this.fromTower = null;
  this.clickTower();
};

View.prototype.setupTowers = function() {
  console.log("entered");
  var $tower1 = $("<ul></ul>").addClass("tower-1");
  var $tower2 = $("<ul></ul>").addClass("tower-2");
  var $tower3 = $("<ul></ul>").addClass("tower-3");
  for (var i=1; i<=3; i++) {
    var $disc = $("<li></li>");
    $disc.addClass("disk-" + i);
    $tower1.append($disc);
  }
  this.el.append($tower1);
  this.el.append($tower2);
  this.el.append($tower3);
};

View.prototype.render = function() {

};

View.prototype.clickTower = function () {
  $("ul").on("click", function(e){
    var $tower = $(e.currentTarget);
    //second click
    if (this.fromTower) {
      var topDisk = this.fromTower.children()[0];
      debugger


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
