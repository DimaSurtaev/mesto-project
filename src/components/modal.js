import {popupProfile,popupAdd} from '../components/utils.js'
/* открытие и закрытие попапов */
const modal = {
    openPopup: function (popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', closeEsc);
        popup.addEventListener('mousedown', closeClick);
    },
    closePopup: function (popup) {
        popup.classList.remove('popup_opened');
        popup.removeEventListener('keydown', closeEsc);
        document.removeEventListener('mousedown', closeClick);
    },

}
const  closeClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt.currentTarget);
    };
  }
  const closeEsc = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
      };
  }

  export const openPopup = modal.openPopup;
  export const closePopup = modal.closePopup;
  export {closeClick,closeEsc}