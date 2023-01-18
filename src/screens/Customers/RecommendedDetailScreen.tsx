import ScreenWithTitle from '@/components/ScreenWithTitle';
import {useNavigationParams} from '@/hooks/navigation';
import React, {memo} from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;
const WrapperStatus = styled.View`
  background-color: rgba(255, 149, 0, 0.1);
  padding: 12px 16px;
  border: 1px solid #ff9500;
  border-radius: 12px;
`;

const WrapperInfo = styled.View`
  background: ${p => p.theme.backgroundInput};
  padding: 12px 16px;
`;

const RowBetWeen = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const LabelStatus = styled.Text`
  color: #ff9500;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const TitleInfo = styled.Text`
  color: #1c1c1e;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  margin: 16px 0;
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

const RecommendedDetailScreen = memo(() => {
  const {item} = useNavigationParams();

  return (
    <ScreenWithTitle title="Chi tiết đề xuất">
      <Wrapper>
        <WrapperStatus>
          <LabelStatus>Đề xuất đang chờ phê duyệt</LabelStatus>
        </WrapperStatus>
        <TitleInfo>Thông tin khách hàng</TitleInfo>

        <WrapperInfo>
          <RowBetWeen>
            <LabelTitle>Cửa hàng</LabelTitle>
            <LabelInfo>{item.officeSiteName}</LabelInfo>
          </RowBetWeen>
          <RowBetWeen>
            <LabelTitle>Khách hàng</LabelTitle>
            <LabelInfo>{item.customerName}</LabelInfo>
          </RowBetWeen>
          <RowBetWeen>
            <LabelTitle>Số điện thoại:</LabelTitle>
            <LabelInfo>{item.phone}</LabelInfo>
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

export default RecommendedDetailScreen;
