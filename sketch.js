var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running,monkey_collided;
var ground,invisibleGround;
var obstaclesGroup,obstacle1;
var fruitsGroup;
var score;
function preload(){
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkey_collided = loadAnimation("sprite_0.png","sprite_1.png");
obstacle1 = loadImage("obstacle.png");
fruits1 = loadImage("banana.png")
}
function setup() {
createCanvas(600, 400); 
monkey = createSprite(50,180,30,50);
monkey.addAnimation("running", monkey_running);
monkey.addAnimation("collided",monkey_collided);
monkey.scale = 0.1;
  
ground = createSprite(200,390,400,20);
ground.x = ground.width /2;
ground.visible = false; 
  
invisibleGround = createSprite(200,390,900,10);
invisibleGround.visible = true;
obstaclesGroup = createGroup();
fruitsGroup = createGroup();
  
console.log("Hello" + 5);
monkey.setCollider("rectangle",0,0,400,monkey.height);
monkey.debug = false
score = 0; 
}
function draw() {
background('green');
text("Score: "+ score, 500,50);
console.log("this is ",gameState)
if(gameState === PLAY){
ground.velocityX = -(4+3*score/100);
score = score + Math.round(frameCount/60);
if (score>0 && score%100 === 0){
}
    
if (ground.x < 0){
ground.x = ground.width/2;
 }
if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -12;
    }
monkey.velocityY = monkey.velocityY + 0.8
spawnFruits();
spawnObstacles();
    
if(obstaclesGroup.isTouching(monkey)){
monkey.velocityY=-12
}
if(score>3000){
monkey.scale=0.3
}
}
else if (gameState === END) {
console.log("hey")
ground.velocityX = 0;
trex.velocityY = 0
     
monkey.changeAnimation("collided",monkey_collided);
obstaclesGroup.setLifetimeEach(-1);
fruitsGroup.setLifetimeEach(-1);
     
obstaclesGroup.setVelocityXEach(0);
fruitsGroup.setVelocityXEach(0);
} 
monkey.collide(invisibleGround);
drawSprites();
}    
function spawnObstacles(){
if (frameCount % 60 === 0){
var obstacle = createSprite(400,165,10,40);
obstacle.velocityX = -(6+score/100)
obstacle.y=370
obstacle.addImage(obstacle1)
obstacle.scale = 0.1;
obstacle.lifetime = 300;
obstaclesGroup.add(obstacle);
 }
}
function spawnFruits() {
if (frameCount % 60 === 0) {
fruit = createSprite(600,100,40,10);
fruit.y = Math.round(random(40,60));
fruit.addImage(fruits1);
fruit.scale = 0.1        ;
fruit.velocityX = -3;
fruit.lifetime = 170;
fruit.depth = monkey.depth;
monkey.depth = monkey.depth + 1;
fruitsGroup.add(fruit);
}}




