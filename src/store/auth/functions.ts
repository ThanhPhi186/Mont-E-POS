import Fetch from '@/services/Fetch';
import {RawCurrentUser} from './type';
import {setSetting} from '../settings/functions';
import {removeKey, setStringItem} from '@/services/storage/AsyncStorageService';
import {STORE_KEY} from '@/constants/variableConstant';
import {Actions} from 'react-native-router-flux';

export async function fetchCurrentUser() {
  const {
    data: {data: user},
  } = await Fetch.get<{
    data: RawCurrentUser;
  }>(`@api/user/info`);
  setSetting('me', user);
}

export async function startLogout() {
  await removeKey(STORE_KEY.CURRENT_CHANNEL);
  await removeKey(STORE_KEY.CURRENT_USER);
  await removeKey(STORE_KEY.API_KEY);
  setSetting('me', null);
  Actions.reset('root');
}
