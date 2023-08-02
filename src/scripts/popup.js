export default class Popup {
    constructor(selector) {
        this._popup = selector;
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', (evt)=> {
            this._handleEscClose(evt);
        });
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt)=> {
            this._handleEscClose(evt);
        });
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
        this._popup.addEventListener('click', (evt) => {
            this._closeByClickOverlay(evt);
        });
        this._popup.querySelector('.popup__toggle').addEventListener('click', ()=> {
            this.close();
        }) 
    }
}