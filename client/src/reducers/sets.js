import { FETCH_ALL_SETS, CREATE_SET, UPDATE_SET, DELETE_SET } from '../constants/actionTypes';

// eslint-disable-next-line import/no-anonymous-default-export
export default (sets = [], action) => {
  switch (action.type) {
    case FETCH_ALL_SETS:
      return action.payload;
    case CREATE_SET:
      return [...sets, action.payload];
    case UPDATE_SET:
      return sets.map((set) => (set._id === action.payload._id ? action.payload : set));
    case DELETE_SET:
      return sets.filter((set) => set._id !== action.payload);
    default:
      return sets;
  }
};