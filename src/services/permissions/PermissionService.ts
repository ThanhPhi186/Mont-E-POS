import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

const permissionCode =
  Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  }) || PERMISSIONS.IOS.CAMERA;

async function checkCameraPermission() {
  const permissionResult = await check(permissionCode);
  return permissionResult;
}

async function requestCameraPermission() {
  const permissionResult = await request(permissionCode);
  return permissionResult;
}

const PermissionService = {
  requestCameraPermission,
  checkCameraPermission,
};

export default PermissionService;
