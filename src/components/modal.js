const popupCardImageId = document.querySelector('#popup-card')
const popupImageEl = popupCardImageId.querySelector('.popup__image-card');
const popupImageTitleEl = document.querySelector('.popup__title-card');

/* открытие и закрытие попапов */
const modal = {
    openPopup: function(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', closeEsc);
        popup.addEventListener('mousedown', closeClick);
    },
    closePopup: function(popup) {
        popup.classList.remove('popup_opened');
        popup.removeEventListener('keydown', closeEsc);
        document.removeEventListener('mousedown', closeClick);
    },

}
const closeClick = (evt) => {
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
export const getConfirm = (popup, handleSubmit) => {
    const confirmForm = popup.querySelector('.popup__form');
    const handleConfirm = (e) => {
        e.preventDefault();
        handleSubmit();
    };
    let isSubscribed = false;
    const openedModalCheckInterval = setInterval(() => {
        if (popup.classList.contains('popup_opened')) {
            if (!isSubscribed) {
                confirmForm.addEventListener('submit', handleConfirm);
                isSubscribed = true;
            }
        } else {
            confirmForm.removeEventListener('submit', handleConfirm);
            clearInterval(openedModalCheckInterval);
        }
    });
};

function fillImage({
    imageSrc,
    headingText,
    imageAlt = headingText,
}) {
    popupImageEl.src = imageSrc;
    popupImageEl.alt = imageAlt;
    popupImageTitleEl.textContent = headingText;
}

export const openImagePopup = (imageSrc, headingText) => {
    fillImage({
        imageSrc,
        headingText,
    });
    openPopup(popupCardImageId);
};


export const openPopup = modal.openPopup;
export const closePopup = modal.closePopup;
export {
    closeClick,
    closeEsc
}