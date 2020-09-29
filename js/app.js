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

let pokemonRepository = (function () {
  // Array of unique pokemon objects
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

  // Add new pokemon to pokemonList
  function add(pokemon) {
    // Checking for input being object type
    if (typeof pokemon !== "object") {
      return 0;
    }
    // Creating arrays of keys from pokemonList & input to test
    let pokeKeys = Object.keys(pokemonList[0]);
    // Uses an arbitrary index as all objects in pokemonList have same keys
    let addKeys = Object.keys(pokemon);

    // Iterate through key arrays to test equality
    for (let i in pokeKeys) {
      if (pokeKeys[i] !== addKeys[i]) {
        return 0;
      }
    }
    // Push new pokemon that has passed tests
    pokemonList.push(pokemon);
  }

  // Retrieve data
  function getAll() {
    return pokemonList;
  }

  // Retrieve by name
  function search(searchName) {
    // Validating data type of search input
    if (typeof searchName !== "string") {
      return 0;
    }

    // Searching for match, adding case-insensitivity
    for (let i in pokemonList) {
      if (pokemonList[i].name.toLowerCase() === searchName.toLowerCase()) {
        return pokemonList[i];
      }
    }
  }

  // Providing access to functions
  return {
    add: add,
    getAll: getAll,
    search: search,
  };
})();


function writeName() {
  // Improve readability and maintainability with a helper function
  const writeTemplate = function (pokeName, pokeHeight) {
    const bigStr = " Wow, that's big!"; // Defining extra string if isBig = true
    let bigDef = 2; // Defining special case for 'big'
    let isBig; // Boolean for whether pokemon meets special case 'big'
    pokeHeight >= bigDef ? (isBig = true) : (isBig = false); // Assigning boolean value to isBig

    // Assigning string to use for document.write()
    if (isBig) {
      return `Pokemon Name: ${pokeName} (height: ${pokeHeight})${bigStr}<br></br>`;
    } else {
      return `Pokemon Name: ${pokeName} (height: ${pokeHeight})<br></br>`;
    }
  };

  pokemonRepository.getAll().forEach((item) => {
    // Calls helper function to provide string output
    document.write(writeTemplate(item.name, item.height));
  });
}

writeName();

// Tests for search()
// console.log(pokemonRepository.search('bulbasaur'));
// console.log(pokemonRepository.search('cHaRiZard'));

//  Tests for add()
// pokemonRepository.add(    {
//       name: "testPASS",
//       height: 0.99,
//       type: ["test"],
//       hp: 99,
//       atk: 99,
//       def: 99,
//     })
// pokemonRepository.add( {
//   name: "testFAIL",
//   height: 0.10,
//   hp: 200,          
//   atk: 84,
//   def: 200,
// })
// writeName();

// Tests for get()
// console.log(pokemonRepository.getAll());