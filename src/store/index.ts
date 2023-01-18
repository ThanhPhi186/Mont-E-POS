import {combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import settingsReducer from './settings/reducer';
import cartReducer from './order/reducer';

const rootReducer = combineReducers({
  settings: settingsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
