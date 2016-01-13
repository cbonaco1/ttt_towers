/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var HanoiView = __webpack_require__(1); //...require appropriate file
	var HanoiGame = __webpack_require__(2);

	$(function () {
	  var rootEl = $('.hanoi');
	  var game = new HanoiGame();
	  new HanoiView(game,rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Game () {
	  this.towers = [[3, 2, 1], [], []];
	};

	Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
	  var startTower = this.towers[startTowerIdx];
	  var endTower = this.towers[endTowerIdx];

	  if (startTower.length === 0) {
	    return false;
	  } else if (endTower.length == 0) {
	    return true;
	  } else {
	    var topStartDisc = startTower[startTower.length - 1];
	    var topEndDisc = endTower[endTower.length - 1];
	    return topStartDisc < topEndDisc;
	  }
	};

	Game.prototype.isWon = function () {
	  // move all the discs to the last or second tower
	  return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	};

	Game.prototype.move = function (startTowerIdx, endTowerIdx) {
	  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	    this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	    return true;
	  } else {
	    return false;
	  }
	};

	Game.prototype.print = function () {
	  console.log(JSON.stringify(this.towers));
	};

	Game.prototype.promptMove = function (reader, callback) {
	  this.print();
	  reader.question("Enter a starting tower: ", function (start) {
	    var startTowerIdx = parseInt(start);
	    reader.question("Enter an ending tower: ", function (end) {
	      var endTowerIdx = parseInt(end);
	      callback(startTowerIdx, endTowerIdx)
	    });
	  });
	};

	Game.prototype.run = function (reader, gameCompletionCallback) {
	  this.promptMove(reader, (function (startTowerIdx, endTowerIdx) {
	    if (!this.move(startTowerIdx, endTowerIdx)) {
	      console.log("Invalid move!");
	    }

	    if (!this.isWon()) {
	      // Continue to play!
	      this.run(reader, gameCompletionCallback);
	    } else {
	      this.print();
	      console.log("You win!");
	      gameCompletionCallback();
	    }
	  }).bind(this));
	};

	module.exports = Game;


/***/ }
/******/ ]);