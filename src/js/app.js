// Contains all Pokedex functions and data
let pokemonRepository = (() => {
  // Array that holds pokemon objects added from API
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // Capitalize first letter of pokemon name
  function capitalize(str) {
    return str.replace(/^\w/, (c) => c.toUpperCase());
  }

  // Add pokemon to database
  function add(pokemon) {
    // Input type validation
    if (typeof pokemon !== 'object') {
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

    document.querySelector('#search').addEventListener('input', searchFunction);

    function searchFunction() {
      // User search input
      let search = $('#search').val().toLowerCase();

      // Makes array from the list hides non-matching elems
      let arr = Array.from($('.pokemon-list-item'));

      arr.forEach((elem) => {
        if (search.length === 0) {
          elem.style.display = 'block';
        } else if (!elem.innerText.toLowerCase().includes(search)) {
          elem.style.display = 'none';
        }
      });
    }
  })();

  // Writes first level of content to page as list of buttons
  function addListItem(pokemon) {
    // Selects empty list that will hold list items
    let pokemonList = $('.pokemon-list');

    // Creates list items and adds content (name)
    let pokemonItem = document.createElement('button');
    pokemonList.append(pokemonItem);
    pokemonItem.innerText = capitalize(pokemon.name);

    // Adds necessary classes to list item
    pokemonItem.classList.add(
      'pokemon-list-item',
      'list-group-item',
      'rounded',
      'mx-auto',
      'my-1',
      'text-white',
      'p-2'
    );

    pokemonItem.setAttribute('role', 'listitem');

    // Pulls second level of content and displays all as modal
    pokemonItem.addEventListener('click', () => {
      showDetails(pokemon);
    });
  }

  // Creates pokemon objects with first level of content
  async function loadList() {
    let response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    } else {
      let resData = await response.json();

      // Store data in pokemon object to add to pokemonList
      resData.results.forEach((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
    }
  }

  // Creates second level of content for pokemon objects
  async function loadDetails(item) {
    let url = item.detailsUrl;

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    } else {
      let resData = await response.json();

      // Sets pokemon object properties
      item.imageUrlFront = resData.sprites.front_default;
      item.imageUrlBack = resData.sprites.back_default;
      item.abilities = resData.abilities;
      item.height = resData.height;
      item.weight = resData.weight;
      item.types = resData.types;
      item.stats = resData.stats;
      item.id = resData.id;
    }
  }

  // Creates and displays modal of pokemon object content
  function showDetails(pokemon) {
    // Pulls details to put into modal
    loadDetails(pokemon)
      .then(() => {
        modalShow(pokemon);
      })
      .catch((error) => console.log(error));

    // Empty modal selectors to add dynamic content to
    let modalTitle = document.querySelector('#modalTitle'),
      modalCardStats = document.querySelector('#cardStats'),
      modalCardAbilities = document.querySelector('#cardAbilities'),
      modalCardInfo = document.querySelector('#cardInfo'),
      modalImg = document.querySelector('#modalImg'),
      modalImg2 = document.querySelector('#modalImg2');

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
      return stats.join('</br>');
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
      return abilities.join('</br>');
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
      types.push('Types:');

      // Loops through types
      for (let i in pokemon.types) {
        types.push(`${pokemon.types[i].type.name},`);
      }

      // Slice removes final comma
      types = types.join(' ').slice(0, -1);
      info.push(types);
      // Returns content as a string with line breaks
      return info.join('</br>');
    }

    // Adds the pokemon information to the modal elements
    function modalShow() {
      // Resets the card menus to closed when opening new modal
      let accordionMenus = $('.collapse');
      accordionMenus.removeClass('show');

      // Adds modal header with pokemon's name
      modalTitle.innerText = capitalize(pokemon.name);

      // Adds modal images of front & back of pokemon
      modalImg.setAttribute('src', `${pokemon.imageUrlFront}`);
      modalImg2.setAttribute('src', `${pokemon.imageUrlBack}`);

      // Adds modal card content
      modalCardStats.innerHTML = modalStats();
      modalCardAbilities.innerHTML = modalAbilities();
      modalCardInfo.innerHTML = modalInfo();

      // Displays the modal
      $('#pokemonModal').modal('show');
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
pokemonRepository
  .loadList()
  .then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
  })
  .catch((error) => console.log(error));

// Contact Modal & Validation
let contactForm = () => {
  // Displays contact modal
  let contactDisplay = () => {
    $('#contactButton').click(() => {
      // Reset form validation styles
      $('form').removeClass('was-validated');

      // Show contact modal
      $('#contactModal').modal('show');
    });
  };
  contactDisplay();

  // Custom contact form validation
  let contactValidation = () => {
    'use strict';
    window.addEventListener('load', () => {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      let forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', (e) => {
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
          form.classList.add('was-validated');

          setTimeout(() => {
            form.classList.remove('was-validated');
          }, 3000);
        });
      });
    });
  };
  contactValidation();
};
contactForm();

// Scroll-to-top button
let scrollToTop = () => {
  const scrollBtn = document.querySelector('#scrollBtn');

  // Shows button when user scrolls down 30px from top of document
  window.onscroll = () => scrollFunction();

  function scrollFunction() {
    if (
      document.body.scrollTop > 100 ||
      document.documentElement.scrollTop > 100
    ) {
      scrollBtn.style.display = 'block';
    } else {
      scrollBtn.style.display = 'none';
    }
  }

  function topFunction() {
    // For Safari users
    document.body.scrollTop = 0;
    // For Chrome, Firefox, IE, Opera
    document.documentElement.scrollTop = 0;
  }

  scrollBtn.addEventListener('click', topFunction);
};
scrollToTop();

// About Modal
let about = () => {
  // Displays about modal
  let aboutModal = () => {
    $('#aboutButton').click(() => {
      // Show contact modal
      $('#aboutModal').modal('show');
    });
  };
  aboutModal();
};
about();
