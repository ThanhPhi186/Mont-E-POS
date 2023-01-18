import React, { memo, useCallback } from 'react';
import {
  TouchableOpacityProps,
  Clipboard,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import SimpleToast from 'react-native-simple-toast';
import { useMe } from '@/store/auth';

const Button = styled.TouchableOpacity``;
const View = styled.View``;
const CopyButton = memo(function ({
  content,
  onDone,
  children,
  type,
  position,
  ...props
}: {
  content: string;
  children: any;
  type?: string;
  position?: string;
  onDone?: (app?: string) => void;
} & TouchableOpacityProps) {
  const me = useMe();
  const onPress = useCallback(() => {
    Clipboard.setString(content);
    SimpleToast.show('Copied!');
    onDone?.();
  }, [content, onDone, me, position, type]);

  return (
    // @ts-ignore
    <TouchableWithoutFeedback onPress={onPress} {...props}>
      <View style={props.style}>{children}</View>
    </TouchableWithoutFeedback>
  );
});

export default CopyButton;
