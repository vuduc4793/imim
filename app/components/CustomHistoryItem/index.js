import React from "react";
import {Image, TouchableOpacity, View,Text} from "react-native";
import styles from "./styles"
import Constants from '../../constants';
export const CustomHistoryItem = ({icon, text, onClick}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onClick}
  >
    {icon ? <View style={styles.iconWrapper}>
      <Image source={icon} style={styles.icon}/>
    </View> : null}
    <Text style={styles.text}>{text}</Text>
    <View style={styles.rightArrowWrapper}>
      <Image source={Constants.Icons.IC_NEXT} style={styles.rightArrow}/>
    </View>
  </TouchableOpacity>
);