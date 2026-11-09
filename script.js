

const forgeSection = document.querySelector("#forge");
const forgeImage = document.querySelector("#forge-image");
const forgeStatusText = document.querySelector("#forge-status");
const heatDisplay = document.querySelector("#heat-value");
const swordDisplay = document.querySelector("#sword-count");
const actionMessage = document.querySelector("#action-message");

const heatForm = document.querySelector("#heat-form");
const heatInput = document.querySelector("#heat-input");
const makeSwordButton = document.querySelector("#make-sword-button");
const resetButton = document.querySelector("#reset-button");

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

  actionMessage.classList.remove("error");
  actionMessage.textContent = "You stoke the forge. The heat is now " + forgeHeat + ".";
  updateForge();
}

// Makes one sword if there's enough heat//
function makeSword() {
  if (forgeHeat >= 30) {
    forgeHeat = forgeHeat - 30;
    swordsMade = swordsMade + 1;
    actionMessage.classList.remove("error");
    actionMessage.textContent = "You hammer out a fine sword!";
  } else {
    actionMessage.classList.add("error");
    actionMessage.textContent = "The forge needs at least 30 heat to make a sword. Add more heat.";
  }

  updateForge();
}


function resetForge() {
  forgeHeat = 20;
  swordsMade = 0;
  heatInput.value = "";
  actionMessage.classList.remove("error");
  actionMessage.textContent = "";
  updateForge();
}


heatForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const rawValue = heatInput.value.trim();
  const amount = Number(rawValue);
  let errorText = "";

  if (rawValue === "" || !Number.isFinite(amount)) {
    errorText = "Please enter a number of heat to add.";
  } else if (!Number.isInteger(amount)) {
    errorText = "Heat must be a whole number, with no decimals.";
  } else if (amount < 1) {
    errorText = "Heat must be 1 or more.";
  }

  if (errorText !== "") {
    actionMessage.classList.add("error");
    actionMessage.textContent = errorText;
    return; 
  }

  heatForge(amount);
  heatInput.value = "";
});

makeSwordButton.addEventListener("click", function () {
  makeSword();
});

resetButton.addEventListener("click", function () {
  resetForge();
});



resetForge();