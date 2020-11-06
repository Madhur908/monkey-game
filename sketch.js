var PLAY=1;
var END=0
var gameState=PLAY
var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  FoodGroup=createGroup()
  obstacleGroup=createGroup()
survivalTime=0;
  score=0;
monkey=createSprite(80,315,20,20)
monkey.addAnimation("moving",monkey_running)
monkey.scale=0.1

  
ground=createSprite(400,350,900,10) 

   ground.velocityX=-5 


  
}


function draw() {
background("black")
  ground.x=ground.width/2
  monkey.collide(ground)  
   
  if(gameState===PLAY){
     stroke("white")
  textSize(20)
  fill("white")
  text("score:"+score,100,80)
    
    stroke("white")
  textSize(20)
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survival Time:"+survivalTime,100,50)
    
  
  if(keyDown("space")&&monkey.y>=300){  
    monkey.velocityY=-30 
  }
  if(monkey.isTouching(FoodGroup)){
    score=score+2
    FoodGroup.destroyEach()
     
    
  }
 
 bannanas() ; 
 obstacles();
  if(monkey.isTouching(obstacleGroup)){
    
    gameState=END;
  }
  }  
  else if(gameState===END){
   monkey.velocityX=0;
banana.velocityX=0;
    obstacle.velocityX=0;
     ground.velocityX=0;
     obstacleGroup.setLifetimeEach(-1)
     FoodGroup.setLifetimeEach(-1)
     stroke("white")
     textSize(20)
     text("GAME OVER",200,200)
      survivalTime=0;
    if(keyDown("space")){
      reset()
    }
  }

    
   
 
  gravity();
 
  
drawSprites();  
}
function bannanas(){
  if(frameCount%80===0){
    banana=createSprite(400,320,20,20) 
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.y=Math.round(random(120,200))
    console.log(banana.y)
    banana.velocityX=-5
    banana.lifetime=100;
    FoodGroup.add(banana)
  }
}

function gravity(){
  monkey.velocityY=monkey.velocityY+2
}

function obstacles(){
  if(frameCount%100===0){
    obstacle=createSprite(400,310,20,20)
    obstacle.addImage(obstaceImage)
    
    obstacle.scale=0.2
    obstacle.depth=ground.depth
    obstacle.velocityX=-5
    obstacle.lifetime=100
    obstacleGroup.add(obstacle)
  }
}
function reset(){
  gameState=PLAY
  FoodGroup.destroyEach()
  obstacleGroup.destroyEach()
  survivalTime=0;
  score=0;
}


