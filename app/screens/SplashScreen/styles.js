import { StyleSheet } from "react-native";
import {AppDimensions, Colors} from "../../constants"

export default styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  styleText: {
    fontSize: 21,
    color: 'white',
    fontFamily: Platform.OS === 'android' ? 'SegoeUI-BoldItalic' : 'SegoeUI-BoldItalic',
  },
  styleLoadingText: {
    fontSize: 17,
    color: Colors.colorPrimary,
    fontFamily: Platform.OS === 'android' ? 'SegoeUI' : 'SegoeUI',
    alignSelf: "center"
  },
  container: {
    flex: 1, 
    flexDirection: 'column',
    marginLeft: 20, 
    marginRight: 20, 
    marginBottom: 40, 
    marginTop: 40,
    justifyContent: "center",
    alignItems: 'center'
  },
  backgroundImage: {
    width: AppDimensions.WINDOW_WIDTH,
    height: AppDimensions.WINDOW_HEIGHT,
    resizeMode: 'center',
    alignSelf: 'center'
  }
  
});