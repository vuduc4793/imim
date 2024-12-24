import {StyleSheet} from "react-native";
import {Colors, AppDimensions} from "../../constants";

export default styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    width: AppDimensions.WINDOW_WIDTH,
    // height: Constants.AppDimensions.WINDOW_HEIGHT/5,
    alignItems: "center"
  },
  textContainer: {
    flex: 7,
    flexDirection: "column",
    marginLeft: AppDimensions.NORMAL_PADDING_HORIZONTAL
  },
  historyName: {
    color: Colors.colorPrimary,
    fontWeight: "bold",
    flex: 2,
  },
  subText: {
    fontSize: 13,
  },
  subTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    width: 12,
    height: 13,
    resizeMode: "cover",
    tintColor: "#808080",
    marginRight: 10
  },
  image: {
    flex: 2,
    height: 100,
    borderRadius: 2
  }
})