import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {fetchListCategory} from '@/store/category/api';
import {ICategoryItem} from '@/store/category/type';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  background: rgba(0, 122, 255, 0.1);
  /* System/Blue */

  border: 1px solid #007aff;
  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
`;

const Label = styled.Text`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #3a3a3c;
`;

const Icon = styled.Image``;

const CateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 24px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f7;
`;

const CateLabel = styled.Text<{selected: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: ${p => (p.selected ? p.theme.blue2 : '#1c1c1e')};
`;

const SPopupSelect = styled(PopupSelect)`
  background-color: #fff;
  height: 100%;
`;

const SelectCategory = memo(
  ({
    onChangeCate,
    selected,
  }: {
    onChangeCate: (cateId: string) => void;
    selected: string;
  }) => {
    const [listCate, setListCate] = useState<ICategoryItem[]>([]);
    const [openSelect, setOpenSelect] = useState(false);

    const cateLabel = useRef('Tất cả danh mục sản phẩm');

    const onSelectedItem = useCallback(
      (cateItem: ICategoryItem) => {
        cateLabel.current = cateItem.categoryName;
        onChangeCate(cateItem.productCategoryId);
        setOpenSelect(false);
      },
      [onChangeCate],
    );

    const getList = useCallback(async () => {
      const newList = await fetchListCategory();
      setListCate(newList);
    }, []);

    useEffect(() => {
      getList();
    }, []);

    return (
      <>
        <Wrapper onPress={() => setOpenSelect(true)}>
          <Label>{cateLabel.current}</Label>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SPopupSelect
          visible={openSelect}
          onClose={() => setOpenSelect(false)}
          title="Danh mục sản phẩm"
          data={listCate}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onSelectedItem(item)}>
              <CateLabel selected={item.productCategoryId === selected}>
                {item.categoryName}
              </CateLabel>
              <Icon
                source={Icons.icSelected}
                style={{opacity: item.productCategoryId === selected ? 1 : 0}}
              />
            </CateWrapper>
          )}
        />
      </>
    );
  },
);

export default SelectCategory;
