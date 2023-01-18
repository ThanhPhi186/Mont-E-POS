import Theme from '@/Colors';
import PopupSelect from '@/components/PopupSelect';
import ProductRow from '@/components/ProductRow';
import SubmitButton from '@/components/SubmitButton';
import {IFullProduct, IProductCart, IProductConfig} from '@/store/product/type';
import React, {memo, useCallback, useContext, useRef, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import {CartContext} from '../CartConext';

const Row = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Wrapper = styled.View`
  padding-bottom: 24px;

  margin-top: 24px;
`;

const Label = styled.Text``;
const Icon = styled.Image``;

const SSubmitButton = styled(SubmitButton)`
  width: 48%;
`;

const SHoldButton = styled(SubmitButton)`
  width: 48%;
  border: 2px solid #007aff;
  background-color: #fff;
`;
const RowBetween = styled(Row)`
  justify-content: space-between;
  margin-top: 12px;
`;

const GroupButton = memo(
  ({
    onPressAdd,
    onPressQr,
  }: {
    onPressAdd: () => void;
    onPressQr: () => void;
  }) => {
    return (
      <RowBetween>
        <SHoldButton
          text="Thêm sản phẩm"
          onPress={onPressAdd}
          textColor={Theme.blue2}
        />
        <SSubmitButton text="Quét QR" onPress={onPressQr} />
      </RowBetween>
    );
  },
);

const ListItem = styled.View``;

const AddItemText = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${p => p.theme.blue2};
`;

const SPopupSelect = styled(PopupSelect)`
  min-height: 30%;
`;

const CateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f7;
`;

const CateLabel = styled.Text`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;

const ProductSection = memo(() => {
  const {products, setProducts} = useContext(CartContext);
  const [productSelected, setProductSelected] = useState<IFullProduct | null>(
    null,
  );
  const currentRow = useRef<IProductCart | null>(null);

  const onSelectProduct = useCallback(
    (productSelect: IFullProduct, config: IProductConfig) => {
      setProductSelected(null);
      const indexExisted = products.findIndex(
        p =>
          p.product.productId === productSelect.productId &&
          p.config.quantityUomId === config.quantityUomId,
      );
      const findExistItem = indexExisted !== -1 ? products[indexExisted] : null;

      const item = {
        product: productSelect,
        config,
        count: !findExistItem ? 1 : findExistItem.count + 1,
      };
      const newList = [...products, item];

      indexExisted !== -1 && (products[indexExisted] = item);

      setProducts(indexExisted !== -1 ? [...products] : newList);
    },
    [products, setProducts],
  );

  const onChangeConfig = useCallback(
    (productSelect: IFullProduct, config: IProductConfig) => {
      if (!currentRow.current) return;
      const {config: oldConfig} = currentRow.current;
      setProductSelected(null);

      const indexExisted = products.findIndex(
        p =>
          p.product.productId === productSelect.productId &&
          p.config.quantityUomId === config.quantityUomId,
      );

      if (indexExisted !== -1) return onSelectProduct(productSelect, config);

      const oldIndex = products.findIndex(
        p =>
          p.product.productId === productSelect.productId &&
          p.config.quantityUomId === oldConfig.quantityUomId,
      );
      const replaceOldItem = {
        ...currentRow.current,
        config,
      };
      products[oldIndex] = replaceOldItem;

      setProducts([...products]);
    },
    [products, setProducts],
  );

  const onDeleteItem = useCallback(
    (index: number) => {
      const newList = [...products];
      newList.splice(index, 1);
      setProducts(newList);
    },
    [products, setProducts],
  );

  const startSelectProduct = useCallback(() => {
    Actions.push('select_product_screen', {
      onSelectProduct: (product, config) => {
        Actions.pop();
        onSelectProduct(product, config);
      },
    });
  }, [onSelectProduct]);

  const onCountChange = useCallback(
    (idxProduct: number, newCount: number) => {
      const item = {...products[idxProduct]};
      item.count = newCount;
      products[idxProduct] = {...item};
      setProducts([...products]);
    },
    [products],
  );

  return (
    <Wrapper>
      <Label>Sản phẩm ({products.length})</Label>
      <GroupButton
        onPressAdd={startSelectProduct}
        onPressQr={() => Actions.push('qr_scan')}
      />

      <ListItem>
        {products.map((item, index) => (
          <ProductRow
            key={`${index}${item.product.productId.toString()}*${item.count}`}
            item={item.product}
            config={item.config}
            count={item.count}
            onCountChange={newCount => onCountChange(index, newCount)}
            onDelete={() => onDeleteItem(index)}
            onItemPress={p => {
              currentRow.current = item;
              setProductSelected(p);
            }}
          />
        ))}
      </ListItem>

      {!!productSelected && (
        <SPopupSelect
          visibleProps
          onCloseProps={() => setProductSelected(null)}
          title="Chọn phân loại"
          data={productSelected.configs}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onChangeConfig(productSelected, item)}>
              <CateLabel>{item.quantityUomDesc}</CateLabel>
            </CateWrapper>
          )}
        />
      )}
    </Wrapper>
  );
});

export default ProductSection;
