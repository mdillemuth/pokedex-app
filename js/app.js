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
    // Triggers filter search as user types
    let searchBar = document.querySelector("#search");
    searchBar.addEventListener("input", searchFunction);

    function searchFunction() {
      // User search input
      let search = $("#search").val().toLowerCase();

      let appList = document.querySelector(".pokemon-list").children;
      let arr = Array.from(appList);

      for (let i in arr) {
        // returns full list if user enters a blank search
        if (search.length === 0) {
          arr[i].firstChild.style.display = "block";
        }
        // hides elements that don't contain the search input
        else if (
          // firstChild refers to the button element
          !arr[i].firstChild.innerText.toLowerCase().includes(search)
        )
          arr[i].firstChild.style.display = "none";
      }
    }
  })();

  // Writes content to display in DOM
  function addListItem(pokemon) {
    // Select, create, and append to DOM
    let pokemonList = $(".pokemon-list");
    let pokemonItem = document.createElement("li");
    let pokemonButton = document.createElement("button");

    pokemonItem.append(pokemonButton);
    pokemonList.append(pokemonItem);

    // Add pokemon name to button
    pokemonButton.innerText = capitalize(pokemon.name);

    // Add class to select in CSS
    pokemonButton.classList.add(
      "pokemon-list-item",
      "list-group-item",
      "mx-auto",
      "my-1",
      "text-white"
    );

    // Shows modal when button is clicked
    pokemonButton.addEventListener("click", () => {
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
        item.height = details.height;
        item.weight = details.weight;
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
    let modalText = document.querySelector("#modalText");
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

    // Adds the pokemon information to the modal elements
    function modalShow() {
      modalTitle.innerText = capitalize(pokemon.name);
      modalImg.setAttribute("src", `${pokemon.imageUrlFront}`);
      modalImg2.setAttribute("src", `${pokemon.imageUrlBack}`);
      modalText.innerHTML = modalStats();
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
    search: search,
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
$("#contactButton").click(() => {
  $("#contactModal").modal("show");
});

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
