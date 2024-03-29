const cardTemplate = document.querySelector('#element-template');

export const createCardNode = ({
  heading,
  imageLink,
  id,
  likes = 0,
  ownCard = false,
  liked = false,
  likeButtonCard,
  likeCardActive,
  handleRemoveCardClick,
  openImagePopup,
}) => {
  const element = cardTemplate.content.querySelector('.element').cloneNode(true);
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
  setEventListeners (elementDelete,elementLike,liked,ownCard,id,handleRemoveCardClick,likeButtonCard,likeCardActive,openImagePopup,elementImage,imageLink,heading);
  
  return element;
};
const setEventListeners = (elementDelete,elementLike,liked,ownCard,id,handleRemoveCardClick,likeButtonCard,likeCardActive,openImagePopup,elementImage,imageLink,heading) =>{
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