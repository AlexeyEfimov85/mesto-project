
 export  class UserInfo{
    constructor({selectorName,selectorDescription,selectorAvatar}){
        this.Name = document.querySelector(selectorName)
        this.Description = document.querySelector(selectorDescription)
        this.Avatar = document.querySelector(selectorAvatar)

    }
    getUserInfo(){
   return {
            name: this.Name.textContent,
            about: this.Description.textContent,
            avatar : this.Avatar.textContent
         }
        }
    setUserInfo(profile){
        this.Name.textContent = profile.name;
        this.Description .textContent = profile.about
    }
    setUserAvatar(avatar){
        this.Avatar.src = avatar
    }
}