import {NormalText} from '@/components/TextCommon';
import {fetchReportDetail} from '@/store/report/api';
import {IReportStatisticItem} from '@/store/report/type';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 12px;
`;

const Name = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: rgb(28, 28, 30);
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const Label = styled(NormalText)``;

const Value = styled(NormalText)`
  font-weight: 700;
`;

const StatisticItem = memo(({item}: {item: IReportStatisticItem}) => {
  const onItemPress = useCallback(async () => {
    global.showLoading();
    const data = await fetchReportDetail(item.partyId);
    global.hideLoading();
    data && Actions.push('statistic_detail_screen', {detail: data});
  }, []);
  return (
    <Wrapper onPress={onItemPress}>
      <Name>{item.partyName}</Name>
      <Row>
        <Label>Đơn hoàn thành:</Label>
        <Value>{item.numberOrders}</Value>
      </Row>
      <Row>
        <Label>Doanh thu:</Label>
        <Value>{getLocaleNumber(item.grandTotal)} đ</Value>
      </Row>
    </Wrapper>
  );
});

export default StatisticItem;
