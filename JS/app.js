/* *===== HAMBURGER NAV MENU MOBILE *===== */
const navTriggerEl = document.querySelector(".hamburger");
const navEl = document.querySelector(".header__nav");
const hamburgerBarsEl = document.getElementsByTagName("span");

function toggleNav() {
  //Toggles appearance of the side nav on mobile when hamburger clicked
  navTriggerEl.addEventListener("click", function () {
    navEl.classList.toggle("shift");
    animateHamburgers();
  });
}

function animateHamburgers() {
  //Toggles hamburger icon to 'X' when side nav appears
  for (let item of hamburgerBarsEl) {
    item.classList.toggle("change");
  }
}

toggleNav();

/* *===== POKEDEX SCRIPTS =====* */
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 0.7,
    type: ["grass", "poison"],
    hp: 45,
    atk: 49,
    def: 49,
  },
  {
    name: "Ivysaur",
    height: 1,
    type: ["grass", "poison"],
    hp: 60,
    atk: 62,
    def: 63,
  },
  {
    name: "Venusaur",
    height: 2,
    type: ["grass", "poison"],
    hp: 80,
    atk: 82,
    def: 83,
  },
  {
    name: "Charmander",
    height: 0.6,
    type: ["fire"],
    hp: 39,
    atk: 52,
    def: 43,
  },
  {
    name: "Charmeleon",
    height: 1.1,
    type: ["fire"],
    hp: 58,
    atk: 64,
    def: 58,
  },
  {
    name: "Charizard",
    height: 1.7,
    type: ["fire", "flying"],
    hp: 78,
    atk: 84,
    def: 78,
  },
  {
    name: "Squirtle",
    height: 0.5,
    type: ["water"],
    hp: 44,
    atk: 48,
    def: 65,
  },
  {
    name: "Wartortle",
    height: 1,
    type: ["water"],
    hp: 59,
    atk: 63,
    def: 80,
  },
  {
    name: "Blastoise",
    height: 1.6,
    type: ["water"],
    hp: 79,
    atk: 83,
    def: 100,
  },
];

function writeName() {
  //Iterates through content of pokemonList[] and writes to DOM
  for (i in pokemonList) {
    if (pokemonList[i].height >= 2) {
      //Checks for Pokemon with height >= 2m 
      document.write(
        `Pokemon Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}m) -Wow, that's big!<br></br>`
      );
    } else {
      document.write(
        `Pokemon Name: ${pokemonList[i].name} (height: ${pokemonList[i].height}m)<br></br>`
      );
    }
  }
}

writeName();
