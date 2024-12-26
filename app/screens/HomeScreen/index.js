import React from 'react';
import {
  View,
  Text,
  FlatList,
  Alert, 
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../components/MyStatusBar';

import {Arrays, Colors, Styles, AppDimensions, Texts, Icons, Numbering} from "../../constants";
import { connect } from 'react-redux';
import Header,{ HEADER_HEIGHT} from '../../components/Header';
import { ButtonMain } from '../../components/ButtonMain';
// import firebase from 'react-native-firebase';
import styles from "./styles";
import { Notifications } from 'react-native-notifications';
import DeviceInfo from "react-native-device-info";
// import { AdMobBanner} from 'react-native-admob'; 
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { StorageUtils, Utils } from "../../helper";
class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      appName: Texts.appName,
      bannerImgLink: Icons.IC_BANNER,
      adsImgLink : null,
      adsHeight: 0,
      showMenu: false
    };
    
  }

  renderHeader() {
    return (
      <View style={[{ backgroundColor: Colors.white }, Styles.styleHeader]}>
        <Header
          body={this.renderHeaderBody()}
          right={Numbering.SHOW_ADS ? this.renderHeaderRight() : <View/>}
          left={Numbering.SHOW_ADS ? this.renderHeaderLeft() : <View/>}
        />
      </View>
    );
  }

  renderHeaderRight() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this.openSetting}>
          <Image source={Icons.IC_SETTING} style={[Styles.styleHeaderImageTopLeft, {tintColor: Colors.colorPrimary}]} />
        </TouchableOpacity>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this.openNoti}>
          <Image source={Icons.IC_NOTI} style={[Styles.styleHeaderImageTopRight, {tintColor: Colors.colorPrimary}]} />
        </TouchableOpacity>
      </View>
    );
  }

  openNoti = () => {
    this.props.navigation.navigate('NotificationScreen');
  }

  openSetting = () => {
    this.props.navigation.navigate('SettingScreen');
  }

  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, {color: Colors.colorPrimary, fontFamily: 'SegoeUI-BoldItalic'}]}>
          {this.state.appName}
        </Text>
      </View>
    );
  }

  render() {
    let fake = false;
    console.log("AppDimensions.WINDOW_HEIGHT", AppDimensions.WINDOW_HEIGHT)
    console.log("HEADER_HEIGHT", HEADER_HEIGHT)
    console.log("STATUSBAR_HEIGHT", STATUSBAR_HEIGHT)
    console.log("Utils.getBottomSafeAreaHeight()", Utils.getBottomSafeAreaHeight())
    console.log("this.state.adsHeight", this.state.adsHeight)
    console.log("adUnitID = ", Numbering.NATIVE_AD_ID)
    let imageHeight = (AppDimensions.WINDOW_WIDTH - 20) / 1100 * 619
    console.log("imageHeight = ", imageHeight)
    var adsHeight = this.state.isShowAd ? this.state.adsHeight - 5 : -20
    if (fake) {
      adsHeight = 50  // FAKE:iPhone: 50
    } 
    var itemHeight = (AppDimensions.WINDOW_HEIGHT - HEADER_HEIGHT - STATUSBAR_HEIGHT - Utils.getBottomSafeAreaHeight() - adsHeight - imageHeight ) / 3
    // if (Platform.OS === 'ios') {
    //   if (Platform.isPad ) {
        // itemHeight = 290 - adsHeight / 4
      // }
    // } else {
      // itemHeight += 5
    // }
    console.log("itemHeight",itemHeight)

    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {/* <Image
          style={styles.banner}
          source={Icons.IC_BANNER}
        /> */}
        <View style={[styles.banner, {height: Platform.isPad ? (imageHeight - 120) : (imageHeight - 50)}]}>
          <Image source={this.state.bannerImgLink} 
            style={{flex: 1,
            width: AppDimensions.WINDOW_WIDTH - 20,
            height: imageHeight}}
            onError={this.onLoadBannerError}
          >
        </Image>
        </View>
        <View 
          style={
            {flex: 1, paddingBottom: this.state.isShowAd ? adsHeight + 20 : 10,
              paddingTop: 10, 
            borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
          <FlatList
            style={{flexGrow: 0}}
            data={Arrays.listHomeFeature}
            renderItem={({ item, index }) => 
              <ButtonMain
                uri={item.uri}
                title={item.title}
                onPress={() => this._onClick(item)}
                height={itemHeight}
              />
            }
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
        
        {
          !Platform.isPad && <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%"}}/>
        }
      </View>
    );
  }

  _onClick = (item) => {
    if (item.id === 0) {
      this.props.navigation.navigate('AboutUs',{
        title: item.title,
        screenType: item.title
      });
    } else if (item.id === 1) {
      this.props.navigation.navigate('MLMLawList');
    } else if (item.id === 2) {
      this.props.navigation.navigate('MLMCompanyList');
    } else if (item.id === 3) {
      this.props.navigation.navigate('QAndA');
    } else if (item.id === 4) {     
      // if (Platform.OS === 'ios') {
        this.props.navigation.navigate('AgentNotice');
      // } else {
      //   this.props.navigation.navigate('NewsAndAlert');
      // }
    } else if (item.id === 5) {
      this.props.navigation.navigate('ListNews');
    } else if (item.id === 6) {
      this.props.navigation.navigate('AboutUsiOS')
    } else {

    }
  }

  async componentDidMount(){
    if (Platform.OS === 'ios') {
      // Request permissions on iOS, refresh token on Android
      Notifications.registerRemoteNotifications();
    }
    let appName = await StorageUtils.getData(Numbering.kHomeTitle);
    if (appName){
      this.setState({appName: appName});
    }
    let bannerImgLink = await StorageUtils.getData(Numbering.kBannerLink);
    if (bannerImgLink){
      this.setState({bannerImgLink: {uri: bannerImgLink}});
    }

  }
  onLoadBannerError=(error)=>{
    this.setState({ bannerImgLink: Icons.IC_BANNER})
  }
  FCMFunction() {
    this.checkPermission();
    this.messageListener();
    
  }

  showAlert = (title, message) => {
    Alert.alert(title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }
 isIphoneX = () => {
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      DeviceInfo.hasNotch
    );
  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  
}

function mapStateToProps(state) {
  const { backgroundColor, typeRead, fontSize, fontFamily, distanceRow } = state.settingUI;
  return {
    backgroundColor,
    typeRead,
    fontSize,
    fontFamily,
    distanceRow
  };
}

const mapDispatchToProps = {
  changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow
};

export default HomeScreen
