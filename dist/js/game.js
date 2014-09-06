(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'headtester');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
    this.load.image('glob', 'assets/spritetest.png', 503, 490, 6);
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    defaultMonitorText: "Your Moves: ",
    upKey: null,
    downKey: null,
    leftKey: null,
    rightKey: null,
    gob: null,
    anim: null,
    state: {
      step: 0,
      level: 0,
    },
    levels: [
      ["u", "r", "l", "u"],
      ["u", "u", "r", "r", "l", "l"],
    ],
    create: function() {

      this.textStyle = {font: "30px Sans", fill: "#ffffff", align: "left"};
      this.monitorText = this.game.add.text(this.game.world.centerX, this.game.height-50, this.defaultMonitorText, this.textStyle);
      this.monitorText.anchor.setTo(0.5, 0.5);

      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);


      this.appendMove = function(keyEvent){
        var toAppend = null,
        returnedKey = keyEvent.keyCode;
        switch (returnedKey){
          case 38:
            toAppend = "▲";
            gob.animations.play('up', 20, false);
          break;
          case 40:
            toAppend = "▼";
            gob.animations.play('down', 20, false);
          break;
          case 37:
            toAppend = "◀";
            gob.animations.play('left', 20, false);
          break;
          case 39:
            toAppend = "▶";
            gob.animations.play('right', 20, false);
          break;
        }
        this.monitorText.text = this.monitorText.text + toAppend;  
      }


      this.simonSays = function(direction){
        switch (direction){
          case "u":
            console.log(direction);
            gob.animations.play('up' + " u", 20, false);
          break;
          case "l":
            console.log(direction + " l");
            gob.animations.play('left', 20, false);
          break;
          case "r":
            console.log(direction + " r");
            gob.animations.play('right', 20, false);
          break;
          default:
          break;
        }
        return
      }


      // ========================================================

      var gob = this.game.add.sprite(this.game.world.centerX - (250*0.8) , this.game.world.centerY - (380*0.8), 'gob');
      gob.scale.setTo(.8, .8);
      gob.animations.add('left', [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], true);
      gob.animations.add('right', [0, 10, 9, 8, 7, 6, 7, 8, 9, 10, 0], true);
      gob.animations.add('up', [0, 11, 12, 13, 14, 15, 14, 13, 12, 11, 0], true);

      ASDASF
      // THIS IS THE PROBLEM. Why can state get state, but levelz can't get levelz?!??!?!?!?
      var state = this.game.state;
      var levelz = this.game.levels;
      console.log(levelz);

      var letsTryThisAgain = function(){
        console.log(levelz);
        if (levelz.length < state.step) {
          state.step = 0;
          return
        };

//        console.log(this.levels[this.currentLevel][this.currentStep]);
        this.currentStep++;
                //        for (var i = this.levels.length - 1; i >= 0; i--) {
                //          console.log(this.levels[i]);
                //        };
      }

      gob.events.onAnimationComplete(letsTryThisAgain(), this);



                // Track state (current step in level's command list / current level)
                // The initial function and the onAnimationComplete are prob the same function
                // if step > length return


      this.initLevel = function(){
//        this.levels[this.currentLevel].forEach(this.simonSays);

        letsTryThisAgain();

      }


    },
    update: function() {

      this.upKey.onDown.add(this.appendMove, this);
      this.downKey.onDown.add(this.appendMove, this);
      this.rightKey.onDown.add(this.appendMove, this);
      this.leftKey.onDown.add(this.appendMove, this);

      this.initLevel(0);

    },
    
//      this.gob.play("left", 20, true);
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.spritesheet('gob', 'assets/gob-lossy.png', 503, 590, 16);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1]);