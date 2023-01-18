import PopupSelect from '@/components/PopupSelect';
import Icons from '@/Icons';
import {IGender} from '@/store/customers/types';
import React, {memo, useCallback, useRef, useState} from 'react';
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
  height: 50%;
`;

const SelectGender = memo(
  ({
    onChangeRoute,
    selected,
  }: {
    onChangeRoute: (cateId: string) => void;
    selected: string;
  }) => {
    const listGender = [
      {label: 'Nam', value: 'M'},
      {label: 'Nữ', value: 'F'},
    ];
    const [openSelect, setOpenSelect] = useState(false);

    const label = useRef('Nam');

    const onSelectedItem = useCallback(
      (item: IGender) => {
        label.current = item.label;
        onChangeRoute(item.value);
        setOpenSelect(false);
      },
      [onChangeRoute],
    );

    return (
      <WrapperContainer>
        <Label>Giới tính</Label>
        <Wrapper onPress={() => setOpenSelect(true)}>
          <TxtValue isValue={Boolean(selected)}>{label.current}</TxtValue>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <SPopupSelect
          visible={openSelect}
          onClose={() => setOpenSelect(false)}
          title="Chọn giới tính"
          data={listGender}
          renderItem={({item, index}) => (
            <CateWrapper
              key={index.toString()}
              onPress={() => onSelectedItem(item)}>
              <CateLabel selected={item.value === selected}>
                {item.label}
              </CateLabel>
              <Icon
                source={Icons.icSelected}
                style={{opacity: item.value === selected ? 1 : 0}}
              />
            </CateWrapper>
          )}
        />
      </WrapperContainer>
    );
  },
);

export default SelectGender;
