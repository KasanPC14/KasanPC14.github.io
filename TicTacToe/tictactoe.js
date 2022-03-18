const canvas = document.getElementById("Screen");
const ctx = canvas.getContext('2d');

var mousePos;

var screenBound = {
	width : window.screen.width,
	height : window.screen.height,
}

var turn = "X";

var map = [[" "," "," "],
		   [" "," "," "],
		   [" "," "," "],]

function IsWin(){
	if (map[0][0] == "X" && map[0][1] == "X" && map[0][2] == "X") return "X";
	if (map[1][0] == "X" && map[1][1] == "X" && map[1][2] == "X") return "X";
	if (map[2][0] == "X" && map[2][1] == "X" && map[2][2] == "X") return "X";
	if (map[0][0] == "X" && map[1][0] == "X" && map[2][0] == "X") return "X";
	if (map[0][1] == "X" && map[1][1] == "X" && map[2][1] == "X") return "X";
	if (map[0][2] == "X" && map[1][2] == "X" && map[2][2] == "X") return "X";
	if (map[0][0] == "X" && map[1][1] == "X" && map[2][2] == "X") return "X";
	if (map[2][0] == "X" && map[1][1] == "X" && map[0][2] == "X") return "X";


	if (map[0][0] == "O" && map[0][1] == "O" && map[0][2] == "O") return "O";
	if (map[1][0] == "O" && map[1][1] == "O" && map[1][2] == "O") return "O";
	if (map[2][0] == "O" && map[2][1] == "O" && map[2][2] == "O") return "O";
	if (map[0][0] == "O" && map[1][0] == "O" && map[2][0] == "O") return "O";
	if (map[0][1] == "O" && map[1][1] == "O" && map[2][1] == "O") return "O";
	if (map[0][2] == "O" && map[1][2] == "O" && map[2][2] == "O") return "O";
	if (map[0][0] == "O" && map[1][1] == "O" && map[2][2] == "O") return "O";
	if (map[2][0] == "O" && map[1][1] == "O" && map[0][2] == "O") return "O";

	return null;
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

function setColor(color){
	ctx.fillStyle = color;
}

function setStroke(color){
	ctx.strokeStyle = color;
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      	x: (evt.clientX  - rect.left),
        y: (evt.clientY - rect.top),
    };
}

class Icon_X{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 1/3;
		this.height = 1/3;
		this.offsetX = 1/20;
		this.offsetY = 1/20;
	}

	draw(){

		ctx.lineWidth = 5;
		var left = this.x * this.width * canvas.width + this.offsetX * canvas.width
		var top = this.y * this.height * canvas.height + this.offsetY * canvas.width
		var right = this.x * this.width * canvas.width + this.width * canvas.width - this.offsetX * canvas.width
		var bottom = this.y * this.height * canvas.height + this.height * canvas.height - this.offsetY * canvas.height

		ctx.moveTo(left,top);
		ctx.lineTo(right,bottom);
		ctx.moveTo(right,top);
		ctx.lineTo(left,bottom);
	}
}

class Icon_O{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.width = 1/3;
		this.height = 1/3;
		this.offsetX = 1/20;
		this.offsetY = 1/20;
	}

	draw(){

		ctx.lineWidth = 5;
		var left = this.x * this.width * canvas.width + this.offsetX * canvas.width
		var top = this.y * this.height * canvas.height + this.offsetY * canvas.width
		var right = this.x * this.width * canvas.width + this.width * canvas.width - this.offsetX * canvas.width
		var bottom = this.y * this.height * canvas.height + this.height * canvas.height - this.offsetY * canvas.height

		ctx.moveTo(left + this.width * canvas.width / 3 ,top - this.height * canvas.height / 15)
		ctx.arc(left + this.width * canvas.width / 3 , top + this.height * canvas.height / 3, this.width * canvas.width / 2.5, -0.5 * Math.PI, 1.5 * Math.PI);
	}
	
}

canvas.height = canvas.width;

var renderDelay = 20;

setColor("#000000");

function getCollision(mouse,info1){

	var info = {
		x : (info1.x * info1.width * canvas.width + info1.offsetX * info1.width) * (getWidth() / screenBound.width),
		y : (info1.y * info1.height * canvas.height + info1.offsetY * info1.height) * (getHeight() / screenBound.height),
		width : info1.width * canvas.width * (getWidth() / screenBound.width) * 2,
		height : info1.height * canvas.height *(getWidth() / screenBound.width) * 2,
	} 

	if (mouse.x > info.x && mouse.x < info.x + info.width){
		if (mouse.y > info.y && mouse.y < info.y + info.height){
			return true;
		}
	}

	return false;
}

function drawMap(){
	//setColor("#000000");
	ctx.lineWidth = 5;
	for (var x = 0;x < 3; x++){
		ctx.moveTo(canvas.width / 3 * x - 1.5,0);
		ctx.lineTo(canvas.width / 3 * x - 1.5,canvas.height);
	}
	for (var y = 0;y < 3; y++){
		ctx.moveTo(0,canvas.height / 3 * y - 1.5);
		ctx.lineTo(canvas.width,canvas.height / 3 * y - 1.5);
	}
}

function render(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.beginPath();
	drawMap();

	for (var x = 0;x < 3;x++){
		for (var y = 0;y < 3;y++){
			if (map[x][y] == "X"){
				var ico_x = new Icon_X(x,y);
				ico_x.draw();
			}

			if (map[x][y] == "O"){
				var ico_o = new Icon_O(x,y);
				ico_o.draw();
			}
		}
	}


	ctx.stroke();
}

function clickBox(){
	var _1_1 = getCollision(mousePos, {
		x : 0,
		y : 0,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _1_2 = getCollision(mousePos, {
		x : 2.05,
		y : 0,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _1_3 = getCollision(mousePos, {
		x : 4.1,
		y : 0,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _2_1 = getCollision(mousePos, {
		x : 0,
		y : 1.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _2_2 = getCollision(mousePos, {
		x : 2.05,
		y : 1.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _2_3 = getCollision(mousePos, {
		x : 4.1,
		y : 1.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _3_1 = getCollision(mousePos, {
		x : 0,
		y : 4.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _3_2 = getCollision(mousePos, {
		x : 2.05,
		y : 4.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	var _3_3 = getCollision(mousePos, {
		x : 4.1,
		y : 4.75,
		width : 1/3,
		height : 1/3,
		offsetX : 0,
		offsetY : 0,
	});

	if (_1_1){ if (map[0][0] == " ") map[0][0] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_1_2){ if (map[1][0] == " ") map[1][0] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_1_3){ if (map[2][0] == " ") map[2][0] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_2_1){ if (map[0][1] == " ") map[0][1] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_2_2){ if (map[1][1] == " ") map[1][1] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_2_3){ if (map[2][1] == " ") map[2][1] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_3_1){ if (map[0][2] == " ") map[0][2] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_3_2){ if (map[1][2] == " ") map[1][2] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }
	if (_3_3){ if (map[2][2] == " ") map[2][2] = turn; if (turn == "X") turn = "O"; else{ turn = "X"} }

	window.document.title = turn + " Turn";
	console.log(IsWin());
}


canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);    
}, false);

canvas.addEventListener('click', function(){
	clickBox();
},false)

setInterval(() => render(),renderDelay);