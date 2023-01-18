import {ActionType, createReducer} from 'typesafe-actions';
import * as actions from './actions';
import {ICart} from './type';

const reducer = createReducer<ICart, ActionType<typeof actions>>(
  {},
).handleAction(actions.setCartAction, (state, action) => action.payload);

export default reducer;
