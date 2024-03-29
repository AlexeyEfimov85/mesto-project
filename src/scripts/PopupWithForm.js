import Popup from "./popup";
export default class PopupWithForm extends Popup {
    constructor(selector, submitFormFunction) {
        super(selector);
        this._submitFormFunction = submitFormFunction;
        this._formSubmitButton = this._popup.querySelector('.form__button_text_default');
    }

    _getInputValues() {
        const formData = Array.from(this._popup.querySelectorAll('.form__item')).map(function (item) {
            return item.value;
        })
        return formData;
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormFunction(this._getInputValues());
        })
    };

    close() {
        super.close();
        this._popup.querySelector('.form').reset();
    }

    renderLoading(text) {
        this._formSubmitButton.textContent = text;
    }

}