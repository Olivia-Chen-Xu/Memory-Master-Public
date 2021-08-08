import { FETCH_ALL_CARDS, CREATE_CARD, UPDATE_CARD, DELETE_CARD, UPDATE_SET} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getCards = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCards();

    dispatch({ type: FETCH_ALL_CARDS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createCard = (card, set) => async (dispatch) => {
  try {
    const { data } = await api.createCard(card);
    dispatch({ type: CREATE_CARD, payload: data }); 
    dispatch({ type: UPDATE_SET, payload: await api.updateSet(set._id, {...set, cards: set.cards.concat(data)}) })

  } catch (error) {
    console.log(error);
  }
};

export const updateCard = (id, card) => async (dispatch) => {
  try {
    const { data } = await api.updateCard(id, card);

    dispatch({ type: UPDATE_CARD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCard = (id, set) => async (dispatch) => {
  try {
    await api.deleteCard(id);

    dispatch({ type: DELETE_CARD, payload: id });
    dispatch({ type: UPDATE_SET, payload: await api.updateSet(set._id, {...set, cards: set.cards.filter(c => c._id !== id)}) });
  } catch (error) {
    console.log(error);
  }
};