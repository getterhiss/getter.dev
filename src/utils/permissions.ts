import { requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { PermissionsAndroid } from 'react-native';

/**
 * Android NEEDS permission before joining video, or there is a FATAL crash!
 * https://github.com/twilio/video-quickstart-android/issues/430
 */
export const requestAndroidPermissions = async (): Promise<boolean> => {
  try {
    const p = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]
    );
      
    if (p["android.permission.CAMERA"] === 'granted' && p["android.permission.RECORD_AUDIO"] === 'granted') {
      return true;
    } else {
      console.log('Camera & microphone permissions denied.', p);
    }
      
  } catch (err) {
    console.warn('Android Permissions Error: ', err);
  }
  return false;
};

/**
 * https://github.com/react-native-community/react-native-permissions#checkmultiple
 */ 
export const requestiOSPermissions = async (): Promise<boolean> => {
  try {
    const p = await requestMultiple([
      PERMISSIONS.IOS.CAMERA, 
      PERMISSIONS.IOS.MICROPHONE,
    ]);
      
    if (p[PERMISSIONS.IOS.CAMERA] === 'granted' && p[PERMISSIONS.IOS.MICROPHONE] === 'granted') {
      return true;
    } else {
      console.log('Camera & microphone permissions denied.', p);
    }
      
  } catch (err) {
    console.warn('iOS Permissions Error: ', err);
  }
  return false;
};