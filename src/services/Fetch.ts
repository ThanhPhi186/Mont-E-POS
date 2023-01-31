import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import SimpleToast from 'react-native-simple-toast';
import _ from 'lodash';
import Config from 'react-native-config';
import {Actions} from 'react-native-router-flux';
import {bluebird} from '@/global';
import {getDeviceName, getDeviceType} from 'react-native-device-info';
import {ICurrentSalesShiftResponse, IStoreItem} from '@/store/store/type';
import {removeKey} from './storage/AsyncStorageService';
import {STORE_KEY} from '@/constants/variableConstant';
import {setSetting} from '@/store/settings/functions';

export const env: 'staging' | 'development' | 'production' = Config.ENV;
const version = '/rest/s1';
const app_source = 'pos/mobile';
const common_source = 'gsources';

export function getImageUrl(location: string) {
  if (!location) return '';
  const url = location.replace('file:runtime/', `${Fetch.api_url}/_`);
  return url;
}

export const convertObjectToForm = (params: any) => {
  try {
    const form = new FormData();
    Object.keys(params).forEach(field => {
      if (params[field]) {
        if (field === 'attachments') {
          params[field].forEach((attachment: any) => {
            form.append('attachments[]', attachment);
          });
        } else {
          form.append(field, params[field]);
        }
      }
    });
    return form;
  } catch (error) {
    return new FormData();
  }
};
class FetchInstance {
  api_url = 'https://gstest.olbius.com';
  company_code = 'gstest.olbius.com';
  current_channel: ICurrentSalesShiftResponse | undefined = undefined;
  access_token = '';
  api_key = '';
  getUrl = (url: string) => {
    if (url.startsWith('@api')) {
      const baseUrl = `${Fetch.api_url}${version}`;
      url = url.startsWith('@api-common')
        ? url.replace(/^@api-common/, `${baseUrl}/${common_source}`)
        : url.replace(/^@api/, `${baseUrl}/${app_source}`);
    }
    return url;
  };

  getConfigWithToken = async (
    config: AxiosRequestConfig = {},
  ): Promise<AxiosRequestConfig> => {
    let headers = config.headers || {};
    headers = {
      ...headers,
    };
    if (this.api_key) {
      headers = {
        api_key: this.api_key,
        ...headers,
      };
    }
    return {
      ...config,
      headers,
    };
  };

  handlerError = async ({err, res, reject, _data, method}: any) => {
    const status = err.response?.status;
    if (status === 401) {
      if (
        Actions.currentScene !== 'preload' &&
        Actions.currentScene !== 'login'
      ) {
        await bluebird.delay(500);
        await removeKey(STORE_KEY.CURRENT_CHANNEL);
        await removeKey(STORE_KEY.CURRENT_USER);
        await removeKey(STORE_KEY.API_KEY);
        setSetting('me', null);
        Actions.reset('root');
        global.showMessage('Phiên đăng nhập đã hết hạn!');
      }
    }

    reject(err);
  };

  get = <ResponseType>(url: string, config?: AxiosRequestConfig) => {
    return new Promise(
      async (
        res: (value: AxiosResponse<ResponseType>) => void,
        reject: (axiosError: AxiosError) => void,
      ) => {
        axios
          .get<ResponseType>(
            this.getUrl(url),
            await this.getConfigWithToken(config),
          )
          .then((v: any) => res(v))
          .catch(async err => {
            this.handlerError({
              err: {...err},
              res,
              reject,
              _data: {url, config},
              method: 'get',
            });
          });
      },
    );
  };

  delete = async <ResponseType>(url: string, config?: AxiosRequestConfig) => {
    return axios.delete<ResponseType>(
      this.getUrl(url),
      await this.getConfigWithToken(config),
    );
  };

  post = async <ResponseType>(
    url: string,
    data: Record<string, any> = {},
    config?: AxiosRequestConfig,
  ) => {
    return new Promise(
      async (
        res: (value: AxiosResponse<ResponseType>) => void,
        reject: (axiosError: AxiosError) => void,
      ) => {
        axios
          .post<ResponseType>(
            this.getUrl(url),
            data,
            await this.getConfigWithToken(config),
          )
          .then((v: any) => res(v))
          .catch(async err => {
            this.handlerError({
              err: {...err},
              res,
              reject,
              _data: {url, config, data},
              method: 'post',
            });
          });
      },
    );
  };

  patch = async <ResponseType>(
    url: string,
    data: Record<string, any> = {},
    config?: AxiosRequestConfig,
  ) => {
    return axios.patch<ResponseType>(
      this.getUrl(url),
      data,
      await this.getConfigWithToken(config),
    );
  };
  put = async <ResponseType>(
    url: string,
    data: Record<string, any> = {},
    config?: AxiosRequestConfig,
  ) => {
    return axios.put<ResponseType>(
      this.getUrl(url),
      data,
      await this.getConfigWithToken(config),
    );
  };

  getOtherUrl = <ResponseType>(url: string) => {
    return new Promise(
      async (
        res: (value: AxiosResponse<ResponseType>) => void,
        reject: (axiosError: AxiosError) => void,
      ) => {
        axios
          .get<ResponseType>(url, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_1_0) AppleWebKit/537.36 (KHTML, like Gecko) ReactNativeDebugger/0.12.1 Chrome/87.0.4280.141 Electron/11.4.6 Safari/537.36',
            },
          })
          .then((v: any) => res(v))
          .catch(async err => {
            this.handlerError({
              err: {...err},
              res,
              reject,
              _data: {url},
              method: 'get',
            });
          });
      },
    );
  };
}

// Singleton
const Fetch = new FetchInstance();

export default Fetch;
