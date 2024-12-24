import {StyleSheet} from "react-native";
import {AppDimensions, Colors} from "../../constants";
export default styles = StyleSheet.create({
  stylePagerContainer: {
    backgroundColor: Colors.colorBlack5, 
    width: AppDimensions.WINDOW_WIDTH,
    height: 40
  },
  stylePager:{
    flex: 1,
    // backgroundColor: Colors.colorBlack3, 
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30
  },

  stylePagerEdge: {
    width: 34, 
  },

  stylePagerBody: {
    // backgroundColor: Colors.colorBlueGray,
    justifyContent: 'space-around',
    flex: 1
  },

  stylePagerTitle: {
    fontSize: AppDimensions.SCREEN_WIDTH / 25,
    alignSelf: 'center',
    marginLeft: 10,
    marginRight: 10,
    color:Colors.headerSection,
    fontFamily:'SegoeUI-Bold'
  },
  stylePagerIndicator: {
    width: 21, 
    height: 30, 
    resizeMode: 'contain', 
    tintColor: 'black'
  }
});