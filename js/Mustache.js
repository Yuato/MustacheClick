/*
Author: Omar Siyad and Tony Yuan
File Created Date: Sat Feb 14th 2026
Purpose:
    -Contains 
    -
    -
*/

window.addEventListener(load, function(){
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
        document.getElementById("num_of_cuts").innerHTML = formatNumber(clickercount);
    }

    /*This is a helper function meant for changing numbers like thousands and millions into smaller numbers with letters*/
    function formatNumber(num) {
    if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
    if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
    if (num >= 1000) return (num / 1000).toFixed(2) + "K";
    
    
    return num.toLocaleString(); 
}

    /*This increases the amount of workers*/
    function barberCutMustache() {
        clickercount = clickercount + (barbers * clickermultiple);
        document.getElementById("num_of_cuts").innerHTML = formatNumber(clickercount);
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
            document.getElementById("cash").innerHTML = formatNumber(money);
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
        document.getElementById("cash").innerHTML = formatNumber(money);
        document.getElementById("upgrades1").innerHTML = formatNumber(clickerupgrade1);
        document.getElementById("upgrades2").innerHTML = formatNumber(clickerupgrade2);
        document.getElementById("upgrades3").innerHTML = formatNumber(clickerupgrade3);

    }

    function upgrades2() {
        if (money >= clickerupgrade2) {
            money -= clickerupgrade2;
            clickermultiple += 1.6; 
            clickerupgrade1 = Math.round(clickerupgrade1 * 1.5);
            clickerupgrade2 = Math.round(clickerupgrade2 * 1.9);
            clickerupgrade3 = Math.round(clickerupgrade3 * 2.2);
        }
        document.getElementById("cash").innerHTML = formatNumber(money);
        document.getElementById("upgrades1").innerHTML = formatNumber(clickerupgrade1);
        document.getElementById("upgrades2").innerHTML = formatNumber(clickerupgrade2);
        document.getElementById("upgrades3").innerHTML = formatNumber(clickerupgrade3);
    }

    function upgrades3() {
        if (money >= clickerupgrade3) {
            money -= clickerupgrade3;
            clickermultiple += 2; 
            clickerupgrade1 = Math.round(clickerupgrade1 * 1.5);
            clickerupgrade2 = Math.round(clickerupgrade2 * 1.9);
            clickerupgrade3 = Math.round(clickerupgrade3 * 2.2);
        }
        document.getElementById("cash").innerHTML = formatNumber(money);
        document.getElementById("upgrades1").innerHTML = formatNumber(clickerupgrade1);
        document.getElementById("upgrades2").innerHTML = formatNumber(clickerupgrade2);
        document.getElementById("upgrades3").innerHTML = formatNumber(clickerupgrade3);

    }
});
