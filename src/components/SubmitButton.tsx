import styled from 'styled-components/native';
import React, {memo, useCallback, useMemo, useRef} from 'react';
import {
  TouchableWithoutFeedback,
  TextProps,
  ViewProps,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import _ from 'lodash';
import Theme from '@/Colors';

export interface SubmitButtonProps {
  text?: string;
  height?: number;
  fontSize?: number;
  loading?: boolean;
  loadingText?: string;
  rightIcon?: any;
  leftIcon?: any;
  icon?: any;
  textProps?: TextProps;
  disabled?: boolean;
  onPress?: () => void;
  colors?: string[];
  view?: boolean;
  loadingColor?: string;
  type?: ButtonType;
  background?: string;
  textColor?: string;
  iconColor?: string;
  customStyle?: string;
  iconOnly?: boolean;
  icSvg?: SVGElement;
}

const Wrapper = styled(View)<{
  height?: number;
  background?: string;
  customStyle?: string;
  border?: string;
  opacity?: number;
}>`
  /* border-radius: ${p => (p.height ? p.height / 2 : 20)}px; */
  background-color: ${p => p.background};
  overflow: hidden;
  padding: 0 20px;
  height: 48px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${p => p.border && `border: ${p.border}`};
  ${p => p.opacity && `opacity: ${p.opacity}`};
  ${p => p.customStyle};
`;

const ButtonText = styled(Text)<{fontSize?: number; textColor?: string}>`
  color: ${p => p.textColor};
  font-size: ${props => props.fontSize || 16}px;
  line-height: 20px;
  font-weight: 700;
  text-align: center;
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-left: 16px;
`;

const LeftIcon = styled.Image`
  margin-right: 8px;
  margin-left: -4px;
`;
const RightIcon = styled.Image`
  margin-left: 8px;
  margin-right: -4px;
`;

const ButtonIcon = styled(View)<{
  customStyle?: string;
  background?: string;
  border?: string;
}>`
  width: 52px;
  height: 52px;
  background: ${p => p.background || `#fff`};
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  ${p => p.border && `border: ${p.border}`};

  ${p => p.customStyle}
`;

const IconCenter = styled.Image``;

type ButtonType =
  | 'dark-line'
  | 'light-line'
  | 'icon-light'
  | 'dark'
  | 'light'
  | 'icon'
  | 'ignore'
  | 'default';

interface ICustomStyle {
  background: string;
  textColor: string;
  border?: string;
  iconColor?: string;
  opacity?: number;
}

const styleByType: Record<string, ICustomStyle> = {
  disabled: {
    background: Theme.blue2,
    textColor: '#fff',
    iconColor: ' #fff',
    opacity: 0.3,
  },

  dark: {background: '#000', textColor: '#fff'},
  ignore: {background: 'transparent', textColor: '#808080'},
  'light-line': {
    background: 'transparent',
    textColor: Theme.blue2,
    border: `2px solid ${Theme.blue2}`,
  },
  'dark-line': {
    background: 'transparent',
    textColor: '#000',
    border: '2px solid #000',
  },
  default: {
    background: Theme.blue2,
    textColor: '#fff',
  },
};

const SubmitButton = memo(function SubmitButton({
  text,
  height,
  fontSize = 14,
  loading = false,
  loadingText,
  rightIcon,
  leftIcon,
  icon,
  textProps,
  disabled,
  loadingColor,
  onPress = () => {},
  view,
  type = 'default',
  background,
  textColor,
  iconColor,
  customStyle,
  iconOnly,
  icSvg,
  ...props
}: Props & ViewProps) {
  const tmpDisabled = useRef(false);
  const sOnPress = useCallback(() => {
    if (tmpDisabled.current) return;
    onPress?.();
    tmpDisabled.current = true;
    setTimeout(() => {
      tmpDisabled.current = false;
    }, 500);
  }, [onPress]);

  const style = useMemo(() => {
    return (
      styleByType[type] || {
        background: Theme.blue2,
        textColor: '#fff',
      }
    );
  }, [type, disabled]);
  if (type === 'icon' || iconOnly) {
    return (
      <TouchableOpacity onPress={sOnPress} disabled={disabled || view}>
        <ButtonIcon
          customStyle={customStyle}
          background={background || style.background}
          border={style.border}
          {...props}>
          {icon ? (
            <IconCenter
              source={icon}
              style={iconColor ? {tintColor: iconColor} : {}}
            />
          ) : (
            icSvg
          )}
        </ButtonIcon>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={sOnPress} disabled={disabled || view}>
      <Wrapper
        background={background || style.background}
        customStyle={customStyle}
        border={style.border}
        opacity={style.opacity || (disabled ? 0.3 : 1)}
        {...props}>
        {leftIcon && (
          <LeftIcon
            source={leftIcon}
            style={{tintColor: iconColor || textColor || style.textColor}}
          />
        )}

        <ButtonText
          textColor={textColor || style.textColor}
          fontSize={fontSize}
          {...textProps}>
          {loading ? loadingText || text : text}
        </ButtonText>
        {!!loading && (
          <LoadingIndicator color={loadingColor || '#fff'} size={16} />
        )}
        {rightIcon && (
          <RightIcon
            source={rightIcon}
            style={{tintColor: iconColor || textColor || style.textColor}}
          />
        )}
      </Wrapper>
    </TouchableWithoutFeedback>
  );
});

export default SubmitButton;
