import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import Icons from '@/Icons';
import Theme from '@/Colors';
import {CartContext} from '../Cart/CartConext';
import {fetchListProduct} from '@/store/product/api';
import {getLocaleNumber} from '@/utils/convertString';
import {IFullProduct} from '@/store/product/type';
import {
  Code,
  useCameraDevice,
  useCodeScanner,
  Camera,
} from 'react-native-vision-camera';
import {_, height, width} from '@/global';
import BarcodeView from './BarcodeView';
import {Text} from 'react-native';

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Image = styled.Image``;

const Label = styled.Text`
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  color: #ffffff;
  margin-left: 12px;
`;

const SHeader = styled.View`
  flex-direction: row;
  position: absolute;
  top: 50px;
  left: 20px;
  align-items: center;
  z-index: 2;
`;

const SFooter = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 24px;
  align-items: flex-end;
  padding: 0px 24px;
  z-index: 2;
`;

const CartWrapper = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const CartCountView = styled.View`
  position: absolute;
  background: #ff9500;
  border-radius: 12px;
  width: 26px;
  height: 20px;
  align-items: center;
  justify-content: center;
  right: 0;
  top: -3px;
  left: 34px;
`;

const ProductWrapper = styled.View`
  height: 76px;
  flex: 1;
  background-color: #fff;
  margin: 0px 16px;
  border-radius: 12px;
  padding: 12px;
`;

const BtnSelect = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  background: ${Theme.blue2};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const CartCountLabel = styled.Text`
  font-size: 10px;
  color: #fff;
`;

const TxtNameProduct = styled.Text`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
`;

const TxtPrice = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`;
const Button = styled.TouchableOpacity``;

const SWrapperChangeCount = styled(Row)`
  margin-top: 4px;
`;

const IconCount = styled.Image`
  width: 24px;
  height: 24px;
`;

const CountInput = styled.TextInput`
  width: 32px;
  text-align: center;
  padding: 0;
  background-color: transparent;
`;
const SView = styled.View`
  flex: 1;
`;

const BtnClear = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  background: ${Theme.error};
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const QRScan = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');

  const {products, setProducts} = useContext(CartContext);

  const [productQR, setProductQr] = useState<IFullProduct>();
  const [tempCount, setTempCount] = useState<number>(1);
  const [startScan, setStartScan] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const getScanData = async qrCode => {
    global.showLoading();
    const {data: dataProducts} = await fetchListProduct({
      name: qrCode,
    });
    global.hideLoading();

    if (dataProducts.length > 0) {
      setProductQr(dataProducts?.[0]);
    } else {
      global.showMessage('không tìm thấy sản phẩm');
      setProductQr(undefined);
    }
  };

  const reset = () => {
    setStartScan(false);
    setProductQr(undefined);
    setTempCount(1);
  };

  const selectProduct = () => {
    reset();
    const indexExisted = products.findIndex(
      p =>
        p?.product?.productId === productQR?.productId &&
        p?.config?.quantityUomId === productQR.configs?.[0].quantityUomId,
    );
    const findExistItem = indexExisted !== -1 ? products[indexExisted] : null;
    const item = {
      product: productQR,
      config: productQR?.configs?.[0],
      count: !findExistItem ? tempCount : findExistItem.count + tempCount,
    };
    const newList = [...products, item];

    indexExisted !== -1 && (products[indexExisted] = item);

    setProducts(indexExisted !== -1 ? [...products] : newList);
  };

  const onChangeCountByInput = (t: string) => {
    if (!t) return setTempCount(0);
    if (!/\d+$/g.test(t) || !!Number.isNaN(Number(t))) return;
    setTempCount(Math.floor(Number(t)));
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: true});
    }
  };

  const onScanQr = () => {
    setStartScan(true);
  };

  const onCodeScanned = useCallback(
    (codes: Code[]) => {
      if (codes.length > 0) {
        const code = codes[0]?.value;
        setStartScan(false);
        startScan && getScanData(code);
      } else {
        global.showMessage(
          'Chưa nhận dạng được barcode, vui lòng đặt lại sản phẩm vào chính giữa màn hình',
        );
      }
    },
    [startScan],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['code-128', 'code-39', 'code-93', 'codabar', 'ean-13', 'ean-8'],
    onCodeScanned: onCodeScanned,
  });

  useEffect(() => {
    (async () => {
      let status = await Camera.getCameraPermissionStatus();
      if (['not-determined', 'denied', 'restricted'].includes(status)) {
        status = await Camera.requestCameraPermission();
      }
      setHasPermission(status === 'granted');
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{
        flex: 1,
      }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        contentContainerStyle={styles.container}>
        {Platform.OS === 'android' && (
          <StatusBar backgroundColor="transparent" translucent={true} />
        )}
        {device != null && hasPermission ? (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            // torch={'on'}
            enableZoomGesture={true}
          />
        ) : (
          <Text style={{color: 'white'}}>
            Có lỗi xảy ra khi cấp quyền camera
          </Text>
        )}
        <SFooter>
          {productQR ? (
            <BtnClear onPress={reset}>
              <Image source={Icons.icClose} style={{tintColor: 'white'}} />
            </BtnClear>
          ) : (
            <CartWrapper
              onPress={() => {
                Actions.push('create_order', {productFromQr: true});
              }}>
              <Image source={Icons.icCart} />
              {products.length > 0 && (
                <CartCountView>
                  <CartCountLabel>{products.length}</CartCountLabel>
                </CartCountView>
              )}
            </CartWrapper>
          )}
          {productQR ? (
            <ProductWrapper>
              <TxtNameProduct numberOfLines={1}>
                {productQR.productName}
              </TxtNameProduct>
              <SWrapperChangeCount>
                <TxtPrice>
                  {getLocaleNumber(
                    productQR.configs?.[0]
                      ? productQR.configs?.[0].priceOut.price +
                          productQR.configs?.[0].priceOut.taxAmount
                      : 0,
                  )}
                  đ
                </TxtPrice>
                <Row>
                  <Button
                    hitSlop={{top: 15, left: 15, bottom: 15}}
                    onPress={() =>
                      tempCount > 1 && setTempCount(tempCount - 1)
                    }>
                    <IconCount source={Icons.icCountReduce} />
                  </Button>
                  <CountInput
                    hitSlop={{top: 15, bottom: 15}}
                    selectTextOnFocus
                    value={tempCount + ''}
                    keyboardType="numeric"
                    onChangeText={onChangeCountByInput}
                  />
                  <Button
                    hitSlop={{top: 15, right: 15, bottom: 15}}
                    onPress={() => setTempCount(tempCount + 1)}>
                    <IconCount source={Icons.icCountRaise} />
                  </Button>
                </Row>
              </SWrapperChangeCount>
            </ProductWrapper>
          ) : (
            <SView />
          )}
          {!productQR ? (
            <BtnSelect onPress={onScanQr}>
              <Image source={Icons.icon_qr} />
            </BtnSelect>
          ) : (
            <BtnSelect onPress={selectProduct}>
              <Image source={Icons.icSelectedWhite} />
            </BtnSelect>
          )}
        </SFooter>
        <SHeader>
          <TouchableOpacity onPress={() => Actions.pop()}>
            <Image source={Icons.icBack} />
          </TouchableOpacity>
          <Label>Quét mã sản phẩm</Label>
        </SHeader>
        <BarcodeView
          width={width * 0.8}
          height={height * 0.35}
          showAnimatedLine={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const QRScanScreen = () => {
  return <QRScan />;
};

export default QRScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    width: width * 0.7,
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
