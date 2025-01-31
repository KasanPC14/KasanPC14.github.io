var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = null;

var wallHeights = 15000;
var wallWidths = 800;
var brightness = 60;

var isMap = false;

setColor(ctx, 255, 255, 255, 255);


//MAIN 2D GAME

function Draw2D() {
    
    ctx.clearRect(0,0,800,600);


    player.draw2D(ctx);

    for (let i = 0; i < Rays.length; i++) {
        Rays[i].Draw(ctx);
    }

    for (let i = 0; i < Objects.length; i++) {
        Objects[i].Draw2D(ctx);
    }
}

function Draw3D(){

    //Sorting rays from their z-index(distance)
    player.lookRays = QuickSort(player.lookRays);

    //ray_i stands for index of the ray
    
    for (let ray_i = 0; ray_i < player.lookRays.length; ray_i++){
        
        //if lookray has atleast one collision point, we are drawing it.
        if (player.lookRays[ray_i].colPoints.length > 0){
            var rayHit_x = player.lookRays[ray_i].colPoints[0][0];
            var rayHit_y = player.lookRays[ray_i].colPoints[0][1];
            
            var hitObj = player.lookRays[ray_i].hitObjects[0];
            
            var dis = getDistance(player.x,player.y,rayHit_x,rayHit_y);
            
            //Setting its color to (rgb * brightness / distance)
            setColor(ctx, hitObj.color[0] * brightness/dis , hitObj.color[1] * brightness/dis, hitObj.color[2] * brightness/dis, 255);
            
            //queue of the ray => order of the ray left to right
            //
            //TODO: Solve the fisheye problem.
            ctx.fillRect((player.lookRays[ray_i].queue) * 800/player.lookRays.length, 300 + player.camRotV - 1/dis*wallHeights/2, (1/dis) * wallWidths, (1/dis)*wallHeights);
        }

    }   

   
}

function Update() {

    //
    
    //Draw
    ctx.clearRect(0, 0, 800, 600);
    
    Draw3D();

    if (isMap) Draw2D();
    


    //
    player.Update();

}

function Setup() {

    

    ///
    player = new Player(100, 100, 0);

    var n_obj= new Obj([[400,300],[500,300],[500,400],[400,400]]);
    n_obj.setColor(0,255,0);
    Objects.push(n_obj);
  

    n_obj = new Obj([[250,150],[350,50],[450,150],[400,275],[300,275]]);
    n_obj.setColor(0,0,255);
    Objects.push(n_obj);
    

    //Fire Update
    setInterval(Update, 1000/refreshRate);
}

//INPUTS

canvas.addEventListener("click", ()=>{
    canvas.requestPointerLock({unadjustedMovement: true,});
})

window.addEventListener("mousemove", (event)=>{

    //Sets the quantity of the mouse position's change
    mouseDragPos[0] = event.movementX;
    mouseDragPos[1] = event.movementY;

    //Turn the player
    player.rot += mouseDragPos[0] * player.mouseSens;
    player.camRotV += -mouseDragPos[1] * player.mouseSens * 5;

    //Sets the mouse position
    mousePos[0] = event.clientX;
    mousePos[1] = event.clientY;
})

window.addEventListener("keydown", (event) => {
    if (Key[event.key] == false) {
        Key[event.key] = true;
    }

    if (event.key == "m") isMap = !isMap;

});

window.addEventListener("keyup", (event) => {
    if (Key[event.key] == true) {
        Key[event.key] = false;
    }

});

//
Setup();