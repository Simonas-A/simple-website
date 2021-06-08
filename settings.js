function onLoad() {
    var value = localStorage.getItem("waitTime");

    var slider = document.querySelector(".slider");
    var label = document.querySelector(".text");
    
    if (value == undefined)
    {
        value = 2000;
        localStorage.setItem("waitTime", value);
    }

    label.textContent = "Wait time: " + parseFloat(value / 1000).toFixed(1) + " s";
    slider.value = value;
}

function onChange(value) {

    localStorage.setItem("waitTime", value);
    var label = document.querySelector(".text");
    label.textContent = "Wait time: " + parseFloat(value / 1000).toFixed(1) + " s";

    //setCookie("value", value, 7);
}