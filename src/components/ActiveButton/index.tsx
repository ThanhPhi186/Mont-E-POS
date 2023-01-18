import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import {
  Animated,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

const ActiveWrapper = styled.View<{ active: boolean }>`
  padding: 1px;
  width: 48px;
  background-color: ${p => (p.active ? p.theme.blue2 : '#C4C4C4')};
  border-radius: 16px;
  height: 28px;
`;
const DotView = styled(Animated.View)`
  height: 25px;
  width: 25px;
  background-color: #fff;
  border-radius: 22px;
  position: absolute;
  left: 2px;
  top: 1.5px;
`;

interface IProps {
  defaultValue?: boolean;
  disabled?: boolean;
  onChangeStatus: (v: boolean) => void;
  value?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
}

export const ActiveButton = memo(
  forwardRef(function (props: IProps, ref: any) {
    const {
      onChangeStatus,
      disabled,
      defaultValue = false,
      value,
      dotStyle = {},
      containerStyle = {},
    } = props;
    const [enabled, setEnabled] = useState(defaultValue);
    const aniLeft = useRef(new Animated.Value(defaultValue ? 20 : 2)).current;
    const onChange = useCallback(() => {
      Animated.timing(aniLeft, {
        toValue: enabled ? 2 : 22,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        onChangeStatus(!enabled);
        setEnabled(!enabled);
      });
    }, [enabled, onChangeStatus]);
    const changeValue = useCallback((value: boolean) => {
      Animated.timing(aniLeft, {
        toValue: value ? 2 : 22,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        setEnabled(value);
      });
    }, []);
    useImperativeHandle(ref, () => ({
      changeValue,
    }));

    useEffect(() => {
      typeof value === 'boolean' && changeValue(value);
    }, [value]);

    return (
      <TouchableWithoutFeedback disabled={disabled} onPress={onChange}>
        <ActiveWrapper active={enabled} style={containerStyle}>
          <DotView style={[{ left: aniLeft }, dotStyle]} />
        </ActiveWrapper>
      </TouchableWithoutFeedback>
    );
  }),
);
