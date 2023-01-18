import {ICustomer} from '@/store/customers/types';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  margin-top: 16px;
`;

const Container = styled.View`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 12px;
  padding-top: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

const NormalText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #8e8e93;
`;

const Label = styled.Text`
  width: 114px;
`;

const Value = styled(NormalText)`
  color: #1c1c1e;
  margin-left: 8px;
  flex: 1;
  text-align: right;
`;

const CustomerSection = memo(
  ({
    customer,
    contactNumber = false,
  }: {
    customer: ICustomer;
    contactNumber: boolean;
  }) => {
    return (
      <Wrapper>
        <Value style={{textAlign: 'left', marginLeft: 0}}>
          Thông tin khách hàng
        </Value>
        <Container>
          <Row>
            <Label>Khách hàng:</Label>
            <Value>{customer.fullName}</Value>
          </Row>
          <Row>
            <Label>Số điện thoại:</Label>
            <Value>
              {contactNumber ? customer.contactNumber : customer.telecomNumber}
            </Value>
          </Row>
        </Container>
      </Wrapper>
    );
  },
);
export default CustomerSection;
