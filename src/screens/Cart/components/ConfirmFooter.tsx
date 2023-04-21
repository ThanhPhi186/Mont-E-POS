import Theme from '@/Colors';
import DynamicInput from '@/components/DynamicInput';
import ModalBottomSheet from '@/components/ModalBottomSheet';
import SubmitButton from '@/components/SubmitButton';
import {height} from '@/global';
import {
  addDiscount,
  completeOrder,
  fetchOrderDetail,
  getMaximumDiscount,
  holdOrder,
} from '@/store/order/api';
import {IOrderDetail} from '@/store/order/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext} from '../CartConext';

const Wrapper = styled.View`
  padding: 0px 0px 24px;
  border-top-width: 1px;
  border-top-color: ${p => p.theme.border};
  background-color: ${p => p.theme.backgroundInput};
`;

const SSubmitButton = styled(SubmitButton)`
  width: 48%;
`;
const SHoldButton = styled(SubmitButton)`
  width: 48%;
  border: 2px solid #007aff;
  background-color: #fff;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const SBtnAddDiscount = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 24px;
  /* margin-top: 8px; */
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #363636;
`;

const Value = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #1c1c1e;
`;

const Column = styled.View`
  height: 0.5px;
  background-color: ${p => p.theme.border};
`;

const WrapperModal = styled.View`
  padding: 0px 16px;
  height: ${height * 0.8};
`;

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const SPaymentButton = styled(SubmitButton)`
  margin-top: 12px;
`;

const TxtAdd = styled.Text<{promo: number}>`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${p => (p.promo ? '#34C759' : '#007aff')};
`;

const SWrapperTotal = styled(Row)`
  padding: 12px 24px;
`;
const SGroupBtn = styled(Row)`
  padding: 0 24px;
