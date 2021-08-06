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

  } catch (error) {
    console.log(error);
  }
};

export const deleteSet = (id) => async (dispatch) => {
  try {
    await api.deleteSet(id);
    dispatch({ type: DELETE_SET, payload: id });
   
  } catch (error) {
    console.log(error);
  }
};