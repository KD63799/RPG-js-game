let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterImage = document.querySelector("#monsterImage");
const sceneImage = document.querySelector("#sceneImage");
const sceneImageContainer = document.querySelector("#sceneImageContainer");

const weapons = [
  { name: "stick", power: 5, image: "images/stick.webp" },
  { name: "dagger", power: 30, image: "images/dagger.webp" },
  { name: "claw hammer", power: 50, image: "images/hammer.webp" },
  { name: "sword", power: 100, image: "images/sword.webp" },
  { name: "axe", power: 150, image: "images/axe.webp" },
  { name: "magic staff", power: 200, image: "images/magic_staff.webp" },
  { name: "excalibur", power: 300, image: "images/excalibur.webp" },
];

const weaponPrices = [0, 30, 50, 70, 100, 150, 200];

const monsters = [
  { name: "slime", level: 2, health: 15, image: "images/slime.webp" },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    image: "images/fanged_beast.webp",
  },
  { name: "dragon", level: 20, health: 300, image: "images/dragon.webp" },
  { name: "goblin", level: 5, health: 40, image: "images/goblin.webp" },
  { name: "troll", level: 12, health: 100, image: "images/troll.webp" },
  {
    name: "dark wizard",
    level: 25,
    health: 350,
    image: "images/dark_wizard.webp",
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to the shop", "Go to the cave", "Go to the forest"],
    "button functions": [goStore, goCave, goForest],
    text: "You are in the town square. You see a sign that says 'Shop'. There's a path leading to the cave and another to the forest.",
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy a weapon",
      "Return to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the shop.",
  },
  {
    name: "cave",
    "button text": [
      "Fight a slime",
      "Fight a fanged beast",
      "Return to town square",
    ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see monsters lurking.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Return to town square",
      "Return to town square",
      "Return to town square",
    ],
    "button functions": [goTown, goTown, goTown],
    text: "The monster roars in pain and dies. You gain experience points and find some gold.",
  },
  {
    name: "lose",
    "button text": ["PLAY AGAIN?", "PLAY AGAIN?", "PLAY AGAIN?"],
    "button functions": [restart, restart, restart],
    text: "You have been defeated. &#x2620;",
  },
  {
    name: "win",
    "button text": ["PLAY AGAIN?", "PLAY AGAIN?", "PLAY AGAIN?"],
    "button functions": [restart, restart, restart],
    text: "You have defeated the evil wizard! YOU WIN THE GAME! &#x1F389;",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Return to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You found a secret game. Choose a number above. Ten numbers will be randomly picked between 0 and 10. If your number matches any of them, you win!",
  },
  {
    name: "forest",
    "button text": ["Fight a goblin", "Fight a troll", "Go to the castle"],
    "button functions": [fightGoblin, fightTroll, goCastle],
    text: "You venture into the forest. You hear creatures moving.",
  },
  {
    name: "castle",
    "button text": [
      "Fight the dragon",
      "Fight the dark wizard",
      "Return to town square",
    ],
    "button functions": [fightDragon, fightDarkWizard, goTown],
    text: "You enter the castle, it's dark and silent.",
  },
];

// Initialisation des boutons et démarrage du jeu
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = goForest;
goTown();

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  // Afficher le conteneur de l'image de scène si on n'est pas en combat
  if (location.name !== "fight") {
    sceneImageContainer.style.display = "block";
  }
}

function goTown() {
  update(locations[0]);
  sceneImage.src = "images/town_square.webp";
  sceneImageContainer.style.display = "block";
}

function goStore() {
  update(locations[1]);
  sceneImage.src = "images/store_image.webp";
  sceneImageContainer.style.display = "block";
}

function goCave() {
  update(locations[2]);
  sceneImage.src = "images/cave_image.webp";
  sceneImageContainer.style.display = "block";
}

function goForest() {
  update(locations[8]);
  sceneImage.src = "images/forest_image.webp";
  sceneImageContainer.style.display = "block";
}

function goCastle() {
  update(locations[9]);
  sceneImage.src = "images/castle_image.webp";
  sceneImageContainer.style.display = "block";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You bought 10 health points.";
    sceneImage.src = "images/buy_health.webp";
  } else {
    text.innerText = "You don't have enough gold to buy health.";
    sceneImage.src = "images/not_enough_gold.webp";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    let weaponCost = weaponPrices[currentWeapon + 1];
    if (gold >= weaponCost) {
      gold -= weaponCost;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now own a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText +=
        " In your inventory, you have: " + inventory.join(", ") + ".";
      sceneImage.src = weapons[currentWeapon].image;
    } else {
      text.innerText = "You don't have enough gold to buy a weapon.";
      sceneImage.src = "images/not_enough_gold.webp";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText =
      "Sell weapon for " + weaponPrices[currentWeapon] / 2 + " gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    let soldWeapon = inventory.pop();
    let sellPrice = weaponPrices[currentWeapon] / 2;
    gold += sellPrice;
    goldText.innerText = gold;
    text.innerText =
      "You sold a " + soldWeapon + " for " + sellPrice + " gold.";
    currentWeapon--;
    text.innerText +=
      " In your inventory, you have: " + inventory.join(", ") + ".";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function fightGoblin() {
  fighting = 3;
  goFight();
}

function fightTroll() {
  fighting = 4;
  goFight();
}

function fightDarkWizard() {
  fighting = 5;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.src = monsters[fighting].image;
  // Cacher le conteneur de l'image de scène
  sceneImageContainer.style.display = "none";
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    let damage =
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    text.innerText +=
      " You deal " + damage + " damage to the " + monsters[fighting].name + ".";
  } else {
    text.innerText += " You miss your attack.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 5) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the " + monsters[fighting].name + "'s attack.";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  sceneImage.src = "images/hero.webp";
  sceneImageContainer.style.display = "block";
}

function lose() {
  update(locations[5]);
  sceneImage.src = "images/game_lose.webp";
  sceneImageContainer.style.display = "block";
}

function winGame() {
  update(locations[6]);
  sceneImage.src = "images/game_win.webp";
  sceneImageContainer.style.display = "block";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  sceneImage.src = "";
  sceneImageContainer.style.display = "block";
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
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Congrats! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Too bad! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
