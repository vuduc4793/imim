import React from "react";
import { KeyboardAvoidingView, View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Colors, Styles, AppDimensions, Icons} from '../../constants';
import PropTypes from 'prop-types';
let keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0
export const COMMENTBOX_HEIGHT = 50
class CommentBox extends React.PureComponent{
  constructor(props){
    super(props);
    this.state = {
      placeholder: this.props.placeholder ? this.props.placeholder : "Nhập nội dung"
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text})
  }
  componentDidMount() {
    // this is to check if a refName prop is FUNCTION; 
    if (typeof this.props.refName === "function") {
      this.props.refName(this.refs.inp);
    }
  }

  render() {
    return (
      <View 
        // behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[this.props.containerStyle, {width: "100%", alignItems: 'center'}]}
        // keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={[styles.container,this.props.style]}>
            <TextInput
              style={styles.text}
              placeholder={this.state.placeholder}
              placeholderTextColor={Colors.colorBlack2}
              onChangeText={(text) => this.props.onTextChange(text)}
              onSubmitEditing={()=> this.props.onSubmit()}
              clearButtonMode="while-editing"
              maxLength={300}
              ref={"inp"}
            />
            <TouchableOpacity 
              onPress={()=>{this.props.onSubmit()}}
              style={{alignItems: 'center', alignContent: 'center', height: 50, width: 35, justifyContent: 'center'}}>
              <Image 
                source={Icons.IC_SUBMIT}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
      </View>
    )

  }
}
CommentBox.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentBox;
const styles = StyleSheet.create({
  container: {
    height: COMMENTBOX_HEIGHT, 
    paddingVertical: 5,
    paddingLeft: 7,
    flexDirection: 'row',
    alignItems: "center",
    borderRadius: 15,
    width: '95%',
    justifyContent: 'center',
    backgroundColor: '#eef0f3',
    borderWidth: 1, 
    borderColor: Colors.colorBlack3
  }, text: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    fontFamily: 'SegoeUI',
    flex: 1,
    height: 40,
  }, icon : {
    resizeMode: 'contain',
    height: 30, 
    width: 30
  }
})