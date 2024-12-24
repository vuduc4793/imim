import React, { Component } from 'react';
import {
  View,
  StatusBar,
  Platform,
  Alert
} from 'react-native';
import {Colors, AppDimensions} from '../../constants';
import DeviceInfo from "react-native-device-info";
export const STATUSBAR_HEIGHT = getStatusBarHeight(true)

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
     DeviceInfo.hasNotch()
  );
}
export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}
export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

export const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ height: STATUSBAR_HEIGHT, backgroundColor: isIphoneX() ? Colors.colorPrimary : Colors.colorPrimaryDark, zIndex: 100 }}>
    <StatusBar
      translucent
      backgroundColor={isIphoneX() ? Colors.colorPrimary : Colors.colorPrimaryDark}
      hidden={false}
      barStyle={'light-content'}
      {...props} />
  </View>
);

