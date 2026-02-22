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
    const auto1_cost_html = this.document.getElementById("auto1_cost");
    const auto2 = this.document.getElementById("auto2");
    const auto2_cost_html = this.document.getElementById("auto2_cost");
    const auto3 = this.document.getElementById("auto3");

    var clickercount = 0;
    var multiplier = 1;

    let num_auto1 = 0;
    let auto1_cost = 100;
    auto1_cost_html.innerHTML = formatNumber(auto1_cost);
    var num_auto2 = 0;
    let auto2_cost = 1000;
    auto2_cost_html.innerHTML = formatNumber(auto2_cost);
    
    var clickerUpgradeScore = 0;

    /*This is a helper function meant for changing numbers like thousands and millions into smaller numbers with letters*/
    function formatNumber(num) {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        if (num >= 1000) return (num / 1000).toFixed(2) + "K";
        return num.toLocaleString(); 
    }

    function mustache_update(){
        mustache_count.innerHTML = formatNumber(mustaches);
    }

    function upgrades_update() {
        mustaches += (num_auto1 * multiplier);
        mustaches += (num_auto2 * 3 * multiplier);
    }

    function interval_update(){
        upgrades_update()
        mustache_update();
    }

    this.setInterval(interval_update, 1000);

    //Main clicker
    clicker.addEventListener("click", function(){
        clickMustache();
    });

    /*This controls the clicker*/
    function clickMustache() {
        clickercount++;
        mustaches = mustaches + multiplier;
        mustache_update();
    }

    upgrade1.addEventListener("click", function(){
        if (mustaches >= 100){
            mustaches -= 100;
            upgrade1.style.display = "none";
            multiplier = multiplier * 2;
        }
    });
    
    upgrade2.addEventListener("click", function(){
        if (mustaches >= 2500) {
            mustaches -= 2500;
            upgrade2.style.display = "none";
            multiplier = multiplier * 3;
        }
    });

    upgrade3.addEventListener("click", function(){
        if (mustaches >= 10000) {
            mustaches -= 10000;
            upgrade3.style.display = "none";
            multiplier = multiplier * 5;
        }
        
    });

    auto1.addEventListener("click", function(){
        
        if (mustaches >= auto1_cost) {
            mustaches -= auto1_cost;
            num_auto1++;
            auto1_cost = Math.floor(auto1_cost*1.5);
            
            auto1_cost_html.innerHTML = formatNumber(auto1_cost);
        }
        
    });

    auto2.addEventListener("click", function(){
        
        if (mustaches >= auto2_cost){
            mustaches -= auto2_cost;
            num_auto2++;
            auto2_cost = Math.floor(auto2_cost*1.5);

            auto2_cost_html.innerHTML = formatNumber(auto2_cost);
        }
        
    });
});
