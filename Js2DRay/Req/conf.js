var w_WIDTH = 800;
var w_HEIGHT = 600;

var ENTITY_SIZE = 7000;
var ENTITY_RENDER_DISTANCE = 275;

var _lastTick = 0;
var _deltaTime = 0;

var drawables3D = []; //ALL 3D DRAWABLES OBJECTS.

function getUIComponentByName(name){
    UIComponents.forEach(element => {
        if (element.name == name){
            return element;
            }
    });
}