var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = null;

var wallHeights = 15000;
var wallWidths = 800;
var brightness = 100;

var isMap = false;



setColor(ctx, 255, 255, 255, 255);


//MAIN 2D GAME

function Draw2D() {

    ctx.clearRect(0, 0, 800, 600);


    player.draw2D(ctx);

    for (let i = 0; i < Rays.length; i++) {
        Rays[i].Draw(ctx);
    }

    for (let i = 0; i < Objects.length; i++) {
        Objects[i].Draw2D(ctx);
    }
    for (let i = 0; i < Entities.length; i++) {
        Entities[i].Draw2D(ctx);
    }

}

function Draw3D() {

    //Sorting rays from their z-index(distance)
    player.lookRays = QuickSort(player.lookRays);
    var _mainArray = QuickSort(player.lookRays.concat(Entities));
    //Background
    setColor(ctx, 135, 206, 235, 255);
    ctx.fillRect(0, 0, 800, 300 + player.camRotV);
    setColor(ctx, 150, 150, 150, 255);
    ctx.fillRect(0, 300 + player.camRotV, 800, 10000);

    //ray_i stands for index of the ray

    for (let ray_i = 0; ray_i < _mainArray.length; ray_i++) {

        //if lookray has atleast one collision point, we are drawing it.
        if (_mainArray[ray_i].type == "Ray") {
            if (_mainArray[ray_i].isIntersecting()) {
                var rayHit_x = _mainArray[ray_i].colPoints[0][0];
                var rayHit_y = _mainArray[ray_i].colPoints[0][1];

                var hitObj = _mainArray[ray_i].hitObjects[0];

                var dis = getDistance(player.x, player.y, rayHit_x, rayHit_y);

                var correctedDis = dis * Math.cos(degtorad(player.rot - _mainArray[ray_i].rot)); //Correct distance




                if (hitObj.type == "wall" || hitObj.classname == "entity") {


                    //Calculation of the angle which the wall fills on the screen with cosine theorem.
                    //With that angle we can calculate how many ray that hits the wall.
                    //Hence, we can crop the texture properly.


                    //console.log(_mainArray[ray_i].hitWallPoints);
                    var x1 = _mainArray[ray_i].hitWallPoints[0][0][0];
                    var y1 = _mainArray[ray_i].hitWallPoints[0][0][1];
                    var x2 = _mainArray[ray_i].hitWallPoints[0][1][0];
                    var y2 = _mainArray[ray_i].hitWallPoints[0][1][1];

                    var a = getDistance(x1, y1, x2, y2);
                    var b = getDistance(x2, y2, player.x, player.y);
                    var c = getDistance(x1, y1, player.x, player.y);

                    if (hitObj.texture) {

                        // (x1,y1) & (x2,y2) two points of the wall

                        //Proportion of the ray hit's x or y position according to the wall
                        var ratio = 0;

                        if ((x1 - x2) == 0) {
                            ratio = Math.abs((rayHit_y - y1) / (y1 - y2))
                        } else {
                            ratio = Math.abs((rayHit_x - x1) / (x1 - x2))
                        }

                        if (hitObj.classname == "entity") {
                            //console.log(ratio);
                        }

                        //Calculation of angle which helps us to calculate ray count that hits the wall that we are looking.
                        var alpha = Math.acos((c * c + b * b - a * a) / (2 * c * b));
                        var rayC = _mainArray.length * (alpha / (degtorad(player.viewAngle)));


                        //console.log(rayC);

                        var drawX = (_mainArray[ray_i].queue) * 800 / player.lookRays.length;
                        var drawY = 300 + player.camRotV - 1 / correctedDis * wallHeights / 2;
                        var drawW = (1 / correctedDis) * wallWidths;
                        var drawH = (1 / correctedDis) * wallHeights * hitObj.height;

                        //Main Image
                        ctx.drawImage(hitObj.texture, (ratio * hitObj.texture.width), 0, rayC / hitObj.texture.width, hitObj.texture.height, drawX, drawY, drawW, drawH);

                        //Brigtness & Shader
                        setColor(ctx, 0, 0, 0, NormalizeBetween(dis * 2, 0, player.viewRange, 0, 255));
                        ctx.fillRect(drawX, drawY, drawW, drawH);

                    } else {

                        //Setting its color to (rgb * brightness / distance)
                        setColor(ctx, hitObj.color[0] * brightness / dis, hitObj.color[1] * brightness / dis, hitObj.color[2] * brightness / dis, 255);

                        //queue of the ray => order of the ray left to right
                        //TODO: Solve the fisheye problem.
                        ctx.fillRect((_mainArray[ray_i].queue) * 800 / _mainArray.length, 300 + player.camRotV - 1 / correctedDis * wallHeights / 2, (1 / correctedDis) * wallWidths, (1 / correctedDis) * wallHeights * hitObj.height);

                    }

                }


            }
        } else if (_mainArray[ray_i].type == "Entity") {

            var correctedDis = _mainArray[ray_i].getColDistance();


            //ENTITY DRAW SECTION
            var neededRot = 0;

            if (_mainArray[ray_i].x < player.x) {
                neededRot = (radtodeg(Math.atan((_mainArray[ray_i].y - player.y) / (_mainArray[ray_i].x - player.x))) + 180)
            } else if (_mainArray[ray_i].y < player.y) {
                neededRot = (radtodeg(Math.atan((_mainArray[ray_i].y - player.y) / (_mainArray[ray_i].x - player.x))) + 360)
            } else if (_mainArray[ray_i].y > player.y) {
                neededRot = (radtodeg(Math.atan((_mainArray[ray_i].y - player.y) / (_mainArray[ray_i].x - player.x))))
            }

            //THIS RAY CHECKS WHETHER THERE IS A WALL BETWEEN PLAYER AND ENTITY. IF THERE IS NOT, DRAWING ENTITY WILL BE INTENDED.
            var _ray = new Ray(player.x, player.y, neededRot, correctedDis);
            raysColCheck([_ray]);
            if (!_ray.isIntersecting()) {

                if (neededRot < player.viewAngle / 2 || neededRot > 360 - player.viewAngle / 2) {


                    //THIS IF NEEDED ROTATION IS BETWEEN 315-360 OR 0-45 THERE CAN BE ERROR IN RENDER
                    //IN THIS SECTION ROT OR PLR ROT IS ADDED 360 FOR NATURILIZING THE FLAW.
                    var _tempPlrRot = player.rot;
                    if (neededRot < player.viewAngle / 2 && player.rot > 360 - player.viewAngle / 2) {
                        neededRot = 360 + neededRot;
                        _reverse = -1;
                    } else if (neededRot > 360 - player.viewAngle / 2 && player.rot < player.viewAngle / 2) {
                        _tempPlrRot = 360 + _tempPlrRot;
                        _reverse = -1;
                    }
                    var dif = (neededRot - _tempPlrRot);
                    //console.log(neededRot.toString() + " | " + _tempPlrRot.toString());

                    if (neededRot > 0) {
                        //console.log("flaw");


                        var drawW = (1 / correctedDis) * ENTITY_SIZE;
                        var drawH = (1 / correctedDis) * ENTITY_SIZE;
                        var drawX = NormalizeBetween(((neededRot - _tempPlrRot) + player.viewAngle / 2), 0, player.viewAngle, 0, w_WIDTH) - drawW / 2;
                        var drawY = 300 + player.camRotV - 1 / correctedDis * ENTITY_SIZE / 2;


                        ctx.drawImage(_mainArray[ray_i].texture, drawX, drawY, drawW, drawH);
                    }
                } else {
                    var dif = (neededRot - (player.rot));
                    //console.log(neededRot)

                    if (Math.abs(dif) <= player.viewAngle / 2) {
                        //console.log("normal")
                        var correctedDis = _mainArray[ray_i].getColDistance();

                        var drawW = (1 / correctedDis) * ENTITY_SIZE;
                        var drawH = (1 / correctedDis) * ENTITY_SIZE;
                        var drawX = NormalizeBetween((neededRot - (player.rot % 360) + player.viewAngle / 2), 0, player.viewAngle, 0, w_WIDTH) - drawW / 2;
                        var drawY = 300 + player.camRotV - 1 / correctedDis * ENTITY_SIZE / 2;


                        ctx.drawImage(_mainArray[ray_i].texture, drawX, drawY, drawW, drawH);
                    }
                }
            }






        }

    }


}

function DrawUI() {
    UIComponents.forEach(component => {
        component.Draw(ctx);

    });

}

function Update(tick) {

    //Delta Time Calculation

    _deltaTime = (tick - _lastTick) / 1000;
    _lastTick = tick;
    //console.log("FPS: " + Math.floor((1/_deltaTime)).toString() + " | deltaTime: "+ _deltaTime.toString());

    //Entities Update
    /*for (let entity_i = 0; entity_i < Entities.length; entity_i++){
        Entities[entity_i].Update(player);
    }*/


    //Draw
    ctx.clearRect(0, 0, 800, 600);

    Draw3D();
    DrawUI();
    if (isMap) Draw2D();

    //
    player.Update();
    gameUpdate();
    requestAnimationFrame(Update);

}

function Setup() {
    ctx.imageSmoothingEnabled = false;
    setFont(ctx, "24px Arial");
    ///



    gameSetup();
    //Fire Update
    Update();

}

//INPUTS

canvas.addEventListener("click", () => {
    canvas.requestPointerLock({ unadjustedMovement: true, });
})

window.addEventListener("mousemove", (event) => {

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