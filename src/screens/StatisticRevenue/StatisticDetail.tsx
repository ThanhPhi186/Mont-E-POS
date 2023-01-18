import ScreenWithTitle from '@/components/ScreenWithTitle';
import { useNavigationParams } from '@/hooks/navigation';
import { IReportDetail } from '@/store/report/type';
import React, { memo } from 'react';
import styled from 'styled-components/native';
import BarchartSection from './components/BarChartSection';
import CustomerInformation from './components/CustomerInformation';
import TotalRow from './components/TotalRow';

const Wrapper = styled.View`
  flex: 1;
`;

const Container = memo(() => {
  const { detail } = useNavigationParams<{ detail: IReportDetail }>();

  return (
    <Wrapper>
      <CustomerInformation />
      <TotalRow
        grandTotal={detail.grandTotal}
        revShare={detail.numberOrders}
        revShareUnit=" "
        revShareLabel="Đơn hoàn thành"
      />
      <BarchartSection />
    </Wrapper>
  );
});

const StatisticDetail = () => {
  return (
    <ScreenWithTitle title="Chi tiết doanh số KH">
      <Container />
    </ScreenWithTitle>
  );
};

export default StatisticDetail;
