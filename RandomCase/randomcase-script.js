var canvas = document.getElementById("Screen");
var ctx = canvas.getContext('2d');

const cevirBtn = document.getElementById("Random_btn");
//const RandomizeBtn = document.getElementById("Randomize_btn");

window.devicePixelRatio=2;
var scale = window.devicePixelRatio;   
ctx.scale(scale, scale);

/*
var items = {
	"Fatih" : {
		"name" : "Fatih",
		"olasilik" : 100/6,
	},

	"Baris" : {
		"name" : "Barış",
		"olasilik" : 100/6,
	},

	"Taha" : {
		"name" : "Taha",
		"olasilik" : 100/6,
	},

	"Timur" : {
		"name" : "Timur",
		"olasilik" : 100/6,
	},

	"Metehan" : {
		"name" : "Metehan",
		"olasilik" : 100/6,
	},

	"Omer" : {
		"name" : "Ömer",
		"olasilik" : 100/6,
	},

}
*/

var items = {
	"DragonLore" : {
		"name" : "Dragon Lore",
		"olasilik" : 10,
	},

	"AK47-Safari" : {
		"name" : "AK47-Safari",
		"olasilik" : 45,
	},

	"P250-BoneMask" : {
		"name" : "P250-BoneMask",
		"olasilik" : 45,
	},
}

var itemBox = {
	"width" : 7.5/100,
	"height" : 100/100,
	"offset" : 0.25/100,
}

var boxes = [];

var camera = {
	"x" : 20,
}

class ItemBox{
	constructor(item){
		this.item = item;
	}
}

var canPress = true;

function setColor(color){
	ctx.fillStyle = color;
}

function Randomize(){
	if (canPress){
		boxes = [];

		var olasiliklar = [];
		var itemler = [];
		var toplam_olasilik = 0;
		var oncekiOlasilik = 0;

		for (var item in items){
			//olasiliklar.push(items[item]["olasilik"]);
			itemler.push(items[item]["name"]);

			toplam_olasilik += items[item]["olasilik"];

			olasiliklar.push(items[item]["olasilik"] + oncekiOlasilik);
			oncekiOlasilik += items[item]["olasilik"];
		}

		console.log(itemler);
		console.log(oncekiOlasilik);
		for (let i = 0; i < 50; i++) {
			var randint = Math.floor(Math.random()*101);
			
			for (var x = 0;x < itemler.length;x++){
				if (x > 0){
					if (randint <= olasiliklar[x] && randint > olasiliklar[x-1]){
						console.log(itemler[x]);
						var _box = new ItemBox(itemler[x]);
						boxes.push(_box);
						break;
					}
				}	
				else{
					if (randint <= olasiliklar[x]){
						console.log(itemler[x]);
						var _box = new ItemBox(itemler[x]);
						boxes.push(_box);
						break;
					}
					
				}
			}

				

		}

		console.log(olasiliklar)
		console.log(itemler);
	}
}

function OldRandomize(){
	if (canPress){
		boxes = [];

		for (var i = 0; i < 50; i++) {
			var randint = Math.floor(Math.random()*101);
			var oncekiOlasilik = 0;
			if(randint <= items["Fatih"]["olasilik"]){
		
				var _box = new ItemBox("Fatih");
				boxes.push(_box);
			}
			else{
				oncekiOlasilik += items["Fatih"]["olasilik"];
			}



			if(randint > oncekiOlasilik && randint <= items["Timur"]["olasilik"] + oncekiOlasilik){
				
				var _box = new ItemBox("Timur");
				boxes.push(_box);
			}
			else{
				oncekiOlasilik += items["Timur"]["olasilik"];
			}

			if(randint > oncekiOlasilik && randint <= items["Baris"]["olasilik"] + oncekiOlasilik){
				
				var _box = new ItemBox("Baris");
				boxes.push(_box);
			}
			else{
				oncekiOlasilik += items["Baris"]["olasilik"];
			}

			if(randint > oncekiOlasilik && randint <= items["Taha"]["olasilik"] + oncekiOlasilik){
				
				var _box = new ItemBox("Taha");
				boxes.push(_box);
			}
			else{
				oncekiOlasilik += items["Taha"]["olasilik"];
			}
		}
	}
}

function Cevir(){
	if (canPress){

		camera.x = 0;
		Randomize();
		var delay = 15;
		var sure;
		canPress = false;
		for (var i = 0; i < 200; i++) {
			setTimeout(() => {camera.x += 1},delay*i);
			
		}

		sure = delay*200;

		setTimeout(() => {
			for (var i = 0; i < 150; i++) {
				setTimeout(() => {camera.x += 0.5},delay*i);
				sure += delay*i;
			}
		},sure);

		sure += delay*150;

		setTimeout(() => {
			for (var i = 0; i < 100; i++) {
				setTimeout(() => {camera.x += 0.25},delay*i);
				sure += delay*i;
			}
		},sure);

		sure += delay*100;
		
		setTimeout(() => {
			for (var i = 0; i < 50; i++) {
				setTimeout(() => {camera.x += 0.125},delay*i);
				sure += delay*i;
			}
		},sure);

		sure += delay * 50

		setTimeout(() => {
			for (var i = 0; i < 25; i++) {
				setTimeout(() => {camera.x += 0.0625},delay*i);
				sure += delay*i;
			}
		},sure);

		sure += delay * 25

		setTimeout(() => {canPress = true;},sure + 2000);
	}
}



function render(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	setColor("#252525");
	ctx.fillRect(0,0,canvas.width,canvas.height);

	setColor("#404040");
	for (var i = 0; i < boxes.length; i++) {
		var box_x =	(itemBox.width * canvas.width + itemBox.offset * canvas.width)*i - camera.x

		ctx.fillRect(box_x,0,canvas.width * itemBox["width"],canvas.height * itemBox["height"]);
	}
	setColor("white");
	for (var i = 0; i < boxes.length; i++) {
		var box_x =	(itemBox.width * canvas.width + itemBox.offset * canvas.width)*i - camera.x
		ctx.fillText(boxes[i]["item"],box_x - 3 + (canvas.width * itemBox["width"] / 4), canvas.height * itemBox["height"] / 4,17.5);
	}

	setColor("#ffff00");
	ctx.fillRect(canvas.width / 4,0,1.25,100);


	//update();
}

//Randomness
//console.log(Math.floor(Math.random()*11));

Randomize();

ctx.font = '16px serif';
cevirBtn.addEventListener("click" ,() => { Cevir() });
//RandomizeBtn.addEventListener("click" ,() => { Randomize() });
setInterval(() => render(),100);