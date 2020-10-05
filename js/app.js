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
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  // Add pokemon to database
  function add(pokemon) {
    // Input type validation
    if (typeof pokemon !== "object") {
      return 0;
    } else {
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
  // const showDetails = (name) => console.log(name);

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
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // API fetch
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Loading details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.stats = details.stats;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  // Providing access to functions
  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Accesses Pokedex object to write to the DOM
pokemonRepository
  .getAll()
  .forEach((pokemon) => pokemonRepository.addListItem(pokemon));

// Loading data
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
