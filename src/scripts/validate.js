export const objTuneValidation = {
  formList: '.form',
  inputList: '.form__item',
  buttonElement: '.form__button',
  buttonDisabled: 'form__button_inactive',
  inputError: 'form__item_type_error',
  errorElement: 'form__item-username-error_active'
};


const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objTuneValidation.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objTuneValidation.errorElement);
};
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objTuneValidation.inputError);
  errorElement.classList.remove(objTuneValidation.errorElement);
  errorElement.textContent = '';
};

export const isValid = (formElement, formInput) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(objTuneValidation.inputList));
  const buttonElement = formElement.querySelector(objTuneValidation.buttonElement);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(objTuneValidation.formList));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
   if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(objTuneValidation.buttonDisabled);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(objTuneValidation.buttonDisabled);
  }
};

export const setButtonState = function() {
  const buttonElement = document.forms.form.querySelector(objTuneValidation.buttonElement);
  buttonElement.disabled = true;
  buttonElement.classList.add(objTuneValidation.buttonDisabled);
}


