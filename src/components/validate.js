const hideInputError = (config, errorMessage, inputSelector) => {

  if (inputSelector.value.length){
        inputSelector.setCustomValidity = 'Минимальное колличество символов: 2. Длина текста сейчас: '+ inputSelector.value.length +' символ.';
      }
  else {
        inputSelector.setCustomValidity= "Вы пропустили это поле.";
      }
  if (inputSelector.validity.patternMismatch){
        inputSelector.setCustomValidity = inputSelector.dataset.error;
      }
  if (inputSelector.type =="url"){
        inputSelector.setCustomValidity = 'Введите название сайта';
      }    
    errorMessage.textContent = inputSelector.setCustomValidity;
    inputSelector.classList.add(config.inputErrorClass);
};

const showInputError = (config, errorMessage, inputSelector) => {
  errorMessage.textContent = "";
  inputSelector.classList.remove(config.inputErrorClass);
};
const checkInputValidity = (config, form, inputSelector) => {
  const errorMessage = form.querySelector(`#error-${inputSelector.id}`);
  if (inputSelector.validity.valid) {
    showInputError(config, errorMessage, inputSelector);
  } else {
    hideInputError(config, errorMessage, inputSelector);
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputSelector) => {
    return !inputSelector.validity.valid;
    });  
}
const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  formElement.addEventListener('reset', () => {
    button.classList.add('popup__button_disabled'); 
  })
  toggleButtonState(config, inputList, button);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener("input", () => {
      checkInputValidity(config, formElement, inputSelector);
      toggleButtonState(config, inputList, button);
    });
  });
};

const toggleButtonState = (config,inputList,button) => {

  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled', 'disabled');
    button.classList.add('popup__button_disabled');   
  }
  else {
    button.classList.remove('popup__button_disabled');
    button.removeAttribute("disabled", true);
  }
}
const enableSubmitButton = (button) => {
  button.classList.add('popup__button_disabled')
}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);   
  });
};
  export {showInputError,hideInputError,checkInputValidity,hasInvalidInput,setEventListeners,toggleButtonState,enableValidation};