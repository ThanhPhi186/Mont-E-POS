import Icons from '@/Icons';
import React, {memo, useCallback, useRef, useState} from 'react';
import styled from 'styled-components/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

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

const SelectBirthDay = memo(
  ({
    onChangeRoute,
    selected,
  }: {
    onChangeRoute: (cateId: string) => void;
    selected: string;
  }) => {
    const [openSelect, setOpenSelect] = useState(false);

    const label = useRef(moment().format('DD/MM/YYYY'));

    const onSelectedItem = useCallback(
      (item: Date) => {
        label.current = moment(item).format('DD/MM/YYYY');
        setOpenSelect(false);
      },
      [onChangeRoute],
    );

    return (
      <WrapperContainer>
        <Label>Ngày sinh</Label>
        <Wrapper onPress={() => setOpenSelect(true)}>
          <TxtValue isValue={Boolean(selected)}>{label.current}</TxtValue>
          <Icon source={Icons.icDropdown} />
        </Wrapper>
        <DateTimePickerModal
          isVisible={openSelect}
          mode="date"
          onConfirm={onSelectedItem}
          onCancel={() => setOpenSelect(false)}
        />
      </WrapperContainer>
    );
  },
);

export default SelectBirthDay;
