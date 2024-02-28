import { WF } from "./warframe-data.js";

const switchbtn = document.getElementById("switch");
const display = document.getElementById("display");
const input = document.querySelectorAll("input");
let value = "";

const wfSelect = document.getElementById('wf-select');

const wfNames = Object.keys(WF);

wfNames.forEach(n => {
    console.log(n);
    const newOption = new Option(n,n);
    wfSelect.add(newOption,undefined);
});

// Create a Warframe dropdown listener
function myFunction(value) { 
    console.log(value);
}

wfSelect.onchange = function() { 
    myFunction(this.value);
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
