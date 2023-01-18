import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export const Separator = React.memo((props: any) => {
  return <View {...props} style={[styles.container(props), props.style]} />;
});

const styles = StyleSheet.create<{container: any}>({
  container: (props: any) => ({
    backgroundColor: 'transparent',
    height: props.height ?? 8,
    width: props.width ?? 8,
  }),
});
