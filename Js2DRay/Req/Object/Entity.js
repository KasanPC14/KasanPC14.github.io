var Entities = [];

class Entity {

    //Entities contain two points, so they are just a wall but with one face.
    //Also, they do not have any collision with player i hope.
    constructor(position,width){

        this.classname = "entity";
        this.x = position[0];
        this.y = position[1];
        this.points = [];
        this.rot = 0;  //Entities must turn their face to player no matter what because they are just a picture.
        this.width = width;
        this.height = 1;
        this.texture = null;
        this.type = ""; //NPC / COLLECTIBLE
    }
    
    Draw2D(ctx){
        if (this.texture){
            var size = this.width;
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
        }   
    }

    Start(player) {
        
        // Start function is triggered once when the entity added into the pool.
       
        var dx = (player.x - this.x);
        var dy = (-player.y + this.y);
        var angle = Math.atan(dx/dy);
        this.rot = radtodeg(angle);
        
        var wX = Math.floor(this.width * Math.cos(angle));
        var wY = Math.floor(this.width * Math.sin(angle));
        this.points = [[this.x+wX,this.y+wY],[this.x-wX,this.y-wY]];
        

    }

    Update(player) {
        // Update function is triggered every frame.

        // This pile of codes calculates the rotation that must be and calculates points.

        
        
    }



    
};

function addEntity(entity,player){
    Entities.push(entity);
    drawables3D.push(entity);

    entity.Start(player);

}