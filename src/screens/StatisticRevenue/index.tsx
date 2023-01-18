import ScreenWithTabbar from '@/components/ScreenWithTabbar';
import React, { memo, useMemo } from 'react';
import styled from 'styled-components/native';
import General from './General';
import Statistic from './Statistic';

const Wrapper = styled.View`
  flex: 1;
`;

const StatisticRevenue = memo(() => {
  const listTab = useMemo(
    () => [
      {
        label: 'Tổng quan',
        Component: General,
      },
      {
        label: 'Thống kê',
        Component: Statistic,
      },
    ],
    [],
  );
  return <ScreenWithTabbar title="Thống kê doanh số" listTab={listTab} />;
});

export default StatisticRevenue;
