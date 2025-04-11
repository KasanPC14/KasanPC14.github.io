var Entities = [];



class Entity {
//Plain 2d textured entities will be implemented.
//This class will be appended into Drawables3D array.
//Due to different render type, entities will get different treatment from renderer in the main class.

    constructor(x,y,name,src){
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = "Entity";
        this.texture = new Image();
        this.texture.src = src;
        Entities.push(this);
        
    }

    getColDistance(){
        return getDistance(this.x,this.y,player.x,player.y);
    }

    setTexture(src){
        this.texture = new Image();
        this.texture.src = src;
    }

    Draw2D(){
        var size = 20;
        ctx.drawImage(this.texture,this.x - size/2,this.y - size/2,size,size);
        ctx.stroke();
    }
}