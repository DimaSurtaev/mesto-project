import './pages/index.css';
import {
    popupProfile,
    popupAdd,
    popupAvatar,
    elementContainer,
    popupCard,
    buttonPopupProfile,
    buttonPopupMesto,
    buttonClosepProfile,
    buttonCloseAdd,
    buttonCloseCard,
    buttonCloseAvatar,
    formSelectorClass,
    inputSelectorClass,
    submitButtonSelectorClass,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
    profileEl,
    profileName,
    profileJob,
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
    newMestoFormLinkEl,
    newMestoFormel,
    newMestoFormNameEl,
    popupAddIdEl,
    popupAddFormIdEl,
    buttonCloseConfirm
} from './components/utils.js'
import {
    addMesto,
    popupConfirm
} from './components/cards.js'
import {
    fetchUserInfo,
    updateUserData,
    updateAvatar,
    createCard,
    fetchCards,
} from './components/api.js'
import {
    enableValidation,
    deactivateButton,
    hideInputError
} from './components/validate.js';
import {
    openPopup,
    closePopup
} from './components/modal.js';
/*слушатели на закрытие попапов */
buttonClosepProfile.addEventListener('click', () => closePopup(popupProfile))
buttonCloseAdd.addEventListener('click', () => closePopup(popupAdd))
buttonCloseCard.addEventListener('click', () => closePopup(popupCard));
buttonCloseAvatar.addEventListener('click', () => closePopup(popupAvatar));
buttonCloseConfirm.addEventListener('click', () => closePopup(popupConfirm));
const getProfileData = () => {
    profileFormName.value = profileName.textContent;
    profileFormJobEl.value = profileJob.textContent;
};

function renderUserData({
    name,
    about,
    id,
}) {
    profileEl.dataset.id = id;
    profileName.textContent = name;
    profileJob.textContent = about;
}
const getProfileId = () => profileEl.dataset.id;
const updateProfileData = ({
        name,
        about,
    }) => updateUserData({
        name,
        about,
    })
    .then((userData) => {
        renderUserData({
            name: userData.name,
            about: userData.about,
        });
    });
const switchText = (element, text) => {
    element.textContent = text;
};
const profileEditButtonHandler = () => {
    clearForm({
        formElement: profileFormEl,
        inputSelectorClass,
        inputErrorClass,
        errorClass,
    });
    getProfileData();
    openPopup(profilePopupId);
    deactivateButton(profileButtonSubmit, inactiveButtonClass);
};
const profileFormSubmitHandler = (e) => {
    e.preventDefault();
    const prevText = profileButtonSubmit.textContent;
    switchText(profileButtonSubmit, 'Сохранение...');
    updateProfileData({
            name: profileFormName.value,
            about: profileFormJobEl.value,
        })
        .then(() => closePopup(profilePopupId))
        .catch((error) => console.log(error))
        .finally(() => {
            switchText(profileButtonSubmit, prevText);
        });
};
buttonPopupProfile.addEventListener('click', profileEditButtonHandler);
profileFormEl.addEventListener('submit', profileFormSubmitHandler);

function setAvatar({
    avatar,
    alt,
}) {
    profileAvatar.src = avatar;
    profileAvatar.alt = alt;
}
fetchUserInfo()
    .then((user) => {
        renderUserData({
            name: user.name,
            about: user.about,
            id: user._id,
        });
        setAvatar({
            avatar: user.avatar,
            alt: user.name,
        });
    });

function hideInputErrors(formElement, inputSelectorClass, inputErrorClass, errorClass) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelectorClass));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    });
}
const clearForm = ({
    formElement,
    inputSelectorClass,
    inputErrorClass,
    errorClass,
}) => {
    hideInputErrors(formElement, inputSelectorClass, inputErrorClass, errorClass);
    formElement.reset();
};
/********************Обновление аватара*************************/
const avatarButtonHandler = () => {
    openPopup(avatarPopupId);
};
const avatarHandler = (e) => {
    e.preventDefault();
    const avatarLink = avatarLinkForm.value;
    const prevText = avatarSubmit.textContent;
    switchText(avatarSubmit, 'Сохранение...');
    updateAvatar(avatarLink)
        .then((user) => {
            setAvatar({
                avatar: user.avatar,
                alt: user.name,
            });
        })
        .finally(() => {
            switchText(avatarSubmit, prevText);
            closePopup(avatarPopupId);
        });
};
avatarProfileButton.addEventListener('click', avatarButtonHandler);
avatarFormEl.addEventListener('submit', avatarHandler);
/**************Карточки****************/
const newMestoButtonHandler = () => {
    clearForm({
        formElement: popupAddFormIdEl,
        inputSelectorClass,
        inputErrorClass,
        errorClass,
    });
    openPopup(popupAddIdEl);
    deactivateButton(buttonAddNewMesto, inactiveButtonClass);
};
const addCardToContainer = (element, container) => {
    container.prepend(element);
};
const formNewCardSubmitHandler = (e) => {
    e.preventDefault();
    const name = newMestoFormNameEl.value;
    const link = newMestoFormLinkEl.value;
    const prevText = buttonAddNewMesto.textContent;
    switchText(buttonAddNewMesto, 'Сохранение...');
    createCard({
            name,
            link,
        })
        .then((element) => {
            const cardNode = addMesto({
                heading: element.name,
                imageLink: element.link,
                id: element._id,
                ownCard: true,
            });
            addCardToContainer(cardNode, elementContainer);
            closePopup(popupAddIdEl);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            switchText(buttonAddNewMesto, prevText);
        });
};
const renderCards = (cards = []) => {
    const profileId = getProfileId();
    cards.slice()
        .reverse()
        .forEach((element) => {
            const cardNode = addMesto({
                heading: element.name,
                imageLink: element.link,
                likes: element.likes.length,
                id: element._id,
                ownCard: (profileId === element.owner._id),
                liked: (element.likes.find((user) => user._id === profileId)),
            });
            addCardToContainer(cardNode, elementContainer);
        });
};
popupAddFormIdEl.addEventListener('submit', formNewCardSubmitHandler);
buttonPopupMesto.addEventListener('click', newMestoButtonHandler);
/**************************************************/
enableValidation({
    formSelectorClass,
    inputSelectorClass,
    submitButtonSelectorClass,
    inactiveButtonClass,
    inputErrorClass,
    inputErrorClass,
    errorClass,
});
fetchUserInfo()
    .then((user) => {
        renderUserData({
            name: user.name,
            about: user.about,
            id: user._id,
        });
        setAvatar({
            avatar: user.avatar,
            alt: user.name,
        });
    })
    .then(() => {
        fetchCards()
            .then(renderCards);
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });