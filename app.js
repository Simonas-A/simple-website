'use strict'

const switcher = document.querySelector('.btn');

const txt = document.querySelector('.text');
const txt2 = document.querySelector('.text2');

var lockedByte = 0;
var lockedValue = 0;

var totalTime = 0;
var totalDistance = 0;
var totalHits = 0;

var ranX;
var ranY;

var timeRunning = false;
var miliseconds = 0;

var paused = false;

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
        lockedValue = rr =rl;
        
        ctx.fillStyle = "rgb(" +rr+",  "+ranX+", "+ranY+")";
    }
    else if (lockedByte == 1)
    {
        lockedValue = gr = gl;
        ctx.fillStyle = "rgb(" +ranX+",  "+gr+", "+ranY+")";
    }
    else if (lockedByte == 2)
    {
        lockedValue = br = bl;
        ctx.fillStyle = "rgb(" +ranX+",  "+ranY+", "+br+")";
    }

    DrawCanvas(lockedByte, lockedValue);

    ctx.fillRect(0,0,cnv.width,cnv.height);


    var sliderValue = getCookie("value");
    txt.textContent = sliderValue;
    
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

    if (paused) {
        Generate();
        miliseconds = 0;
        paused = false;
        return;
    }

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

    txt.textContent = Math.round(distance);
    txt.textContent +=  "\nAverage: " + Math.round(totalDistance / totalHits);

    paused = true;





    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");


    var arcSize = distance > 15 ? 10 : 5;

    ctx.lineWidth = distance > 15 ? 5 : 2;
    //ctx.strokeStyle = "#c82124";

    // pointer circle
    ctx.strokeStyle = GetColor(colX, colY);;
    ctx.beginPath();
    ctx.arc(x, y, arcSize, - 2 * Math.PI / 3, - 1 * Math.PI / 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, arcSize, - Math.PI / 6, Math.PI / 6);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, arcSize,  Math.PI / 3, 2 * Math.PI / 3);
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(x, y, arcSize, 5 * Math.PI / 6, 7 * Math.PI / 6);
    ctx.stroke();




    ctx.lineWidth = distance > 15 ? 3 : 1;
    //targer circle
    ctx.strokeStyle = GetColor(ranX, ranY);
    //ctx.strokeStyle = "#296d98";
    ctx.beginPath();
    ctx.arc((ranX * rect.width / 256), (ranY * rect.height / 256), arcSize / 2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc((ranX * rect.width / 256), (ranY * rect.height / 256), arcSize, 0, 2 * Math.PI);
    ctx.stroke();

    

    //ctx.closePath();

    //ctx.fill();

    var x = setTimeout(function() {
        if (paused){
            Generate();
            miliseconds = 0;
            paused = false;
        }
    }, 2000);



});

function GetColor(x, y) {
    var v1 = x;
    var v2 = y;
    var v3 = lockedValue; 


    var redHex, greenHex, blueHex;

    if (lockedByte == 0)
    {
        redHex = GetHex(255 - v3);
        greenHex = GetHex(255 - v1);
        blueHex = GetHex(255 - v2);
    }
    else if (lockedByte == 1)
    {
        redHex = GetHex(255 - v1);
        greenHex = GetHex(255 - v3);
        blueHex = GetHex(255 - v2);
    }
    else if (lockedByte == 2)
    {
        redHex = GetHex(255 - v1);
        greenHex = GetHex(255 - v2);
        blueHex = GetHex(255 - v3);
    }

    return "#" + redHex + "" + greenHex + "" + blueHex;
}

function GetHex(value){
    var Hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    var string = "";

    string = Hex[Math.round(value / 16)] + "" + Hex[Math.round(value % 16)];

    console.log(value + "Hexas: " + string);
    return string;

}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}