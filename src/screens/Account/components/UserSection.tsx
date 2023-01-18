import {Separator} from '@/components/Separator';
import Icons from '@/Icons';
import {useMe} from '@/store/auth';
import React, {memo} from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

const RowBetween = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Wrapper = styled.View`
  height: 148px;
  background-color: ${p => p.theme.backgroundInput};
  margin-top: ${getStatusBarHeight()}px;
  margin: 120px 24px 0px 24px;
  border-radius: 12px;
`;
const SViewInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 16px;
`;

const AvatarWrapper = styled.View`
  background-color: ${p => p.theme.blueMain};
  height: 100px;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  align-self: center;
  margin-top: -50px;
`;

const AvatarIcon = styled.Image`
  width: 46px;
  height: 44px;
`;

const NormalText = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${p => p.theme.black};
`;

const UserSection = memo(function () {
  const user = useMe();

  return (
    <Wrapper>
      <AvatarWrapper>
        <AvatarIcon source={Icons.icAvatar} />
      </AvatarWrapper>
      <SViewInfo>
        <RowBetween>
          <NormalText>Tên nhân viên:</NormalText>
          <NormalText>{user.username}</NormalText>
        </RowBetween>
        <Separator />
        <RowBetween>
          <NormalText>Mã nhân viên:</NormalText>
          <NormalText>{user.partyId}</NormalText>
        </RowBetween>
        <Separator />
        <RowBetween>
          <NormalText>Vi trí:</NormalText>
          <NormalText>Nhân viên thu ngân</NormalText>
        </RowBetween>
      </SViewInfo>
    </Wrapper>
  );
});

export default UserSection;
