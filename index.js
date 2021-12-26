/**
 * @format
 */

// https://github.com/software-mansion/react-native-gesture-handler/issues/320#issuecomment-757515236
import 'react-native-gesture-handler';

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  LogBox.ignoreAllLogs();
}

AppRegistry.registerComponent(appName, () => App);
