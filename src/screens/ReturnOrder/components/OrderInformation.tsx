import {getLocaleNumber} from '@/utils/convertString';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  margin-top: 16px;
`;

const Container = styled.View`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  padding: 12px 0px;
  margin-top: 12px;
  padding-top: 8px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
  padding: 0 16px;
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

const Footer = styled(Row)`
  margin-top: 12px;
  padding-top: 12px;
  border-top-width: 1px;
  border-top-color: #e5e5ea;
`;

const HighLight = styled(NormalText)`
  font-weight: 700;
  color: #363636;
`;

const OrderInformation = memo(
  ({
    grandTotal,
    orderId,
    returnId,
  }: {
    grandTotal: number;
    orderId: string;
    returnId: string;
  }) => {
    return (
      <Wrapper>
        <Value style={{textAlign: 'left', marginLeft: 0}}>
          Thông tin đơn hoàn
        </Value>
        <Container>
          <Row>
            <Label>Mã đơn hoàn:</Label>
            <Value>{returnId}</Value>
          </Row>
          <Row>
            <Label>Mã đơn mua:</Label>
            <Value>{orderId}</Value>
          </Row>

          <Footer>
            <Value style={{textAlign: 'left', marginLeft: 0}}>Tổng đơn</Value>
            <HighLight>{getLocaleNumber(grandTotal)}</HighLight>
          </Footer>
        </Container>
      </Wrapper>
    );
  },
);
export default OrderInformation;
