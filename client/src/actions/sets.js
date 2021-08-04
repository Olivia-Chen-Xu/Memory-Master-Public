import { FETCH_ALL_SETS, CREATE_SET, UPDATE_SET, DELETE_SET, UPDATE_CARD, DELETE_CARD} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getSets = () => async (dispatch) => {
  try {
    const { data } = await api.fetchSets();

    dispatch({ type: FETCH_ALL_SETS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createSet = (set) => async (dispatch) => {
  try {
    const { data } = await api.createSet(set);

    dispatch({ type: CREATE_SET, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSet = (id, set) => async (dispatch) => {
  try {
    const { data } = await api.updateSet(id, set);

    dispatch({ type: UPDATE_SET, payload: data });

    set.cards.map(async(card) => {
        const { data } = await api.updateCard(card._id, { ...card, set: set.name });
        
        dispatch({ type: UPDATE_CARD, payload: data });
    })
  } catch (error) {
    console.log(error);
  }
};

export const deleteSet = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchSets();
    const set = data.find(set => set._id === id);

    set.cards.map(async(card) => {
        await api.deleteCard(card._id);

        dispatch({ type: DELETE_CARD, payload: card._id });
    })

    await api.deleteSet(id);

    dispatch({ type: DELETE_SET, payload: id });

    
  } catch (error) {
    console.log(error);
  }
};