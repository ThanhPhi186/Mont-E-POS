import Theme from '@/Colors';
import {NormalText} from '@/components/TextCommon';
import {TOrderType} from '@/constants/variableConstant';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import PieChart from 'react-native-pie-chart';

const Wrapper = styled.View`
  margin-top: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Container = styled(Row)`
  margin-top: 12px;
  padding: 12px 16px;
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #1c1c1e;
`;

const HighLight = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: #1c1c1e;
`;

const TotalValue = styled.Text`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: ${p => p.theme.blue2};
`;

const Column = styled.View`
  flex: 1;
`;

const Dot = styled.View<{color: string}>`
  background-color: ${p => p.color};
  width: 12px;
  height: 12px;
  border-radius: 8;
`;

const Label = styled(NormalText)`
  margin-left: 4px;
`;

const colors = {
  OrderApproved: Theme.blue2,
  OrderCompleted: Theme.green,
  OrderCancelled: Theme.orange,
};

const TotalOrder = memo(
  ({
    totalOrder,
    results,
  }: {
    totalOrder: number;
    results: {
      numberOrders: number;
      statusId: TOrderType;
      statusDesc: string;
    }[];
  }) => {
    const series = results.map(item => item.numberOrders);
    const sliceColor = results.map(item => colors[item.statusId]);

    return (
      <Wrapper>
        <Title>Thống kê số đơn hàng</Title>
        <Container>
          <Column>
            <HighLight>Tổng số đơn:</HighLight>
            <TotalValue>{totalOrder}</TotalValue>
            {results.map((item, index) => (
              <Row key={index.toString()} style={{marginTop: 4}}>
                <Dot color={colors[item.statusId]} />
                <Label>
                  {item.statusDesc}: {item.numberOrders}
                </Label>
              </Row>
            ))}
          </Column>
          <Column style={{alignItems: 'flex-end'}}>
            <PieChart
              widthAndHeight={120}
              series={series}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.5}
              coverFill={'#FFF'}
            />
          </Column>
        </Container>
      </Wrapper>
    );
  },
);

export default TotalOrder;
