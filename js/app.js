// Mobile navigation object
let mobileNavigation = (() => {
  const navTriggerEl = document.querySelector(".hamburger");
  const navEl = document.querySelector(".header__nav");
  const hamburgerBarsEl = document.querySelectorAll(".bar");

  // Toggles mobile navigation when hamburger icon clicked
  (function toggleNav() {
    navTriggerEl.addEventListener("click", () => {
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
let pokemonRepository = (() => {
  // Pokedex database of pokemon objects
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  // Capitalize first letter of pokemon name
  function capitalize(str) {
    newStr = str.replace(/^\w/, (c) => c.toUpperCase());
    return newStr;
  }

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

  // Writes content to display in DOM
  function addListItem(pokemon) {
    // Select, create, and append to DOM
    let pokemonList = document.querySelector(".pokemon-list");
    let pokemonListItem = document.createElement("li");
    let button = document.createElement("button");
    pokemonListItem.appendChild(button);
    pokemonList.appendChild(pokemonListItem);

    // Add pokemon name to button
    button.innerText = capitalize(pokemon.name);

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
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Loading details
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.stats = details.stats;
      })
      .catch((e) => {
        console.error(e);
      });

    return item;
  }

  // Modal
  function showDetails(pokemon) {
    let modalContainer = document.querySelector("#modal__container");
    let modal = document.querySelector("#modal");
    let modalBtn = document.querySelector("#modal__btn");
    let modalTitle = document.querySelector("#modal__title");
    let modalImg = document.querySelector("#modal__img");
    let modalText = document.querySelector("#modal__text");

    // Closing the modals
    modalBtn.addEventListener("click", modalClose);
    modalContainer.addEventListener("click", (e) => {
      if (e.target === modalContainer) {
        modalClose();
      }
    });
    window.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        modalContainer.classList.contains("modal__container--active")
      ) {
        modalClose();
      }
    });

    // Opening the modal (with event propagation)
    let parentList = document.querySelector(".pokemon-list");
    parentList.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn")) {
        modalShow();
      }
    });

    function modalShow() {
      modalTitle.innerText = capitalize(pokemon.name);
      modalImg.setAttribute("src", `${pokemon.imageUrl}`);
      modalText.innerHTML = `Height:  ${pokemon.height / 10}m</br>Weight:  ${
        pokemon.weight / 10
      }kg`;
      modalContainer.classList.add("modal__container--active");
    }

    function modalClose() {
      modalContainer.classList.remove("modal__container--active");
    }

    // Original showDetails content
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }
  // Provide access to functions
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
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
