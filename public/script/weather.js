console.log("weather.js");
var text_input = document.querySelector("input");
var button = document.querySelector("button");
var app = document.querySelector("#app");
var url = `${window.location.origin}/get_weather?address=`;

button.addEventListener("click", ()=>{
    var ele = document.querySelector(".text-center");
    if(ele)
        ele.parentNode.removeChild(ele);
    var val = text_input.value;
    var new_ele = document.createElement("h1");
    new_ele.classList.add("text-center");
    new_ele.innerHTML = "Weather : Loading......";
    if(val == ""){
        new_ele.innerHTML = "Please enter a place...";
    }else{
        console.log(url+val);
        fetch(url+val).then(res=>{
            res.json().then(data=>{
                new_ele.innerHTML = "Weather : "+data.weather;
                console.log(data.weather);
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
        
    }
    app.appendChild(new_ele);
    text_input.value = "";
});