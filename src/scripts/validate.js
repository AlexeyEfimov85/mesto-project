/*const showInputError = (formElement, inputElement, errorMessage, Obj) => {
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
};*/

export const setButtonState = function () {
  const buttonElement = document.querySelectorAll('.form__button');
  buttonElement.forEach((item) => {
    item.disabled = true;
    item.classList.add('form__button_inactive');
  })
}

export class FormValidator {
  constructor(obj, selector) {
    this._form = selector;
    this._inputList = obj.inputList;
    this._buttonElement = obj.buttonElement;
    this._buttonDisabled = obj.buttonDisabled;
    this._inputError = obj.inputError;
    this._errorElement = obj.errorElement;
  }
  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorElement);
  };
  _hideInputError  (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputError);
    errorElement.classList.remove(this._errorElement);
    errorElement.textContent = '';
  };
  
  _isValid (formElement, formInput) {
    if (formInput.validity.patternMismatch) {
      formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
      formInput.setCustomValidity("");
    }
    if (!formInput.validity.valid) {
      this._showInputError(formElement, formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formElement, formInput);
    }
  };
  
  _setEventListeners (formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(this._inputList));
    this._buttonElement = formElement.querySelector(this._buttonElement);
    this._toggleButtonState (this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };
  
   enableValidation () {
      this._setEventListeners(this._form);
  };
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  _toggleButtonState  (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._buttonDisabled);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._buttonDisabled);
    }
  };
  

}


