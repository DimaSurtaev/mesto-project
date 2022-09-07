import {
  openPopup,
  closePopup,
  getConfirm,
} from './modal.js';
import {
  deleteCard,
  likeCard,
  unlikeCard
} from './api.js'
const popupCardImageId = document.querySelector('#popup-card')
const popupImageEl = popupCardImageId.querySelector('.popup__image-card');
const popupImageTitleEl = document.querySelector('.popup__title-card');
const cardTemplate = document.querySelector('#element-template');

export const createCardNode = ({
  heading,
  imageLink,
  id,
  likes = 0,
  ownCard = false,
  liked = false,
}) => {
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

  const element = cardTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete');
  const elementLikeCounter = element.querySelector('.element__like-counter');
  const popupConfirm = document.querySelector('#popup-confirm');
  const likeCardActive = 'element__like_active';
  elementImage.src = imageLink;
  elementImage.alt = heading;
  elementTitle.textContent = heading;
  elementLikeCounter.textContent = likes;
  elementLike.addEventListener('click', likeButtonCard);
  elementLike.dataset.id = id;

  setEventListeners(elementDelete, elementLike, liked, ownCard, id, handleRemoveCardClick, likeCardActive, likeButtonCard, elementImage, imageLink, heading);
  return element;
};
const setEventListeners = (elementDelete, elementLike, liked, ownCard, id, handleRemoveCardClick, likeCardActive, likeButtonCard, elementImage, imageLink, heading) => {
  function fillImage({
      imageSrc,
      headingText,
      imageAlt = headingText,
  }) {
      popupImageEl.src = imageSrc;
      popupImageEl.alt = imageAlt;
      popupImageTitleEl.textContent = headingText;
  }
  const openImagePopup = (imageSrc, headingText) => {
      fillImage({
          imageSrc,
          headingText,
      });
      openPopup(popupCardImageId);
  };
  elementImage.addEventListener('click', () => openImagePopup(imageLink, heading));
  if (liked) {
      elementLike.classList.add(likeCardActive);
  }
  if (ownCard) {
      elementDelete.addEventListener('click', handleRemoveCardClick);
      elementDelete.dataset.id = id;
  } else {
      elementDelete.setAttribute('disabled', '');
  }
}