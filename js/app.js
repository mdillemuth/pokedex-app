// Mobile navigation object
let mobileNavigation = (function () {
  const navTriggerEl = document.querySelector(".hamburger");
  const navEl = document.querySelector(".header__nav");
  const hamburgerBarsEl = document.querySelectorAll(".bar");

  // Toggles mobile navigation when hamburger icon clicked
  (function toggleNav() {
    navTriggerEl.addEventListener("click", function () {
      navEl.classList.toggle("shift");
      animateHamburgers();
    });
  })();

  // Called to change hamburger icon to 'X' icon on navigation toggle
  function animateHamburgers() {
    for (let item of hamburgerBarsEl) {
      item.classList.toggle("change");
    }
  }
})();

// Pokedex object
let pokemonRepository = (function () {
  // Pokedex database of pokemon objects
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

  // Add pokemon to database
  function add(pokemon) {
    // Input type validation
    if (typeof pokemon !== "object") {
      return 0;
    }

    // Key validation
    if (
      Object.keys(pokemonList[0]).every((pokemonKey) => pokemonKey in pokemon)
    ) {
      // Add to database
      pokemonList.push(pokemon);
    }
  }

  // Retrieve database
  function getAll() {
    return pokemonList;
  }

  // Search database by name
  function search(searchName) {
    // Input type validation
    if (typeof searchName !== "string") {
      return 0;
    }

    // Returns matching pokemon
    return pokemonList.filter((e) =>
      e.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }

  // Log clicked pokemon name to console
  const showDetails = name => console.log(name);

  // Writes content to display in DOM
  function addListItem(pokemon) {
    // Select, create, and append to DOM
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);

    // Write pokemon name to button
    button.innerText = pokemon.name;

    // Add class to select in CSS
    button.classList.add("btn");

    // Log clicked pokemon name to console
    button.addEventListener("click", () => {showDetails(pokemon.name)});
  }

  // Providing access to functions
  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
  };
})();

// Accesses Pokedex object to write to the DOM
pokemonRepository.getAll().forEach( pokemon => pokemonRepository.addListItem(pokemon));
