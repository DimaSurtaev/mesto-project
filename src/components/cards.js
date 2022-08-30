import {elementTemplate,popupCard,popupCardImage,popupCardName,} from '../components/utils.js';
import {openPopup} from '../components/modal.js';
 
/* Добавление карточки со всем функционалом*/
function addMesto (mesto,link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementDelete = element.querySelector('.element__delete');
    const like = element.querySelector('.element__like');
    like.addEventListener('click',likeCard);
    elementDelete.addEventListener('click',deleteCard);

    const elementName = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    elementName.textContent = mesto;
    elementImage.src = link;
    elementImage.alt = mesto;

    elementImage.addEventListener('click',()=> {
      popupCardImage.src = link;
      popupCardName.textContent = mesto;
      popupCardImage.alt = mesto;

      openPopup(popupCard);
    });

    return element; 
  } 


    /* удаление карточки */
function deleteCard(evt) {
    const card = evt.target.closest(".element").remove();
}
    /* лайк */
function likeCard(evt) {
    evt.target.classList.toggle('element__like_active')
}

export {addMesto,deleteCard,likeCard};
