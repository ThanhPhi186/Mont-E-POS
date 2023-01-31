import {STORE_KEY} from '@/constants/variableConstant';
import errorHandler from '@/services/ErrorHandler';
import Fetch from '@/services/Fetch';
import {setStringItem} from '@/services/storage/AsyncStorageService';
import {ILoginResponse} from './type';

export async function postLogin(username: string, password: string) {
  try {
    const {
      data: {userInfo, apiKey, forcePasswordChange},
    } = await Fetch.post<ILoginResponse>('@api-common/login', {
      username,
      password,
    });
    Fetch.api_key = apiKey;
    setStringItem(STORE_KEY.API_KEY, apiKey);
    return {data: userInfo};
  } catch (error: any) {
    let errorMess = errorHandler(error).getMessage();
    if (
      errorMess.includes(
        `Authenticate failed for user ${username} because account is disabled`,
      )
    ) {
      errorMess = `No account found for username ${username}\nCannot get property 'passwordHashType' on null object\n`;
    }

    return {message: errorMess};
  }
}

export async function updatePassword({
  oldPassword,
  newPassword,
  newPasswordVerify,
}: {
  oldPassword: string;
  newPassword: string;
  newPasswordVerify: string;
}) {
  try {
    const {data} = await Fetch.post<{
      updateSuccessful: boolean;
      passwordIssues: boolean;
      messages: string;
    }>(`@api/user/updatePassword`, {
      oldPassword,
      newPassword,
      newPasswordVerify,
    });

    let dataMess = data.messages;

    if (dataMess.includes('Password incorrect for user')) {
      dataMess = 'Mật khẩu cũ không đúng';
    }
    if (dataMess.includes('Found issues with password so not')) {
      dataMess = 'Tìm thấy lỗi trong mật khẩu, không thể cập nhật mật khẩu mới';
    }
    if (dataMess.includes('Password updated for user')) {
      dataMess = 'Cập nhật mật khẩu thành công';
    }

    global.showMessage(dataMess);
    return data;
  } catch (error: any) {
    console.log('error', error);

    global.showMessage(
      'Tìm thấy lỗi trong mật khẩu, không thể cập nhật mật khẩu mới',
    );
    return {updateSuccessful: false};
  }
}

export async function checkCompany(key: string) {
  try {
    const {
      data: {domain},
    } = await Fetch.get<{domain: string}>(`https://api.olbius.com/token`, {
      params: {
        key,
      },
    });
    return domain;
  } catch (error) {
    return '';
  }
}

export async function deleteAccount(username: string, password: string) {
  try {
    const {data} = await Fetch.post<{success: boolean}>(
      '@api/user/deleteAccount',
      {
        username,
        password,
      },
    );
    return data;
  } catch (error: any) {
    const message = errorHandler(error).getMessage();

    global.showMessage(message);
    return {success: false};
  }
}
