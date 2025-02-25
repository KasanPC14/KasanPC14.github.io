var leftButton = document.getElementById("leftButton");
var rightButton = document.getElementById("rightButton");
var upButton = document.getElementById("upButton");
var downButton = document.getElementById("downButton");
var camUpButton = document.getElementById("camUpButton");
var camDownButton = document.getElementById("camDownButton");
var camLeftButton = document.getElementById("camLeftButton");
var camRightButton = document.getElementById("camRightButton");

var allButtons = [leftButton,rightButton,upButton,downButton,camDownButton,camUpButton,camLeftButton,camRightButton];

var buttonToKey = {
    "leftButton" : "a",
    "rightButton" : "d",
    "upButton" : "w",
    "downButton" : "s",
    "camRightButton" : "ArrowRight",
    "camLeftButton" : "ArrowLeft",
    "camUpButton" : "ArrowUp",
    "camDownButton" : "ArrowDown",
};

var Key = {
    ["w"] : false,
    ["a"] : false,
    ["s"] : false,
    ["d"] : false,
    ["ArrowRight"] : false,
    ["ArrowLeft"] : false,
    ["ArrowUp"] : false,
    ["ArrowDown"] : false,
}

var mousePos = [0,0];
var mouseDragPos = [0,0];

allButtons.forEach(element => {
    element.addEventListener('mousedown', (e)=>{
        console.log(e.target.id)
        Key[buttonToKey[e.target.id]] = true;
    });

    element.addEventListener('mouseup', (e)=>{
        console.log(e.target.id)
        Key[buttonToKey[e.target.id]] = false;
    });
});

