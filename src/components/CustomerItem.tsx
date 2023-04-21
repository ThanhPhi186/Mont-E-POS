import Icons from '@/Icons';
import {ICustomer} from '@/store/customers/types';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  margin-top: 12px;
  padding: 12px 16px;
  background-color: ${p => p.theme.backgroundInput};
  border-radius: 12px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #1c1c1e;
`;

const Address = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Column = styled.View`
  flex: 1;
`;

const RightIcon = styled.Image`
  margin-left: 12px;
`;

const CustomerItem = memo(
  ({
    item,
    onItemPress,
    type,
  }: {
    item: ICustomer;
    onItemPress?: (item: ICustomer) => void;
    type?: 'edit' | 'select';
    disabled?: boolean;
  }) => {
    return (
      <Wrapper
        disabled={!onItemPress}
        onPress={() =>
          onItemPress?.({
            ...item,
          })
        }>
        <Row>
          <Column>
            <Name>{item.fullName}</Name>
            <Address numberOfLines={1}>{item.fullAddress}</Address>
            <Address>{item.telecomNumber || item.contactNumber}</Address>
          </Column>
          <RightIcon
            source={type === 'edit' ? Icons.icEdit : Icons.icArrowRight24}
          />
        </Row>
      </Wrapper>
    );
  },
);

export default CustomerItem;
