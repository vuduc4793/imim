import {StyleSheet} from "react-native";
import {AppDimensions, Colors} from "../../constants";
export default styles = StyleSheet.create({
  bottomLine: {
    width: AppDimensions.WINDOW_WIDTH,
    height: 0.5,
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
  },
  subText: {
    fontSize: 13,
  },
  subTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 14,
    resizeMode: "cover",
    tintColor: Colors.colorPrimary,
    marginRight: 10
  },
  titleTextStyle: {
    color: Colors.headerSection,
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    fontFamily: Platform.OS === 'android' ? 'SegoeUI-Bold' : 'SegoeUI-Bold',
    flex: 1
  },
  subTitleTextStyle: {
    color: Colors.colorBlack2,
    fontSize: AppDimensions.SMALL_TEXT_SIZE,
    fontFamily: Platform.OS === 'android' ? 'SegoeUI' : 'SegoeUI',
    flex: 1
  },
});