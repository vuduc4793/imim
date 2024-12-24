import {StyleSheet, Dimensions} from "react-native";
import Constants from "../../constants";
export default styles= StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
  },
  subContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#808080",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: Constants.AppDimensions.WINDOW_HEIGHT/15,
    width:  Constants.AppDimensions.WINDOW_WIDTH*2/5,
  },
})
