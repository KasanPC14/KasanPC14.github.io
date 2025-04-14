var camBobVar = 0;

var pistolTexture = null;
var fps_text = null;
var camBobMultiple = 20;
var camBobSpeed = 250;

var canShoot = true;

function gameSetup(){
    player = new Player(50, 100, 0);

    //UI
    fps_text = new UI_Text(50,50,"TEXT_FPS","0 FPS");
    pistolTexture = new UI_Texture(120,50,"TEXTURE_PISTOL",600,600,["Req/res/tex/pistol1.png","Req/res/tex/pistol2.png"]);
    
    //MAP LOAD
    loadMap(player,_1_0);

    //pistolTexture = getUIComponentByName("TEXTURE_PISTOL");

    //EVENTS
    BindFunction(FunctionTypes.onMouseDown, onMouseDown);

    setInterval(FPSTextUpdate,1000);
}

function gameUpdate(){
    

    //THIS IF-ELSE STATEMENT PROVIDES GUN BOBBING EFFECT WHILE PLAYER IS WALKING.
    if (Math.abs(player.velocity[0]) > 0 || Math.abs(player.velocity[1]) > 0){
        camBobVar += _deltaTime*camBobSpeed;
        pistolTexture.x = 120 + Math.cos(degtorad(camBobVar-90)) * camBobMultiple * 3/2;
        pistolTexture.y = 50 + Math.sin(degtorad(camBobVar*2 + 180)) * camBobMultiple;
    }
    else {
        camBobVar = camBobVar%360;
        pistolTexture.x = 120;
        pistolTexture.y = 50;
    }

    
}

function onMouseDown(button){
    console.log("a")
    if (button == MouseButtons.LeftMouseButton){
        if (canShoot) {
            canShoot = false;
            pistolTexture.frame = 1;
            
            setTimeout(()=>{
                pistolTexture.frame = 0;
                canShoot = true;
            },250);
        }
        
    }
}

function FPSTextUpdate(){
    fps_text.text = Math.round(1/_deltaTime).toString() + " FPS";
}