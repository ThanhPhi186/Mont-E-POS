import {ICustomer} from '@/store/customers/types';
import {useCart} from '@/store/order/hook';
import {IProductCart} from '@/store/product/type';
import React, {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useState,
} from 'react';

interface ICartContext {
  orderTentative?: string;
  customer?: ICustomer;
  products: IProductCart[];
  setProducts: (list: any) => void;
  setCustomer: (customer: any) => void;
  setOrderTentative: (orderId: string) => void;
}

const doNothing = () => {};

export const CartContext = createContext<ICartContext>({
  customer: undefined,
  orderTentative: undefined,
  products: [],
  setProducts: doNothing,
  setCustomer: doNothing,
  setOrderTentative: doNothing,
});

export const CartProvider = memo(({children}: {children: ReactNode}) => {
  const {cart, updateCart} = useCart();
  const [customer, setCustomer] = useState<ICustomer | undefined>(
    cart.customer,
  );
  const [products, setProducts] = useState<IProductCart[]>(cart.products || []);
  const [orderTentative, setOrderTentative] = useState();

  const onChangeProduct = useCallback(
    newProducts => {
      setProducts(newProducts);
      updateCart({products: newProducts});
    },
    [updateCart],
  );
  const onChangeCustomer = useCallback(
    newCustomer => {
      setCustomer(newCustomer);
      updateCart({customer: newCustomer});
    },
    [updateCart],
  );

  const onChangeOrderId = newOrderId => {
    setOrderTentative(newOrderId);
  };

  return (
    <CartContext.Provider
      value={{
        customer,
        products,
        orderTentative,
        setProducts: onChangeProduct,
        setCustomer: onChangeCustomer,
        setOrderTentative: onChangeOrderId,
      }}>
      {children}
    </CartContext.Provider>
  );
});
