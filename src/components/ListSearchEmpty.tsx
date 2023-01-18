import React, { memo } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import SVGIcon from '@/Icons/SVGIcon';

const Footer = styled(View)`
  padding: 12px;
  align-items: center;
  width: 100%;
`;

const ListSearchEmpty = memo(function () {
  return (
    <Footer>
      <SVGIcon name="item-search-empty" />
    </Footer>
  );
});
export default ListSearchEmpty;
