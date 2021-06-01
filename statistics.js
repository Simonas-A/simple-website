
class Hit {
    constructor(color, distance, time){
        this.color = color;
        this.distance = distance;
        this.time = time;
    }
}


var hits;

function onLoad(){

    
    var temp = localStorage.getItem("hitList");
    console.log(temp);
    hits = JSON.parse(localStorage.getItem("hitList"));


    var textBox = document.querySelector(".textBox");


    textBox.textContent = "";
    

    
    for (var i = 0; i < hits.length; i++)
    {
        textBox.textContent += hits[i].distance + "ABRA\n";
    }
    
}