`;

const ConfirmFooter = memo(
  ({
    total,
    promo,
    order,
  }: {
    total: number;
    vat: number;
    promo: number;
    order: IOrderDetail;
  }) => {
    const {setProducts, setCustomer, setOrderTentative, clearOrder} =
      useContext(CartContext);

    const [money, setMoney] = useState('0');
    const [backAmount, setBackAmount] = useState('0');
    const [discount, setDiscount] = useState('0');
    const [maxDiscount, setMaxDiscount] = useState('0');
    const [message, setMessage] = useState('');
    const [messageMoney, setMessageMoney] = useState('');

    const modalSelectRef = useRef<any>(null);
    const modalDiscountRef = useRef<any>(null);

    const {orderId} = order;

    const onChangeMoney = e => {
      setMoney(e);
      const formatted = e.replace(/,/g, '');
      if (Number(formatted) > total) {
        const calculate = Math.round(Number(formatted) - total);
        setBackAmount(calculate.toString());
      } else {
        setBackAmount('0');
      }
    };

    const onChangeDiscount = e => {
      setDiscount(e);
    };

    const onConfirmPress = useCallback(async () => {
      if (Number(money.replace(/,/g, '')) < total) {
        setMessageMoney('Số tiền khách trả không hợp lệ');
        return;
      }
      modalSelectRef.current.close();
      global.showLoading();
      const result = await completeOrder(orderId);
      global.hideLoading();
      modalSelectRef.current.close();
      if (!result?.orderCompleted) return;
      global.showMessage('Tạo đơn thành công');
      clearOrder();
      Actions.pop();
    }, [orderId, order, money]);

    const onAddDiscountPress = async () => {
      const formatDiscount = discount.replace(/,/g, '');
      if (Number(formatDiscount) > Number(maxDiscount)) {
        setMessage(
          `Chiết khấu không được lớn hơn ${getLocaleNumber(maxDiscount)}`,
        );
      } else {
        const resAddDiscount = await addDiscount(
          orderId,
          Number(formatDiscount),
        );
        modalDiscountRef.current.close();
        if (resAddDiscount) {
          const resOrderDetail = await fetchOrderDetail(orderId);
          resOrderDetail && Actions.refresh({order: resOrderDetail});
        }
      }
    };

    const onHoldOrder = async () => {
      global.showLoading();
      const heldOrder = await holdOrder(orderId);
      global.hideLoading();
      if (heldOrder) {
        global.showMessage('Đơn hàng được giữ thành công');
        clearOrder();
        Actions.pop();
      }
    };

    const onOpenModalHold = useCallback(() => {
      global.showAlert({
        title: 'Giữ đơn hàng',
        description: 'Bạn có muốn giữ đơn hàng này không?',
        textCancel: 'Hủy',
        textNext: 'Giữ đơn',
        onNext: () => onHoldOrder(),
      });
    }, []);

    useEffect(() => {
      const getMaxDiscount = async () => {
        const resMaxDiscount = await getMaximumDiscount();
        setMaxDiscount(resMaxDiscount);
      };
      getMaxDiscount();
    }, []);

    useEffect(() => {
      messageMoney && setMessageMoney('');
    }, [money]);

    useEffect(() => {
      message && setMessage('');
    }, [discount]);

    return (
      <Wrapper>
        <SBtnAddDiscount onPress={() => modalDiscountRef.current.open()}>
          <Label>Chiết khấu</Label>
          <TxtAdd promo={promo}>
            {promo ? `${getLocaleNumber(promo)} đ` : 'Thêm'}
          </TxtAdd>
        </SBtnAddDiscount>
        <Column />
        <SWrapperTotal>
          <Label>Tổng thanh toán</Label>
          <Value>{getLocaleNumber(total)} đ</Value>
        </SWrapperTotal>

        <SGroupBtn>
          <SHoldButton
            text="Giữ đơn"
            onPress={onOpenModalHold}
            textColor={Theme.blue2}
          />
          <SSubmitButton
            text="Thanh toán"
            onPress={() => modalSelectRef.current.open()}
          />
        </SGroupBtn>
        <ModalBottomSheet title="Thanh toán đơn hàng" ref={modalSelectRef}>
          <WrapperModal>
            <SDynamicInput
              label={'Hình thức thanh toán'}
              textInputProps={{value: 'Tiền mặt', editable: false}}
              inputTheme="dark"
            />
            <SDynamicInput
              label={'Tổng tiền đơn hàng'}
              placeholderStr={getLocaleNumber(total)}
              textInputProps={{editable: false}}
              inputTheme="dark"
            />
            <SDynamicInput
              label={'Số tiền nhận'}
              required
              placeholderStr="0"
              onChangeText={onChangeMoney}
              validateMessage={messageMoney}
              textInputProps={{value: money, keyboardType: 'number-pad'}}
              inputTheme="dark"
              currency
            />
            <SDynamicInput
              label={'Số tiền trả lại'}
              placeholderStr={getLocaleNumber(backAmount)}
              textInputProps={{editable: false}}
              inputTheme="dark"
            />
            <SPaymentButton text="Thanh toán" onPress={onConfirmPress} />
          </WrapperModal>
        </ModalBottomSheet>
        <ModalBottomSheet title="Chiết khấu" ref={modalDiscountRef}>
          <WrapperModal>
            <SDynamicInput
              label={`Số tiền chiết khấu <= ${getLocaleNumber(maxDiscount)}`}
              placeholderStr="0"
              onChangeText={onChangeDiscount}
              textInputProps={{value: discount, keyboardType: 'number-pad'}}
              validateMessage={message}
              inputTheme="dark"
              currency
            />
            <SPaymentButton text="Hoàn tất" onPress={onAddDiscountPress} />
          </WrapperModal>
        </ModalBottomSheet>
      </Wrapper>
    );
  },
);

export default ConfirmFooter;

const styles = {
  border: {
    borderTopWidth: 1,
    borderTopColor: '#e7e7e7',
    paddingTop: 12,
  },
};
