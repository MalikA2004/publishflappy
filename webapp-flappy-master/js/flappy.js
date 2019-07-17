// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

  // game.load.image("playerimg", "../assets/jamesBond.gif");
  game.load.image("playerimg2", "../assets/flappy_batman.png");
  game.load.image("playerimg", "../assets/star.png");
  game.load.image("backgroundImg", "../assets/png-night-sky-nightsky-png-1024.png");
  game.load.audio("Score", "../assets/point.ogg");
  game.load.image("pipeBlock", "../assets/pipe_pink.png")
  game.load.audio("music", "../assets/Queen-BohemianRhapsody.ogg")



}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.sound.play("music")
  game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.image(0, 0, "backgroundImg");

    game.stage.setBackgroundColor("#55d997");
    game.input.onDown.add(clickHandler);

     player = game.add.sprite(50,80, "playerimg");
     game.physics.arcade.enable(player);

     player.body.gravity.y = 100  ;






     labelScore = game.add.text(20, 20, "0");

     game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(playerJump);


  var pipeInterval = 2.75 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval, generatePipe

  );

  game.input
.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
.onDown.add(spaceHandler);




generatePipe();







}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player, pipes, gameOver
  );

function gameOver(){
  location.reload();
}

}

function playerJump() {
  player.body.velocity.y = -95;
}

function addPipeBlock(x, y){
  var block = game.add.sprite(x, y, "pipeBlock");
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -220 ;
}

function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for (var count=0; count < 8; count = count + 1) {
    if(count != gapStart && count != gapStart + 1 ) {
  addPipeBlock(800, count * 50)
}
}
   changeScore();
}
function moveRIGHT() {
  player.x = player.x + 10;
  changeScore();
}

function moveLEFT() {
  player.x = player.x - 10;
  changeScore();
}


function moveDOWN() {
  player.y = player.y + 10;
  changeScore();
}

function clickHandler(event) {
  var player2 = game.add.sprite(event.x, event.y, "playerimg");




}

// function spaceHandler() {
//    changeScore();
//
//    // game.sound.play("Score");
//  }

   function changeScore() {
     score = score + 1;
     labelScore.setText(score.toString())
     game.sound.play("Score");
   }
