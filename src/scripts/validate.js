const showInputError = (formElement, inputElement, errorMessage, Obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(Obj.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(Obj.errorElement);
};
const hideInputError = (formElement, inputElement, Obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(Obj.inputError);
  errorElement.classList.remove(Obj.errorElement);
  errorElement.textContent = '';
};

export const isValid = (formElement, formInput, Obj) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, Obj);
  } else {
    hideInputError(formElement, formInput, Obj);
  }
};

const setEventListeners = (formElement, Obj) => {
  const inputList = Array.from(formElement.querySelectorAll(Obj.inputList));
  const buttonElement = formElement.querySelector(Obj.buttonElement);
  toggleButtonState(inputList, buttonElement, Obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, Obj);
      toggleButtonState(inputList, buttonElement, Obj);
    });
  });
};

export const enableValidation = (Obj) => {
  const formList = Array.from(document.querySelectorAll(Obj.formList));
  formList.forEach((formElement) => {
    setEventListeners(formElement, Obj);
  });
};

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, Obj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(Obj.buttonDisabled);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(Obj.buttonDisabled);
  }
};

export const setButtonState = function () {
  const buttonElement = document.querySelectorAll('.form__button');
  buttonElement.forEach((item) => {
    item.disabled = true;
    item.classList.add('form__button_inactive');
  })
}


