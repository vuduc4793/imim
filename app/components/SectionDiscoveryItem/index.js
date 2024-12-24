import React from "react";
import {AppDimensions, Colors, Texts} from "../../constants";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {StoryHorizontalItem} from "../StoryHorizontalItem";
import styles from "./styles"

export default class SectionDiscoveryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      listData: this.props.listData
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row", marginBottom: 15}}>
          <View style={{flex: 1, alignItems: "flex-start"}}>
            <Text style={{fontWeight: "bold"}}>{this.props.title}</Text>
          </View>
          <TouchableOpacity
            style={{flex: 1, alignItems: "flex-end"}}
            onPress={this.props.onSectionClick}
          >
            <Text style={{color: Colors.colorPrimary}}>{Texts.viewMore}</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          style={{width: AppDimensions.WINDOW_WIDTH}}
          renderItem={({item, index}) => (
            <StoryHorizontalItem
              image={item.cover}
              onClick={() => this.props.onItemClick(index)}
              title={item.title}/>
          )}
          data={this.props.listData}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    )
  }
}
