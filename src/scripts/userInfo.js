
 export  class UserInfo{
    constructor({selectorName,selectorDescription,selectorAvatar}){
        this._selectorName = selectorName
        this._selectorDescription = selectorDescription
        this._selectorAvatar = selectorAvatar

    }
    getUserInfo(data){
   return {
            name: data.name,
            about: data.about,
            avatar : data.avatar
         }
        }
    setUserInfo(profile){
           document.querySelector(this._selectorName).textContent = profile.name;
           document.querySelector(this._selectorDescription).textContent = profile.about
    }
    setUserAvatar(avatar){
        document.querySelector(this._selectorAvatar).src = avatar
    }
}