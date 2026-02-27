/*
Author: Omar Siyad and Tony Yuan
File Created Date: Sat Feb 14th 2026
Purpose:
    -Contains 
    -
    -
*/

var mustaches = 0;

class Upgrade{
    constructor (element, icon, cost, multiplier){
        this.element = element;
        this.icon = icon;
        this.cost = cost;
        this.multiplier = multiplier
    }
}

window.addEventListener("load", function(){
    function docElemId(id){
        return this.document.getElementById(id);
    }

    const clicker = docElemId("clicker");
    const mustache_count = docElemId("mustaches")

    let upgrade = [];
    upgrade[1] = new Upgrade(docElemId("upgrade1"), docElemId("upgrade1Icon"), 100, 2);
    upgrade[2] = new Upgrade(docElemId("upgrade2"), docElemId("upgrade2Icon"), 2500, 3);
    upgrade[3] = new Upgrade(docElemId("upgrade3"), docElemId("upgrade3Icon"), 10000, 5);
    upgrade[4] = new Upgrade(docElemId("upgrade4"), docElemId("upgrade4Icon"), 100000, 10);

    const auto1 = docElemId("auto1");
    const auto1_cost_html = docElemId("auto1_cost");
    const auto2 = docElemId("auto2");
    const auto2_cost_html = docElemId("auto2_cost");
    const auto3 = this.document.getElementById("auto3");
    const helpBtn = docElemId("openBtn");
    const helpMenu = docElemId("help_section");
    const closeHelp = docElemId("closeHelp");

    let rewards = [];
    for (let i = 1; i <= 5; i++){
        rewards[i] = docElemId("reward" + i);
    }

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
        return num.toLocaleString(); 
    }

    function event_update(){
        mustache_count.innerHTML = formatNumber(mustaches);
    }

    function upgrades_update() {
        mustaches += (num_auto1 * multiplier);
        mustaches += (num_auto2 * 3 * multiplier);
    }

    function interval_update(){
        upgrades_update()
        event_update();
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
        event_update();
    }

    for (let i = 1; i<=4; i++){
        upgrade[i].element.addEventListener("click", function(){
            if (mustaches >= upgrade[i].cost){
                upgrade[i].element.style.display = "none";
                upgrade[i].icon.style.visibility = "visible";
                mustaches -= upgrade[i].cost;
                multiplier = multiplier * upgrade[i].multiplier;
            }
        });
    }

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

    helpBtn.addEventListener("click", function(){
        if (helpMenu.style.display === "none") {
                helpMenu.style.display = "block";
        } 
        else {
                helpMenu.style.display = "none";
        }
    });

    closeHelp.addEventListener("click", function() {
        helpMenu.style.display = "none";
    });
});
