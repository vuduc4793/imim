import {Dimensions, Platform} from "react-native";
export default {
  WINDOW_WIDTH: Dimensions.get("window").width,
  WINDOW_HEIGHT: Dimensions.get("window").height,
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  SMALL_PADDING_HORIZONTAL: 10,
  SMALL_PADDING_VERTICAL: 10,
  NORMAL_PADDING_HORIZONTAL: 15,
  NORMAL_PADDING_VERTICAL: 15,
  NORMAL_TEXT_SIZE: Platform.isPad ? 24 : 18,
  LARGE_TEXT_SIZE: Platform.isPad ? 27 : 20,
  SMALL_TEXT_SIZE: Platform.isPad ? 22 : 14,
  MAX_TEXT_SIZE: Platform.isPad ? 27 : 20,
  MIN_TEXT_SIZE: Platform.isPad ? 22 : 14,
  BOTTOM_SAFE_AREA: 0
}