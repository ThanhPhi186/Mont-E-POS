import Account from '@/screens/Account';
import Contact from '@/screens/Contact';
import SelectCustomerScreen from '@/screens/Customers/SelectCustomerScreen';
import Home from '@/screens/Home';
import ShareTab from '@/screens/Share';
import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import BottomBar from './MainBottomBar';

const Tabbar = (
  <Scene key="main_tab" tabBarComponent={BottomBar} tabs hideNavBar>
    <Scene
      key="home_tab"
      component={Home}
      hideNavBar
      tabTitle="Trang chủ"
      icon={require('@/assets/navigation/icon-home.png')}
      backgroundColor="transparent"
    />
    <Scene
      key="contact_tab"
      component={Contact}
      hideNavBar
      tabTitle="Liên hệ"
      icon={require('@/assets/navigation/icon-contact.png')}
      backgroundColor="transparent"
    />
    <Scene
      key="create_cart"
      component={SelectCustomerScreen}
      hideNavBar
      icon={require('@/assets/navigation/icon_tabbar_qr.png')}
      backgroundColor="transparent"
      tabBarOnPress={() => {
        Actions.push('qr_scan', {});
      }}
    />
    <Scene
      key="share_tab"
      component={ShareTab}
      hideNavBar
      tabTitle="Chia sẻ"
      icon={require('@/assets/navigation/icon-share.png')}
      backgroundColor="transparent"
    />
    <Scene
      key="account_tab"
      component={Account}
      hideNavBar
      tabTitle="Cá nhân"
      icon={require('@/assets/navigation/icon-account.png')}
      backgroundColor="transparent"
    />
  </Scene>
);

export default Tabbar;
