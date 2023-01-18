import {getReportTorSalesState} from '@/store/report/api';
import {getLocaleNumber} from '@/utils/convertString';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Wrapper = styled.View`
  padding: 16px;
  background-color: #fff;
  border-radius: 16px;
  margin: 0 24px;
  margin-top: 8px;
`;

const Label = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #1c1c1e;
`;
const LabelBold = styled.Text`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${p => p.theme.blueMain};
`;

const RevShareSection = memo(function () {
  const [revShare, setRevShare] = useState<{
    grandTotal: number;
    returnTotal: number;
  }>({grandTotal: 0, returnTotal: 0});

  const getData = useCallback(async () => {
    const data = await getReportTorSalesState();
    setRevShare(data);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      <Row>
        <Label>Doanh số ca:</Label>
        <Label>{getLocaleNumber(revShare?.grandTotal)} đ</Label>
      </Row>
      <Row>
        <Label>Trả lại:</Label>
        <Label>{getLocaleNumber(revShare?.returnTotal)} đ</Label>
      </Row>
      <Row>
        <LabelBold>Tổng doanh số ca:</LabelBold>
        <LabelBold>
          {getLocaleNumber(revShare?.grandTotal - revShare?.returnTotal)} đ
        </LabelBold>
      </Row>
    </Wrapper>
  );
});

export default RevShareSection;
