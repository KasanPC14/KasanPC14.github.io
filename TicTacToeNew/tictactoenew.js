const _1_1 = document.getElementById("1_1");
const _1_2 = document.getElementById("1_2");
const _1_3 = document.getElementById("1_3");
const _2_1 = document.getElementById("2_1");
const _2_2 = document.getElementById("2_2");
const _2_3 = document.getElementById("2_3");
const _3_1 = document.getElementById("3_1");
const _3_2 = document.getElementById("3_2");
const _3_3 = document.getElementById("3_3");
const warn = document.getElementById("warn");

var canPlay = true;
var turn = "X";
var map = [[" "," "," "],
		   [" "," "," "],
		   [" "," "," "]];

var winPoses = [
	
	[[0,0],[0,1],[0,2]],
	[[1,0],[1,1],[1,2]],
	[[2,0],[2,1],[2,2]],
	[[0,0],[1,0],[2,0]],
	[[0,1],[1,1],[2,1]],
	[[0,2],[1,2],[2,2]],
	[[0,0],[1,1],[2,2]],
	[[0,2],[1,1],[2,0]],
]

function Won(plr){
	canPlay = false;
	warn.innerHTML = plr + " WON!";
}

function checkWin(){
	for (var i = 0;i < winPoses.length;i++){
		var cx = 0;
		var co = 0;
		for (var x = 0;x < winPoses[i].length;x++){
			if (map[winPoses[i][x][0]][winPoses[i][x][1]] == "X" && co == 0){
				cx += 1;
			}
			else if(map[winPoses[i][x][0]][winPoses[i][x][1]] == "O" && cx == 0){
				co += 1
			}
			else {
				break;
			}

			if (co == 3) Won("O");
			if (cx == 3) Won("X");
		}
	}
}

document.addEventListener("click" , ()=>{setTimeout(checkWin(),100);});

_1_1.addEventListener("click", () => { 
	if (map[0][0] == " " && canPlay) _1_1.innerHTML = turn; map[0][0] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_1_2.addEventListener("click", () => { 
	if (map[0][1] == " " && canPlay) _1_2.innerHTML = turn; map[0][1] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_1_3.addEventListener("click", () => { 
	if (map[0][2] == " " && canPlay) _1_3.innerHTML = turn; map[0][2] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_2_1.addEventListener("click", () => { 
	if (map[1][0] == " " && canPlay) _2_1.innerHTML = turn; map[1][0] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_2_2.addEventListener("click", () => { 
	if (map[1][1] == " " && canPlay) _2_2.innerHTML = turn; map[1][1] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_2_3.addEventListener("click", () => { 
	if (map[1][2] == " " && canPlay) _2_3.innerHTML = turn; map[1][2] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_3_1.addEventListener("click", () => { 
	if (map[2][0] == " " && canPlay) _3_1.innerHTML = turn; map[2][0] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_3_2.addEventListener("click", () => { 
	if (map[2][1] == " " && canPlay) _3_2.innerHTML = turn; map[2][1] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});

_3_3.addEventListener("click", () => { 
	if (map[2][2] == " " && canPlay) _3_3.innerHTML = turn; map[2][2] = turn;
	if (turn == "X") turn = "O"; else turn = "X";
});