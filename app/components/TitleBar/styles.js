import { StyleSheet, Dimensions } from "react-native";
import {Colors, AppDimensions} from "../../constants";


export default styles = StyleSheet.create({
  styleTextTitleBar: {
    fontWeight: 'bold'
  },
  titleLayout: {
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    flexDirection: 'row',
    flex: 1,
    // padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: AppDimensions.WINDOW_WIDTH,
    height: AppDimensions.WINDOW_HEIGHT / 13,
    flexDirection: "column",
  },
  bottomLine: {
    width: AppDimensions.SCREEN_WIDTH,
    height: 1,
    backgroundColor: Colors.colorBlack3,
    opacity: 0.2,
    shadowColor: Colors.colorBlack3,
    shadowOffset: { width: 0, height: 5 },
  }
})