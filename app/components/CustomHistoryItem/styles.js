import {StyleSheet} from "react-native";
import {Colors, AppDimensions} from "../../constants";
export default styles= StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: AppDimensions.WINDOW_HEIGHT/12,
  },
  subContainer: {

  },
  text:{
    flex: 7
  },
  icon:{
    height: 15,
    width: 15,
    tintColor: Colors.colorPrimary,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "flex-start"
  },
  rightArrowWrapper: {
    flex: 1,
    alignItems: "flex-end",
  },
  rightArrow:{
    height: 15,
    width: 15,
  }
})
