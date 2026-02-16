/*
Author: Omar Siyad and Tony Yuan
File Created Date: Sat Feb 14th 2026
Purpose:
    -Contains 
    -
    -
*/


var clickercount = 0;
var barbers = 0;
var clickermultiple = 1;
var barberWorking = false;
var money = 0;
var clickerUpgradeScore = 0;
var clickerupgrade1 = 4;
var clickerupgrade2 = 59;
var clickerupgrade3 = 420;

/*This controls the clicker*/
function cutMustache() {
    clickercount = clickercount + Math.round(1 * clickermultiple);
    document.getElementById("num_of_cuts").innerHTML = clickercount;
}

/*This increases the amount of workers*/
function barberCutMustache() {
    clickercount = clickercount + (barbers * clickermultiple);
    document.getElementById("num_of_cuts").innerHTML = clickercount;
}

/*This controls how much a barber does per click*/
function hireBarbers() {
    barbers = barbers +1;
    if (barberWorking == false){
        barberWorking = true;
        setInterval(function(){
        barberCutMustache()
            }, 1000)
    }
    document.getElementById("num_of_barbers").innerHTML = barbers;

}


/*This Focuses on how much hair is sold*/
function sellHair() {
    if (clickercount > 0) {
        money += Math.round(clickercount * 1.6);
        clickercount = 0;

        document.getElementById("num_of_cuts").innerHTML = clickercount;
        document.getElementById("cash").innerHTML = money
    }
}


function upgrades1() {
    if (money >= clickerupgrade1) {
        money = money - clickerupgrade1;
        clickermultiple += 1; 
        clickerupgrade1 = Math.round(clickerupgrade1 * 1.5);
        clickerupgrade2 = Math.round(clickerupgrade2 * 1.9);
        clickerupgrade3 = Math.round(clickerupgrade3 * 2.2);
    }
    document.getElementById("cash").innerHTML = money;
    document.getElementById("upgrades1").innerHTML = clickerupgrade1;
    document.getElementById("upgrades2").innerHTML = clickerupgrade2;
    document.getElementById("upgrades3").innerHTML = clickerupgrade3;

}

function upgrades2() {
    if (money >= clickerupgrade2) {
        money -= clickerupgrade2;
        clickermultiple += 1.6; 
        clickerupgrade1 = Math.round(clickerupgrade1 * 1.5);
        clickerupgrade2 = Math.round(clickerupgrade2 * 1.9);
        clickerupgrade3 = Math.round(clickerupgrade3 * 2.2);
    }
    document.getElementById("cash").innerHTML = money;
    document.getElementById("upgrades1").innerHTML = clickerupgrade1;
    document.getElementById("upgrades2").innerHTML = clickerupgrade2;
    document.getElementById("upgrades3").innerHTML = clickerupgrade3;

}

function upgrades3() {
    if (money >= clickerupgrade3) {
        money -= clickerupgrade3;
        clickermultiple += 2; 
        clickerupgrade1 = Math.round(clickerupgrade1 * 1.5);
        clickerupgrade2 = Math.round(clickerupgrade2 * 1.9);
        clickerupgrade3 = Math.round(clickerupgrade3 * 2.2);
    }
    document.getElementById("cash").innerHTML = money;
    document.getElementById("upgrades1").innerHTML = clickerupgrade1;
    document.getElementById("upgrades2").innerHTML = clickerupgrade2;
    document.getElementById("upgrades3").innerHTML = clickerupgrade3;

}
