import * as React from 'react';
import {Lightbox, Router, Scene} from 'react-native-router-flux';

// import Preload from '@/screens/Preload';
import Tabbar from './tabbar';
import Preload from '@/screens/Preload';
import LoginScreen from '@/screens/Auth/LoginScreen';
import InputCompanyScreen from '@/screens/Auth/InputCompanyScreen';
import SelectSaleChannelScreen from '@/screens/Auth/SelectSaleChannelScreen';
import SelectCustomerScreen from '@/screens/Customers/SelectCustomerScreen';
import CreateOrder from '@/screens/Cart/CreateOrder';
import SelectProductScreen from '@/screens/Product/SelectProductScreen';
import ConfirmOrderScreen from '@/screens/Cart/ConfirmOrder';
import SelectListPromotion from '@/screens/Promotion/SelectListPromotion';
import OrderSuccessScreen from '@/screens/Cart/OrderSuccess';
import PromotionDetail from '@/screens/Promotion/PromotionDetail';
import ListPromotionScreen from '@/screens/Promotion/ListPromotionScreen';
import AddCustomerScreen from '@/screens/Customers/AddCustomerScreen';
import RecommendedCustomerScreen from '@/screens/Customers/RecommendedCustomerScreen';
import ListOrderScreen from '@/screens/Order/ListOrderScreen';
import RecommendedDetailScreen from '@/screens/Customers/RecommendedDetailScreen';
import OrderDetailScreen from '@/screens/Order/OrderDetailScreen';
import ListProductScreen from '@/screens/Product/ListProductScreen';
import ListPriceChangeScreen from '@/screens/PriceChange/ListPriceChangeScreen';
import StatisticRevenue from '@/screens/StatisticRevenue';
import StatisticDetail from '@/screens/StatisticRevenue/StatisticDetail';
import CheckInOut from '@/screens/Checkin-out/CheckInOut';
import ChangePasswordScreen from '@/screens/Account/ChangePassword';
import OrderCommissionScreen from '@/screens/Commission/OrderCommissionScreen';
import DetailCustomerScreen from '@/screens/Customers/DetailCustomerScreen';
import ProductDetailScreen from '@/screens/Product/ProductDetailScreen';
import QRScanScreen from '@/screens/QRScan/QRScanScreen';
import ReturnOrderDetailScreen from '@/screens/ReturnOrder/ReturnOrderDetailScreen';
import ListReturnOrderScreen from '@/screens/ReturnOrder/ListReturnOrderScreen';
import CreateReturnOrderScreen from '@/screens/Order/CreateReturnOrderScreen';
import ListHoldOrderScreen from '@/screens/HoldOrder/ListHoldOrderScreen';
import CompanyRegister from '@/screens/Auth/CompanyRegister';
import {DeleteAccountScreen} from '@/screens/Account/DeleteAccountScreen';

const Routes = React.memo(() => {
  return (
    <Router>
      <Lightbox>
        <Scene key={'root'} path="root">
          <Scene key="preload" component={Preload} hideNavBar={true} />
          <Scene key="login_screen" component={LoginScreen} hideNavBar={true} />
          {/* <Scene
            key="input_company_screen"
            component={InputCompanyScreen}
            hideNavBar={true}
          /> */}
          <Scene
            key="select_sale_channel"
            component={SelectSaleChannelScreen}
            hideNavBar={true}
          />
          <Scene
            key="company_register"
            component={CompanyRegister}
            hideNavBar={true}
          />
          {/* <Scene key="pages" hideNavBar component={WebViewScreen} /> */}
        </Scene>
        <Scene key={'main'} path="main">
          {Tabbar}
          <Scene
            key="select_customer"
            component={SelectCustomerScreen}
            hideNavBar={true}
          />
          <Scene key="create_order" component={CreateOrder} hideNavBar={true} />
          <Scene
            key="select_product_screen"
            component={SelectProductScreen}
            hideNavBar={true}
          />
          <Scene
            key="select_customer_screen"
            component={SelectCustomerScreen}
            hideNavBar={true}
          />
          <Scene
            key="confirm_order_screen"
            component={ConfirmOrderScreen}
            hideNavBar={true}
          />
          <Scene
            key="select_promotion_screen"
            component={SelectListPromotion}
            hideNavBar={true}
          />
          <Scene
            key="order_success_screen"
            component={OrderSuccessScreen}
            hideNavBar={true}
          />
          <Scene
            key="list_promotion_screen"
            component={ListPromotionScreen}
            hideNavBar={true}
          />
          <Scene
            key="promotion_detail_screen"
            component={PromotionDetail}
            hideNavBar={true}
          />
          <Scene
            key="add_customer_screen"
            component={AddCustomerScreen}
            hideNavBar={true}
          />
          <Scene
            key="recommended_customer_screen"
            component={RecommendedCustomerScreen}
            hideNavBar={true}
          />
          <Scene
            key="recommended_detail_screen"
            component={RecommendedDetailScreen}
            hideNavBar={true}
          />
          <Scene
            key="order_detail_screen"
            component={OrderDetailScreen}
            hideNavBar={true}
          />
          <Scene
            key="list_product_screen"
            component={ListProductScreen}
            hideNavBar={true}
          />
          <Scene
            key="list_change_price_screen"
            component={ListPriceChangeScreen}
            hideNavBar={true}
          />
          <Scene
            key="statistic_revenue_screen"
            component={StatisticRevenue}
            hideNavBar={true}
          />
          <Scene
            key="statistic_detail_screen"
            component={StatisticDetail}
            hideNavBar={true}
          />
          <Scene
            key="checkIn_checkOut"
            component={CheckInOut}
            hideNavBar={true}
          />
          <Scene
            key="change_password_screen"
            component={ChangePasswordScreen}
            hideNavBar={true}
          />
          <Scene
            key="order_commission"
            component={OrderCommissionScreen}
            hideNavBar={true}
          />
          <Scene
            key="detail_customer"
            component={DetailCustomerScreen}
            hideNavBar={true}
          />
          <Scene
            key="product_detail_screen"
            component={ProductDetailScreen}
            hideNavBar={true}
          />
          <Scene key="qr_scan" component={QRScanScreen} hideNavBar={true} />
          <Scene
            key="list_return_order_screen"
            component={ListReturnOrderScreen}
            hideNavBar={true}
          />
          <Scene
            key="return_order_detail_screen"
            component={ReturnOrderDetailScreen}
            hideNavBar={true}
          />
          <Scene
            key="list_order_screen"
            component={ListOrderScreen}
            hideNavBar={true}
          />
          <Scene
            key="create_return_order_screen"
            component={CreateReturnOrderScreen}
            hideNavBar={true}
          />
          <Scene
            key="hold_order_screen"
            component={ListHoldOrderScreen}
            hideNavBar={true}
          />
          <Scene
            key="delete_account_screen"
            component={DeleteAccountScreen}
            hideNavBar={true}
          />
        </Scene>
      </Lightbox>
    </Router>
  );
});

export default Routes;
