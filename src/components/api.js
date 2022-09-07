const config = {
  token: '9ca80365-5635-4c67-8bc3-5f18cf90d094',
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-14',
};
const headers = {
  authorization: config.token,
  'Content-Type': 'application/json',
};

const checkResponse = (res) => {
  if (res.status === 200) {
      return res.json();
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const fetchUserInfo = () => fetch(
      `${config.baseUrl}/users/me`, {
          headers
      },
  )
  .then((res) => checkResponse(res));

export const fetchCards = () => fetch(
      `${config.baseUrl}/cards`, {
          headers
      },
  )
  .then((res) => checkResponse(res));

export const updateUserData = ({
      name,
      about,
  }) => fetch(
      `${config.baseUrl}/users/me`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
              name,
              about,
          }),
      },
  )
  .then(checkResponse);

export const createCard = ({
      name,
      link,
  }) => fetch(
      `${config.baseUrl}/cards`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
              name,
              link,
          }),
      },
  )
  .then(checkResponse);

export const deleteCard = (id) => fetch(
      `${config.baseUrl}/cards/${id}`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
              _id: id
          }),
      },
  )
  .then(checkResponse);

export const likeCard = (id) => fetch(
      `${config.baseUrl}/cards/likes/${id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify({
              _id: id
          }),
      },
  )
  .then(checkResponse);

export const unlikeCard = (id) => fetch(
      `${config.baseUrl}/cards/likes/${id}`, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
              _id: id
          }),
      },
  )
  .then(checkResponse);

export const updateAvatar = (avatar) => fetch(
      `${config.baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
              avatar
          }),
      },
  )
  .then(checkResponse);