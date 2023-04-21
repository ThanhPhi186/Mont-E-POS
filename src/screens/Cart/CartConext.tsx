import {ICustomer} from '@/store/customers/types';
import {IProductCart} from '@/store/product/type';
import React, {createContext, memo, ReactNode, useState} from 'react';

interface ICartContext {
  orderTentative?: string;
  customer?: ICustomer;
  products: IProductCart[];
  setProducts: (list: any) => void;
  setCustomer: (customer: any) => void;
  setOrderTentative: (orderId?: string) => void;
  clearOrder: () => void;
}

const doNothing = () => {};

export const CartContext = createContext<ICartContext>({
  customer: undefined,
  orderTentative: undefined,
  products: [],
  setProducts: doNothing,
  setCustomer: doNothing,
  setOrderTentative: doNothing,
  clearOrder: () => {},
});

export const CartProvider = memo(({children}: {children: ReactNode}) => {
  const [customer, setCustomer] = useState<ICustomer | undefined>();
  const [products, setProducts] = useState<IProductCart[]>([]);
  const [orderTentative, setOrderTentative] = useState();

  const onChangeOrderId = newOrderId => {
    setOrderTentative(newOrderId);
  };

  const clearOrder = () => {
    setProducts([]);
    setCustomer(undefined);
    setOrderTentative(undefined);
  };

  return (
    <CartContext.Provider
      value={{
        customer,
        products,
        orderTentative,
        setProducts,
        setCustomer,
        setOrderTentative: onChangeOrderId,
        clearOrder,
      }}>
      {children}
    </CartContext.Provider>
  );
});
