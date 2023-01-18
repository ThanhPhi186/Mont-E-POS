import ListLoading from '@/components/ListLoading';
import { fetchReportGeneral } from '@/store/report/api';
import { IReportGeneral } from '@/store/report/type';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import SelectMonthSection from './components/SelectMonth';
import TotalOrder from './components/TotalOrder';
import TotalRow from './components/TotalRow';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 24px;
`;

const Body = styled.View``;

const General = memo(() => {
  const [data, setData] = useState<IReportGeneral | null>(null);
  const onChangeMonth = useCallback(async (time: number) => {
    const newData = await fetchReportGeneral(time);
    setData(newData);
  }, []);

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SelectMonthSection onChangeMonth={onChangeMonth} />
        {data ? (
          <Body>
            <TotalRow
              grandTotal={data.grandTotal}
              revShare={data.invoiceTotal}
            />
            <TotalOrder totalOrder={data.numberOrders} results={data.results} />
          </Body>
        ) : (
          <ListLoading loading />
        )}
      </ScrollView>
    </Wrapper>
  );
});

export default General;
