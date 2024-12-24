import React from "react";
import {View, TextInput, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from "../../constants";
import styles from "./style"

export default class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    }
    this._onTextChange.bind(this);
  }

  _onTextChange = (searchText) => {
    this.setState({searchText})
    setTimeout(() => {
      this.props.onTextChange(this.state.searchText);
    }, 1000)
  }

  render() {
    return (
      <View style={styles.containerView}>
        <TouchableOpacity style={styles.iconWrapper}>
          <Icon name="search" size={20}/>
        </TouchableOpacity>
        <TextInput style={{flex: 7}} onChangeText={this._onTextChange}
                   value={this.state.searchText} placeHolder={this.props.placeholder}/>
        {
          this.state.searchText !== "" &&
          <TouchableOpacity style={styles.iconWrapper} onPress={this.clearText}>
            <Icon name="close" size={20}/>
          </TouchableOpacity>
        }

      </View>
    )
  }

  clearText = () => {
    this._onTextChange("")
  }
}