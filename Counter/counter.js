var count = 0;

var Increase_button = document.getElementById("Increase_btn");
var Decrease_button = document.getElementById("Decrease_btn");
var Reset_button = document.getElementById("Reset_btn");

var counter = document.getElementById("counter")

counter.innerHTML = count.toString();

Increase_button.addEventListener("click", () => {
    count += 1;
    counter.innerHTML = count.toString();
    
});

Decrease_button.addEventListener("click", () => {
    count -= 1;
    counter.innerHTML = count.toString();
    
});

Reset_button.addEventListener("click", () => {
    count = 0;
    counter.innerHTML = count.toString();
    
});