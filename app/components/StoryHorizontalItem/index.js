import React from "react";
import {View, TouchableOpacity, Image, Text} from "react-native";
import Constants from '../../constants';

const containerSize = Constants.AppDimensions.WINDOW_WIDTH * 2 / 7;
export const StoryHorizontalItem = ({image, title, onClick}) => (
  <TouchableOpacity
    style={{
      flexDirection: "column",
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 10,
      width: containerSize,
      height: 150
    }}
    onPress={onClick}
  >
    <Image
      style={{height: 130, width: containerSize - 10, marginBottom: 10}}
      source={{uri: image}}/>
    <Text style={{textAlign: "center"}}>{title}</Text>
  </TouchableOpacity>
);