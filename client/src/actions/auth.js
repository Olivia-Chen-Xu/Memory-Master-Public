import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    console.log(formData);
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    router.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
}