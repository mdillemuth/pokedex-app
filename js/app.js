// Contains all Pokedex functions and data
let pokemonRepository = (() => {
  // Array that holds pokemon objects added from API
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
      // Adds pokemon object to the empty array
      pokemonList.push(pokemon);
    }
  }

  // Retrieve database
  function getAll() {
    return pokemonList;
  }

  // Search database by name, needs to be IIFE
  (function search() {
    // Triggers filter search as user types
    let searchBar = document.querySelector("#search");
    searchBar.addEventListener("input", searchFunction);

    function searchFunction() {
      // User search input
      let search = $("#search").val().toLowerCase();

      // Makes array from the list hides non-matching elems
      let arr = Array.from($(".pokemon-list-item"));

      arr.forEach((elem) => {
        if (search.length === 0) {
          elem.style.display = "block";
        } else if (!elem.innerText.toLowerCase().includes(search)) {
          elem.style.display = "none";
        }
      });
    }
  })();

  // Writes first level of content to page as list of buttons
  function addListItem(pokemon) {
    // Selects empty list that will hold list items
    let pokemonList = $(".pokemon-list");

    // Creates list items and adds content (name)
    let pokemonItem = document.createElement("button");
    pokemonList.append(pokemonItem);
    pokemonItem.innerText = capitalize(pokemon.name);

    // Adds necessary classes to list item
    pokemonItem.classList.add(
      "pokemon-list-item",
      "list-group-item",
      "rounded",
      "mx-auto",
      "my-1",
      "text-white"
    );

    // Pulls second level of content and displays all as modal
    pokemonItem.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  // Creates pokemon objects with first level of content
  function loadList() {
    // Fetches from main API
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          // Creates pokemon object and adds first layer of content
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          // Adds created object to the pokemonList[]
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Creates second level of content for pokemon objects
  function loadDetails(item) {
    // URL is from originally added pokemon object
    let url = item.detailsUrl;

    return fetch(url)
      .then((response) => {
        // Grabs API data and parses as JSON
        return response.json();
      })
      .then((details) => {
        // Sets pokemon object properties to data from API
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.abilities = details.abilities;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.stats = details.stats;
        item.id = details.id;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Creates and displays modal of pokemon object content
  function showDetails(pokemon) {
    // Hits API to pull data then shows modal
    loadDetails(pokemon).then(() => {
      modalShow(pokemon);
    });

    // Empty modal selectors to add dynamic content to
    let modalTitle = document.querySelector("#modalTitle");
    let modalCardStats = document.querySelector("#cardStats");
    let modalCardAbilities = document.querySelector("#cardAbilities");
    let modalCardInfo = document.querySelector("#cardInfo");
    let modalImg = document.querySelector("#modalImg");
    let modalImg2 = document.querySelector("#modalImg2");

    // Prepares stats content for modal
    function modalStats() {
      // Creates array to hold all stats info
      let stats = [];

      // Loops through and pushes stats
      for (let i in pokemon.stats) {
        stats.push(
          `${capitalize(pokemon.stats[i].stat.name)}:  ${
            pokemon.stats[i].base_stat
          }`
        );
      }

      // Returns info as a string joined with line breaks
      return stats.join("</br>");
    }

    // Prepares abilities content for modal
    function modalAbilities() {
      // Creates array to hold abilitiies info
      let abilities = [];

      // Loops through and pushes abilities
      for (let i in pokemon.abilities) {
        abilities.push(`${capitalize(pokemon.abilities[i].ability.name)}`);
      }

      // Returns info as a string joined with line breaks
      return abilities.join("</br>");
    }

    // Prepares information content for modal
    function modalInfo() {
      // Create arrays to hold info
      let info = [];
      let types = [];

      // Adds basic information
      info.push(`Number: ${pokemon.id} of 151`);
      info.push(`Height: ${pokemon.height / 10}m`);
      info.push(`Weight: ${pokemon.weight / 100}kg`);
      types.push("Types:");

      // Loops through types
      for (let i in pokemon.types) {
        types.push(`${pokemon.types[i].type.name},`);
      }

      // Slice removes final comma
      types = types.join(" ").slice(0, -1);
      info.push(types);
      // Returns content as a string with line breaks
      return info.join("</br>");
    }

    // Adds the pokemon information to the modal elements
    function modalShow() {
      // Resets the card menus to closed when opening new modal
      let accordionMenus = $(".collapse");
      accordionMenus.removeClass("show");

      // Adds modal header with pokemon's name
      modalTitle.innerText = capitalize(pokemon.name);

      // Adds modal images of front & back of pokemon
      modalImg.setAttribute("src", `${pokemon.imageUrlFront}`);
      modalImg2.setAttribute("src", `${pokemon.imageUrlBack}`);

      // Adds modal card content
      modalCardStats.innerHTML = modalStats();
      modalCardAbilities.innerHTML = modalAbilities();
      modalCardInfo.innerHTML = modalInfo();

      // Displays the modal
      $("#pokemonModal").modal("show");
    }
  }
  // Provide access to functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Fills pokemonList of objects then adds list-items for DOM
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Contact Modal & Validation
let contact = (() => {
  // Displays contact modal
  let contactForm = (() => {
    $("#contactButton").click(() => {
      $("#contactModal").modal("show");
    });
  })();

  // Custom contact form validation
  let formValidation = (() => {
    "use strict";
    window.addEventListener("load", () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      let validation = Array.prototype.filter.call(forms, (form) => {
        form.addEventListener("submit", (e) => {
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
          form.classList.add("was-validated");
        });
      });
    });
  })();
})();

// Scroll-to-top button
let scrollToTop = (() => {
  const scrollBtn = document.querySelector("#scrollBtn");

  // Shows button when user scrolls down 30px from top of document
  window.onscroll = () => scrollFunction();

  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
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
