export const formProfileEdit = document.querySelector('#form-profile');
export function checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  };
