import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  // AsyncStorage,
  Switch,
  ActivityIndicator,
  Platform,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, Jsons, Numbering, AppDimensions} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";
import { FlatList } from 'react-native-gesture-handler';
const ITEM_PER_LOADING = 10;
import {Utils, DateTimeUtils} from "../../helper";
import { Notifications } from 'react-native-notifications';

class SettingScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 1,
      data: Numbering.SHOW_ADS ? [
        {
          "title": "Về chúng tôi", 
          "imageSource": Icons.IC_INFO
        }, {
          "title": "Thông báo ứng dụng",
          "subTitle": "Các thông báo bao gồm tin tức cập nhật về bán hàng đa cấp tại Việt Nam",
          "imageSource": Icons.IC_NOTI,
          "isToggle": true
        }
      ] : [{
        "title": "Về chúng tôi", 
        "imageSource": Icons.IC_INFO
      }],
      isSearch: false,
      keyword: "",
      isLoading: false,
      isToggleEnable: false
    };
  }

  async componentWillMount() {
    // let hasPermissions = await Notifications.isRegisteredForRemoteNotifications();
    let currentPermissions = await Notifications.ios.checkPermissions()
    console.log('Provides App currentPermissions ' + JSON.stringify(currentPermissions));

    console.log('Provides App Notification Settings enabled: ' + currentPermissions.alert);
    var hasPermissions = !!currentPermissions.alert

    if (hasPermissions) {
      try {
        let kEnableNotification = await AsyncStorage.getItem(Numbering.kEnableNotification)
        hasPermissions = kEnableNotification== null || (kEnableNotification == "y")
        console.log("Numbering.kEnableNotification = ", kEnableNotification)
      }
      catch(error) {
        console.log('getSetting err', error);
      } 
    } else {
      
    }
    this.setState({
      isToggleEnable: hasPermissions
    })
  }
  
  async componentDidMount(){ 
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
        
        {
          this.state.isLoading &&
          <ActivityIndicator
            style={Styles.activityIndicatorStyle}
            size="large" 
            color={colors.colorPrimary}
          />
        }
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }

  renderHeader() {
    return (
      <View style={[{ backgroundColor: Colors.colorPrimary },Styles.styleHeader]}>
        <Header
          body={this.renderHeaderBody()}
          left={this.renderHeaderLeft()}
          right={this.renderHeaderRight()}

        />
      </View>
    );
  }


  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text numberOfLines={2} style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
          Cài đặt
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={[Styles.styleHeaderImageTopLeft, {tintColor: 'white'}]} />
        </TouchableOpacity>
      </View>
    );
  }
  renderHeaderRight() {
    return (
      <View>
        {/* <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._openSearch}>
          <Image source={Icons.IC_FIND} style={[Styles.styleHeaderImageTopRight, {tintColor: 'white'}]} />
        </TouchableOpacity> */}
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <FlatList 
            style={{flex: 1}}
            data={this.state.data}
            renderItem={({ item, index }) => {
              return <TouchableOpacity 
                style={{flex: 0, margin: 10}}
                onPress={() => this._onClick(item, index)}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                  {/* <Image
                    style={{height: 60, width: 60, borderRadius: 5 }}
                    source={item.imageSource}
                  /> */}
                  <View style={[{backgroundColor: 'transparent', width: Platform.isPad ? 20 : 10}]}/>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={[styles.subTextWrapper, {paddingBottom: 10}]}>
                      <Text style={[styles.titleTextStyle, item.subTitle && {alignSelf: 'center'}]}>{item.title}</Text>
                    </View>
                    {
                      item.subTitle && <View style={[styles.subTextWrapper, {paddingBottom: 10}]}>
                        <Text style={styles.subTitleTextStyle}>{item.subTitle}</Text>
                      </View>
                    }
                  </View>
                  {
                    item.isToggle && <View style={{paddingRight: Platform.isPad ? 20 : 10}}>
                    <Switch
                      trackColor={{ false: "#767577", true: "#81b0ff" }}
                      thumbColor={this.state.isToggleEnable ? Colors.colorPrimary : Colors.colorGray}
                      // ios_backgroundColor='white'
                      onValueChange={ async () => {
                        let currentPermissions = await Notifications.ios.checkPermissions()
                        console.log('Provides App Notification Settings enabled: ' + !!currentPermissions.alert);
                        var hasPermissions = !!currentPermissions.alert
                        if (!hasPermissions) {
                          Alert.alert("Thông báo",
                            "Bạn chưa cấp quyền nhận thông báo cho ứng dụng. Vui lòng vào cài đặt để bật quyền này.",
                            [
                              {text: 'Đi tới cài đặt', onPress: () => {console.log('OK Pressed'); Linking.openURL('App-Prefs:NOTIFICATIONS_ID&path=com.mywill.bhdc')}},
                              {text: 'Hủy bỏ', onPress: () => {console.log('Cancel Pressed');}},
                            ],
                            {cancelable: false},
                          );
                          return
                        }
                        this.setState({
                          isToggleEnable: !this.state.isToggleEnable
                        },async () => {
                          let newFlag = this.state.isToggleEnable ? 'y' : 'n'
                          try {
                            // isToggleEnable = parseInt(await AsyncStorage.getItem(Numbering.kEnableNotification));
                            AsyncStorage.setItem(Numbering.kEnableNotification, newFlag)
                          }
                          catch(error) {
                            console.log('getSetting err', error);
                          } 
                        })
                      }}
                      value={this.state.isToggleEnable}
                    />
                  </View>
                  }
                </View>
              </TouchableOpacity>
              }
                
            }
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={()=><View style={styles.bottomLine} elevation={5} />
            }
          />
        </View>
        <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor:'transparent'}}/>

      </View>
      
    );
  } 
  _onClick = (item, index) => {
    console.log("onclick "+ JSON.stringify(item));
    if (index == 0) {
      this.props.navigation.navigate('AboutUsiOS')
    }
  }

  handleLoadMore = () => {
    let {startIndex} = this.state;
    if (!this.state.isLoading) {
      this.setState({
        startIndex: startIndex + ITEM_PER_LOADING,
        isLoading: true
      }, () => {
        this.getData();
      });
       
    }
  };

  getData = () =>{
    
    
  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);

