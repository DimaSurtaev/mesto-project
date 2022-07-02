const popupProfile = document.querySelector('.popup-profile');/* попап профиля */

const popupAdd = document.querySelector('.popup-add'); /* попап нового места */
const popupAddForm = document.querySelector('.popup-add__form');        
/* шаблон макета */
const elementContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupCard = document.querySelector('.popup-card'); /* попап увеличенной картинки */
const popupCardContainer = popupCard.querySelector('.popup-card__container');
const popupCardImage = popupCard.querySelector('.popup-card__image');
let popupCardName = popupCard.querySelector('.popup-card__title');

/* кнопки открытия попапов */
const buttonPopupProfile = document.querySelector('.profile__button-edit');
const buttonPopupMesto = document.querySelector('.profile__button-add');
/* кнопки закрытия попапов */
const buttonClosepProfile = document.querySelector('.popup__close');
const buttonCloseAdd = document.querySelector('.popup-add__close');
const buttonCloseCard = document.querySelector('.popup-card__close');

/* кнопки внутри попапов */
const buttonPopupProfileSubmit = document.querySelector('.popup__button');
const buttonPopupMestoSubmit = document.querySelector('.popup-add__button');

/* инпуты формы нового места */
let mestoName = document.querySelector('.popup-add__input_type_mesto');
let mestoLink = document.querySelector('.popup-add__input_type_link');


/* открытие попапов */
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}
/* закрытие попапов */
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}
/* слушатели на  открытие попапов */
buttonPopupProfile.addEventListener ('click', ()=> popupOpen(popupProfile));
buttonPopupMesto.addEventListener ('click', ()=> popupOpen(popupAdd));
/*слушатели на закрытие попапов */
buttonClosepProfile.addEventListener ('click', ()=> popupClose(popupProfile))
buttonCloseAdd.addEventListener ('click', ()=> popupClose(popupAdd))
buttonCloseCard.addEventListener('click',() => popupClose(popupCard));

/* редактирование профиля */
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput =  popupEditForm.querySelector('.popup__input_type_job');
const Name = document.querySelector('.profile__name');
const Job = document.querySelector('.profile__job');

function formSubmitHandler (evt) {
    evt.preventDefault();
    Name.textContent = nameInput.value;
    Job.textContent = jobInput.value;
    popupClose(popupProfile);
}
popupEditForm.addEventListener('submit', formSubmitHandler); 

/* Добавление массива карточек */
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  initialCards.forEach(function (item) {
    renderPlace(item.name, item.link);
  });
 
/* Добавление карточки со всем функционалом*/
function mestoAdd (mesto,link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const deletElement = element.querySelector('.element__delete').addEventListener('click',cardDelete);
    const like = element.querySelector('.element__like').addEventListener('click',likeCard);
    const elementName = element.querySelector('.element__title');
    const elementImage = element.querySelector('.element__image');
    elementName.textContent = mesto;
    elementImage.src = link;

    elementImage.addEventListener('click',()=> {
      popupCardImage.src = link;
      popupCardName.textContent = mesto;
      popupCardImage.alt = mesto;

      popupOpen(popupCard);
    });

    return element; 
  }  
  // добавить место по данным формы
function newMestoAdd(evt) {
  evt.preventDefault();
  renderPlace(mestoName.value, mestoLink.value);
  popupAddForm.reset();
  popupClose(popupAdd);
}
popupAddForm.addEventListener('submit', newMestoAdd);

function renderPlace (mesto, link) {
    const mestoCard = mestoAdd(mesto, link);
    elementContainer.prepend(mestoCard);
  } 
  /* удаление карточки */
function cardDelete(evt) {
    const card = evt.target.closest(".element").remove();
  }
  /* лайк */
function likeCard(evt) {
    evt.target.classList.toggle('element__like_active')
  }





 
  
