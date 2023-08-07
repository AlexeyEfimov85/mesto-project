import Popup from "./popup";
export default class PopupWithForm extends Popup {
    constructor(selector, submitFormFunction) {
        super(selector);
        this._submitFormFunction = submitFormFunction;
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

    renderLoading(isLoading) {
        const formSubmitButtonTextDefault = this._popup.querySelector('.form__button_text_default');
        const formSubmitButtonTextLoading = this._popup.querySelector('.form__button_text_loading');
        if (isLoading) {
            formSubmitButtonTextDefault.classList.add('form__button_text_invisible');
            formSubmitButtonTextLoading.classList.remove('form__button_text_invisible');
            formSubmitButtonTextLoading.classList.add('form__button_text_visible');

        } else {
            formSubmitButtonTextDefault.classList.add('form__button_text_visible');
            formSubmitButtonTextDefault.classList.remove('form__button_text_invisible');
            formSubmitButtonTextLoading.classList.add('form__button_text_invisible');
            formSubmitButtonTextLoading.classList.remove('form__button_text_visible');
        }
    }
}