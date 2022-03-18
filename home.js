function goto(url){
    window.location.href = url;
}

function addOnclick(name,func){
    document.getElementById(name).addEventListener("click" ,() => { func(); });
}

//document.getElementById("Counter_btn").addEventListener( "click" ,() => {  goto("Counter/counter.html");  });
addOnclick("Counter_btn",() => goto("Counter/counter.html"));
addOnclick("Game1_btn",() => goto("Game1/game1.html"));
addOnclick("CaseRandom_btn",() => goto("RandomCase/randomcase.html"));
addOnclick("TicTacToe_btn",() => goto("TicTacToe/tictactoe.html"));
addOnclick("TicTacToeNew_btn",() => goto("TicTacToeNew/tictactoenew.html"));