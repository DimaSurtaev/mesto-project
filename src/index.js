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
    createCardNode
} from './components/cards.js'
import {
    fetchUserInfo,
    updateUserData,
    updateAvatar,
    createCard,
    fetchCards,
    deleteCard,
    likeCard,
    unlikeCard
} from './components/api.js'
import {
    enableValidation,
    deactivateButton,
    hideInputError,
    hideInputErrors
} from './components/validate.js';
import {
    openPopup,
    closePopup,
    getConfirm,
    openImagePopup
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
            closePopup(avatarPopupId);
        })
        .catch((error) => console.log(error))
        .finally(() => {
            switchText(avatarSubmit, prevText);
            
        });
};
avatarProfileButton.addEventListener('click', avatarButtonHandler);
avatarFormEl.addEventListener('submit', avatarHandler);
/**************Карточки****************/
const popupConfirm = document.querySelector('#popup-confirm'); 
const likeCardActive = 'element__like_active';

const likeButtonCard = (e) => {
    const {
        id
    } = e.target.dataset;
    const likeContainer = e.target.closest('.element')
        .querySelector('.element__like-counter');
    const liked = e.target.classList.contains(likeCardActive);
  
    if (liked) {
        unlikeCard(id)
            .then((element) => {
                e.target.classList.remove(likeCardActive);
                likeContainer.textContent = element.likes.length;
            });
    } else {
        likeCard(id)
            .then((element) => {
                e.target.classList.add(likeCardActive);
                likeContainer.textContent = element.likes.length;
            })
            .catch((error) => console.log(error));
    }
  };

const handleRemoveCardClick = (e) => {
    openPopup(popupConfirm);
    getConfirm(popupConfirm, () => {
        const {
            id
        } = e.target.dataset;
        deleteCard(id)
            .then(() => {
                e.target.closest('.element')
                    .remove();
                closePopup(popupConfirm);
            })
            .catch((error) => console.log(error));
    });
    
  };

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
            link
        })
        .then((element) => {
            const cardNode = createCardNode({
                heading: element.name,
                imageLink: element.link,
                id: element._id,
                ownCard: true,
                handleRemoveCardClick,
                likeCardActive,
                likeButtonCard,
                openImagePopup,
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
            const cardNode = createCardNode({
                heading: element.name,
                imageLink: element.link,
                likes: element.likes.length,
                id: element._id,
                ownCard: (profileId === element.owner._id),
                liked: (element.likes.find((user) => user._id === profileId)),
                handleRemoveCardClick,
                likeCardActive,
                likeButtonCard,
                openImagePopup,
            })       
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
            .then(renderCards)
            .catch((error) => console.log(error));
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });