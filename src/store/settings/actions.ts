import {createAction} from 'typesafe-actions';

export const setSettingAction = createAction('settings/SET')<{
  key: string;
  value: any;
}>();

export const setSettingsAction =
  createAction('settings/MULTI_SET')<Record<string, any>>();

export const appendSettingAction = createAction('settings/APPEND')<{
  key: string;
  value: any[];
}>();
