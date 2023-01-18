import React, {useContext, useEffect, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  PixelRatio,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styled from 'styled-components/native';
import Icons from '@/Icons';
import Theme from '@/Colors';
import {CartContext, CartProvider} from '../Cart/CartConext';
import {fetchListProduct} from '@/store/product/api';
import {getLocaleNumber} from '@/utils/convertString';
import {IFullProduct} from '@/store/product/type';
import {
  Camera,
  sortFormats,
  useCameraDevices,
} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {height, width} from '@/global';
import BarcodeView from './BarcodeView';

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
  bottom: 50px;
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

const SViewScan = styled.View`
  position: absolute;
  top: 20%;
  left: 10%;
  width: 80%;
  aspect-ratio: 1;
  background: rgba(0, 0, 0, 0.5);
`;

const QRScan = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const [pixelRatio] = useState(PixelRatio.get());
  const [format, setFormat] = useState<any>(
    device?.formats.sort(sortFormats)[0],
  );

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  const {products, setProducts} = useContext(CartContext);

  const [lastBarCode, setLastBarCode] = useState<string | undefined>();
  const [productQR, setProductQr] = useState<IFullProduct>();
  const [tempCount, setTempCount] = useState<number>(1);

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
    setLastBarCode('');
    setProductQr(undefined);
  };

  const selectProduct = () => {
    reset();
    const indexExisted = products.findIndex(
      p =>
        p.product.productId === productQR?.productId &&
        p.config.quantityUomId === productQR.configs?.[0].quantityUomId,
    );
    const findExistItem = indexExisted !== -1 ? products[indexExisted] : null;
    const item = {
      product: productQR,
      config: productQR?.configs?.[0],
      count: !findExistItem ? 1 : findExistItem.count + 1,
    };
    const newList = [...products, item];

    indexExisted !== -1 && (products[indexExisted] = item);

    setProducts(indexExisted !== -1 ? [...products] : newList);
  };

  useEffect(() => {
    (async () => {
      let status = await Camera.getCameraPermissionStatus();
      if (status === 'not-determined') {
        status = await Camera.requestCameraPermission();
      }
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (barcodes.length) {
      const screen = Dimensions.get('screen');
      const screenWidth = screen.width * pixelRatio;
      const screenHeight = screen.height * pixelRatio;
      const videoWidth =
        format.videoWidth > format.videoHeight
          ? format.videoHeight
          : format.videoWidth;
      const videoHeight =
        format.videoWidth > format.videoHeight
          ? format.videoWidth
          : format.videoHeight;
      const filledVideoWidth = (videoHeight * screenWidth) / screenHeight;
      const clippedVideoSectionsWidth = Math.abs(filledVideoWidth - videoWidth);
      const clippedVideoSectionWidth = clippedVideoSectionsWidth / 2;
      const squareWidth = (videoWidth - clippedVideoSectionsWidth) * 0.8;

      const barcode = barcodes[0];
      if (barcode.cornerPoints && barcode.cornerPoints.length >= 4) {
        const [topLeft, topRight, bottomRight, bottomLeft] =
          barcode.cornerPoints;

        const top = (topLeft.y + topRight.y) / 2;
        const left = (topLeft.x + bottomLeft.x) / 2;
        const right = (topRight.x + bottomRight.x) / 2;
        const bottom = (bottomLeft.y + bottomRight.y) / 2;

        if (
          left >
            (videoWidth - clippedVideoSectionsWidth) * 0.1 +
              clippedVideoSectionWidth &&
          top > videoHeight * 0.2 &&
          right <
            (videoWidth - clippedVideoSectionsWidth) * 0.9 +
              clippedVideoSectionWidth &&
          bottom < videoHeight * 0.2 + squareWidth
        ) {
          const code = barcode?.displayValue;
          setLastBarCode(code);
          code !== lastBarCode && getScanData(code);
        }
      }
    }
  }, [barcodes]);

  useEffect(() => setFormat(device?.formats.sort(sortFormats)[0]), [device]);

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && (
        <StatusBar backgroundColor="transparent" translucent={true} />
      )}
      {device != null && hasPermission && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={true}
          format={format}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
          zoom={device?.neutralZoom ?? 1}
        />
      )}
      <SFooter>
        <CartWrapper
          onPress={() => {
            Actions.push('create_order', {productFromQr: products});
          }}>
          <Image source={Icons.icCart} />
          {products.length > 0 && (
            <CartCountView>
              <CartCountLabel>{products.length}</CartCountLabel>
            </CartCountView>
          )}
        </CartWrapper>
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
                  onPress={() => tempCount > 1 && setTempCount(tempCount - 1)}>
                  <IconCount source={Icons.icCountReduce} />
                </Button>
                <CountInput
                  hitSlop={{top: 15, bottom: 15}}
                  selectTextOnFocus
                  value={tempCount + ''}
                  // onBlur={onBlurInput}
                  keyboardType="numeric"
                  // onChangeText={onChangeCountByInput}
                  editable={false}
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
        <BtnSelect onPress={selectProduct}>
          <Image source={Icons.icSelectedWhite} />
        </BtnSelect>
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
    </View>
  );
};

const QRScanScreen = () => {
  return (
    <CartProvider>
      <QRScan />
    </CartProvider>
  );
};

export default QRScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
