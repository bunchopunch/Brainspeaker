
  'use strict';
  function Play() {}
  Play.prototype = {
    upKey: null,
    downKey: null,
    leftKey: null,
    rightKey: null,
    create: function() {
/*
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
      this.sprite.inputEnabled = true;
      
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.body.collideWorldBounds = true;
      this.sprite.body.bounce.setTo(1,1);
      this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
      this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);
*/
    this.textStyle = {font: "30px Sans", fill: "#ffffff", align: "center"};
    this.titleText = this.game.add.text(this.game.world.centerX, this.game.height-75, 'Your moves: ', this.textStyle);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.appendMove = function(direction){
      var toAppend = null;
      switch (direction){
        case "up":
          toAppend = "▲";
        break;
        case "down":
          toAppend = "▼";
        break;
        case "left":
          toAppend = "◀";
        break;
        case "right":
          toAppend = "▶";
        break;
      }
      console.log(toAppend);
    }

//    this.titleText


//      this.sprite.events.onInputDown.add(this.clickListener, this);
    },
    update: function() {

      if (this.upKey.isDown){
        this.appendMove("up");
      } else if (this.downKey.isDown) {
        this.appendMove("down");
      } else if (this.leftKey.isDown) {
        this.appendMove("left");
      } else if (this.rightKey.isDown) {
        this.appendMove("right");        
      }

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;