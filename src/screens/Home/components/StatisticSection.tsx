import Theme from '@/Colors';
import ListLoading from '@/components/ListLoading';
import { useNavigationParams } from '@/hooks/navigation';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import Fetch from '@/services/Fetch';
import { useMe } from '@/store/auth';
import { fetchListStatistic } from '@/store/report/api';
import { IReportItem } from '@/store/report/type';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import StatisticChart from './StatisticChart';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  margin: 24px;
  margin-bottom: 0px;
`;

const Label = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
  flex: 1;
`;

const Value = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${p => p.theme.blue2};
`;

const listItem = [
  {
    color: Theme.blueMain,
    label: 'Đã duyệt',
  },
  {
    color: Theme.green,
    label: 'Hoàn thành',
  },
  {
    color: Theme.orange,
    label: 'Hủy',
  },
];

const Dot = styled.View<{ color: string }>`
  background-color: ${p => p.color};
  width: 8px;
  height: 8px;
  border-radius: 8;
`;
const DefineLabel = styled.Text`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  margin-left: 4px;
  color: #aeaeb2;
`;

const RowDefine = () => {
  return (
    <Row style={{ marginTop: 8 }}>
      {listItem.map((item, index) => (
        <Row key={index.toString()} style={{ marginRight: 16 }}>
          <Dot color={item.color} />
          <DefineLabel>{item.label}</DefineLabel>
        </Row>
      ))}
    </Row>
  );
};

const StatisticSection = memo(function () {
  const { random } = useNavigationParams();

  const [data, setData] = useState<IReportItem[] | null>(null);

  const getData = useCallback(async () => {
    const results = await fetchListStatistic();
    setData(results);
  }, []);

  useEffect(() => {
    getData();
  }, [random]);

  return (
    <Wrapper>
      <Row>
        <Label>Thống kê doanh số</Label>
        <Value onPress={() => Actions.push('statistic_revenue_screen')}>
          Chi tiết
        </Value>
      </Row>
      <RowDefine />
      {data ? <StatisticChart data={data} /> : <ListLoading loading />}
    </Wrapper>
  );
});

export default StatisticSection;
