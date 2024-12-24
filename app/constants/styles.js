import { StyleSheet, Platform } from 'react-native';
import {AppDimensions, Colors} from "./index.js"
export default styles = StyleSheet.create({
  // header
  styleHeader: {
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    paddingHorizontal: 0
  },
  styleHeaderCenter: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  styleHeaderCenterText: {
    fontSize: AppDimensions.LARGE_TEXT_SIZE,
    alignSelf: 'center',
    // marginLeft: 40, 
    // marginRight: 40
  },
  styleHeaderButtonTopLeft: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'center',
    alignSelf:'center',
  },
  styleHeaderImageTopLeft: {
    width: 27, 
    height: 40, 
    resizeMode: 'contain', 
    tintColor: 'white',
  },
  styleHeaderImageTopRight: {
    width: 27, 
    height: 40, 
    resizeMode: 'contain',
    marginRight: 7
  },
  containerView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  titleHeader: {
    fontSize: AppDimensions.SCREEN_WIDTH / 24,
    fontWeight: "bold",
  },
  wrapperHeader: {
    backgroundColor: Colors.colorPrimary,
    minHeight: 50,
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10
  },

  seperatorOfItemList: {
    width: AppDimensions.WINDOW_WIDTH,
    height: 1,
    backgroundColor: Colors.colorBlack3,
    opacity: 0.2,
  }, 
  activityIndicatorStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0, 
    alignItems: 'center',
    justifyContent: 'center' 
  },
  submitButton:{
    // backgroundColor: Colors.colorPrimary,
    width: "50%",
    alignSelf: "center",
    // borderRadius: 15
  },
  // section style
  headerSectionStyle: {
    marginBottom: AppDimensions.SMALL_PADDING_VERTICAL,
  },
  textFieldInSectionStyle:{
    marginBottom: AppDimensions.SMALL_PADDING_VERTICAL,
    height: 70
  },
  sectionStyle: {
    borderRadius: 15,
    width: '95%',
    marginTop: AppDimensions.SMALL_PADDING_VERTICAL,
    // marginBottom: AppDimensions.SMALL_PADDING_VERTICAL,
    paddingHorizontal: AppDimensions.SMALL_PADDING_HORIZONTAL,
    paddingVertical:AppDimensions.SMALL_PADDING_VERTICAL,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    flexDirection: "column",
  },
  // Float label
  floatLabelStyle: {
    fontSize: Platform.OS === 'ios' ? 15 : 10,
    height: 20,
    fontFamily: 'SegoeUI-Light',
    color: "black",
    backgroundColor: 'transparent'
  },
  floatInputStyle: {
    fontSize: Platform.OS === 'ios' ? AppDimensions.NORMAL_TEXT_SIZE: AppDimensions.SMALL_TEXT_SIZE,
    fontFamily: 'SegoeUI',
    color: 'black',
    backgroundColor: 'transparent', 
    height:  Platform.OS === 'ios' ? 40: 80
  },

  mlmCompanyFlatListContainer: {
    flex: 1, alignItems:'flex-start', width: '100%'
  },
  mlmCompanyFlatList: {
    flex: 1, paddingLeft: 10, paddingRight: 10, alignSelf: 'flex-start', width: '100%'
  }

});