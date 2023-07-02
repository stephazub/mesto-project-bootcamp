function showInputError (formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.form__error_place_${inputElement.id}`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.captionErrorClass);
  };
  
  function hideInputError (formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.form__error_place_${inputElement.id}`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.captionErrorClass);
    errorElement.textContent = '';
  };
  
  function checkInputValidity (formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };
  
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  function toggleButtonState (inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.buttonInactiveClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.buttonInactiveClass);
      buttonElement.disabled = false;
    }
  }
  
  function setEventListeners (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.formInputSelector));
    const buttonElement = formElement.querySelector(config.formSubmitSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };
  
  function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      setEventListeners(formElement, config);
    });
  };
  
  export {enableValidation};