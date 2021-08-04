import { combineReducers } from 'redux';

import cards from './cards';
import sets from './sets';
import auth from './auth';

export const reducers = combineReducers({ cards, sets, auth });
