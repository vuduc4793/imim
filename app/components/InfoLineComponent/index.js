import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet,Linking } from "react-native";
import {Colors, Styles, AppDimensions, Icons} from '../../constants';
import PropTypes from 'prop-types';

class InfoLineComponent extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      info1 : this.props.info1 ? this.props.info1 : '',
      info2 : this.props.info2 ? this.props.info2 : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({info1: nextProps.info1});
    this.setState({info1: nextProps.info2});
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}
      >
        <View style={{ flex: 1, padding: 5 }}>
          <Text 
          style={{fontSize: AppDimensions.SMALL_TEXT_SIZE, fontFamily: 'SegoeUI-Bold', color: Colors.headerSection, textAlign: 'left'}}>
            {this.state.info1.title}</Text>
          <TouchableOpacity style={{alignItems: 'flex-start', justifyContent: 'center'}}
          onPress={()=>{
            if (this.isLinkAvailable(this.state.info1.title)){
              this.openLink(this.state.info1.content, this.state.info1.title);
            }
          }}>
            <Text style={[
              {
                fontSize: AppDimensions.NORMAL_TEXT_SIZE, 
                fontFamily: 'SegoeUI', 
                color: this.isLinkAvailable(this.state.info1.title) ? Colors.colorPrimary: Colors.colorBlack2, textAlign: 'left'
              }, this.isLinkAvailable(this.state.info1.title) && {
                textDecorationLine: 'underline',
              }
            ]
            }>{this.state.info1.content ? this.state.info1.content :'N/A'}</Text>
          </TouchableOpacity>

        </View>
        <View style={{width: AppDimensions.SMALL_PADDING_HORIZONTAL}}/>
        <View style={{ flex: 1, padding: 5}}>
          <Text style={{fontSize: AppDimensions.SMALL_TEXT_SIZE, fontFamily: 'SegoeUI-Bold', color: Colors.headerSection, textAlign: 'left'}}>{this.state.info2.title ? this.state.info2.title : ''}</Text>
          <TouchableOpacity style={{alignItems: 'flex-start', justifyContent: 'center'}}
           onPress={()=>{
             if (this.isLinkAvailable(this.state.info2.title)){
              this.openLink(this.state.info2.content, this.state.info2.title);
             }
          }}>
            <Text style={[
              {
                fontSize: AppDimensions.NORMAL_TEXT_SIZE, 
                fontFamily: 'SegoeUI', 
                color: this.isLinkAvailable(this.state.info1.title) ? Colors.colorPrimary : Colors.colorBlack2, textAlign: 'left'
              }, this.isLinkAvailable(this.state.info2.title) && {
                textDecorationLine: 'underline',
              }
            ]
            }>{this.state.info2.content ? this.state.info2.content :(this.state.info2.title ? 'N/A' : '')}</Text>
          </TouchableOpacity>
        </View>
    </View>
    )

  }
  openLink=(link, title)=>{
    if (link === 'NA'){
      return;
    }
    if (title === "Điện thoại" || title === "Hotline"){
      link= 'tel:' + link;
    } else if (title === "Website" && !link.includes('http')){
      link = 'http://'+ link; 
    } else {
      link= "mailto:"+link;
    }
    
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    }).catch(err=>{
      console.log("openLink err: " , link, ' ',err);
    });
  }

  isLinkAvailable=(text)=>{
    return text === "Điện thoại" || text==="Hotline" || text === "Website" 
    || text === "Email" || text == "Tệp";
  }
}

InfoLineComponent.propTypes = {
  info1: PropTypes.object.isRequired,
  info2: PropTypes.object,
  style: PropTypes.object
};

export default InfoLineComponent;
const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    color: Colors.headerSection,
    fontFamily: 'SegoeUI-Bold',
    textAlign: 'center'
  }
})