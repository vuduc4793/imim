import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles"
import {Colors} from '../../constants';

export const CustomSettingUIItem = ({ text, onClick, idChoose }) => (
  <TouchableOpacity
    style={[styles.container, { backgroundColor: idChoose ? Colors.colorBlue : Colors.colorBlack5 }]}
    onPress={onClick}
  >
    <Text style={[styles.text, { color: idChoose ? Colors.white : Colors.colorBlack2 }]}>{text}</Text>
  </TouchableOpacity>
);