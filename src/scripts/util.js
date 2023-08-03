export const formProfileEdit = document.querySelector('#form-profile');
export const tuneValidation = {
  inputList: '.form__item',
  buttonElement: '.form__button',
  buttonDisabled: 'form__button_inactive',
  inputError: 'form__item_type_error',
  errorElement: 'form__item-username-error_active'
};

export function renderLoading(isLoading) {
  const formSubmitButtonTextDefault = document.querySelectorAll('.form__button_text_default');
  const formSubmitButtonTextLoading = document.querySelectorAll('.form__button_text_loading');
  if(isLoading) {
      formSubmitButtonTextDefault.forEach((item) => {
          item.classList.add('form__button_text_invisible');

      })
      formSubmitButtonTextLoading.forEach((item) => {
          item.classList.remove('form__button_text_invisible');
          item.classList.add('form__button_text_visible');
      })


  } else {
      formSubmitButtonTextDefault.forEach((item) => {
          item.classList.add('form__button_text_visible');
          item.classList.remove('form__button_text_invisible');

      })
      formSubmitButtonTextLoading.forEach((item) => {
          item.classList.add('form__button_text_invisible');
          item.classList.remove('form__button_text_visible');
      })
    
  }
}