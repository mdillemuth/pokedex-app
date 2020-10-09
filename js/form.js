let contactValidation = (() => {
  let form = document.querySelector("#contact__form");
  let formInputEmail = document.querySelector("#email");
  let formInputName = document.querySelector("#name");
  let formInputMessage = document.querySelector("#message");

  function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper

    // Remove an existing error
    let error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
      input.classList.remove("error__input");
    }

    // Now add the error, if the message is not empty
    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerHTML = message;
      container.appendChild(error);
      input.classList.add("error__input");
    }
  }

  function validateEmail() {
    let value = formInputEmail.value;

    if (!value) {
      showErrorMessage(
        formInputEmail,
        `<i class="fas fa-exclamation-triangle"></i> Please an e-mail address.`
      );
      return false;
    }

    if (value.indexOf("@") === -1) {
      showErrorMessage(
        formInputEmail,
        `<i class="fas fa-exclamation-triangle"></i> Please enter a valid e-mail address`
      );
      return false;
    }

    showErrorMessage(formInputEmail, null);
    return true;
  }

  function validateName() {
    let value = formInputName.value;

    if (!value) {
      showErrorMessage(
        formInputName,
        `<i class="fas fa-exclamation-triangle"></i> Please enter your name`
      );
      return false;
    }

    showErrorMessage(formInputName, null);
    return true;
  }

  function validateMessage() {
    let value = formInputMessage.value;

    if (value.length < 1) {
      showErrorMessage(
        formInputMessage,
        `<i class="fas fa-exclamation-triangle"></i> Please enter a message`
      );
      return false;
    }

    showErrorMessage(formInputEmail, null);
    return true;
  }

  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidName = validateName();
    let isValidMessage = validateMessage();
    return isValidEmail && isValidName && isValidMessage;
  }

  form.addEventListener("submit", (e) => {
    if (validateForm() === false) {
      e.preventDefault();
    } else {
      alert("Message submitted. Thank you! :)");
    }
  });

  formInputEmail.addEventListener("input", validateEmail);
  formInputName.addEventListener("input", validateName);
  formInputMessage.addEventListener("input", validateMessage);
})();

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
