function onLoad() {
    var value = getCookie("value");
    var slider = document.querySelector(".slider");

    var label = document.querySelector(".text");
    label.textContent = value;
    
    slider.value = value;
}

function onChange(value) {
    localStorage.setItem("value", value);
    var label = document.querySelector(".text");
    label.textContent = value;

    //setCookie("value", value, 7);
}