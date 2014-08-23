
  'use strict';
  function Play() {}
  Play.prototype = {
    defaultMonitorText: "Your Moves: ",
    upKey: null,
    downKey: null,
    leftKey: null,
    rightKey: null,
    create: function() {

      this.textStyle = {font: "30px Sans", fill: "#ffffff", align: "left"};
      this.monitorText = this.game.add.text(this.game.world.centerX, this.game.height-75, 'Your moves: ', this.textStyle);
      this.monitorText.anchor.setTo(0.5, 0.5);

      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

      this.appendMove = function(keyEvent){
        console.log(keyEvent);
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
        console.log(toAppend);
        this.monitorText.text = this.monitorText.text + toAppend;  
      }

    },
    update: function() {

      this.upKey.onDown.add(this.appendMove, this);
      this.downKey.onDown.add(this.appendMove, this);
      this.rightKey.onDown.add(this.appendMove, this);
      this.leftKey.onDown.add(this.appendMove, this);

  };
  
  module.exports = Play;