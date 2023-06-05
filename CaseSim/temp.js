var panel = document.getElementById("panel");
var skinpanel_parent = document.getElementById("skinpanel_parent");

var open_btn = document.getElementById("Open_btn");
document.documentElement.style.overflow = 'hidden';

var is_openning_case = false;
var can_open_case = true;
var dt = 10;
var speed = 0;
var x = 0;
var panelcount = 200;

var onumuzdeki = 12.5;
var skinpanelList = [];
var caseList = [
	{
		"isim" : "AK47-Safari Mesh",
		"olasilik" : 35, 
		"color" : "gray",
		"img" : "ak47_safari.png",
		"price" : 0.20,
	},
	{
		"isim" : "M4A4-Howl",
		"olasilik" : 10, 
		"color" : "red",
		"img" : "m4a4_howl.png",
		"price" : 2009.0,
	},
	{
		"isim" : "Butterfly-Marble Fade",
		"olasilik" : 5,
		"color" : "yellow",
		"img" : "butterfly_marblefade.png",
		"price" : 2062.0,
	},
];

var _caseList = [
	{
		"isim" : "Kemal Kılıçdaroğlu",
		"olasilik" : 48, 
		"color" : "red",
		"img" : "kk.png",
		"price" : 0.20,
	},
	{
		"isim" : "Recep Tayyip Erdoğan",
		"olasilik" : 52, 
		"color" : "yellow",
		"img" : "rte.png",
		"price" : 2009.0,
	},
	
];

var olasilik_toplam = 0;




function setup(){
	olasilik_toplam = 0;
	skinpanel_parent.style.position = "absolute";
	skinpanel_parent.style.width = "100%";
	skinpanel_parent.style.height = "100%";
	panel.appendChild(skinpanel_parent);

	for (var i = 0; i < caseList.length;i++){
		olasilik_toplam += caseList[i]["olasilik"];
	}

	for (var i = 0; i < panelcount; i++) {
		var new_skin_panel = document.createElement("span");
		var rand_n = Math.floor(Math.random() * (olasilik_toplam+1));
		var n_img = document.createElement("img");
		var n_image_name = "";
		var n_name = "";
		var n_color = "";
		var gecici_toplam = 0;

		for (var j = 0; j < caseList.length;j++){
			gecici_toplam += caseList[j]["olasilik"];
			if (rand_n <= gecici_toplam){

				n_name = caseList[j]["isim"];
				n_color = caseList[j]["color"];
				n_image_name = "src/" + caseList[j]["img"];
				//console.log("toplam => " + String(gecici_toplam)+"  rand_n => "+String(rand_n)+"   isim => "+n_name)
				break;
			}
		}

		new_skin_panel.classList.add("skinpanel");
		new_skin_panel.style.left = String(12.5 * i) +"%";
		new_skin_panel.innerHTML = n_name;
		new_skin_panel.style.color = n_color;

		n_img.src = n_image_name;
		n_img.style.position = "absolute";
		n_img.style.width = "100%";
		n_img.style.height = "80%";
		n_img.style.top = "20%";
		new_skin_panel.appendChild(n_img);

		var new_list = {
			"obj":new_skin_panel,
			"name":n_name,
			"x": 12.5 * i,
		};


		skinpanel_parent.appendChild(new_skin_panel);
		skinpanelList.push(new_list);
	}
	
}

function Reset(){

	for (var i = 0; i < skinpanelList.length; i++) {
		skinpanelList[i]["obj"].remove();
	}
	onumuzdeki = 12.5;
	skinpanelList = [];
	setup();
	console.log(skinpanelList)
	x = 0;
}

function Update(){
	speed += 0.0075;

	if (is_openning_case && speed >= 0 && can_open_case == false) {
		is_openning_case = false;
		console.log(Math.floor(onumuzdeki/12.5)+3)
		console.log("You Opened a " + skinpanelList[Math.floor(onumuzdeki/12.5)+3]["name"] + "!");

		setTimeout(() => {
			can_open_case = true;
		},4000);

	}

	if (x+speed <= -onumuzdeki){
		onumuzdeki += 12.5;
		TickSfx();
	}

	if (speed > 0) {
		speed = 0;
	}
	x += speed;
	skinpanel_parent.style.left = String(x) + "%";
}

function OpenBtn(){
	
	if (can_open_case == false) return;

	can_open_case = false
	is_openning_case = true;
	Reset();
	speed = -(Math.random()*0.85)-4;
	console.log(speed);


}

function TickSfx(){
	var tick_sfx = new Audio('src/tick.mp3');
	tick_sfx.play();
}

setup();
//console.log(skinpanelList);
setInterval(Update, dt);
open_btn.addEventListener("click",OpenBtn);