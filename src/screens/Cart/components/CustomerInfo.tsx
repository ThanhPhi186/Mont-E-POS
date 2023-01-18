import {NormalText} from '@/components/TextCommon';
import {ICustomer} from '@/store/customers/types';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View``;

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
  padding: 12px 16px;
  background-color: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  margin-top: 12px;
`;
const Column = styled.View`
  flex: 1;
`;

const Value = styled(NormalText)`
  color: #1c1c1e;
`;

const CustomerInfo = memo(({item}: {item: ICustomer}) => {
  return (
    <Wrapper>
      <Value>Khách hàng</Value>
      <Row>
        <Column>
          <Name>{item.fullName}</Name>
          <Address>{item.contactNumber}</Address>
        </Column>
      </Row>
    </Wrapper>
  );
});

export default CustomerInfo;
