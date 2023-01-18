import {ActionType, createReducer} from 'typesafe-actions';
import {SettingsState} from '@/store/settings/types';
import * as actions from './actions';

const reducer = createReducer<SettingsState, ActionType<typeof actions>>({})
  .handleAction(actions.setSettingAction, (state, action) => ({
    ...state,
    [action.payload.key]: action.payload.value,
  }))
  .handleAction(actions.setSettingsAction, (state, action) => ({
    ...state,
    ...action.payload,
  }))
  .handleAction(actions.appendSettingAction, (state, action) => {
    const {value, key} = action.payload;

    const stateValue = state[key] || [];
    const stateNewValue = [...stateValue, ...value];
    return {
      ...state,
      [key]: stateNewValue,
    };
  });

export default reducer;
