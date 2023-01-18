import ScreenWithTitle from '@/components/ScreenWithTitle';
import SubmitButton from '@/components/SubmitButton';
import {heightScreen, widthScreen} from '@/utils/Tranform';
import moment from 'moment';
import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
import {Linking, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import CustomerSection from '../Cart/components/CustomerSection';
import {CartContext, CartProvider} from '../Cart/CartConext';
import {startCheckin, startCheckOut} from '@/store/customers/api';
import {ResponseMess} from '@/constants/someMessage';

const Wrapper = styled.View`
  flex: 1;
`;
const TextDate = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #000000;
`;
const TextTime = styled.Text`
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: #007aff;
  margin-top: 4px;
  margin-bottom: 16px;
`;

const SSubmitButton = styled(SubmitButton)`
  /* margin-top: 24px; */
`;

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const ASPECT_RATIO = widthScreen / heightScreen;
const LATITUDE_DELTA = 0.1;

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const BASE_LATITUDE = 21.0287747;
const BASE_LONGITUDE = 105.850176;

const CheckInOut = memo(() => {
  const {customer, setCustomer} = useContext(CartContext);

  const [region, setRegion] = useState<IRegion>({
    latitude: BASE_LATITUDE,
    longitude: BASE_LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        setRegion({
          ...region,
          latitude,
          longitude,
        });
      },
      err => {
        if (err.PERMISSION_DENIED === 1) {
          global.showAlert({
            title: 'Yêu cầu quyền truy cập',
            description:
              'Bạn cần cấp quyền truy cập vị trí để có thể checkin/checkout',
            textNext: 'Tiếp tục',
            textCancel: 'Bỏ qua',
            onNext: () => Linking.openSettings(),
          });
        } else {
          Geolocation.requestAuthorization(() => {
            getCurrentLocation();
          });
        }
      },
    );
  }, []);

  const checkIn = async () => {
    const position = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    global.showLoading();
    const {checkInOk, message} = await startCheckin(
      `${customer?.partyId}`,
      position,
    );
    const finalMessage = ResponseMess[message] || message;
    global.hideLoading();
    global.showMessage(finalMessage);
    if (checkInOk === 'Y') {
      setCustomer({
        ...customer,
        checkInOk: 'Y',
      });
    }
  };

  const checkOut = async () => {
    const position = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    global.showLoading();
    const {checkOutOk, message} = await startCheckOut(
      `${customer?.partyId}`,
      position,
    );
    const finalMessage = ResponseMess[message] || message;
    global.hideLoading();
    global.showMessage(finalMessage);
    if (checkOutOk === 'Y') {
      setCustomer({
        ...customer,
        checkOutOk: 'Y',
      });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <ScreenWithTitle title="Check-in/Check-out">
      <Wrapper>
        <TextDate>{moment().format('DD/MM/YYYY')}</TextDate>
        <TextTime>{moment().format('HH:mm:ss')}</TextTime>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          style={styles.map}
          moveOnMarkerPress
          scrollDuringRotateOrZoomEnabled={false}
          showsUserLocation
        />
        <CustomerSection disabled />
      </Wrapper>
      <SSubmitButton
        disabled={
          (customer?.checkInOk === 'Y' && customer?.checkOutOk === 'Y') ||
          !customer
        }
        text={customer?.checkInOk === 'N' ? 'Check in' : 'Check out'}
        onPress={customer?.checkInOk === 'N' ? checkIn : checkOut}
      />
    </ScreenWithTitle>
  );
});

const CheckInOutScreen = () => {
  return (
    <CartProvider>
      <CheckInOut />
    </CartProvider>
  );
};

export default CheckInOutScreen;

const styles = StyleSheet.create({
  map: {
    height: 150,
    width: '100%',
    marginVertical: 8,
  },
});
