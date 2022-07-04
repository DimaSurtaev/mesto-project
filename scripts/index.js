const popupProfile = document.querySelector('.popup_type_profile');/* попап профиля */
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_type_add'); /* попап нового места */
const popupAddForm = document.querySelector('.popup__form_type_add');        
/* шаблон макета */
const elementContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupCard = document.querySelector('.popup_type_card'); /* попап увеличенной картинки */
const popupCardContainer = popupCard.querySelector('.popup__container_type_card');
const popupCardImage = popupCard.querySelector('.popup__image-card');
const popupCardName = popupCard.querySelector('.popup__title-card');

/* кнопки открытия попапов */
const buttonPopupProfile = document.querySelector('.profile__button-edit');
const buttonPopupMesto = document.querySelector('.profile__button-add');
/* кнопки закрытия попапов */
const buttonClosepProfile = document.querySelector('.popup__close');
const buttonCloseAdd = document.querySelector('.popup__close_type_add');
const buttonCloseCard = document.querySelector('.popup__close_type_card');


/* инпуты формы нового места */
const mestoName = document.querySelector('.popup__input_type_mesto');
const mestoLink = document.querySelector('.popup__input_type_link');


/* открытие попапов */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
/* закрытие попапов */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
/* слушатели на  открытие попапов */
buttonPopupProfile.addEventListener ('click', ()=> openPopup(popupProfile));
buttonPopupMesto.addEventListener ('click', ()=> openPopup(popupAdd));
/*слушатели на закрытие попапов */
buttonClosepProfile.addEventListener ('click', ()=> closePopup(popupProfile))
buttonCloseAdd.addEventListener ('click', ()=> closePopup(popupAdd))
buttonCloseCard.addEventListener('click',() => closePopup(popupCard));

/* открыть попапа профиля */
function openPropfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
  }
/* редактирование профиля */
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput =  popupEditForm.querySelector('.popup__input_type_job');;
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

function submitPopupProfile  (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupProfile);
}
popupEditForm.addEventListener('submit', submitPopupProfile); 

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

  initialCards.forEach((item) => {
    renderPlace(item.name, item.link);
  });
 
/* Добавление карточки со всем функционалом*/
function addMesto (mesto,link) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const deletElement = element.querySelector('.element__delete');
    const like = element.querySelector('.element__like');
    like.addEventListener('click',likeCard);
    deletElement.addEventListener('click',deleteCard);

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
  // добавить место по данным формы
function addNewMesto(evt) {
  evt.preventDefault();
  renderPlace(mestoName.value, mestoLink.value);
  popupAddForm.reset();
  closePopup(popupAdd);
}
popupAddForm.addEventListener('submit', addNewMesto);

function renderPlace (mesto, link) {
    const mestoCard = addMesto(mesto, link);
    elementContainer.prepend(mestoCard);
  } 
  /* удаление карточки */
function deleteCard(evt) {
    const card = evt.target.closest(".element").remove();
  }
  /* лайк */
function likeCard(evt) {
    evt.target.classList.toggle('element__like_active')
  }





 
  
