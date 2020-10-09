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

// Scroll-to-top button
let scrollToTop = (() => {
  const scrollBtn = document.querySelector("#btn__top");

  // Shows button when user scrolls down 30px from top of document
  window.onscroll = () => scrollFunction();

  function scrollFunction() {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  }

  function topFunction() {
    // For Safari users
    document.body.scrollTop = 0;
    // For Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;
  }

  scrollBtn.addEventListener("click", topFunction);
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

  // Search database by name, needs to be IIFE
  (function search() {
    let searchBar = document.querySelector("#search");

    // Trigger live filter when user types into search bar
    searchBar.addEventListener("input", searchFunction);

    function searchFunction() {
      // User search input
      let searchInput = document.querySelector("#search").value.toLowerCase();

      // Making array from the HTML collection to iterate through
      let appList = document.querySelector(".pokemon-list").children;
      let arr = Array.from(appList);

      for (let i in arr) {
        // returns full list if user enters a blank search
        if (searchInput.length === 0) {
          arr[i].firstChild.style.display = "block";
        }
        // hides elements that don't contain the search input
        else if (
          // firstChild refers to the button element
          !arr[i].firstChild.innerText.toLowerCase().includes(searchInput)
        )
          arr[i].firstChild.style.display = "none";
      }
    }
  })();

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
        // Timeout for API data to load
        setTimeout(modalShow, 1000);
      }
    });

    // Looping through pokemon.stats to pull stats
    function modalStats() {
      let stats = [];
      for (let i in pokemon.stats) {
        stats.push(
          `${pokemon.stats[i].stat.name}:  ${pokemon.stats[i].base_stat}`
        );
      }
      return stats.join("</br>");
    }

    function modalShow() {
      modalTitle.innerText = capitalize(pokemon.name);
      modalImg.setAttribute("src", `${pokemon.imageUrl}`);
      modalText.innerHTML = modalStats();
      modalContainer.classList.add("modal__container--active");
    }

    function modalClose() {
      modalContainer.classList.remove("modal__container--active");
    }

    // Original showDetails content
    // Not sure if I still need this but app breaks if I delete it
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
// Not sure if I still need it
pokemonRepository
  .getAll()
  .forEach((pokemon) => pokemonRepository.addListItem(pokemon));

// Loading data
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
