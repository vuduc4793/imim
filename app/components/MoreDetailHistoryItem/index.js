import React from "react";
import {View, TouchableOpacity, Image, Text} from "react-native";
import Constants from '../../constants';
import styles from "./style";

export const MoreDetailHistoryItem = ({name, author, numberOfChapter, genre, imgLink, onClick}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={onClick}
  >
    <Image
      style={styles.image}
      source={{uri: imgLink}}/>
    <View style={styles.textContainer}>
      <Text style={styles.historyName}>{name}</Text>
      <View style={styles.subTextWrapper}>
        <Image
          source={Constants.Icons.IC_PENCIL}
          style={styles.icon}
        />
        <Text style={styles.subText}>{author}</Text>
      </View>

      <View style={styles.subTextWrapper}>
        <Image
          source={Constants.Icons.IC_UPLOAD}
          style={styles.icon}
        />
        <Text style={styles.subText}>{numberOfChapter}</Text>
      </View>
      <Text style={[styles.subText, {flex: 1}]}>{genre}</Text>
    </View>

  </TouchableOpacity>
);