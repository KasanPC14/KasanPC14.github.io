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

        this.texture = null;
        this.type = "wall";
    }

    Draw2D(ctx){

        switch(this.type){
            case "wall":

                if (this.texture){
                    var size = 20;
                    var avgX = 0;
                    var avgY = 0;

                    for(let i = 0; i < this.points.length; i++){
                        avgX += this.points[i][0];
                        avgY += this.points[i][1];
                    }

                    avgX /= this.points.length;
                    avgY /= this.points.length;

                    ctx.drawImage(this.texture,avgX - size/2,avgY - size/2,size,size);
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = "white";
                    ctx.beginPath();
            
                    ctx.moveTo(this.points[0][0], this.points[0][1]);
            
                    for (let i = 1; i < this.points.length; i++){
                        ctx.lineTo(this.points[i][0], this.points[i][1]);
                    }
            
                    ctx.lineTo(this.points[0][0], this.points[0][1]);
                    
                    ctx.stroke();
                }
                    
            
                break;
        }
        

    }

    setColor(r,g,b){
        this.color = [r,g,b];
    }
};