import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {Colors, Styles, AppDimensions} from '../../constants';

export default class HeaderSectionComponent extends React.PureComponent{
  constructor(props){
    super(props);
    this.state= {
      title: this.props.title,
      showSeparator: this.props.showSeparator ?? true
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({title: nextProps.title, showSeparator: this.props.showSeparator ?? true})
  }

  render() {
    return (
      <View style={[styles.container,this.props.style]}
      >
        <Text style={[styles.text]}>{this.state.title}</Text>
        {this.props.showSeparator && 
        <View style={{height: 1, backgroundColor: Colors.headerSection, alignSelf: 'center',  flex: 1 }}/>}
    </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems: "center",
  },
  text: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    color: Colors.headerSection,
    fontFamily: 'SegoeUI-Bold',
    marginRight: AppDimensions.NORMAL_PADDING_HORIZONTAL
  }
})