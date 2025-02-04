var Rays = [];

class Ray {
    constructor(x, y, rot, range) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.range = range;
        this.overridable = false;
        this.endPoint = [];
        this.colPoints = [];
        this.hitObjects = [];
        this.hitWallPoints = []; // [[[x1,y1],[x2,y2]]]
        this.queue = 0;

        this.color = "white";
    }

    getColDistance(){

        if(this.colPoints.length < 1) return this.range;

        var endPoint = this.getEndPoint();
        return getDistance(this.x,this.y, this.colPoints[0][0], this.colPoints[0][1]);
    }

    Draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);

        if (this.colPoints.length == 0){
            ctx.lineTo(this.x + Math.cos(degtorad(this.rot)) * this.range, this.y + Math.sin(degtorad(this.rot)) * this.range);
        } else {
            ctx.lineTo(this.colPoints[0][0],this.colPoints[0][1]);
        }

        ctx.stroke();
    }

    getEndPoint(){
        return [this.x + Math.cos(degtorad(this.rot)) * this.range, this.y + Math.sin(degtorad(this.rot)) * this.range];
    }

    setCollisionPoints(points){

        
        //We are eliminating the objects behind the colliding object.
        if (!this.overridable && points.length > 1){
            
            var curDis = this.range; //Longest distance could be.
            var hitIndex = 0;
            
           
            for (let i = 0; i < points.length; i++){

                var newDis = getDistance(this.x,this.y,points[i][0],points[i][1]);

                //If new distance is smaller than the current one, we set all of the variables concerning new distance.
                if (newDis < curDis) {
                    curDis = newDis;
                    
                    this.colPoints = [points[i]];
                    hitIndex = i;
                    
                }
                
            }

            //Setting hit object.
            var hitObj = this.hitObjects[hitIndex];
            var _hitWallPoints = this.hitWallPoints[hitIndex];
            this.hitObjects = [hitObj];
            this.hitWallPoints = [_hitWallPoints];
            
            
            
            
        } else {

            //If the ray is overridable or has no points we do not process the array of points.
            this.colPoints = points;
        } 
    }

    isIntersecting(){
        return this.hitObjects.length > 0;
    }
};