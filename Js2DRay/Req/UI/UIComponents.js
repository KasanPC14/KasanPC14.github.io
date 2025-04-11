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
    constructor(x,y,name,w,h,src){
        super(x,y,name);

        this.w = w;
        this.h = h;

        this.texture = new Image();
        this.texture.src = src;

        
    }

    setTexture(src){
        this.texture = new Image();
        this.texture.src = src;
    }
    
    Draw(ctx){
        ctx.drawImage(this.texture,this.x,this.y,this.w,this.h);
    }
};