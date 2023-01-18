import {RootState} from '@/types';
import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {setCartAction} from './actions';
import {ICart} from './type';
import store from '@/store';
import {ICustomer} from '../customers/types';
import {IProductCart} from '../product/type';

export const setCart = (cart: ICart) => {
  store.dispatch(setCartAction(cart));
};

export const useCart = () => {
  const cart = useSelector((state: RootState) => {
    return (state.cart || {
      products: [],
    }) as ICart;
  });
  const updateCart = useCallback(
    (params: {customer?: ICustomer; products?: IProductCart[]}) => {
      const newCart = {...cart, ...params};
      setCart(newCart);
    },
    [cart],
  );
  const deleteCart = useCallback(() => {
    setCart({
      products: [],
    });
  }, []);
  return {
    cart: {customer: cart.customer, products: cart.products || []},
    updateCart,
    deleteCart,
  };
};
