import React, {useEffect} from 'react';
import Routes from '@/routers';
import ThemeProvider from '@/components/ThemeProvider';
import {Alert, Linking, Platform, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from '@/store';
import LoadingModal from '@/components/GlobalModal/LoadingModal';
import AppMessage from '@/components/GlobalModal/AppMessage';
import '@/global';
import AlertPopup from '@/components/GlobalModal/AlertPopup';
import VersionCheck from 'react-native-version-check';
import {CartProvider} from '@/screens/Cart/CartConext';

function AppHookContent() {
  return (
    <>
      <Routes />
      <LoadingModal />
      <AlertPopup />
      <AppMessage />
    </>
  );
}

const App = () => {
  const openAppStore = () => {
    let link = '';

    if (Platform.OS === 'ios') {
      link = 'https://apps.apple.com/vn/app/mont-e-sales/id1600641850';
    } else {
      link = 'https://play.google.com/store/apps/details?id=com.montesales';
    }

    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.log(err),
    );
  };

  const checkUpdateVersion = async () => {
    try {
      VersionCheck.needUpdate({
        depth: 2,
      }).then(res => {
        if (res?.isNeeded) {
          Alert.alert(
            'Thông báo',
            'Đã có bản nâng cấp trên kho ứng dụng. Vui lòng cài đặt phiên bản mới nhất để sử dụng!',
            [{text: 'OK', onPress: openAppStore}],
          );
        }
      });
    } catch (error) {
      global.showMessage(error);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent', false);
    }
    StatusBar.setBarStyle('dark-content');
    checkUpdateVersion();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <CartProvider>
          <AppHookContent />
        </CartProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
