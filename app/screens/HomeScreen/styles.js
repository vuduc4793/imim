import {StyleSheet} from "react-native";
import {AppDimensions} from "../../constants";

export default styles = StyleSheet.create({
  banner: {
    width: AppDimensions.WINDOW_WIDTH - 20,
    height: 150,
    marginBottom: 2,
    alignSelf: 'center',
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden"
  }
});