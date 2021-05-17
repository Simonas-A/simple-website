'use strict'

const switcher = document.querySelector('.btn');

const txt = document.querySelector('.text');
const txt2 = document.querySelector('.text2');

var lockedByte = 0;

var totalDistance = 0;
var totalHits = 0;

var ranX;
var ranY;

var timeRunning = false;
var miliseconds = 0;

var paused = false;

//document.getElementById("imageBox").crossOrigin = "Anonymous";

switcher.addEventListener('click', function() {
    /*
    document.body.classList.toggle('dark-theme')

    var className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "Dark";
    }
    else {
        this.textContent = "Light";
    }
    console.log('current class name: ' + className);
    */


    //txt.textContent = Math.random().toString();
    var minimum = 0;
    var maximum = 255;

    var r = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    document.getElementById("redRange").value = r;
    var g = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    document.getElementById("greenRange").value = g;
    var b = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    document.getElementById("blueRange").value = b;
    document.body.style.background = "rgb(" +r+",  "+g+", "+b+")"; 
    //console.log("rgb(" +r+",  "+g+", "+b+")");

});

const drawButton = document.getElementById("drawBtn");

drawButton.addEventListener('click',function() {
    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");

    var width = 500;
    var height = 100;

    var grd = ctx.createLinearGradient(0, 0, width, 0);

    var minimum = 0;
    var maximum = 255;

    var r = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var g = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var b = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    grd.addColorStop(0, "rgb(" +r+",  "+g+", "+b+")");
    grd.addColorStop(1, "rgb(" +(255-r)+",  "+(255-g)+", "+(255-b)+")");

    // Fill with gradient
    ctx.fillStyle = grd;

    ctx.fillRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
})

const imageBox = document.getElementById("imageBox");
imageBox.addEventListener('mousemove', function(){
    //console.log("debug");
    

    /*
    var img = document.getElementById('imageBox');
    //img.crossOrigin = "Anonymous";
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);

    var x = (event.layerX - this.offsetLeft);
    var y = (event.layerY - this.offsetTop);

    txt.textContent = (event.layerX - this.offsetLeft) + " " + (event.layerY - this.offsetTop);

    var pixelData = canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
    */

    //document.body.style.background = "rgb(" + pixelData[0] + ",  " + pixelData[1] + ", "+ pixelData[2] +")"; 
    /*
    var canvas = document.getElementById('imageBox');
    var ctx = canvas.getContext('2d');
    var x = event.layerX;
    var y = event.layerY;
    var data = pixel.data;

	const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    document.background = rgba;
    */
});

const slider = document.getElementById("myRange");

function onChange()
{

    var r = parseInt(document.getElementById("redRange").value);
    var g = parseInt(document.getElementById("greenRange").value);
    var b = parseInt(document.getElementById("blueRange").value);
    document.body.style.background = "rgb(" +r+",  "+g+", "+b+")"; 
    //console.log("rgb(" +r+",  "+g+", "+b+")");
    //console.log("TRALIALIA");
}

function onSlide(){
    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");

    

    var width = canvas.getBoundingClientRect().width;
    var height = canvas.getBoundingClientRect().height;

    canvas.width = width;
    canvas.height = height;

    console.log("width: " + width);
    console.log("height: " + height);

    var grd = ctx.createLinearGradient(0, 0, width, height);

    var rl = parseInt(document.getElementById("redRangeL").value);
    var gl = parseInt(document.getElementById("greenRangeL").value);
    var bl = parseInt(document.getElementById("blueRangeL").value);

    var rr = parseInt(document.getElementById("redRangeR").value);
    var gr = parseInt(document.getElementById("greenRangeR").value);
    var br = parseInt(document.getElementById("blueRangeR").value);


    //console.log("rgb(" +rl+",  "+gl+", "+bl+")");
    grd.addColorStop(0, "rgb(" +rl+",  "+gl+", "+bl+")");
    grd.addColorStop(1, "rgb(" +rr+",  "+gr+", "+br+")");

    //grd.addColorStop(0,"red");
    //grd.addColorStop(1,"blue");

    

    ctx.fillStyle = grd;
    ctx.width = width;
    ctx.height = height;
    //ctx.fillStyle = 'green';
    //console.log("ctxwidth: " + ctx.width);
    //console.log("ctxheight: " + ctx.height);

    ctx.fillRect(0, 0, ctx.width, ctx.height);
}

var canvas = document.getElementById("cnv");
canvas.addEventListener('mousemove', e => {

    if (paused)
    {
        return;
    }


    if (!timeRunning)
    {
        timeRunning = true;
    }
    
    var cnv = document.getElementById("cnvPointer");

    //var rect = canvas.getBoundingClientRect();
    //var x = e.x- rect.left;
    //var y = e.y- canvas.top;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; 

    //var index = (Math.floor(e.y) * canvas.width + Math.floor(e.x)) * 4;

    var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data; 
    //var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    //var r = data[index];
    //var g = data[index + 1];
    //var b = data[index + 2];
    //var a = data[index + 3];

    var r = p[0];
    var g = p[1];
    var b = p[2];


    var ctx = cnv.getContext("2d");
    //ctx.fillStyle = hex;
    ctx.fillStyle = "rgb(" +r+",  "+g+", "+b+")";
    //console.log("X: " + x + "; Y: " + y);
    //console.log("rgb(" +r+",  "+g+", "+b+")");
    //ctx.fillStyle = "red";
    ctx.fillRect(0,0,cnv.width,cnv.height);
});

