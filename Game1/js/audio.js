class Sound extends Audio{
    constructor(url){
        this.src = url;
    }

    Play(){
        this.play();
    }

    Stop(){
        this.stop();
    }

};


var backgroundMusic = new Audio("../Game1/src/background.mp3");