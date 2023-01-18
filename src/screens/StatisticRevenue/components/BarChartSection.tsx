import {NormalText} from '@/components/TextCommon';
import React, {memo} from 'react';
import styled from 'styled-components/native';
import {BarChart} from 'react-native-chart-kit';
import Theme from '@/Colors';
import {useNavigationParams} from '@/hooks/navigation';
import {IReportDetail} from '@/store/report/type';
import {widthScreen} from '@/utils/Tranform';
const Wrapper = styled.View`
  background: ${p => p.theme.backgroundInput};
  border-radius: 12px;
  padding: 12px 16px;
  margin-top: 16px;
`;

const Label = styled(NormalText)`
  margin-bottom: 12px;
`;

const BarchartSection = memo(() => {
  const {detail} = useNavigationParams<{detail: IReportDetail}>();
  if (detail.reports.length === 0) return null;
  return (
    <Wrapper>
      <Label>Doanh số theo tháng</Label>
      <BarChart
        data={{
          labels: detail.reports.map(item => item.monthString),
          datasets: [
            {
              data: detail.reports.map(item => item.grandTotal || 0),
            },
          ],
        }}
        width={widthScreen - 48 - 32}
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        yLabelsOffset={10}
        chartConfig={{
          backgroundColor: '#f2f2f7',
          backgroundGradientFrom: '#f2f2f7',
          backgroundGradientTo: '#f2f2f7',
          color: () => Theme.blue2,
          strokeWidth: 3,
          decimalPlaces: 0,
          formatYLabel: label => {
            const n = Number(label);
            const Mil = Number((n / 1000000).toFixed(2));
            const K = Number((n / 1000).toFixed(2));
            console.log('Mil', Mil);
            return Mil >= 1 ? `${Mil}tr` : K > 1 ? `${K}K` : label;
          },
        }}
      />
    </Wrapper>
  );
});

export default BarchartSection;
