var canvas = document.getElementById("window");
var ctx = canvas.getContext('2d');

const UpdateDelay = 10;
var Inputs = new IM();
var player = new Player(0,0);


function Draw(){
    
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(10,10,50,50);
}


function Update(){

    /*if (!backgroundMusic.onplaying){
        backgroundMusic.play();
        backgroundMusic.parentElement = canvas;
    }*/
    
    
    Inputs.getkey("W");
    Draw();
    ///////
    setTimeout(Update,UpdateDelay);
}


Update();
