var w_WIDTH = 800;
var w_HEIGHT = 600;

var ENTITY_SIZE = 7000;
var ENTITY_RENDER_DISTANCE = 275;

var _lastTick = 0;
var _deltaTime = 0;

var drawables3D = []; //ALL 3D DRAWABLES OBJECTS.

const FunctionTypes = {
    onKeyPressed : "onKeyPressed",
    onMouseDown : "onMouseDown",
}

const MouseButtons = {
    LeftMouseButton : 0,
    ScrollMouseButton : 1,
    RightMouseButton : 2,
}

var bindFunctions = {
    "onKeyPressed" : [], // ARGS : (keyname)
    "onMouseDown" : [], // ARGS : (clickType) | 0: mouse1, 1: scrollclick, 2: mouse2
};

function BindFunction(eventName,func){
    bindFunctions[eventName].push(func);
}

function fireAllFunctions(eventName, ...args){
        
        bindFunctions[eventName].forEach(_func => {
            _func(args);
        });
}

function getUIComponentByName(name){
    UIComponents.forEach(element => {
        if (element.name == name){
            return element;
            }
    });
}