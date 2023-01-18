import Theme from '@/Colors';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import Fetch from '@/services/Fetch';
import { useMe } from '@/store/auth';
import { IReportItem, IReportStatusItem } from '@/store/report/type';
import { randomInt } from '@/utils/random';
import moment from 'moment';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

const Container = styled.View``;

const Wrapper = styled.View`
  height: 90px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const ReportWrapper = styled.View`
  flex-direction: column-reverse;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #81858f;
  margin-top: 4px;
`;

const Line = styled.View<{ background: string; height: number }>`
  width: 8px;
  background-color: ${p => p.background};
  margin-right: 2px;
  height: ${p => p.height}px;
`;

const LineRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const colors = {
  OrderApproved: Theme.blueMain,
  OrderCompleted: Theme.green,
  OrderCancelled: Theme.orange,
};

const UnitColumn = styled.View`
  width: 36px;
  height: 100%;
  flex-direction: column-reverse;
  padding-bottom: 10px;
  padding-top: 4px;
  justify-content: space-between;
`;

const UnitText = styled.Text`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #aeaeb2;
`;

const LineChart = styled.View`
  border: 0.5px dashed #e5e5ea;
`;

const LineChartWrapper = styled.View`
  position: absolute;
  z-index: -1;
  left: 36px;
  right: 0px;
  bottom: 15px;
  opacity: 0.7;
  height: 64px;
  justify-content: space-between;
`;

const ReportItem = memo(
  ({
    max,
    item,
    index,
    unit,
  }: {
    max: number;
    item: IReportItem;
    index: number;
    unit;
  }) => {
    return (
      <ReportWrapper>
        <Label style={{ opacity: index % 2 === 0 ? 1 : 0 }}>
          {moment(item.dateString, 'YYYY-MM-DD').format('DD MMM')}
        </Label>
        <LineRow>
          {item.reports.map((itemStatus, idx) => (
            <Line
              key={idx.toString()}
              background={colors[itemStatus.statusId]}
              height={(itemStatus.grandTotal / unit / max) * 66 || 2}
            />
          ))}
        </LineRow>
      </ReportWrapper>
    );
  },
);

const StatisticChart = memo(function ({ data }: { data: IReportItem[] }) {
  const maxOfItem = useMemo(() => {
    let max = 0;
    data.map(report =>
      report.reports.map(statusItem => {
        statusItem.grandTotal > max && (max = statusItem.grandTotal);
      }),
    );
    return Math.ceil(max * 1.2);
  }, [data]);
  const unit = maxOfItem > 10000000 ? 1000000 : 1000;
  const finalValue = Math.ceil(maxOfItem / unit);
  const div = Math.ceil(finalValue / 4);

  return (
    <Container>
      <Wrapper>
        <UnitColumn>
          <UnitText>0</UnitText>
          <UnitText>{div}</UnitText>
          <UnitText>{div * 2}</UnitText>
          <UnitText>{div * 3}</UnitText>
          {finalValue >= 4 && <UnitText>{finalValue}</UnitText>}
        </UnitColumn>
        {data.map((item, index) => (
          <ReportItem
            key={index.toString()}
            item={item}
            max={finalValue}
            index={index}
            unit={unit}
          />
        ))}
        <LineChartWrapper>
          <LineChart />
          <LineChart />
          <LineChart />
          <LineChart />
          {finalValue >= 4 && <LineChart />}
        </LineChartWrapper>
      </Wrapper>
      <UnitText style={{ marginTop: 8 }}>
        Đơn vị: {unit > 1000 ? 'Triệu' : 'Nghìn'} đồng
      </UnitText>
    </Container>
  );
});

export default StatisticChart;
