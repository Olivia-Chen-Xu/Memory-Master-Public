import { FETCH_ALL_CARDS, CREATE_CARD, UPDATE_CARD, DELETE_CARD } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (cards = [], action) => {
  switch (action.type) {
    case FETCH_ALL_CARDS:
      return action.payload;
    case CREATE_CARD:
      return [...cards, action.payload];
    case UPDATE_CARD:
      return cards.map((card) => (card._id === action.payload._id ? action.payload : card));
    case DELETE_CARD:
      return cards.filter((card) => card._id !== action.payload);
    default:
      return cards;
  }
};