import {TouchableOpacity, Text, View} from "react-native"
import styles from "./styles"
import React from 'react';

export const CustomGenreItem = ({text, onPressItem}) => (
    <View style={styles.container}>
      {text ? (<TouchableOpacity style={styles.subContainer}
                                  onPress={onPressItem}>
        <Text>{text}</Text>
      </TouchableOpacity>) : null}
    </View>
);