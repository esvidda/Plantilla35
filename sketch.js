var balloon,balloonImage1,balloonImage2;
// crea aquí la variable para la base de datos y la variable de posición 
var database;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
   database=firebase.database();
  // database=firebase.database;
  // database=database();

  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;


  // var balloonHeight=database.refer('balloon/height');
   var balloonHeight=database.ref('balloon/height');
  // var balloonHeight=database.ref('height');
  
   balloonHeight.on("value",readHeight);
  // balloonHeight.on(readHeight);
  // balloonHeight.in("value",readHeight);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección ascendente
    updateHeight(0,-10);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //escribe el código para mover el globo aerostático en dirección descendente
    updateHeight(0,+10);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}
function updateHeight(x,y){
   database.ref('balloon/height').set({
  // database.ref('balloon/height').settting({
  // database.ref('height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  // height = data.value();
   height = data.val();
  // height = data.val;
 
  balloon.x = height.x;
  balloon.y = height.y;
}
