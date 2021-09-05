
class Hit {
    constructor(color, distance, time){
        this.color = color;
        this.distance = distance;
        this.time = time;
    }
}

class Hue {
    constructor (value, distance, time, count) {
        this.value = value;
        this.distance = distance;
        this.time = time;
        this.count = count;
    }
}


var hits;

function onLoad(){
    //var temp = localStorage.getItem("hitList");
    //console.log(temp);
    hits = JSON.parse(localStorage.getItem("hitList"));

    var dict = GetDictionary(hits);

    DrawStats(dict)

   
}

function GetDictionary(hits) {
    var dict = new Map();

    for (var i = 0; i < 12; i++) {
        var hue = GetHueObject(i, hits);
        dict.set(i, hue);
    }

    return dict;
}

function GetHueObject(value, hits) {

    var totalDistance = 0;
    var totalTime = 0;
    var totalCount = 0;

    for(var i = 0; i < hits.length; i++){
        var color = hits[i].color;
        var r = parseInt(color.substr(1,2), 16); // Grab the hex representation of red (chars 1-2) and convert to decimal (base 10).
        var g = parseInt(color.substr(3,2), 16);
        var b = parseInt(color.substr(5,2), 16);

        var hue = rgbToHsl(r,g,b)[0];

        if (Math.round(hue * 12) == value){
            totalDistance += hits[i].distance;
            totalTime += hits[i].time;
            totalCount++;
        }
    }

    var hueObject = new Hue(value, totalDistance, totalTime, totalCount);

    return hueObject;
}

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    var r, g, b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      }
  
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
  
    return [ r * 255, g * 255, b * 255 ];
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
  

function hsvToRgb(h, s, v) {
    var r, g, b;
  
    var i = Math.floor(h * 6);
    var f = h * 6 - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [ r * 255, g * 255, b * 255 ];
  }


function DrawStats(dict) {

    
    var width = 200;
    var height = 300;
    var value = 128;

    var canvas = document.getElementById("cnv");
    var ctx = canvas.getContext("2d");
    var width = canvas.getBoundingClientRect().width;
    var height = canvas.getBoundingClientRect().height;

    canvas.width = width;
    canvas.height = height;


    var barWidth = 25;
    var barCount = 12;

    for (var i = 0; i < barCount; i++) {

        //console.log(i + " " + dict.get(i).count);

        //var rgb = hslToRgb(i * 30, 1, 0.5);

        var rgb = hsvToRgb(i * 30 / 360, 1, 1);

        //console.log(rgbToHex(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])));

        ctx.fillStyle = rgbToHex(Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2]));

        var barHeight = (dict.get(i).distance / dict.get(i).count) * height / 360;

        ctx.fillRect((width / 2) - barWidth * (barCount / 2) + barWidth * i, height - barHeight - 150, barWidth, barHeight);

        console.log(i + " - " + (dict.get(i).distance / dict.get(i).count));

        //ctx.fillRect(40, 60, 120, 150);

    }

    

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

function ClearStats(){
    hits = [];
    localStorage.setItem("hitList",  JSON.stringify(hits));
    DrawStats(GetDictionary(hits));
}