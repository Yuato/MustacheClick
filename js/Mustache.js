/*
Author: Omar Siyad and Tony Yuan
File Created Date: Sat Feb 14th 2026
Purpose:
    -Contains 
    -
    -
*/

var mustaches = 0;


window.addEventListener("load", function(){
    const clicker = this.document.getElementById("clicker");
    const mustache_count = this.document.getElementById("mustaches")
    const upgrade1 = this.document.getElementById("upgrade1");
    const upgrade2 = this.document.getElementById("upgrade2");
    const upgrade3 = this.document.getElementById("upgrade3");
    const auto1 = this.document.getElementById("auto1");
    const auto2 = this.document.getElementById("auto2");
    const auto3 = this.document.getElementById("auto3");

    var clickercount = 0;
    var multiplier = 1;

    let bob = 200;
    var barbers = 0;
    let barber_cost = 1000;
    var barberWorking = false;
    
    var clickerUpgradeScore = 0;

    /*This is a helper function meant for changing numbers like thousands and millions into smaller numbers with letters*/
    function formatNumber(num) {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        return num.toLocaleString(); 
    }

    function update(){
        mustache_count.innerHTML = formatNumber(mustaches);
        auto1.innerHTML = formatNumber(bob)
        auto2.innerHTML = formatNumber(barber_cost)
    }

    function auto_update(){
        barberCutMustache();
        bobCutMustache();
        update();
    }

    this.setInterval(auto_update, 1000);

    //Main clicker
    clicker.addEventListener("click", function(){
        cutMustache();
    });

    /*This controls the clicker*/
    function cutMustache() {
        clickercount++;
        mustaches = mustaches + multiplier;
        update();
    }

    function bobCutMustache() {
        mustaches = mustaches + (barbers * multiplier);
    }

    function barberCutMustache() {
        mustaches = mustaches + (barbers * multiplier);
    }

    upgrade1.addEventListener("click", function(){
        if (mustaches >= 100){
            mustaches -= 100;
            upgrade1.style.display = "none";
            multiplier++;
        }
    });
    
    upgrade2.addEventListener("click", function(){
        if (mustaches >= 2500) {
            mustaches -= 2500;
            upgrade2.style.display = "none";
            multiplier = multiplier * 2;
        }
    });

    upgrade3.addEventListener("click", function(){
        if (mustaches >= 10000) {
            mustaches -= 10000;
            upgrade3.style.display = "none";
            multiplier = multiplier * 3;
        }
        
    });

    auto1.addEventListener("click", function(){
        
        if (mustaches >= bob) {
            mustaches -= bob;
            barbers = barbers + 1
            bob = Math.floor(bob*1.5);
            
            update();
        }
        
    });

    auto2.addEventListener("click", function(){
        
        if (mustaches >= barber_cost){
            mustaches -= barber_cost;
            barbers = barbers + 3;
            barber_cost = Math.floor(barber_cost*2.5);

            update();
        }
        
    });
});
