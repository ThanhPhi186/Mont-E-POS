import CustomerItem from '@/components/CustomerItem';
import Icons from '@/Icons';
import {ICustomer} from '@/store/customers/types';
import React, {memo, useCallback, useContext} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext} from '../CartConext';

const Wrapper = styled.View``;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  margin-top: 12px;
`;

const HighlightText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  flex: 1;
  color: #1c1c1e;
`;

const Label = styled.Text``;
const Icon = styled.Image``;

const CustomerSection = memo(({disabled = false}: {disabled?: boolean}) => {
  const {customer, setCustomer} = useContext(CartContext);
  const onSelectCustomer = useCallback(
    (newCustomer: ICustomer) => {
      setCustomer(newCustomer);
      Actions.pop();
    },
    [setCustomer],
  );
  return (
    <Wrapper>
      {customer ? (
        <CustomerItem
          disabled={disabled}
          key={`${customer.checkInOk}${customer.checkOutOk}`}
          item={customer}
          onItemPress={() =>
            Actions.push('select_customer_screen', {onSelectCustomer})
          }
          type={'edit'}
        />
      ) : (
        <Button
          onPress={() =>
            Actions.push('select_customer_screen', {onSelectCustomer})
          }>
          <HighlightText>Chọn khách hàng</HighlightText>
          <Icon source={Icons.icArrowRight24} />
        </Button>
      )}
    </Wrapper>
  );
});

export default CustomerSection;
