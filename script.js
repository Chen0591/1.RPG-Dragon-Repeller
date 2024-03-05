let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["木棍"];

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: '木棍', power: 5 },
  { name: '匕首', power: 30 },
  { name: '羊角锤', power: 50 },
  { name: '大剑', power: 100 }
];
const monsters = [
  {
    name: "史莱姆",
    level: 2,
    health: 15
  },
  {
    name: "獠牙兽",
    level: 8,
    health: 60
  },
  {
    name: "巨龙",
    level: 20,
    health: 300
  }
]
const locations = [
    {
        name: "城镇广场",
        "button text": ["商店", "洞穴", "驱龙"],
        "button functions": [goStore, goCave, fightDragon],
        text: "你在城镇的中心广场. 你看到一个标志写着 \"商店\"."
    },
    {
        name: "商店",
        "button text": ["10生命值 (10 金币)", "购买武器 (30 金币)", "前往城镇广场"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "你进入了商店."
    },
    {
        name: "洞穴",
        "button text": ["驱赶史莱姆", "驱赶獠牙野兽", "前往城镇广场"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "你进入了洞穴. 你看到了许多野兽."
    },
    {
        name: "战斗",
        "button text": ["攻击", "防御", "逃跑"],
        "button functions": [attack, dodge, goTown],
        text: "你正和怪物战斗."
    },
    {
        name: "击杀怪兽",
        "button text": ["前往城镇广场", "前往城镇广场", "前往城镇广场"],
        "button functions": [goTown, goTown, goTown],
        text: '伴随着最后一声嚎叫，怪物倒下了。你获得了经验并找到了金币。'
    },
    {
        name: "失败",
        "button text": ["再来一次?", "再来一次?", "再来一次?"],
        "button functions": [restart, restart, restart],
        text: "你阵亡了. ☠️"
    },
    { 
        name: "胜利", 
        "button text": ["再来一次?", "再来一次?", "再来一次?"], 
        "button functions": [restart, restart, restart], 
        text: "你打败了恶龙!你赢得了这场战斗！ 🎉" 
    },
    {
        name: "彩蛋",
        "button text": ["2", "8", "前往城镇广场?"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "你找到了隐藏的游戏.选择一个数字. 数字将在1-10之间随机生成. 如果你选的数字和随机数字相同，你将赢得奖励!"
    }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


// 定义一个函数来切换背景图片
function changeBackground(imageUrl) {
  const background = document.getElementById("background-image");
  background.style.backgroundImage = `url(${imageUrl})`;
}



function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
  changeBackground("Towns.png");
}

function goStore() {
  update(locations[1]);
  changeBackground("shop.png");
}


function goCave() {
  update(locations[2]);
  changeBackground("Cave.png");
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "你没有足够的金币来购买生命值。";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "你现在拥有 " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " 你的武器库里有: " + inventory;
    } else {
      text.innerText = "你没有足够的金币来购买新武器.";
    }
  } else {
    text.innerText = "你已经拥有了最强大的武器!";
    button2.innerText = "以 15 金币售卖武器";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "你卖出了 " + currentWeapon + ".";
    text.innerText += "你的武器库里有: " + inventory;
  } else {
    text.innerText = "不能售卖你唯一的武器!";
  }
}


function fightSlime() {
  changeBackground("Slimes.png");
  fighting = 0;
  goFight();
}

function fightBeast() {
  changeBackground("beasts.png");
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  changeBackground("Dragon.png");
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["木棍"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
