import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {fetchListRoute} from '@/store/customers/api';
import {IRoute} from '@/store/customers/types';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';

const WrapperContainer = styled.View`
  margin-top: 12px;
`;

const Wrapper = styled.TouchableOpacity`
  background: ${p => p.theme.backgroundInput};

  padding: 12px 16px;
  border-radius: 12px;
  flex-direction: row;
`;

const Label = styled.Text`
  color: #8e8e93;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  width: 100%;
  margin-bottom: 4px;
`;

const TxtValue = styled.Text<{isValue: boolean}>`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${p => (p.isValue ? '#000' : '#aeaeb2')};
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

const TxtRequired = styled.Text`
  color: ${p => p.theme.error};
  font-weight: bold;
  font-size: 12px;
`;

const SelectRoute = memo(
  ({
    onChangeRoute,
    selected,
  }: {
    onChangeRoute: (cateId: string) => void;
    selected: string;
  }) => {
    const [listCate, setListCate] = useState<IRoute[]>([]);
    const [openSelect, setOpenSelect] = useState(false);

    const label = useRef('Tuyến đường');

    const onSelectedItem = useCallback(
      (cateItem: IRoute) => {
        label.current = cateItem.routeName;
        onChangeRoute(cateItem.routeId);
        setOpenSelect(false);
      },
      [onChangeRoute],
    );

    const getList = useCallback(async () => {
      const listRoute = await fetchListRoute();

      setListCate(listRoute);
    }, []);

    useEffect(() => {
      openSelect && getList();
    }, [openSelect]);

    return (
      <WrapperContainer>
        <Label>
          Tuyến đường <TxtRequired>*</TxtRequired>
        </Label>
        <Wrapper onPress={() => setOpenSelect(true)}>
          <TxtValue isValue={Boolean(selected)}>{label.current}</TxtValue>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SPopupSelect
          visible={openSelect}
          onClose={() => setOpenSelect(false)}
          title="Chọn tuyến đường"
          data={listCate}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onSelectedItem(item)}>
              <CateLabel selected={item.routeId === selected}>
                {item.routeName}
              </CateLabel>
              <Icon
                source={Icons.icSelected}
                style={{opacity: item.routeId === selected ? 1 : 0}}
              />
            </CateWrapper>
          )}
        />
      </WrapperContainer>
    );
  },
);

export default SelectRoute;
