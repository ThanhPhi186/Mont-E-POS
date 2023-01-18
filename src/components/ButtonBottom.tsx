import {BUTTON_BOTTOM_SPACE} from '@/utils/Tranform';
import React, {memo} from 'react';
import styled from 'styled-components/native';
import SubmitButton, {SubmitButtonProps} from './SubmitButton';

const SSubmitButton = styled(SubmitButton)``;

const SWrapperBtn = styled.View`
  background-color: ${p => p.theme.backgroundInput};
  padding: 16px 24px ${BUTTON_BOTTOM_SPACE}px 24px;
`;

const ButtonBottom = memo(function (props: SubmitButtonProps) {
  return (
    <SWrapperBtn>
      <SSubmitButton {...props} />
    </SWrapperBtn>
  );
});

export default ButtonBottom;
