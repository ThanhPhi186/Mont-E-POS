import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${p => p.theme.backgroundColor};
`;

const WrapperInfo = styled.View`
  background: ${p => p.theme.backgroundInput};
  padding: 12px 16px;
`;

const RowBetWeen = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TitleInfo = styled.Text`
  color: #1c1c1e;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  padding-bottom: 12;
`;

const LabelInfo = styled.Text`
  color: #1c1c1e;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  width: 70%;
  text-align: right;
  margin-bottom: 8px;
`;

const LabelTitle = styled.Text`
  color: #8e8e93;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 8px;
`;

const DetailCustomerScreen = memo(() => {
  const {item} = useNavigationParams<any>();

  return (
    <ScreenWithTitle title="Chi tiết khách hàng">
      <Wrapper>
        <TitleInfo>Thông tin khách hàng</TitleInfo>

        <WrapperInfo>
          <RowBetWeen>
            <LabelTitle>Cửa hàng</LabelTitle>
            <LabelInfo>{item.officeSiteName || '(Chưa cập nhật)'}</LabelInfo>
          </RowBetWeen>
          <RowBetWeen>
            <LabelTitle>Khách hàng</LabelTitle>
            <LabelInfo>{item.fullName}</LabelInfo>
          </RowBetWeen>
          <RowBetWeen>
            <LabelTitle>Số điện thoại:</LabelTitle>
            <LabelInfo>{item.telecomNumber || '(Chưa cập nhật)'}</LabelInfo>
          </RowBetWeen>
          <RowBetWeen>
            <LabelTitle>Địa chỉ:</LabelTitle>
            <LabelInfo>{item.fullAddress}</LabelInfo>
          </RowBetWeen>
        </WrapperInfo>
      </Wrapper>
    </ScreenWithTitle>
  );
});

export default DetailCustomerScreen;
