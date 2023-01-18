import {height} from '@/global';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';

const BottomSheet = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentModalRef = useRef(null);
  const containerStyleRef = useRef({});

  const onCloseModal = () => setIsVisible(false);

  useImperativeHandle(
    ref,
    () => ({
      open: (element, params) => {
        contentModalRef.current = params?.containerStyles;
        containerStyleRef.current = element;
        setIsVisible(true);
      },
      close: () => {
        containerStyleRef.current = {};
        contentModalRef.current = null;
        setIsVisible(false);
      },
    }),
    [],
  );

  return (
    <ReactNativeModal
      style={styles.modal}
      onDismiss={onCloseModal}
      isVisible={isVisible}
      onBackdropPress={onCloseModal}>
      <View style={styles.crossbarContainer} />
      <View style={[styles.container, containerStyleRef?.current]}>
        {contentModalRef?.current}
      </View>
    </ReactNativeModal>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  modal: {padding: 0, margin: 0, justifyContent: 'flex-end'},
  crossbarContainer: {
    backgroundColor: 'gray',
    borderRadius: 8,
    marginBottom: 9,
    alignSelf: 'center',
    width: 62,
    height: 6,
  },
  container: {
    backgroundColor: 'black',
    minHeight: height / 2,
    borderTopStartRadius: 26,
    borderTopEndRadius: 26,
    width: '100%',
    bottom: 0,
    overflow: 'hidden',
  },
});
