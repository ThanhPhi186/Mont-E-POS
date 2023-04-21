import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  Platform,
} from 'react-native';

const __emitter =
  Platform.OS === 'ios' ? NativeAppEventEmitter : DeviceEventEmitter;

export default {
  UPDATE_LIST_CUSTOMER: 'UPDATE_LIST_CUSTOMER',

  send: (event: any, message?: any) => __emitter.emit(event, message),
  listen: (event: any, callback: any) =>
    __emitter.addListener(event, message => callback(message)),
  removeAll: event => __emitter.removeAllListeners(event),
};
