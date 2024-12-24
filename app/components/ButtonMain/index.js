import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Platform
} from 'react-native';
import {Colors, AppDimensions} from '../../constants';
import {getBottomSafeAreaHeight, isIphoneX} from '../../helper/Utils'
export const ButtonMain = ({ uri, title, onPress , height}) => {
  console.log("ButtonMain.height = ", height)
  console.log("ButtonMain.height image = ", AppDimensions.WINDOW_HEIGHT * 0.1)
  console.log("ButtonMain.width image = ", AppDimensions.WINDOW_WIDTH * 0.1)

  return (
    <TouchableOpacity
      style={[styles.container, height && {height}]}
      onPress={onPress}
    >
      <Image
        style={
          { width: Platform.isPad ? 80 : AppDimensions.WINDOW_HEIGHT * 0.1, 
            height: Platform.isPad ? 80 : AppDimensions.WINDOW_WIDTH * 0.1, 
            resizeMode: 'contain', tintColor: 'white' }}
        source={uri}
      />
      <Text style={styles.styleText}>{title}</Text>
    </TouchableOpacity>
  )
};

export const ButtonTabMorong = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.containerTabMorong}
      onPress={onPress}
    >
      <Text style={[styles.styleText, { flex: 1 }]}>{title}</Text>
      <Image
        style={{ width: 13, height: 13, resizeMode: 'contain', tintColor: 'white', marginRight: 10 }}
        source={uri}
      />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: AppDimensions.WINDOW_WIDTH * 0.47,
    height: (AppDimensions.WINDOW_HEIGHT - 320 - (isIphoneX() ? 30 : 0))/3,
    backgroundColor: Colors.colorPrimaryDark,
    borderRadius: Platform.isPad ? 20 : 7,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: AppDimensions.WINDOW_WIDTH * 0.015
  },
  containerTabMorong: {
    flexDirection: 'row',
    width: AppDimensions.WINDOW_WIDTH * 0.9,
    backgroundColor: Colors.colorPrimaryDark,
    borderRadius: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 20
  },
  styleText: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    fontFamily: 'SegoeUI',
    color: 'white',
    margin: 10,
    textAlign: "center",
    marginTop: 10
  }
});