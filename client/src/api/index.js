import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchCards = () => API.get('/cards');
export const createCard = (newCard) => API.post('/cards', newCard);
export const updateCard = (id, updatedCard) => API.patch(`/cards/${id}`, updatedCard);
export const deleteCard = (id) => API.delete(`/cards/${id}`);

export const fetchSets = () => API.get('/sets');
export const createSet = (newSet) => API.post('/sets', newSet);
export const updateSet = (id, updatedSet) => API.patch(`/sets/${id}`, updatedSet);
//export const expandSet = (id, expandedSet) => API.patch(`/sets/${id}`, expandedSet);
export const deleteSet = (id) => API.delete(`/sets/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);