export default class Popup {
    constructor(selector) {
        this._popup = selector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _closeByClickOverlay (evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            this._closeByClickOverlay(evt);
        });
        this._popup.querySelector('.popup__toggle').addEventListener('click', ()=> {
            this.close();
        }) 
    }
}