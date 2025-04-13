

function Clamp(v,min,max){
    if (v<min) return min;
    if (v>max) return max;
    else return v;
}

function setColor(ctx,r,g,b,a){
    ctx.fillStyle = "rgb( "+ r.toString() + " " + g.toString() + " " + b.toString() + " / " + (a/255 * 100).toString() + "%)";
}

function addText(x,y,text) {
    ctx.fillText(text,x,y)
}

function degtorad(degree){
    return (degree/180 * Math.PI);
}

function radtodeg(rad){
    return (rad/Math.PI * 180);
}

function getDistance(x1,y1,x2,y2){
    
    return Math.sqrt(((x1-x2)*(x1-x2)) + (y1-y2)*(y1-y2));
}

function rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4){
       
    //I DONT KNOW HOW THIS WORKS, I JUST FOUND IT.
    var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    var intersectionX = x1 + (uA * (x2 - x1));
    var intersectionY = y1 + (uA * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        
        return ([intersectionX, intersectionY]);
    }

    return false;
                
}

function raysColCheck(rayList){
    // Getting all objects and rays.
    // Then, we are checking each object with each rays to detect any of them are colliding with each other.
    for (let ray_i = 0; ray_i < rayList.length; ray_i++) {
        
        //x3,y3 => our ray's begin point
        //x4,y4 => our ray's end point
        var x3 = rayList[ray_i].x;
        var y3 = rayList[ray_i].y;
        var x4 = rayList[ray_i].getEndPoint()[0];
        var y4 = rayList[ray_i].getEndPoint()[1];

        // Defining two arrays which are our collision points and objects.
        var _collisionPoints = [];   //Intersaction points of the ray.
        var _collisionObjects = [];  //Objects which are colliding with the ray.
        var _collisionWallPoints = []; //Points of the wall for each _collisionPoints index

        for (let obj_i = 0; obj_i < drawables3D.length; obj_i++){
            for (let point_i = 0; point_i < drawables3D[obj_i].points.length-1; point_i++){

                //x1,y1 => first point
                //x2,y2 => second point (These two points define a wall)
                var x1 = drawables3D[obj_i].points[point_i][0];
                var y1 = drawables3D[obj_i].points[point_i][1];
                var x2 = drawables3D[obj_i].points[point_i+1][0];
                var y2 = drawables3D[obj_i].points[point_i+1][1];
                
                //Checking whether the ray is colliding with the wall line or not.
                var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4);

                //If they are colliding we push the intersaction point and collision object to the arrays.
                if (_col){
                    _collisionPoints.push(_col);
                    _collisionWallPoints.push([[x1,y1],[x2,y2]]); //We need wall info
                    _collisionObjects.push(drawables3D[obj_i]);
                }
            }

            //Last wall check
            var x1 = drawables3D[obj_i].points[drawables3D[obj_i].points.length-1][0];
            var y1 = drawables3D[obj_i].points[drawables3D[obj_i].points.length-1][1];
            var x2 = drawables3D[obj_i].points[0][0];
            var y2 = drawables3D[obj_i].points[0][1];
                
            var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4); //returns intersaction point [x,y]

            if (_col){
                _collisionPoints.push(_col);
                _collisionWallPoints.push([[x1,y1],[x2,y2]]);
                _collisionObjects.push(drawables3D[obj_i]);
            }
        }

        rayList[ray_i].hitObjects = _collisionObjects;
        rayList[ray_i].hitWallPoints = _collisionWallPoints;
        rayList[ray_i].setCollisionPoints(_collisionPoints);

    }
}

function QuickSort(array){
    
    //No sort needed.
    if (array.length <= 1){
        return array;
    }

    var pivot = array[0];
    var left_array = [];
    var right_array = [];

    

    for(let i = 1; i < array.length; i++){
        
        if (array[i].getColDistance() < pivot.getColDistance()){
            left_array.push(array[i]);
        }
        else {
            right_array.push(array[i]);
        }
        
        
    }


    return QuickSort(right_array).concat([pivot],QuickSort(left_array));
    
}



function NormalizeBetween(v,bmin,bmax,amin,amax){
    var ratio = (v-bmin)/(bmax-bmin);
    return (amax-amin)*ratio + amin;
}

function setFont(ctx,font){
    ctx.font = font;
}