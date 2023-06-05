var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = "#000000";

var a = new Polygon([20,0],[80,0],[100,50],[80,100],[20,100],[0,50]);
a.draw();