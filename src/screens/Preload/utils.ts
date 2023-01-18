import {STORE_KEY} from '@/constants/variableConstant';
// import { analytics } from '@/global';
import Fetch, {env} from '@/services/Fetch';
import {setSetting} from '@/store/settings/functions';

export const initial = async (data: any) => {
  Fetch.api_url = data[STORE_KEY.CURRENT_DOMAIN];
  Fetch.company_code = data[STORE_KEY.COMPANY_CODE];
  Fetch.api_key = data[STORE_KEY.API_KEY];
  if (data[STORE_KEY.CURRENT_CHANNEL]) {
    const channel = JSON.parse(data[STORE_KEY.CURRENT_CHANNEL]);
    Fetch.current_channel = channel;
  }
  if (data[STORE_KEY.CURRENT_USER]) {
    const user = JSON.parse(data[STORE_KEY.CURRENT_USER]);
    setSetting('me', user);
  }
};
