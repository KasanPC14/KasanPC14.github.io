const ObjectTypes = {
    Box : 1,
}

var Objects = [];

class Obj{
    constructor(points){
        this.points = points;
        this.collision = true;
        this.customColor = false;
        this.color = [255,255,255];
    }

    Draw2D(ctx){
        ctx.strokeStyle = "white";
        ctx.beginPath();

        ctx.moveTo(this.points[0][0], this.points[0][1]);

        for (let i = 1; i < this.points.length; i++){
            ctx.lineTo(this.points[i][0], this.points[i][1]);
        }

        ctx.lineTo(this.points[0][0], this.points[0][1]);
        
        ctx.stroke();

    }

    setColor(r,g,b){
        this.color = [r,g,b];
    }
};