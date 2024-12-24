import React from "react";
import { Image, View, Text, StyleSheet, Platform, TouchableOpacity } from "react-native";
import {Colors, Styles, AppDimensions, Icons} from '../../constants';
import {Button} from "react-native-elements";
import PropTypes from 'prop-types';

class FontAdjustmentComponent extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      currentFontSize : this.props.currentFontSize
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentFontSize: nextProps.currentFontSize})
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}
      >
        <View style={{ flex: 1 , alignItems: 'center'}}>
          {/* <Button 
            type='clear'
            title="A-"
            textStyle={{fontSize: AppDimensions.NORMAL_TEXT_SIZE}}
            onPress={()=>{
                if (this.state.currentFontSize <= AppDimensions.MIN_TEXT_SIZE){
                  return;
                }
                this.props.onPressDecrease()
                }
              }
          /> */}
          <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 60}}
            onPress={()=>{
              if (this.state.currentFontSize <= AppDimensions.MIN_TEXT_SIZE){
                return;
              }
              this.props.onPressDecrease()
              }
            }
          >
            <Image
              style={
                { width: 25, 
                  height: 25,
                  resizeMode: 'contain', tintColor: Colors.colorPrimary }}
              source={Icons.IC_ZOOM_OUT}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.text, {flex: 1}]}>Cỡ chữ: {this.state.currentFontSize}</Text>
        <View style={{ flex: 1, alignItems: 'center' }}>
          
          <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center', width: 60}}
            onPress={()=>{
              if (this.state.currentFontSize >= AppDimensions.MAX_TEXT_SIZE){
                return;
              }
              this.props.onPressIncrease()
              }
            }
          >
            <Image
              style={
                { width: 25, 
                  height: 25,
                  resizeMode: 'contain', tintColor: Colors.colorPrimary }}
              source={Icons.IC_ZOOM_IN}
            />
          </TouchableOpacity>
        </View>
        {
          (this.props.questionLaw) &&
          <Button 
            type='outline'
            title={this.props.buttonTitle ? this.props.buttonTitle : "Hỏi/đáp"}
            textStyle={{fontSize: AppDimensions.NORMAL_TEXT_SIZE}}
            onPress={()=>{
              this.props.questionLaw()
            }
          }
          />
        }
    </View>
    )

 
  }
}
FontAdjustmentComponent.propTypes = {
  currentFontSize: PropTypes.number.isRequired,
  onPressIncrease: PropTypes.func.isRequired,
  onPressDecrease: PropTypes.func.isRequired,
  style: PropTypes.object
};

export default FontAdjustmentComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: "center",
    height: Platform.isPad ? 70 : 50,
    borderTopColor: Colors.colorBlack3,
    borderTopWidth: 0.3,
    paddingTop: 10
    // backgroundColor: 'gray'
  },
  text: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    color: Colors.headerSection,
    fontFamily: 'SegoeUI-Bold',
    textAlign: 'center'
  }
})