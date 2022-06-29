let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button-edit');
let closeButton = document.querySelector('.popup__close');
let popupAdd = document.querySelector('.popup-add');
let popupCard = document.querySelector('.popup-card');
let addButton = document.querySelector('.profile__button-add');
let addCloseButton = document.querySelector('.popup-add__close');
let elementContainer = document.querySelector('.elements');
let addButtonMesto = popupAdd.querySelector('.popup-add__button')
/* Открытие и закрытия попапа профиля */
editButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.add('popup_opened');
});
closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    popup.classList.remove('popup_opened');
});
addButton.addEventListener ('click', (evt) => {
    evt.preventDefault();
    popupAdd.classList.add('popup-add_opened');
});
addCloseButton.addEventListener ('click',(evt) => {
    evt.preventDefault();
    popupAdd.classList.remove('popup-add_opened');
}); 

/* Редактирование профиля */
let profileName = document.querySelector('.profile__name');
let popupName = document.querySelector('.popup__input_type_name');
let profileJob = document.querySelector('.profile__job');
let popupJob  = document.querySelector('.popup__input_type_job');
let popupButton = popup.querySelector('.popup__button');

function editProfile() {
  profileJob.textContent = popupJob.value;
  profileName.textContent = popupName.value;
  popup.classList.remove('popup_opened');
}
popupButton.addEventListener('click',editProfile);


// Находим форму в DOM
const formElement = document.querySelector('.popup');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = formElement.querySelector('.popup__input_type_job')// Воспользуйтесь инструментом .querySelector()

function formSubmitHandler (evt) {
    evt.preventDefault();
      nameInput.value;
      jobInput.value;
formElement.addEventListener('submit', formSubmitHandler); 
}


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

  initialCards.forEach ((item) => {
    const elementTemplate = document.querySelector('#element-template').content;
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    const elementItem = element.querySelector('div');
    const titleArr =  elementItem.querySelector('h2').textContent = item.name;
    const imageArr = element.querySelector('img'); 
    imageArr.src = item.link; 
    imageArr.addEventListener('click',() => {
      popupCard.classList.add('popup-card_opened');
      const popupCardTemplate = document.querySelector('#popup-card-template').content;
      const popupCardContainer = popupCardTemplate.querySelector('.popup-card__container').cloneNode(true);
      const popupCardClose = popupCardContainer.querySelector('.popup-card__close'); 
      popupCardContainer.querySelector('img').src = item.link;
      popupCardContainer.querySelector('p').textContent = item.name;
      console.log(popupCardContainer);
      popupCard.append(popupCardContainer);
      popupCardClose.addEventListener('click', () => {
        let deletPopupCard = popupCardClose.closest('.popup-card__container');
        deletPopupCard.remove();
        popupCard.classList.remove('popup-card_opened');
      })
    })  
    elementItem.querySelector('button').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__like_active')
})
    elementContainer.append(element);
  })
  console.log(initialCards);
/* удаление карточки */
const elementTemplate = document.querySelector('.elements');
const element = elementTemplate.querySelectorAll('.element');
for (let i = 0; i < element.length; i++) {
 let deleteCardButton = element[i].querySelector('.element__delete');
 deleteCardButton.addEventListener('click', () => {
  let deletCard = deleteCardButton.closest('.element');
    deletCard.remove();
 })
}


/* Добавление карточки со всем функционалом*/
function addMesto(name,link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  const elementItem = element.querySelector('div');
  elementItem.querySelector('h2').textContent = link;
  element.querySelector('img').src = name; 
  const elementImage = element.querySelector('img');
  elementImage.addEventListener('click',() => {
    popupCard.classList.add('popup-card_opened');
    const popupCardTemplate = document.querySelector('#popup-card-template').content;
    const popupCardContainer = popupCardTemplate.querySelector('.popup-card__container').cloneNode(true);
    const popupCardClose = popupCardContainer.querySelector('.popup-card__close'); 
    popupCardContainer.querySelector('img').src = name;
    popupCardContainer.querySelector('p').textContent = link;
    console.log(popupCardContainer);
    popupCard.append(popupCardContainer);
    popupCardClose.addEventListener('click',() => {
      let deletPopupCard = popupCardClose.closest('.popup-card__container');
      deletPopupCard.remove();
      popupCard.classList.remove('popup-card_opened');
    })
  })  
  /* удаление карточки */
  const deleteButton = element.querySelector('.element__delete');
  deleteButton.addEventListener ('click', () => {
    let deletCard = deleteButton.closest('.element');
    deletCard.remove();
  })
  elementItem.querySelector('button').addEventListener('click',function (evt) {
    evt.target.classList.toggle('element__like_active')
  })
  elementContainer.prepend(element);
}
addButtonMesto.addEventListener('click',() => {
  const name = document.querySelector('.popup-add__input_type_mesto').value;
  const link = document.querySelector('.popup-add__input_type_link').value;
  addMesto(link, name);
  link.value = '';
  name.value = '';
  popupAdd.classList.remove('popup-add_opened');
});




 
  
