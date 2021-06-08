
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
    //console.log(temp);
    hits = JSON.parse(localStorage.getItem("hitList"));

    DrawStats(hits)

   
}

function DrawStats(hits) {

    var width = 200;
    var height = 300;
    var value = 128;

    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");
    var width = canvas.getBoundingClientRect().width;
    var height = canvas.getBoundingClientRect().height;

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = "#FF0023";
    ctx.fillRect(20, 30, 150, 100);

    /*
    var grd = ctx.createLinearGradient(0, 0, width, height);

    grd.addColorStop(0, "rgb(" +value+",  0, "+12+")");
    grd.addColorStop(1, "rgb(" +value+",  255, "+13+")");
    */

    //ctx.fillStyle = grd;

    ctx.width = width;
    ctx.height = height;


    //ctx.fillRect(0, 0, width, height);
}