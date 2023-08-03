export class FormValidator {
  constructor(obj, selector) {
    this._form = selector;
    this._inputList = Array.from(this._form.querySelectorAll(obj.inputList));
    this._buttonElement = this._form.querySelector(obj.buttonElement);
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

  setButtonState() {
    this._buttonElement.classList.add('form__button_inactive');
    this._buttonElement.disabled = true;
  }

}


