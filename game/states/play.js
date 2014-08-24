
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
      this.monitorText = this.game.add.text(this.game.world.centerX, this.game.height-75, this.defaultMonitorText, this.textStyle);
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
          break;
          case 40:
            toAppend = "▼";
          break;
          case 37:
            toAppend = "◀";
          break;
          case 39:
            toAppend = "▶";
          break;
        }

        this.monitorText.text = this.monitorText.text + toAppend;  
      }

      var glob = this.game.add.sprite(this.game.world.centerX - 250 , this.game.world.centerY - 300, 'glob');
      glob.animations.add('center-left');
      glob.animations.add('left-center');
      glob.animations.play('center-left', 20, true);

//        this.game.add.sprite(0, 0, "glob")
//        this.glob = game.add.sprite(100, 100, "glob");
//        this.glob.animations.add("left");

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