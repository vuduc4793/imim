import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import {Colors, Styles, AppDimensions, Icons} from '../../constants';
import {Avatar, Badge} from "react-native-elements";
export const CompanyCommentItem = ({name, content, time, isReviewing, reply, onPressItem}) => (
  <View style={[styles.container]}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar 
        rounded={true}
        title={initials(name)}
        size={50}
        activeOpacity={0.7}
        overlayContainerStyle={{color: Colors.colorBlack4, backgroundColor: Colors.colorBlack4}}/>
      <View style= {{
        flexDirection:'column',
        alignItems: "flex-start",
        flex: 1,
        paddingLeft: 7 
      }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.content}>{content}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.time}>{time}</Text>
          {isReviewing && <Badge status="warning" value="Đang duyệt" />}
        </View>
      </View>
    </View>
    {
      (reply && reply.text) && <View style={{marginTop:7, flexDirection: 'column', alignItems: 'center'}}>
        {/* <View style={{
          width: '100%', 
          height: 0.2, 
          backgroundColor: Colors.colorBlack3, 
          marginBottom: 7,
          opacity: 0.2,
        }}/> */}
        <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}}>
          <View style= {{
            flexDirection:'column',
            alignItems: "flex-end",
            flex: 1,
            paddingRight: 7 
          }}>
            <Text style={styles.name}>Admin</Text>
            <Text style={styles.content}>{reply.text}</Text>
          </View>
          <Avatar 
            rounded={true}
            source={Icons.IC_ADMIN}
            size={50}/>
        </View>
      </View>
    }
  </View>
);
function initials(value){
  if (!value) {
    return "U"
  }
  var result = "";
  var tokens = value.split(/\s/);
  for(var i =0; i < tokens.length; i++){
    result += tokens[i].substring(0,1).toUpperCase();
    if (i===1){
      break
    }
  }
  return result;
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    // alignItems: "center",
    paddingVertical: 10
  },
  name: {
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    color: Colors.colorBlack2,
    fontFamily:'SegoeUI-Bold',
    textAlign: 'left'
  },
  content: {
    flex:1,
    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
    color: Colors.headerSection,
    fontFamily: 'SegoeUI',
    textAlign: 'left'
  },
  time: {
    flex:1,
    fontSize: AppDimensions.SMALL_TEXT_SIZE,
    color: Colors.colorBlack2,
    fontFamily: 'SegoeUI-Light',
    textAlign: 'left',
    marginRight: 4
  }
})