function onLoad()
{
    lockedByte = Math.floor(Math.random() * 3); 
    var minimum = 0;
    var maximum = 255;

    var rl = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var gl = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var bl = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    var rr = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var gr = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    var br = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

    var cnv = document.getElementById("cnvTarget");
    var ctx = cnv.getContext("2d");

    ranX = Math.random() * 256;
    ranY = Math.random() * 256;

    
    

    if (lockedByte == 0)
    {
        rr =rl;
        DrawCanvas(0, rr);
        ctx.fillStyle = "rgb(" +rr+",  "+ranX+", "+ranY+")";
    }
    else if (lockedByte == 1)
    {
        gr = gl;
        DrawCanvas(1, gr);
        ctx.fillStyle = "rgb(" +ranX+",  "+gr+", "+ranY+")";
    }
    else if (lockedByte == 2)
    {
        br = bl;
        DrawCanvas(2, br);
        ctx.fillStyle = "rgb(" +ranX+",  "+ranY+", "+br+")";
    }

    ctx.fillRect(0,0,cnv.width,cnv.height);

    
    //console.log("rgb(" +(rl+rr)/2+",  "+(gl+gr)/2+", "+(bl+br)/2+")");
    //console.log("Left" + rl + " " + gl + " " + bl);
    //console.log("Right" + rr + " " + gr + " " + br);
    

    /*
    document.getElementById("redRangeL").value = rl;
    document.getElementById("greenRangeL").value = gl;
    document.getElementById("blueRangeL").value = bl;

    document.getElementById("redRangeR").value = rr;
    document.getElementById("greenRangeR").value = gr;
    document.getElementById("blueRangeR").value = br;

    */

    //onSlide();
}


function DrawCanvas(freeByte, value)
{
    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");

    var width = canvas.getBoundingClientRect().width;
    var height = canvas.getBoundingClientRect().height;

    canvas.width = width;
    canvas.height = height;
    


    /*
    console.log("width: " + width);
    console.log("height: " + height);

    var grd = ctx.createLinearGradient(0, 0, width, height);


    grd.addColorStop(0, "rgb(0,0,255)");
    grd.addColorStop(1, "rgb(255,0,0)");


    ctx.fillStyle = grd;
    ctx.width = width;
    ctx.height = height;


    ctx.fillRect(0, 0, width, height);
    */

    
    for (var i = 0; i < 256; i+=0.1)
    {
        //var grd = ctx.createLinearGradient(0, 0, width, height);
        var grd = ctx.createLinearGradient(0, (height * i / 256), width, (height * i / 256) + height / 256);

        if (freeByte == 0)
        {
            grd.addColorStop(0, "rgb(" +value+",  0, "+i+")");
            grd.addColorStop(1, "rgb(" +value+",  255, "+i+")");
        }
        else if (freeByte == 1)
        {
            grd.addColorStop(0, "rgb(0, "+value+", "+i+")");
            grd.addColorStop(1, "rgb(255,  "+value+", "+i+")");
        }
        else if (freeByte == 2)
        {
            grd.addColorStop(0, "rgb(0,  "+i+", "+value+")");
            grd.addColorStop(1, "rgb(255,  "+i+", "+value+")");
        }

        ctx.fillStyle = grd;
        ctx.width = width;
        ctx.height = height;


        ctx.fillRect(0, (height * i / 256), width, height / 256);

        
    }
    console.log("free: " + freeByte);
    console.log("value: " + value);

}

function Generate(){
    onLoad();
}

var x = setInterval(function() {

    if (timeRunning)
    {
        miliseconds += 10;
        txt2.textContent = (miliseconds / 1000);
    }

}, 10);


canvas.addEventListener('mouseleave', e => {
    //txt2.textContent = "leave";
});

canvas.addEventListener('mouseenter', e => {
    //txt2.textContent = "enter";
});

canvas.addEventListener('click', e => {


    timeRunning = false;

    

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; 

    //console.log("OPA " + x * 256 / rect.width + " " + y * 256 / rect.height);

    var colX = x * 256 / rect.width;
    var colY = y * 256 / rect.height;

    var distance = Math.sqrt( Math.pow(colX - ranX, 2) + Math.pow(colY - ranY, 2) );

    totalDistance += distance;
    totalHits++; 

    txt.textContent = distance;
    txt.textContent +=  "\nAverage: " + (totalDistance / totalHits);

    paused = true;

    var x = setTimeout(function() {
    Generate();
    
    miliseconds = 0;
    paused = false;
    }, 2000);
    /*
    var cnv = document.getElementById("cnvPointer");

    //var rect = canvas.getBoundingClientRect();
    //var x = e.x- rect.left;
    //var y = e.y- canvas.top;

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; 

    //var index = (Math.floor(e.y) * canvas.width + Math.floor(e.x)) * 4;

    var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data; 
    //var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    //var r = data[index];
    //var g = data[index + 1];
    //var b = data[index + 2];
    //var a = data[index + 3];

    var r = p[0];
    var g = p[1];
    var b = p[2];


    var ctx = cnv.getContext("2d");
    //ctx.fillStyle = hex;
    ctx.fillStyle = "rgb(" +r+",  "+g+", "+b+")";
    //console.log("X: " + x + "; Y: " + y);
    //console.log("rgb(" +r+",  "+g+", "+b+")");
    //ctx.fillStyle = "red";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    */
});

/*
slider.oninput = e => {
    switcher.textContent = parseInt(slider.value);
    
    
    output.innerHTML = slider.value;
    
     var convertSlider = parseInt(slider.value); 
     var gainTime = Math.round(convertSlider * 4* (1 - Math.min(convertSlider, 200) * 40 / 10000)).toString();
     gainTimeOutput.innerHTML = gainTime; 
    
}
*/

