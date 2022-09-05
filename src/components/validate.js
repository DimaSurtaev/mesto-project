const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

export const deactivateButton = (button, inactiveButtonClass) => {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', 'disable');
};

const activateButton = (button, inactiveButtonClass) => {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
};

const toggleButtonState = (inputList, button, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        deactivateButton(button, inactiveButtonClass);
    } else {
        activateButton(button, inactiveButtonClass);
    }
};

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add(inputErrorClass);
};

export const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    inputElement.classList.remove(inputErrorClass);
};


const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            inputErrorClass,
            errorClass,
        );
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const button = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, button, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, button, inactiveButtonClass);
        });
    });
};

export const enableValidation = ({
    formSelectorClass,
    inputSelectorClass,
    submitButtonSelectorClass,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) => {
    const forms = Array.from(document.querySelectorAll(formSelectorClass));
    forms.forEach((formElement) => {
        setEventListeners(
            formElement,
            inputSelectorClass,
            submitButtonSelectorClass,
            inactiveButtonClass,
            inputErrorClass,
            errorClass,
        );
    });
};