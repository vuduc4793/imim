import {StyleSheet} from "react-native";
import {AppDimensions, Colors} from "../../constants";
export default styles = StyleSheet.create({
  stylePagerContainer: {
    backgroundColor: Colors.colorBlack5, 
    width: AppDimensions.WINDOW_WIDTH,
    flex: 0
  },
  stylePager:{
    flex: 0,
    // backgroundColor: Colors.colorBlack3, 
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7
    // height:
  },

  stylePagerEdge: {
    width: 34, 
  },

  stylePagerBody: {
    // backgroundColor: Colors.colorBlueGray,
    justifyContent: 'space-around',
    flex: 0,
    width: AppDimensions.WINDOW_WIDTH - 90,
    alignSelf: "center"
  },

  stylePagerTitle: {
    fontSize: 16,
    alignSelf: 'center',
    // marginLeft: 10,
    // marginRight: 10,
    flex: 1,
    textAlign: "center",
    color: Colors.headerSection,
    fontFamily:'SegoeUI-Bold'
  },
  stylePagerIndicator: {
    width: 21, 
    height: 30, 
    resizeMode: 'contain', 
    tintColor: 'black'
  }
});