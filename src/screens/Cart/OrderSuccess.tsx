import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import SVGIcon from '@/Icons/SVGIcon';
import {IOrderDetail} from '@/store/order/type';
import React, {memo} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  text-align: center;

  color: #000000;
  margin-top: 12px;
`;

const SSubmitButton = styled(SubmitButton)`
  margin-top: 12px;
  width: 100%;
`;

const OrderSuccessScreen = memo(({order}: {order: IOrderDetail}) => {
  const backToHome = () => {
    Actions.popTo('_home_tab');
    Actions.popTo('_contact_tab');
    Actions.popTo('_share_tab');
    Actions.popTo('_account_tab');
  };
  return (
    <ScreenWithTitle title="Tạo đơn thành công" onPressBack={backToHome}>
      <Wrapper>
        <SVGIcon name="item-order-success" />
        <Text>
          Tuyệt vời!{'\n'}
          Bạn vừa tạo đơn hàng thành công!
        </Text>
        <SSubmitButton
          text="Xem chi tiết đơn hàng"
          style={{marginTop: 36}}
          onPress={() => {
            Actions.replace('order_detail_screen', {
              order,
              onPressBack: backToHome,
            });
          }}
        />
        <SSubmitButton
          text="Quay lại trang chủ"
          type="light-line"
          onPress={backToHome}
        />
      </Wrapper>
    </ScreenWithTitle>
  );
});

export default OrderSuccessScreen;
