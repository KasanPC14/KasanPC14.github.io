class Player {


    constructor(x, y, rot) {
        this.x = x;
        this.y = y;
        this.camRotV = 0; //[-1320,+1320]
        this.rot = rot;
        this.radius = 4;

        this.viewRange = 750;
        this.viewAngle = 90;
        this.mouseSens = 0.25;

        this.walkSpeed = 50;
        this.rotSpeed = 0.75;
        this.colRange = 5;


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

    raysColCheck(rayList){
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

            for (let obj_i = 0; obj_i < Objects.length; obj_i++){
                for (let point_i = 0; point_i < Objects[obj_i].points.length-1; point_i++){

                    //x1,y1 => first point
                    //x2,y2 => second point (These two points define a wall)
                    var x1 = Objects[obj_i].points[point_i][0];
                    var y1 = Objects[obj_i].points[point_i][1];
                    var x2 = Objects[obj_i].points[point_i+1][0];
                    var y2 = Objects[obj_i].points[point_i+1][1];
                    
                    //Checking whether the ray is colliding with the wall line or not.
                    var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4);

                    //If they are colliding we push the intersaction point and collision object to the arrays.
                    if (_col){
                        _collisionPoints.push(_col);
                        _collisionObjects.push(Objects[obj_i]);
                    }
                }

                //Last wall check
                var x1 = Objects[obj_i].points[Objects[obj_i].points.length-1][0];
                var y1 = Objects[obj_i].points[Objects[obj_i].points.length-1][1];
                var x2 = Objects[obj_i].points[0][0];
                var y2 = Objects[obj_i].points[0][1];
                    
                var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4); //returns intersaction point [x,y]

                    if (_col){
                        _collisionPoints.push(_col);
                        _collisionObjects.push(Objects[obj_i]);
                    }
            }

            rayList[ray_i].hitObjects = _collisionObjects;
            rayList[ray_i].setCollisionPoints(_collisionPoints);

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

            VmovX = this.walkSpeed * Math.cos(degtorad(this.rot)) * _dt;
            VmovY = this.walkSpeed * Math.sin(degtorad(this.rot)) * _dt;
 
        } else if (Key["s"]) {

            VmovX = -this.walkSpeed * Math.cos(degtorad(this.rot)) * _dt;    //TODO: multiple Deltatime
            VmovY = -this.walkSpeed * Math.sin(degtorad(this.rot)) * _dt;    //TODO: multiple Deltatime
        }

        if (Key["a"]) {

            HmovX = -this.walkSpeed * Math.cos(degtorad(this.rot + 90)) * _dt;    //TODO: multiple Deltatime
            HmovY = -this.walkSpeed * Math.sin(degtorad(this.rot + 90)) * _dt;    //TODO: multiple Deltatime

        } else if (Key["d"]) {

            HmovX = -this.walkSpeed * Math.cos(degtorad(this.rot - 90)) * _dt;    //TODO: multiple Deltatime
            HmovY = -this.walkSpeed * Math.sin(degtorad(this.rot - 90)) * _dt;    //TODO: multiple Deltatime

        }


        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            this.colRays[colRay_i].x += VmovX + HmovX;
            this.colRays[colRay_i].y += VmovY + HmovY;
        }

        this.raysColCheck(this.colRays);

        for (let colRay_i = 0; colRay_i < this.colRays.length; colRay_i++){
            if (this.colRays[colRay_i].isIntersecting()) return;
        }

        this.x += VmovX + HmovX;    //TODO: multiple Deltatime
        this.y += VmovY + HmovY;   //TODO: multiple Deltatime
    }

    Update() {

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
        
       
        this.raysColCheck(this.allRays);

    }

};