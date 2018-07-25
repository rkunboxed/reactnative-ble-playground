/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Httptest} from './httptest';

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => Httptest);
