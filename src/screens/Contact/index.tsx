import SubmitButton from '@/components/SubmitButton';
import {Title} from '@/components/TextCommon';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import ContactSection from './ContactSection';
import FeedbackSection from './FeedbackSection';
const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

const STitle = styled(Title)`
  margin-top: ${getStatusBarHeight()}px;
  padding: 24px;
  color: ${p => p.theme.black};
`;

function ShareTab() {
  return (
    <Wrapper>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: LIST_PADDING_BOTTOM}}>
        <STitle>Chia sẻ Mont-E</STitle>
        <ContactSection />
        <FeedbackSection />
      </ScrollView>
    </Wrapper>
  );
}

export default memo(ShareTab);
