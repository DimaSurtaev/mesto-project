import {elementTemplate,popupCard,popupCardImage,popupCardName,} from '../components/utils.js';
import {openImagePopup,getConfirm, openPopup,closePopup} from '../components/modal.js';
import {deleteCard,likeCard,unlikeCard} from '../components/api.js';
 

const cardTemplate = document.querySelector('#element-template');
const likeCardActive = 'element__like_active';
const popupConfirm = document.querySelector('#popup-confirm');

const likeButtonCard = (e) => {
  const { id } = e.target.dataset;
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
    const { id } = e.target.dataset;
    deleteCard(id)
      .then(() => {
        e.target.closest('.element')
          .remove();
          closePopup(popupConfirm);
      })
      .catch((error) => console.log(error));
  });
};
export const addMesto = ({
  heading,
  imageLink,
  id,
  likes = 0,
  ownCard = false,
  liked = false,
}) => {
  const element = cardTemplate.content.querySelector('.element')
    .cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete');
  const elementLikeCounter = element.querySelector('.element__like-counter');
  elementImage.src = imageLink;
  elementImage.alt = heading;
  elementTitle.textContent = heading;
  elementLikeCounter.textContent = likes;
  elementLike.addEventListener('click', likeButtonCard);
  elementLike.dataset.id = id;


  if (liked) {
    elementLike.classList.add(likeCardActive);
  }
  if (ownCard) {
    elementDelete.addEventListener('click', handleRemoveCardClick);
    elementDelete.dataset.id = id;
  } else {
    elementDelete.setAttribute('disabled', '');
  }
  elementImage.addEventListener('click', () => openImagePopup(imageLink, heading));
  return element;
};
