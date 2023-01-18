import React, {memo} from 'react';
import styled from 'styled-components/native';
import {NormalText} from './TextCommon';
import SVGIcon from '@/Icons/SVGIcon';

const EmptyView = styled.View`
  padding: 16px;
  align-items: center;
`;
const EmptyText = styled(NormalText)`
  text-align: center;
  margin-top: 12px;
`;
const EmptyComponent = memo(function ({content}: {content?: string}) {
  return (
    <EmptyView>
      <SVGIcon name="item-search-empty" />
      <EmptyText>{content}</EmptyText>
    </EmptyView>
  );
});

export default EmptyComponent;
