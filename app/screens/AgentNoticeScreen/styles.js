import {StyleSheet} from "react-native";
import {AppDimensions, Colors} from "../../constants";
export default styles = StyleSheet.create({
  intro:{
    fontSize: 16,
    fontFamily: 'SegoeUI',
    color: Colors.colorBlack2
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#158bff"
  },
  content: {
    backgroundColor: '#fff',
  },
  active: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#b0b0b0'
  },
  inactive: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#b0b0b0'
  }
});