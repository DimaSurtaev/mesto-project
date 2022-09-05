const profilePopupId = document.querySelector('#popup-profile');
const profileFormEl = profilePopupId.querySelector('#profile-edit');
const profileEl = document.querySelector('.profile'); /* попап профиля */
const profileAvatar = document.querySelector('.profile__avatar');
const profileButtonSubmit = document.querySelector('.popup__button');
const profileFormName = document.querySelector('#name');
const profileFormJobEl = document.querySelector('#job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupProfile = document.querySelector('.popup_type_profile');


const popupAvatar = document.querySelector('.popup_type_avatar'); /* аватара */
const avatarLinkForm = document.querySelector('#avatar');
const avatarSubmit = popupAvatar.querySelector('.popup__button');
const avatarPopupId = document.querySelector('#popup-avatar');
const avatarProfileButton = document.querySelector('.profile__button-avatar');
const avatarFormEl = document.querySelector('#profile-avatar');

const popupAddIdEl = document.querySelector('#popup-mesto');
const popupAdd = document.querySelector('.popup_type_add'); /* попап нового места */
const popupAddFormIdEl = document.querySelector('#profile-mesto');
const popupAddForm = document.querySelector('.popup__form_type_add');
const buttonAddNewMesto = popupAddIdEl.querySelector('.popup__button');
const newMestoFormNameEl = popupAddIdEl.querySelector('#mesto');
const newMestoFormLinkEl = popupAddIdEl.querySelector('#link');
const newMestoFormel = document.querySelector('#profile-edit');


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
const jobInput = popupEditForm.querySelector('.popup__input_type_job');;
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

/* кнопки открытия попапов */
const buttonPopupProfile = document.querySelector('.profile__button-edit');
const buttonPopupMesto = document.querySelector('.profile__button-add');
const buttonPopupAvatar = document.querySelector('.profile__button-avatar');
/* кнопки закрытия попапов */
const buttonClosepProfile = document.querySelector('.popup__close');
const buttonCloseAdd = document.querySelector('.popup__close_type_add');
const buttonCloseCard = document.querySelector('.popup__close_type_card');
const buttonCloseAvatar = document.querySelector('.popup__close_type_avatar');
const buttonCloseConfirm = document.querySelector('.popup__close_type_confirm');


const formSelectorClass = '.popup__form';
const inputSelectorClass = '.popup__input';
const submitButtonSelectorClass = '.popup__button';
const inactiveButtonClass = 'popup__button_disabled';
const inputErrorClass = 'popup__error';
const errorClass = 'popup__error_visible';

export {
    popupProfile,
    profileName,
    profileJob,
    popupAdd,
    popupAvatar,
    popupAddForm,
    elementContainer,
    elementTemplate,
    popupCard,
    popupCardContainer,
    popupCardImage,
    popupCardName,
    buttonPopupProfile,
    buttonPopupAvatar,
    buttonCloseAvatar,
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
    errorClass,
    profileEl,
    profileAvatar,
    profileButtonSubmit,
    profilePopupId,
    profileFormEl,
    profileFormName,
    profileFormJobEl,
    avatarLinkForm,
    avatarSubmit,
    avatarPopupId,
    avatarProfileButton,
    avatarFormEl,
    buttonAddNewMesto,
    newMestoFormNameEl,
    newMestoFormLinkEl,
    newMestoFormel,
    popupAddIdEl,
    popupAddFormIdEl,
    buttonCloseConfirm
};