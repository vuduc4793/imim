import {StyleSheet} from "react-native";

export default styles = StyleSheet.create({
  styleHeader: {
    minHeight: 50, 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    paddingHorizontal: 10
  },
  styleTopHeader: {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  styleButtonTopLeft: {
    width: 34, 
    height: 34, 
    justifyContent: 'center', 
    marginLeft: 5
  },
  styleImageTopLeft: {
    width: 15, 
    height: 15, 
    resizeMode: 'contain', 
    tintColor: 'black'
  }
});