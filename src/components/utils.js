const popupProfile =  document.querySelector('.popup_type_profile');/* попап профиля */
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

/* инпуты формы нового места */
const mestoName = document.querySelector('.popup__input_type_mesto');
const mestoLink = document.querySelector('.popup__input_type_link');

/* редактирование профиля */
const popupEditForm = document.querySelector('.popup__form');
const nameInput = popupEditForm.querySelector('.popup__input_type_name');
const jobInput =  popupEditForm.querySelector('.popup__input_type_job');;
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

/* кнопки открытия попапов */
const buttonPopupProfile = document.querySelector('.profile__button-edit');
const buttonPopupMesto = document.querySelector('.profile__button-add');
/* кнопки закрытия попапов */
const buttonClosepProfile = document.querySelector('.popup__close');
const buttonCloseAdd = document.querySelector('.popup__close_type_add');
const buttonCloseCard = document.querySelector('.popup__close_type_card');


const formSelectorClass = '.popup__form';
const inputSelectorClass = '.popup__input';
const submitButtonSelectorClass = '.popup__button';
const inactiveButtonClass = 'popup__button_disabled';
const inputErrorClass = 'popup__error';
const errorClass = 'popup__error_visible';
  

export 
    {popupProfile,
    profileName,
    profileJob,
    popupAdd,
    popupAddForm,
    elementContainer,
    elementTemplate,
    popupCard,
    popupCardContainer,
    popupCardImage,
    popupCardName,
    buttonPopupProfile,
    buttonPopupMesto,
    buttonClosepProfile,
    buttonCloseAdd,
    buttonCloseCard,
    mestoName,
    mestoLink,
    popupEditForm,
    nameInput,
    jobInput,
    name,
    job,
    formSelectorClass,
    inputSelectorClass,
    submitButtonSelectorClass,
    inactiveButtonClass,
    inputErrorClass,
    errorClass};