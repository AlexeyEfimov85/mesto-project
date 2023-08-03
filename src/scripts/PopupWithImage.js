import Popup from "./popup";
export default class PopupWithImage extends Popup{
    constructor(selector){
        super(selector)
    }
    open(src,name){
        super.open()
        this._popup.querySelector('.popup__image').src = src
        this._popup.querySelector('.popup__image').alt = name
        this._popup.querySelector('.popup__image-title').textContent = name
    }
    close() {
        super.close();
    }

}