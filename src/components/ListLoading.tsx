import React, {memo} from 'react';
import styled from 'styled-components/native';
import {View, ViewProps} from 'react-native';
import Theme from '@/Colors';

const Footer = styled(View)`
  padding: 12px;
  align-items: center;
  width: 100%;
  height: 40px;
`;
const ActivityIndicator = styled.ActivityIndicator``;

const ListLoading = memo(function ({
  loading,
  ...props
}: {loading: boolean} & ViewProps) {
  return (
    <Footer {...props}>
      {loading && <ActivityIndicator color={Theme.blue2} />}
    </Footer>
  );
});
export default ListLoading;
