

// Select page elements//
const forgeSection = document.querySelector("#forge");
const forgeImage = document.querySelector("#forge-image");
const forgeStatusText = document.querySelector("#forge-status");
const heatDisplay = document.querySelector("#heat-value");
const swordDisplay = document.querySelector("#sword-count");
const actionMessage = document.querySelector("#action-message");

let forgeHeat = 20;
let swordsMade = 0;


// Picks a status from the heat. Only returns a value, doesn't touch the page.
function getForgeStatus(heatValue) {
  if (heatValue < 30) {
    return "Too cold";
  } else if (heatValue < 70) {
    return "Ready to forge";
  } else {
    return "Roaring fire";
  }
}


function updateForge() {
  const status = getForgeStatus(forgeHeat);

  heatDisplay.textContent = forgeHeat;
  swordDisplay.textContent = swordsMade;
  forgeStatusText.textContent = status;

  // remove the old status classes so only one is left//
  forgeSection.classList.remove("is-cold", "is-ready", "is-roaring");

  if (forgeHeat < 30) {
    forgeSection.classList.add("is-cold");
    forgeImage.src = "assets/forge-cold.svg";
    forgeImage.alt = "A stone forge with dark coals and no flames";
  } else if (forgeHeat < 70) {
    forgeSection.classList.add("is-ready");
    forgeImage.src = "assets/forge-ready.svg";
    forgeImage.alt = "A stone forge with a small orange fire";
  } else {
    forgeSection.classList.add("is-roaring");
    forgeImage.src = "assets/forge-roaring.svg";
    forgeImage.alt = "A stone forge with tall bright flames and sparks";
  }
}



// Adds heat, capped at 100//
function heatForge(amount) {
  forgeHeat = forgeHeat + amount;

  if (forgeHeat > 100) {
    forgeHeat = 100;
  }

  actionMessage.textContent = "You stoke the forge. The heat is now " + forgeHeat + ".";
  updateForge();
}

// Makes one sword if there's enough heat//
function makeSword() {
  if (forgeHeat >= 30) {
    forgeHeat = forgeHeat - 30;
    swordsMade = swordsMade + 1;
    actionMessage.textContent = "You hammer out a fine sword!";
  } else {
    actionMessage.textContent = "The forge needs at least 30 heat to make a sword. Add more heat.";
  }

  updateForge();
}

// Back to the starting state//
function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;
  actionMessage.textContent = "Welcome to the forge. Add heat to begin.";
  updateForge();
}

// --- Start ---
resetForge();