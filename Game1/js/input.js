var canvas = document.getElementById("window");



class IM{

    KeyCode = {
        "W":87,
        "A":65,
        "D":68,
        "S":83,
    
        "LEFT_ARROW":37,
        "RIGHT_ARROW":39,
        "UP_ARROW":38,
        "DOWN_ARROW":40
    }
    
    CodeKey = {
        87:"W",
        65:"A",
        68:"S",
        83:"D",
    
        37:"LEFT_ARROW",
        39:"RIGHT_ARROW",
        38:"UP_ARROW",
        40:"DOWN_ARROW"
    }
    
    PressedKeys = {
        87:false, //etc
        65:false,
        68:false,
        83:false,
    
        37:false,
        39:false,
        38:false,
        40:false
    }

    
    getkey(key){
        console.log(this.PressedKeys[this.KeyCode[key]])
    }

    setkeydown(event,eventType){
        if (eventType == "keydown"){
            this.PressedKeys[event.KeyCode] = true;
  
        }

        if (eventType == "keyup"){ 
            this.PressedKeys[event.KeyCode] = false;

        }

        
    }
};

var InputManager = new IM();

window.addEventListener('keydown',function(event){
    
    InputManager.setkeydown(event,"keydown");

});


window.addEventListener('keyup',function(event){
    
    InputManager.setkeydown(event,"keyup");

});
