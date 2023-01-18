import Theme from '@/Colors';
import {Title} from '@/components/TextCommon';
import {LIST_PADDING_BOTTOM} from '@/utils/Tranform';
import React, {memo, useCallback, useEffect, useRef} from 'react';
import {ScrollView} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import ShareSection from './ShareSection';
const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

const STitle = styled(Title)`
  margin-top: ${getStatusBarHeight()}px;
  padding: 24px;
  color: ${p => p.theme.black};
`;

const Block = styled.View`
  width: 45%;
  padding: 12px 16px;
  background-color: #fff;
  border-radius: 12px;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;

  color: #636366;
`;
const Value = styled.Text<{color: string}>`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: ${p => p.color};
`;

const RowItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 24px;
  margin-bottom: 0px;
`;

function ContactTab() {
  return (
    <Wrapper>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: LIST_PADDING_BOTTOM}}>
        <STitle>Liên hệ Mont-E</STitle>
        <RowItem>
          <Block>
            <Label>Số người giới thiệu</Label>
            <Value color={Theme.blue2}>0</Value>
          </Block>
          <Block>
            <Label>Điểm tích lũy</Label>
            <Value color={Theme.orange}>0</Value>
          </Block>
        </RowItem>
        <ShareSection />
      </ScrollView>
    </Wrapper>
  );
}

export default memo(ContactTab);
