import {useNavigationParams} from '@/hooks/navigation';
import {IFullProduct, IProductConfig} from '@/store/product/type';
import React, {createContext, memo, PropsWithChildren, useState} from 'react';

interface IProductContext {
  selectedConfig: IProductConfig;
  count: number;
  setCount: (v: number) => void;
  setSelectedConfig: (c: IProductConfig) => void;
  detail: IFullProduct;
}

const doNothing = () => {};

export const ProductContext = createContext<IProductContext>({
  // @ts-ignore
  selectedConfig: {},
  count: 1,
  setCount: doNothing,
  setSelectedConfig: doNothing,
});

export const ProductProvider = memo(({children}: PropsWithChildren<{}>) => {
  // const { cart, updateCart } = useCart();
  const {detail} = useNavigationParams<{detail: IFullProduct}>();
  const {
    configs: [config],
  } = detail;
  const [count, setCount] = useState(1);
  const [selectedConfig, setSelectedConfig] = useState<IProductConfig>(config);

  return (
    <ProductContext.Provider
      value={{
        selectedConfig,
        count,
        setCount,
        setSelectedConfig,
        detail,
      }}>
      {children}
    </ProductContext.Provider>
  );
});
