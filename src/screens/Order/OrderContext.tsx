import {IOrderProductItem} from '@/store/order/type';
import React, {createContext, memo, PropsWithChildren, useState} from 'react';

interface IProductContext {
  productReturn: IOrderProductItem[];
  setProductReturn: (list: any) => void;
}

export const OrderContext = createContext<IProductContext>({
  productReturn: [],
  setProductReturn: () => {},
});

export const OrderProvider = memo(({children}: PropsWithChildren<any>) => {
  const [productReturn, setProductReturn] = useState<IOrderProductItem[]>([]);

  return (
    <OrderContext.Provider
      value={{
        productReturn,
        setProductReturn,
      }}>
      {children}
    </OrderContext.Provider>
  );
});
