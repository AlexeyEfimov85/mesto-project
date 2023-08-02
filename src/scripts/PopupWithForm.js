import Popup from "./popup";
export default class PopupWithForm extends Popup{
    constructor(selector, submitFormFunction) {
        super(selector);
        this._submitFormFunction = submitFormFunction;
    }

    _getInputValues() {
      // не вижу смысла в этом методе, ведь мы передаем целиком функцию где описан сбор данных  из формы  
    };

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitFormFunction)
    };

    close() {
        super.close();
        this._popup.querySelector('.form').reset();
    }
}