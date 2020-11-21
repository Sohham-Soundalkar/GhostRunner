var PLAY = 0;
var END = 1;
var gameState = PLAY;
var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var spookySound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  spookySound.loop();
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = -4;
  
  ghost = createSprite(200,420,20,20);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("black");
 
  if(gameState === PLAY){
     if(tower.y<0){
    tower.y = 300;
  }
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x -3;
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
    
     spawnDoors();
  
  ghost.velocityY = ghost.velocityY + 0.8;
  
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
    gameState = END;
  } 
}
if(gameState === END){
  stroke("yellow");
  fill("yellow");
  textSize(25);
  text("Game Over", 220, 200);
}
  
  
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 200 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImage);
    var climber = createSprite(200,10);
    climber.addImage(climberImage);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 1;
    door.x = Math.round(random(200,400));
    door.velocityY = 1;
    climber.x = door.x;
    invisibleBlock.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    door.lifetime = 600;
    invisibleBlock.lifetime = 600;
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1;
    invisibleBlock.debug = true;
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}