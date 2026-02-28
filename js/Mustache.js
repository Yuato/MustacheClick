/*
Author: Omar Siyad and Tony Yuan
File Created Date: Sat Feb 14th 2026*/

var mustaches = 0;

class Upgrade{
    constructor (element, icon, cost, multiplier){
        this.element = element;
        this.icon = icon;
        this.cost = cost;
        this.multiplier = multiplier;
    }
}

class AutoUpgrade{
    constructor (element, elementCost, value, amount, cost){
        this.element = element;
        this.elementCost = elementCost;
        this.value = value;
        this.amount = amount
        this.cost = cost;
        this.bought = false;
    }
}

class Reward{
    constructor (element, icon, obtained){
        this.element = element;
        this.icon = icon;
        this.obtained = obtained;
    }
}

window.addEventListener("load", function(event){
    /*A helper function that serves as a substitute for getElementById("id")*/
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

    let autoUpgrades = [];
    let autoElem = docElemId("auto1");
    let autoCost = docElemId("auto1_cost");
    autoUpgrades[1] = new AutoUpgrade(autoElem, autoCost, 1, 0, 100);

    autoElem = docElemId("auto2");
    autoCost = docElemId("auto2_cost");
    autoUpgrades[2] = new AutoUpgrade(autoElem, autoCost, 3, 0, 500);

    autoElem = docElemId("auto3");
    autoCost = docElemId("auto3_cost");
    autoUpgrades[3] = new AutoUpgrade(autoElem, autoCost, 5, 0, 1000);
    
    for (let i = 1; i<= 3; i++){
        autoUpgrades[i].elementCost.innerHTML = autoUpgrades[i].cost;
    }

    const helpBtn = docElemId("openBtn");
    const helpMenu = docElemId("help_section");
    const closeHelp = docElemId("closeHelp");

    let rewards = [];
    for (let i = 1; i <= 5; i++){
        let icon = docElemId("reward" + i +"Icon");
        rewards[i] = new Reward(docElemId("reward" + i), icon, false);
    }
    
    var clickercount = 0;
    var multiplier = 1;
    var clickerUpgradeScore = 0;

    /*helpBtn opens a menu to the user to display the main purpose of the game and the controls*/
    helpBtn.addEventListener("click", function(){
        if (helpMenu.style.display === "none") {
                helpMenu.style.display = "block";
        } 
        else {
                helpMenu.style.display = "none";
        }
    });

    /*closeHelp closes the help menu*/
    closeHelp.addEventListener("click", function() {
        helpMenu.style.display = "none";
    });

    /*This is a helper function meant for changing numbers like thousands and millions into smaller numbers with letters*/
    function formatNumber(num) {
        if (num >= 1000000000000) return (num / 1000000000000).toFixed(2) + "T";
        if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(2) + "M";
        return num.toLocaleString(); 
    }

    /*updates the current amount of mustaches*/
    function event_update(){
        mustache_count.innerHTML = formatNumber(mustaches);
        checkReward(1, true, rewards[1].obtained);
        checkReward(2, (mustaches >= 1000000), rewards[2].obtained);
        checkReward(3,  (clickercount >= 100000), rewards[3].obtained);
        checkReward(4, (clickerUpgradeScore >= 1), rewards[4].obtained);
        checkReward(5, (clickerUpgradeScore >= 7), rewards[5].obtained);
    }

    /*incoporates the amount of workers and increases the click value based on the number of workers*/
    function upgrades_update() {
        for (let i = 1; i <= 3; i++){
            mustaches += (autoUpgrades[i].value * autoUpgrades[i].amount *multiplier);
        }
    }

    /*updates both mustache_update() and upgrade_update() per second*/
    function interval_update(){
        upgrades_update()
        event_update();
    }

    this.setInterval(interval_update, 1000);

    //Main clicker
    clicker.addEventListener("click", function(){
        clickercount++;
        mustaches = mustaches + multiplier;
        event_update();
    });


    function background(elem, color){
        elem.style.backgroundColor = color;
    };

    /* upgrades increases the amount of clicks gained per click*/
    for (let i = 1; i<=4; i++){
        upgrade[i].element.addEventListener("click", function(){
            if (mustaches >= upgrade[i].cost){
                upgrade[i].element.style.display = "none";
                upgrade[i].icon.style.visibility = "visible";
                mustaches -= upgrade[i].cost;
                multiplier = multiplier * upgrade[i].multiplier;
                clickerUpgradeScore++;
            }
            else{
                background(upgrade[i].element, "red");
                setTimeout(() => background(upgrade[i].element, "lightgrey"), 1000);
            }
        });
    }
    
    /* autoUpgrades increases the amount of workers, and while substracting the current amount of mustaches, their respective value increases for each purchase*/
    for (let i = 1; i <=3; i++){
        autoUpgrades[i].element.addEventListener("click", function(){
            if (mustaches >= autoUpgrades[i].cost){
                mustaches -= autoUpgrades[i].cost;
                autoUpgrades[i].amount++;
                autoUpgrades[i].cost = Math.floor(autoUpgrades[i].cost*1.5);
                autoUpgrades[i].elementCost.innerHTML = formatNumber(autoUpgrades[i].cost);
                if (autoUpgrades[i].bought === false){
                    clickerUpgradeScore++;
                    autoUpgrades[i].bought = true;
                }
            }
            else{
                background(upgrade[i].element, "red");
                setTimeout(() => background(upgrade[i].element, "lightgrey"), 1000);
            }
        });
    }
    /* checks if the condition of the reward passes before giving the user the achievement*/
    function checkReward(num, condition, obtained){
        if (condition && obtained === false){
            rewards[num].icon.style.visibility = "visible";
            rewards[num].obtained = true;

            rewards[num].element.style.display = "block";
            setTimeout(() => rewards[num].element.style.display = "none", 10000);
        }
    };



});
