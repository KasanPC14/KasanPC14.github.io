class Polygon{
	constructor(...points){
		this.length = points.length;
		this.points = points;
		console.log(points);
	}

	draw(){
		ctx.beginPath();
		for (var i = 0; i < this.length;i++) {
			if (i == 0)
				ctx.moveTo(this.points[i][0], this.points[i][1]);
			ctx.lineTo(this.points[i][0], this.points[i][1]);
		}
		ctx.closePath();
		ctx.fill();
	}
}