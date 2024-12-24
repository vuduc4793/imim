import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import styles from "./styles"
export default class TitleBar extends React.PureComponent{
  constructor(props){
    super(props);
    this.state= {
      title: this.props.title
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({title: nextProps.title})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.titleLayout}>
            <Text style={styles.styleTextTitleBar}>{this.state.title}</Text>
          </View>
        </View>
        <View style={styles.bottomLine} elevation={5}/>
      </View>
    )

  }
}
