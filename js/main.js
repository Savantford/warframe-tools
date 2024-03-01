import { WF } from "./warframe-data.js";
import { ModData } from "./modifiers-data.js";

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
    document.querySelectorAll(".base-armor").forEach(el => el.innerHTML = data.armor);
    document.querySelectorAll(".base-health").forEach(el => el.innerHTML = data.health);
    document.querySelectorAll(".base-shield").forEach(el => el.innerHTML = data.shield_cap);
    document.querySelectorAll(".base-energy").forEach(el => el.innerHTML = data.energy_cap);
    //data.os_max
    //data.eh;
    //data.ehos;
    //data.energy_spawn;
    //data.sprint;
}

wfSelect.onchange = function() {
    selectedData = WF[this.value];
    
    setBaseValues(selectedData);
};

// Tabs
function switchTab(ev, tab) {
    var i, tabContent, tabButton;

    // Hide tabs
    tabContent = document.getElementsByClassName("tab-content");

    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }

    // Style buttons
    tabButton = document.getElementsByClassName("tab-button");

    for (i = 0; i < tabButton.length; i++) {
      tabButton[i].className = tabButton[i].className.replace(" active", "");
    }

    // Activate tab
    //document.querySelector('#[data-tab=' + tab + ']').style.display = "block";;
    document.getElementById('tab-' + tab).style.display = "block";
    ev.currentTarget.className += " active";
}

const tabButtons = document.querySelectorAll('.tab-button');

tabButtons.forEach(el => el.addEventListener('click', event => {
  console.log(event.target.getAttribute("data-tab"));
  switchTab(event, event.target.getAttribute("data-tab"));
}));

// Theme switch
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("click", () => {
    if(themeSwitch.checked == true){
        document.body.setAttribute("data-theme", "dark");
    }else{
        document.body.setAttribute("data-theme", "");
    }
});

// Stats breakdown template
function breakdownTemplate(key, data, stat) {
    const cssKey = key.replace(" ", "-");

    let html = `
        <div class="modifier-row">
            <label>${key}</label>
            <input type="checkbox" id="${cssKey}-checkbox" />
    `;

    if (data[stat].percentage) {
        const pctg = data[stat].percentage[0];
        console.log(data)
        console.log(data[stat])
        console.log(pctg)

        html += `<div id="${cssKey}-pctg">` + (pctg >= 0 ? `+` : ``) + `%</div>`;
        
    } else {

    }
    
    html += `
        <div id="${cssKey}-contribution"></div>
    </div>
    `
    
    return html;
}

// 
let templateStrength = ``;

for (const k in ModData) {
    const data = ModData[k];

    templateStrength += breakdownTemplate(k, data, 'strength');
}

//tab-strength
const tabStrength = document.getElementById("tab-strength");
tabStrength.innerHTML += templateStrength;

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
