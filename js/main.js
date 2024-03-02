import { WF } from "./warframe-data.js";
import { ModData } from "./modifiers-data.js";

const display = document.getElementById("display");

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

// Populate tabs with templates
let templateStrength = ``;

for (const k in ModData) {
    const data = ModData[k];

    templateStrength += breakdownTemplate(k, data, 'strength');
}

const tabStrength = document.getElementById("tab-strength");
tabStrength.innerHTML += templateStrength;

// Update on input click
const inputs = document.querySelectorAll("input");

inputs.forEach((e) => {
    console.log(e)

    e.addEventListener('change', (event) => {
        console.log('clicked');
        updateValues();
    })
})

/* Utility Functions */

// Update values
function updateValues() {
    inputs = document.querySelectorAll("input");
    const values = {};

    inputs.forEach(i => {
        console.log(i)
        console.log(i.parent)
    })
}

// Stats breakdown template
function breakdownTemplate(key, data, stat) {
    const cssKey = key.replace(" ", "-");

    let html = `
        <div class="modifier-row" id="${stat}-${cssKey}">
            <label>${key}</label>
            <input class="enable" type="checkbox" />
    `;

    if (data[stat].percentage) {
        const pctg = data[stat].percentage[0];

        html += `<div class="value` + (pctg >= 0 ? `">+${pctg}%` : ` red">${pctg}%`) + `</div>`;
        
    } else {

    }
    
    html += `
        <div class="contribution"></div>
    </div>
    `
    
    return html;
}

// Theme switch
const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("click", () => {
    if(themeSwitch.checked == true){
        document.body.setAttribute("data-theme", "dark");
    }else{
        document.body.setAttribute("data-theme", "");
    }
});

