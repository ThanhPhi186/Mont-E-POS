import DynamicInput from '@/components/DynamicInput';
import ListLoading from '@/components/ListLoading';
import ListSearchEmpty from '@/components/ListSearchEmpty';
import PopupSelect from '@/components/PopupSelect';
import ProductRow from '@/components/ProductRow';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import Icons from '@/Icons';
import {fetchListProduct} from '@/store/product/api';
import {IFullProduct, IProductConfig} from '@/store/product/type';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const Icon = styled.Image``;

const TotalText = styled.Text`
  margin-top: 16px;
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

const SelectProductScreen = memo(
  ({
    selectedId,
    onSelectProduct,
  }: {
    selectedId: string;
    onSelectProduct: (
      item: IFullProduct,
      config: IProductConfig,
      changeConfig: boolean,
    ) => void;
  }) => {
    const [currentCate, setCurrentCate] = useState('AllProducts');
    const [data, setData] = useState<IFullProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const currentPage = useRef(0);
    const totalPage = useRef(1);
    const totalItem = useRef(0);
    const searchName = useRef('*');

    const [productSelected, setProductSelected] = useState<IFullProduct | null>(
      null,
    );

    const getProductsByCate = useCallback(async () => {
      if (currentPage.current >= totalPage.current) return;
      setLoading(true);
      loadingRef.current = true;
      const {
        total_page,
        data: products,
        totalRecords,
      } = await fetchListProduct({
        currentPage: currentPage.current,
        name: searchName.current,
      });
      currentPage.current += 1;
      totalPage.current = total_page;
      totalItem.current = totalRecords;
      setData(currentPage.current === 1 ? products : [...data, ...products]);
      setLoading(false);
      loadingRef.current = false;
    }, [data, currentCate]);

    const onLoadMore = useCallback(() => {
      if (loading || loadingRef.current) return;
      if (currentPage.current > totalPage.current) {
        return;
      }
      getProductsByCate();
    }, [loading, getProductsByCate]);

    const onRefresh = useCallback(() => {
      totalItem.current = 0;
      totalPage.current = 1;
      setData([]);
      currentPage.current = 0;
      getProductsByCate();
    }, [currentCate, getProductsByCate]);

    useEffect(() => {
      onRefresh();
    }, [currentCate]);

    const onConfigPress = useCallback(
      (product, config) => {
        setProductSelected(null);
        // true: enable change config
        onSelectProduct(product, config, true);
      },
      [onSelectProduct],
    );
    return (
      <>
        <ScreenWithTitle title="Chọn sản phẩm">
          <FlatList
            ListFooterComponent={<ListLoading loading={loading} />}
            ListHeaderComponent={
              <>
                <SDynamicInput
                  placeholderStr="Tìm tên sản phẩm"
                  onChangeText={t => (searchName.current = t)}
                  textInputProps={{onEndEditing: () => onRefresh()}}
                  rightIcon={<Icon source={Icons.icSearch} />}
                />
                <TotalText>Sản phẩm ({totalItem.current})</TotalText>
              </>
            }
            ListEmptyComponent={!loading ? <ListSearchEmpty /> : null}
            data={data}
            keyExtractor={(item, index) => item.productId.toString()}
            renderItem={({item}) => (
              <ProductRow
                item={item}
                selectedId={selectedId}
                onItemPress={() => {
                  item.configs.length > 1
                    ? setProductSelected(item)
                    : onConfigPress(item, item.configs[0]);
                }}
              />
            )}
            maxToRenderPerBatch={6}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.01}
            showsVerticalScrollIndicator={false}
          />
        </ScreenWithTitle>
        {!!productSelected && (
          <SPopupSelect
            visibleProps
            onCloseProps={() => setProductSelected(null)}
            title="Chọn phân loại"
            data={productSelected.configs}
            renderItem={({item, index}) => (
              <CateWrapper
                key={index.toString()}
                onPress={() => onConfigPress(productSelected, item)}>
                <CateLabel>{item.quantityUomDesc}</CateLabel>
              </CateWrapper>
            )}
          />
        )}
      </>
    );
  },
);

export default SelectProductScreen;
