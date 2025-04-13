class Player {


    constructor(x, y, rot) {
        this.x = x;
        this.y = y;
        this.HealthPoints = 100;
        this.camRotV = 0; //[-1320,+1320]
        this.rot = rot;
        this.radius = 4;

        this.velocity = [0,0];

        this.viewRange = 750;
        this.viewAngle = 90;
        this.mouseSens = 0.25;

        this.walkSpeed = 50;
        this.rotSpeed = 0.75;
        this.colRange = 8;


        this.allRays = [];
        this.lookRays = [];

        this.colRays = []; // [Front,Right,Behind,Left]

        this.rayCount = 199;  //Make it odd for equal vision for left and right
        for (let i = 0; i < this.rayCount; i++) {
            var n_ray = new Ray(this.x, this.y, this.rot - this.viewAngle / 2 + (i * this.viewAngle / this.rayCount), this.viewRange);
            n_ray.queue = i;
            this.lookRays.push(n_ray);
            Rays.push(n_ray);

            this.allRays.push(n_ray);
            
        }
        
        ///Movement collision rays

        for (let i = 0; i < 8; i++){
            var n_colRay = new Ray(this.x, this.y, this.rot + 360/8 * i, this.colRange);
            n_colRay.color = "red";
            this.colRays.push(n_colRay);
            this.allRays.push(n_colRay);
        }

        //MAP TEST

        
    }

    draw2D(ctx) {
        setColor(ctx, 255, 255, 255, 255);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();

        //Col ray draw
        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            this.colRays[colRay_i].Draw(ctx);
        }
        
        
    }

    


    playerMovement(){
    
    this.camRotV = Clamp(this.camRotV,-1320,1320);
    


    //Movement
        if (Key["ArrowRight"]) {
            this.rot += this.rotSpeed;  //TODO: multiple Deltatime
        }

        if (Key["ArrowLeft"]) {
            this.rot -= this.rotSpeed;  //TODO: multiple Deltatime
        }

        if (Key["ArrowUp"]){
            this.camRotV += this.rotSpeed * 15;
        }
        
        if (Key["ArrowDown"]){
            this.camRotV -= this.rotSpeed * 15;
        }

        let VmovX = 0;
        let VmovY = 0;
        let HmovX = 0;
        let HmovY = 0; 
        //Vmov => back and forth - Hmov => left and right
        
        if (Key["w"]) {

            VmovX = this.walkSpeed * Math.cos(degtorad(this.rot)) * _deltaTime;
            VmovY = this.walkSpeed * Math.sin(degtorad(this.rot)) * _deltaTime;
 
        } else if (Key["s"]) {

            VmovX = -this.walkSpeed * Math.cos(degtorad(this.rot)) * _deltaTime;    //TODO: multiple Deltatime
            VmovY = -this.walkSpeed * Math.sin(degtorad(this.rot)) * _deltaTime;    //TODO: multiple Deltatime
        }

        if (Key["a"]) {

            HmovX = -this.walkSpeed * Math.cos(degtorad(this.rot + 90)) * _deltaTime;    //TODO: multiple Deltatime
            HmovY = -this.walkSpeed * Math.sin(degtorad(this.rot + 90)) * _deltaTime;    //TODO: multiple Deltatime

        } else if (Key["d"]) {

            HmovX = -this.walkSpeed * Math.cos(degtorad(this.rot - 90)) * _deltaTime;    //TODO: multiple Deltatime
            HmovY = -this.walkSpeed * Math.sin(degtorad(this.rot - 90)) * _deltaTime;    //TODO: multiple Deltatime

        }


        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            this.colRays[colRay_i].x += VmovX + HmovX;
            this.colRays[colRay_i].y += VmovY + HmovY;
        }

        raysColCheck(this.colRays);

        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            if (this.colRays[colRay_i].isIntersecting()) return;
        }

        this.velocity[0] = VmovX + HmovX;    //TODO: multiple Deltatime
        this.velocity[1] = VmovY + HmovY;   //TODO: multiple Deltatime

        this.x += this.velocity[0];
        this.y += this.velocity[1];
    }

    Update() {
        
        if (this.rot < 0){
            this.rot = 360;
        } else if (this.rot > 360){
            this.rot = 0;
        }

        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            this.colRays[colRay_i].x = this.x;
            this.colRays[colRay_i].y = this.y;
            this.colRays[colRay_i].rot = this.rot + 360/this.colRays.length*colRay_i;
            
        }

        this.playerMovement();
        

        //////////////////////
        //Rearranging the lookRays to their new positions.
        for (let i = 0; i < this.lookRays.length; i++) {

            this.lookRays[i].rot = this.rot - this.viewAngle / 2 + (i * this.viewAngle / this.rayCount);
            this.lookRays[i].queue = i;
            this.lookRays[i].x = this.x;
            this.lookRays[i].y = this.y;

        }
        
       
        raysColCheck(this.allRays);

    }

};