import {StyleSheet} from "react-native";
import {AppDimensions, Colors} from "../../constants";
export default styles = StyleSheet.create({
  stylePagerContainer: {
    backgroundColor: Colors.colorBlack5, 
    width: AppDimensions.WINDOW_WIDTH,
    height: 30
  },
  bottomLine: {
    width: AppDimensions.WINDOW_WIDTH,
    height: 1,
    backgroundColor: Colors.colorBlack3,
    opacity: 0.2,
    shadowColor: Colors.colorBlack3,
    shadowOffset: { width: 0, height: 5 },
  },
  styleTextNoData: {
    fontSize: 19,
    color: 'black',
    fontFamily: Platform.OS === 'android' ? 'SegoeUI-Light' : 'SegoeUI-Light',
    alignSelf: 'center'
  },
  styleTextInput: {
    width: AppDimensions.WINDOW_WIDTH * 0.7,
    color: 'white',
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'SegoeUI-Light' : 'SegoeUI-Light',
  }
});