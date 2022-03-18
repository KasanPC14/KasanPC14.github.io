const create = React.createElement;
const DateText = document.createElement("h1");

// SETTING

DateText.innerText = "00:00:00 PM";


// APPEND TO BODY
document.body.appendChild(DateText);


//FUNCTIONS

function tick(){
	DateText.innerText = `${new Date().toLocaleTimeString()}`
}

setInterval(tick,1000);