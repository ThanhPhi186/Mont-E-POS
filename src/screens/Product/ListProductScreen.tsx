import DynamicInput from '@/components/DynamicInput';
import ListLoading from '@/components/ListLoading';
import ListSearchEmpty from '@/components/ListSearchEmpty';
import PopupSelect from '@/components/PopupSelect';
import ProductRow from '@/components/ProductRow';
import ScreenWithTitle from '@/components/ScreenWithTitle';
import Icons from '@/Icons';
import SVGIcon from '@/Icons/SVGIcon';
import { fetchListProduct } from '@/store/product/api';
import { IFullProduct, IProductConfig } from '@/store/product/type';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import ProductItem from './components/ProductItem';
import SelectCategory from './components/SelectCategory';

const SDynamicInput = styled(DynamicInput)`
  margin-top: 12px;
`;

const Icon = styled.Image``;

const TotalText = styled.Text`
  margin-top: 16px;
  margin-bottom: 8px;
`;

const ListProductScreen = memo(
  ({
    selectedId,
    onSelectProduct,
  }: {
    selectedId: string;
    onSelectProduct: (item: IFullProduct, config: IProductConfig) => void;
  }) => {
    const [currentCate, setCurrentCate] = useState('AllProducts');
    const [data, setData] = useState<IFullProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const loadingRef = useRef(false);
    const currentPage = useRef(0);
    const totalPage = useRef(1);
    const totalItem = useRef(0);
    const searchName = useRef('');

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
        categoryId: currentCate,
        currentPage: currentPage.current,
        name: searchName.current,
      });
      currentPage.current += 1;
      totalPage.current = total_page;
      totalItem.current = totalRecords;
      const newData =
        currentPage.current === 1 ? products : [...data, ...products];
      setData(newData);
      setLoading(false);
      loadingRef.current = false;
    }, [data, currentCate]);

    const onLoadMore = useCallback(() => {
      if (loading || loadingRef.current) return;
      if (currentPage.current > totalPage.current) {
        return;
      }
      getProductsByCate();
    }, [loading]);

    const onChangeCate = useCallback((cateid: string) => {
      setCurrentCate(cateid);
    }, []);

    const onRefresh = useCallback(() => {
      totalItem.current = 0;
      totalPage.current = 1;

      setData([]);
      currentPage.current = 0;
      getProductsByCate();
    }, [currentCate]);

    useEffect(() => {
      onRefresh();
    }, [currentCate, onRefresh]);

    const onConfigPress = useCallback(
      (product, config) => {
        setProductSelected(null);
        onSelectProduct(product, config);
      },
      [onSelectProduct],
    );

    return (
      <ScreenWithTitle title="Danh sách sản phẩm">
        <FlatList
          ListFooterComponent={<ListLoading loading={loading} />}
          ListHeaderComponent={
            <>
              <SelectCategory
                selected={currentCate}
                onChangeCate={onChangeCate}
              />
              <SDynamicInput
                placeholderStr="Tìm tên sản phẩm"
                onChangeText={t => (searchName.current = t)}
                textInputProps={{ onEndEditing: () => onRefresh() }}
                rightIcon={<Icon source={Icons.icSearch} />}
              />
              <TotalText>Sản phẩm ({totalItem.current})</TotalText>
            </>
          }
          ListEmptyComponent={!loading ? <ListSearchEmpty /> : null}
          data={data}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: any) => (
            <ProductItem item={item} index={index} />
          )}
          maxToRenderPerBatch={6}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.01}
          showsVerticalScrollIndicator={false}
        />
      </ScreenWithTitle>
    );
  },
);

export default ListProductScreen;
