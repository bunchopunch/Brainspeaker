
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
    currentLevel: 0,
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


      this.initLevel = function(){
        this.levels[this.currentLevel].forEach(this.simonSays);
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


      var gob = this.game.add.sprite(this.game.world.centerX - (250*0.8) , this.game.world.centerY - (380*0.8), 'gob');
      gob.scale.setTo(.8, .8);
      gob.animations.add('left', [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], true);
      gob.animations.add('right', [0, 10, 9, 8, 7, 6, 7, 8, 9, 10, 0], true);
      gob.animations.add('up', [0, 11, 12, 13, 14, 15, 14, 13, 12, 11, 0], true);

    },
    update: function() {

      this.upKey.onDown.add(this.appendMove, this);
      this.downKey.onDown.add(this.appendMove, this);
      this.rightKey.onDown.add(this.appendMove, this);
      this.leftKey.onDown.add(this.appendMove, this);

      this.initLevel();

    },
//      this.gob.play("left", 20, true);
  };
  
  module.exports = Play;