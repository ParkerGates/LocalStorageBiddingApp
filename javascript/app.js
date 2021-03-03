//VARIABLES-----------------------------------------------------------
    //set variables
let history = loadLocalData("historyArray");//loadLocalDataHistory();
let colors = loadLocalData("colorsArray");//loadLocalDataColors();
let fullList;
let item;

    //Get Elements
let red = document.getElementById("bidPlacer1");
let blue = document.getElementById("bidPlacer2");

let highest = document.getElementById("highest");
let runnerUp = document.getElementById("runnerUp");

let historyList = document.getElementById("historyList");


//START UP------------------------------------------------------------
compileLocalData();



//MAIN FUNCTIONS------------------------------------------------------
function textToArray(id){
    if (id == "bp1") {
        item = Number(red.value);
        if (isNumber(item) == false) {return;}
        if (biggerThanHighest(item) == false) {return;}
        overTen();

        history.unshift(item);
        colors.unshift("r");

        red.disabled = true;
        blue.disabled = false;
        red.value = "";
    }
    else if (id == "bp2") {
        item = Number(blue.value);
        if (isNumber(item) == false) {return;}
        if (biggerThanHighest(item) == false) {return;}
        overTen();

        history.unshift(item);
        colors.unshift("b");

        red.disabled = false;
        blue.disabled = true;
        blue.value = "";
    }
    addToElement();
    saveLocalData();
}


function addToElement(){
    historyList.innerHTML = "";
    fullList = "";
    for (let i = 0; i <= history.length - 1; i++) {
        if (i == 1) {
            runnerUp.style.color = setTextColor(colors[1]);
            runnerUp.value = history[1];
        }
        if (i == 0) {
            highest.style.color = setTextColor(colors[0]);
            highest.value = history[0];
        }
        if (colors[i] == "r") {
            fullList += `<li class="colorRed">${history[i]}</li>`
        }
        if (colors[i] == "b") {
            fullList += `<li class="colorBlue">${history[i]}</li>`
        }
    }
    historyList.innerHTML = fullList;
}




//LOCAL STORAGE FUNCTIONS---------------------------------------------
function saveLocalData(){
    localStorage.setItem("historyArray", JSON.stringify(history));
    localStorage.setItem("colorsArray", JSON.stringify(colors));
}


function compileLocalData(){
    if ((history != []) && (colors != [])) {
        if (colors[0] == "r") { red.disabled = true; }
        if (colors[0] == "b") { blue.disabled = true; }
        addToElement();
    }
}


function loadLocalData(array) {
    return JSON.parse(localStorage.getItem(array)) || [];
}


function clearLocalData(){
    localStorage.clear();
    history = [];
    colors = [];
    historyList.innerHTML = "";
    highest.value = "";
    runnerUp.value = "";
    red.disabled = false;
    blue.disabled = false;
}




//HELPER FUNCTIONS----------------------------------------------------
//Is ITEM entered A NUMBER
function isNumber(item){
    if (Object.is(NaN, item)) {
        red.value = "";
        blue.value = "";
        alert("Please Enter A Valid Number");
        return false;
    }
}

//Is NUMBER entered THE HIGHEST
function biggerThanHighest(item){
    if (history.length != 0) {
        if (item <= history[0]) {
            red.value = "";
            blue.value = "";
            alert("Please Enter A Number Higher Than The Highest Bid");
            return false;
        }
    }
}

//MAINTAINING A HISTORY OF 10 items
function overTen() {
    if (history.length >= 10) {
        history.pop();
        colors.pop();
    }
}

//Set TEXT COLOR
function setTextColor(color) {
    if (color == "r") {
        return "red";
    }
    if (color == "b") {
        return "blue";
    }
}