import  {api}  from "../index.js"
import Section from "./section.js"
 export  class UserInfo{
    constructor({selectorName,selectorDescription}){
        this._selectorName = selectorName
        this._selectorDescription = selectorDescription
    }
    getUserInfo(){
        api.getProfileData()
    }
    setUserInfo(profile){
        api.renderProfileData(profile)
        .then((profileData) => {
            const profile = new Section({items: profileData,
            renderer: ()=>{
           document.querySelector(this._selectorName).textContent = profileData.name;
           document.querySelector(this._selectorDescription).textContent = profileData.about
            }})
            profile.renderItems()
        })
        .catch((err) => {
            console.log(err);
        });
    }
}