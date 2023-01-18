import store from '@/store';
import {
  appendSettingAction,
  setSettingAction,
  setSettingsAction,
} from './actions';

export const setSetting = (key: string, value: any) => {
  store.dispatch(
    setSettingAction({
      key,
      value,
    }),
  );
};

export const setSettings = (data: Record<string, any>) => {
  store.dispatch(setSettingsAction(data));
};

export const appendSetting = (
  params: ReturnType<typeof appendSettingAction>['payload'],
) => {
  store.dispatch(appendSettingAction(params));
};
