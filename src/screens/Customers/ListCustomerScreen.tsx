import ScreenWithTabbar from '@/components/ScreenWithTabbar';
import {fetchCustomerRoute} from '@/store/customers/api';
import {ICustomerRoute} from '@/store/customers/types';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import ListCustomer from './ListCustomer';

function ListCustomerScreen() {
  const [data, setData] = useState<{
    inRoute: ICustomerRoute | null;
    outRoute: ICustomerRoute | null;
  }>({inRoute: null, outRoute: null});

  const listTab = useMemo(
    () => [
      {
        label: 'Trong tuyến',
        Component: ListCustomer,
        params: {route: data.inRoute},
      },
      {
        label: 'Trái tuyến',
        Component: ListCustomer,
        params: {route: data.outRoute},
      },
    ],
    [data],
  );

  const getRoute = useCallback(async () => {
    const newData = await fetchCustomerRoute();
    setData(newData);
  }, []);

  useEffect(() => {
    getRoute();
  }, []);

  return <ScreenWithTabbar title={'Danh sách khách hàng'} listTab={listTab} />;
}

export default memo(ListCustomerScreen);
