import {STORE_KEY} from '@/constants/variableConstant';
import Fetch from '@/services/Fetch';
import {setStringItem} from '@/services/storage/AsyncStorageService';
import {Actions} from 'react-native-router-flux';

export const listProfileItem = [
  {
    icon: require('@/assets/profile/icon-change-company.png'),

    title: 'Thay đổi công ty',
    screen: 'change_company_screen',
    onItemPress: () => {
      global.showAlert({
        title: 'Xác nhận',
        description: 'Bạn đang muốn đổi công ty?',
        textNext: 'Tiếp tục',
        textCancel: 'Bỏ qua',
        onNext: () => {
          setStringItem(STORE_KEY.COMPANY_CODE, '');
          setStringItem(STORE_KEY.CURRENT_DOMAIN, '');
          Fetch.company_code = '';
          Fetch.api_key = '';
          Actions.reset('root');
        },
      });
    },
  },

  {
    icon: require('@/assets/profile/icon-change-password.png'),
    title: 'Đổi mật khẩu',
    screen: 'change_password_screen',
  },
];
