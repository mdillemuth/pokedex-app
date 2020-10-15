// Pokedex object
let pokemonRepository = (() => {
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

  // Writes content to display in DOM
  function addListItem(pokemon) {
    // Select, create, and append to DOM
    let pokemonList = $(".pokemon-list");
    let pokemonItem = document.createElement("button");
    pokemonList.append(pokemonItem);
    pokemonItem.innerText = capitalize(pokemon.name);

    pokemonItem.classList.add(
      "pokemon-list-item",
      "list-group-item",
      "rounded",
      "mx-auto",
      "my-1",
      "text-white"
    );

    // Shows modal when button is clicked
    pokemonItem.addEventListener("click", () => {
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
        if (!response.ok) {
          console.log("garble");
        }
        return response.json();
      })
      .then((details) => {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.abilities = details.abilities;
        item.types = details.types;
        item.stats = details.stats;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Modal
  function showDetails(pokemon) {
    let modalTitle = document.querySelector("#modalTitle");
    let modalCardStats = document.querySelector("#cardStats");
    let modalCardAbilities = document.querySelector("#cardAbilities");
    let modalImg = document.querySelector("#modalImg");
    let modalImg2 = document.querySelector("#modalImg2");

    $("pokemon-list-item").click(modalShow);

    // Loops through stats to prepare data for modal
    function modalStats() {
      let stats = [];
      for (let i in pokemon.stats) {
        stats.push(
          `${capitalize(pokemon.stats[i].stat.name)}:  ${
            pokemon.stats[i].base_stat
          }`
        );
      }
      return stats.join("</br>");
    }

    function modalAbilities() {
      let abilities = [];
      for (let i in pokemon.abilities) {
        abilities.push(`${capitalize(pokemon.abilities[i].ability.name)}`);
      }
      return abilities.join("</br>");
    }

    // Adds the pokemon information to the modal elements
    function modalShow() {
      modalTitle.innerText = capitalize(pokemon.name);
      modalImg.setAttribute("src", `${pokemon.imageUrlFront}`);
      modalImg2.setAttribute("src", `${pokemon.imageUrlBack}`);
      modalCardStats.innerHTML = modalStats();
      modalCardAbilities.innerHTML = modalAbilities();

      $("#pokemonModal").modal("show");
    }

    // This is where my timeout problem was...
    loadDetails(pokemon).then(() => {
      modalShow(pokemon);
    });
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

// Creates the list elements to display
pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// Contact Modal
let contactForm = (() => {
  $("#contactButton").click(() => {
    $("#contactModal").modal("show");
  });
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
