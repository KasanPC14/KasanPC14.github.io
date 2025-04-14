var UIComponents = [];

class UIComponent{
    constructor(x,y,name){
        this.name = name;
        this.x = x;
        this.y = y;
        this.visible = true;
        this.zIndex = 0;
        this.font = ctx.font;
        this.color = "#ffffff";
        UIComponents.push(this);
    }

    Hide(){
        this.visible = false;
    }

    Show(){
        this.visible = true;
    }
};

class UI_Text extends UIComponent{
    constructor(x,y,name,text){
        super(x,y,name);
        this.text = text;
        
    }

    setFont(font){
        this.font = font;
    }

    setColor(color){
        this.color = color;
    }

    Draw(ctx){
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text,this.x,this.y);
    }
};

class UI_Texture extends UIComponent{
    constructor(x,y,name,w,h,textures_sources){
        super(x,y,name);

        this.w = w;
        this.h = h;
        this.frame = 0;
        this.textures = [];
        for(var i = 0; i < textures_sources.length;i++){
            this.textures.push(new Image());
            this.textures[i].src = textures_sources[i];
        }

         
        

        
    }

    setTexture(index,src){
        this.texture[index] = new Image();
        this.texture[index].src = src;
    }
    
    addTexture(src){
        this.textures.push(new Image());
        this.textures[i].src = src;
    }

    Draw(ctx){
        ctx.drawImage(this.textures[this.frame],this.x,this.y,this.w,this.h);
    }
};