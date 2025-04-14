var Entities = [];



class Entity {
//Plain 2d textured entities will be implemented.
//This class will be appended into Drawables3D array.
//Due to different render type, entities will get different treatment from renderer in the main class.

    constructor(x,y,name,textures_sources){
        this.x = x;
        this.y = y;
        this.name = name;
        this.type = "Entity";
        this.frame = 0;
        this.textures = [];
        for(var i = 0; i < textures_sources.length;i++){
            var n_img = new Image();
            n_img.src = textures_sources[i];
            this.textures.push(n_img);
            
        }
        Entities.push(this);
        
    }

    getColDistance(){
        return getDistance(this.x,this.y,player.x,player.y);
    }

    setTexture(index,src){
        this.texture[index] = new Image();
        this.texture[index].src = src;
    }
    
    addTexture(src){
        this.textures.push(new Image());
        this.textures[i].src = src;
    }

    Draw2D(){
        var size = 20;
        ctx.drawImage(this.textures[this.frame],this.x - size/2,this.y - size/2,size,size);
        ctx.stroke();
    }
}