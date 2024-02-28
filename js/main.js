import { WF } from "./warframe-data.js";

const switchbtn = document.getElementById("switch");
const display = document.getElementById("display");
const input = document.querySelectorAll("input");
let value = "";

const wfSelect = document.getElementById('wf-select');

// Populate Warframe dropdown with names
const wfNames = Object.keys(WF);

wfNames.forEach(n => {
    const newOption = new Option(n,n);
    wfSelect.add(newOption,undefined);
});

let selectedData = {};

// Create a Warframe dropdown listener
function setBaseValues(data) {
    console.log(selectedData)
    console.log(data)
    document.getElementById("base-armor").innerHTML = data.armor;
    document.getElementById("base-health").innerHTML = data.health;
    document.getElementById("base-shield").innerHTML = data.shield_cap;
    document.getElementById("base-energy").innerHTML = data.energy_cap;
    //data.os_max
    //data.eh;
    //data.ehos;
    //data.energy_spawn;
    //data.sprint;
}

wfSelect.onchange = function() {
    selectedData = WF[name];
    console.log(selectedData)
    setBaseValues(selectedData);
};

switchbtn.addEventListener("click", () => {
    if(switchbtn.checked == true){
        document.body.setAttribute("data-theme", "dark");
    }else{
        document.body.setAttribute("data-theme", "");
    }
});

input.forEach((e) => {
    e.addEventListener("click", (event) => {
        if(event.target.value == "="){
            if(value.length != 0){
                let newval = eval(value);
                value = newval;
                display.value = value;
            }
        }else if(event.target.value == 'C'){
            value = "";
            display.value = value;
        }else if(event.target.value == "switch"){

        }else{
            value += event.target.value;
            display.value = value;
        }
        if(!event.target.classList.contains("switch")){
            event.target.classList.add("active");
            setTimeout(() => {
                event.target.classList.remove("active");
            },400);
        }
    })
})
