
  'use strict';
  function Play() {}
  Play.prototype = {
    defaultMonitorText: "Your Moves: ",
    upKey: null,
    downKey: null,
    leftKey: null,
    rightKey: null,
    glob: null,
    anim: null,
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
//      glob.animations.play('left-center', 20, false);
      glob.animations.play('up', 20, false);
          break;
          case 40:
            toAppend = "▼";
//      glob.animations.play('right-center', 20, false);
      glob.animations.play('down', 20, false);
          break;
          case 37:
            toAppend = "◀";
      glob.animations.play('left', 20, false);
          break;
          case 39:
            toAppend = "▶";
      glob.animations.play('right', 20, false);
          break;
        }

        this.monitorText.text = this.monitorText.text + toAppend;  
      }

      var glob = this.game.add.sprite(this.game.world.centerX - 250 , this.game.world.centerY - 380, 'glob');
      glob.animations.add('left', [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0], true);
      glob.animations.add('right', [0, 10, 9, 8, 7, 6, 7, 8, 9, 10, 0], true);
      glob.animations.add('up', [0, 11, 12, 13, 14, 15, 14, 13, 12, 11, 0], true);

    },
    update: function() {

      this.upKey.onDown.add(this.appendMove, this);
      this.downKey.onDown.add(this.appendMove, this);
      this.rightKey.onDown.add(this.appendMove, this);
      this.leftKey.onDown.add(this.appendMove, this);


    },
//      this.glob.play("left", 20, true);
  };
  
  module.exports = Play;