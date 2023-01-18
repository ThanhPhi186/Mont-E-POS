import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {
  Animated,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import Icons from '@/Icons';

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image``;
const Label = styled.Text``;

const ButtonChecked = memo(
  ({
    onChangeStatus,
    disabled,
    defaultValue = false,
    label,
    labelPosition = 'right',
    value,
    ...viewProps
  }: {
    defaultValue?: boolean;
    disabled?: boolean;
    onChangeStatus?: (v: boolean) => void;
    label?: string;
    value?: boolean;
    labelPosition?: 'left' | 'right';
  } & ViewProps) => {
    const [enabled, setEnabled] = useState(defaultValue);
    const onChange = useCallback(() => {
      setEnabled(!enabled);
      onChangeStatus?.(!enabled);
    }, [enabled, onChangeStatus]);

    useEffect(() => {
      typeof value === 'boolean' && setEnabled(value);
    }, [value]);

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={onChange}>
        <Wrapper {...viewProps}>
          {label && labelPosition === 'left' && (
            <Label style={{marginRight: 12}}>{label}</Label>
          )}
          <Icon source={enabled ? Icons.icChecked : Icons.icUnChecked} />
          {label && labelPosition === 'right' && (
            <Label style={{marginLeft: 12}}>{label}</Label>
          )}
        </Wrapper>
      </TouchableWithoutFeedback>
    );
  },
);
export default ButtonChecked;
