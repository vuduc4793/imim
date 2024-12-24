import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  View,
  Image,
  AsyncStorage,
  Text
} from 'react-native';

import Realm from 'realm';
import * as DBSchema from '../../realm/constant';
import { databaseOptions } from '../../realm/index';
import {Colors, AppDimensions, Numbering, Jsons, Icons,Styles, Texts} from "../../constants"
import styles from './styles';
import { getDataVersion } from '../../services/api';
import {saveData, ABOUT_US, LUU_Y_NHA_PHAN_PHOI}from "../../helper/StorageUtils";
import RNFetchBlob from 'rn-fetch-blob';
import NetInfo from "@react-native-community/netinfo";
import {nonAccentVietnamese, removeHTMLTags} from "../../helper/Utils";
import RNBootSplash from "react-native-bootsplash";
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import KeyboardManager from "react-native-keyboard-manager"
import { StorageUtils } from '../../helper';
class SplashScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log('this.props.navigation',JSON.stringify(props.navigation));
    this.state = {
      isLoading: true,
      isInInterval: true,
      dbVer: '',
      downloadLink: '',
      animateTypeIndex: 0,
      animateTypes: [ 'Bounce','Pulse','ChasingDots',],
      settingObj: {},
      appName: Texts.appName
    };
    
  }

  async componentDidMount() {
    RNBootSplash.hide({ duration: 0 });

    let time = 0;
    let self = this;
    let timer = setInterval(function() {
      time = time - 1;
      if (time%2==0){
        self.setState({animateTypeIndex: self.state.animateTypeIndex + 1})
      }
      console.log('time', time);
      if (time < 0) {
        clearInterval(timer);
        self.setState({
          isInInterval: false
        }, ()=>{
          console.log('self.state.isLoading', self.state.isLoading);
          if (self.state.isLoading == false){
            console.log('reach 60');
            console.log('self.props.navigation',JSON.stringify(self.props.navigation));
            self.props.navigation.replace('Home');
          }
        })
      }
    }, 1000);

    await this.getSetting();
    this.CheckConnectivity();
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnableAutoToolbar(true);
    }

  }
  
  getSetting = async() => {
    let fontSize;
    try {
      fontSize = parseInt(await AsyncStorage.getItem(Numbering.normalTextSize));
    }
    catch(error) {
      console.log('getSetting err', error);
    }  
    if (!fontSize){
      fontSize = AppDimensions.SMALL_TEXT_SIZE;
    }
    console.log("getSetting fontSize" + fontSize);
    this.props.changeFontSize(fontSize);
  }

  CheckConnectivity = () => {
    // For Android devices
    if (Platform.OS === "android") {
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if (state.isConnected) {
          this.checkVersionFromAPI();
        } else {
          this.checkOffLineModeAvailable();
        }
      });
    } else {
      // For iOS devices
      this.checkVersionFromAPI();
    }
  };

  checkVersionFromAPI () {
    if (Numbering.FAKE){
      let data = Jsons.DATA;
            
      this.setState({
        settingObj: data.setting,
        appName : data.setting[Numbering.kHomeTitle],
        dbVer: 0
      }, ()=>{
        this.saveDataToDB(data);
      })
      return;
    } 
    let self = this;
    console.log('reach 124')
    getDataVersion().then(response => {
      console.log("getDataVersion response"+ JSON.stringify( response));
      this.getLocalDataVersion().then(localDataVer => {
        console.log("SplashScreen:localDataVer= ", localDataVer);
        console.log("SplashScreen:response.dbVer ", response.data.dbVer);
        console.log("response.data.setting[Numbering.kShowAds]", response.data.setting[Numbering.kShowAds]);
        if (response.data.setting[Numbering.kShowAds]){
          Numbering.SHOW_ADS = response.data.setting[Numbering.kShowAds]
          console.log("Numbering.SHOW_ADS", Numbering.SHOW_ADS);
        }
        if (response.data.dbVer != localDataVer){
          this.setState({
            dbVer: response.data.dbVer,
            downloadLink: response.data.mockup,
            settingObj: response.data.setting ? response.data.setting : {}, 
          }, ()=>{
            console.log('response.data.setting',response.data.setting)
            if (response.data.setting[Numbering.kHomeTitle]){
              this.setState({appName : response.data.setting[Numbering.kHomeTitle]})

            }
            this.getFile();
          })
          
          console.log("SplashScreen", "response.dbVer !== localDataVer");
        } else {
          console.log("SplashScreen", "response.dbVer === localDataVer");
          this.setState({
            isLoading: false
          });
          if (this.state.isInInterval == false) {
            this.props.navigation.replace('Home');
          } 
        }
      }).catch(error => {
        console.log('getLocalDataVersion error', JSON.stringify(error));
        console.log('getLocalDataVersion error.message', error.message);
        Alert.alert("Thông báo", "Có lỗi trong quá trình tải dữ liệu ứng dụng về máy! (151)");
      })
      
    }).catch(err => {
      console.log('getDataVersion error', err);
      Alert.alert('getDataVersion error.message', JSON.stringify(err?.data));
      // this.checkOffLineModeAvailable();
    });
  }

  checkOffLineModeAvailable = async() =>{
    console.log('reach 167');

    const localDataVer = await this.getLocalDataVersion();
    console.log('localDataVer', localDataVer)
    console.log('reach 169');

    if (localDataVer){
      this.setState({
        isLoading: false
      });
      console.log('reach 162');
      if (this.state.isInInterval == false) {
        console.log('reach 164');
        this.props.navigation.replace('Home');
      } 
    } else {
      Alert.alert("Thông báo", "Có lỗi trong quá trình tải dữ liệu ứng dụng về máy! (173)");
    }
  }

  getFile = async() => {
    this.setState({isLoading: true});
   
    if (Numbering.FAKE){
      let data = Jsons.DATA;
      this.saveDataToDB(data);
      return;
    } 
    RNFetchBlob.fetch('GET', this.state.downloadLink, {
    // Authorization : 'Bearer access-token...',
      // more headers  ..
    })
    .then((res) => {
      let status = res.info().status;

      if(status == 200) {
        let json = res.json();
        // console.log("json = "+ JSON.stringify(json));
        this.saveDataToDB(json);
      } else {
        // handle other status codes
        console.log('getFile err', res.info());

        Alert.alert("Thông báo", "Có lỗi trong quá trình tải dữ liệu ứng dụng về máy! (200)");
      }
    })
    .catch((errorMessage, statusCode) => {
      console.log('getFile err', errorMessage);
      // error handling
      Alert.alert("Thông báo", "Có lỗi trong quá trình tải dữ liệu ứng dụng về máy! (206)");
    })
    
  }

  saveDataToDB = async(data) => {
    try {
      //erase asyncstorage data
      let allAsyncStorageKeys = await AsyncStorage.getAllKeys();
      if (allAsyncStorageKeys && allAsyncStorageKeys.length > 0){
        await AsyncStorage.multiRemove(allAsyncStorageKeys);
      }
      console.log('reach here 159')

      let realm = await Realm.open(databaseOptions);
      realm.write(() => {
        //erase realm data
        realm.deleteAll();
        console.log('reach here 165')

        // realm.create(DBSchema.DB_INFO_SCHEMA, {'version': data.dbVer});
        // data.daCapCompanyList.forEach((element,index) => {
        //   element.textForSearch = nonAccentVietnamese(element.HoSoChung.TenDoanhNghiep+ " "+ element.HoSoChung.DiaChi);

        //   element.HoSoChung = JSON.stringify(element.HoSoChung);
        //   element.HoSoCapNhat = JSON.stringify(element.HoSoCapNhat);
        //   element.TruSoChinh = JSON.stringify(element.TruSoChinh);
        //   element.ThongTinNguoiDaiDien = JSON.stringify(element.ThongTinNguoiDaiDien);
        //   element.ThongTinChuSoHuu = JSON.stringify(element.ThongTinChuSoHuu);
        //   element.index = index;
        //   element.tenKhongDau = element.tenKhongDau ?? ""
        //   console.log('element.tenKhongDau', element.tenKhongDau ?? "");

        //   realm.create(DBSchema.MLM_COMPANY_SCHEMA, element);
        // });
        console.log('reach here 174')
        // data.contactInfo.forEach((element,index) => {
        //   element.id = index;
        //   realm.create(DBSchema.CONTACT_INFO_SCHEMA, element);
        // });
        data.qAndA.forEach((element,index) => {
          element.index = index;
          element.summary = this.substringAnswer(element.answer);
          element.textForSearch = nonAccentVietnamese(element.question+ " "+ element.answer);

          realm.create(DBSchema.Q_AND_A_SCHEMA, element);
        });
        console.log('reach here 188')

        data.phapLuatBHDC.forEach((elementPL,index) => {
          if (index >= 10){
            return;
          }
          let schema = "PHAP_LUAT_DOC_"+ (index +1 )+ "_SCHEMA";
          //info
          let info = {
            name: removeHTMLTags(elementPL.name),
            shortName: removeHTMLTags(elementPL.shortName),
            schemaName: schema,
            numberOfItem: elementPL.list.length,
            link: elementPL.link ? elementPL.link  : ''
          };
          realm.create(DBSchema.LAW_DOC_INFO_SCHEMA, info);
          
          //data
          elementPL.list.forEach((element,indexx) => {
            element.id = indexx;
            element.summary = this.substringAnswer(element.content);
            element.textForSearch = nonAccentVietnamese(element.title+ " "+ element.content);
            element.title = removeHTMLTags(element.title)
            element._id = element._id ?? ""
            console.log('element._id', element._id);

            realm.create(schema, element);
          });
        });
      });
      realm.close();
      await saveData(ABOUT_US, data.aboutUs);
      await saveData(LUU_Y_NHA_PHAN_PHOI, JSON.stringify(data.luuYNhaPhanPhoi));
      //save setting
      let adsSetting = data.ads? data.ads : {};
      console.log('adsSetting', JSON.stringify(adsSetting))
      let {settingObj }= this.state;
      await saveData(Numbering.kHomeTitle, settingObj[Numbering.kHomeTitle] ? settingObj[Numbering.kHomeTitle].trim() : '');
      await saveData(Numbering.kBannerLink, settingObj[Numbering.kBannerLink] ? settingObj[Numbering.kBannerLink].trim() : '');
      await saveData(Numbering.kYoutubeLink, settingObj[Numbering.kYoutubeLink]? settingObj[Numbering.kYoutubeLink].trim() : '');
      await saveData(Numbering.kMlmCompanyListUpdateAt, settingObj[Numbering.kMlmCompanyListUpdateAt] ? settingObj[Numbering.kMlmCompanyListUpdateAt].trim() :'');
   
      await saveData(Numbering.kAdsLink, adsSetting.link ? adsSetting.link.trim() : '');
      await saveData(Numbering.kAdsContent, adsSetting.html ? adsSetting.html.trim() : '');

      await this.setState({isLoading: false});
      StorageUtils.saveData(Numbering.kDbVersion, this.state.dbVer)

      if (this.state.isInInterval == false) {
        this.props.navigation.replace('Home');
      } 
    }
    catch(error){
        // Handle error
      console.log('saveDataToDB error', error)
      Alert.alert("Thông báo", "Có lỗi trong quá trình tải dữ liệu ứng dụng về máy!(302)");
    }
  }

  substringAnswer = (answer) => {
    let r = answer;
    r = removeHTMLTags(r);
    if (answer.length > 100){
      r = answer.substring(0, 100);
      let lastIndexOfBlankSpace = r.lastIndexOf(" ");
      if (lastIndexOfBlankSpace > 0){
        r = r.substring(0, lastIndexOfBlankSpace-1);
      }
      r = r.trim();
    } 
    r += "...";
    
    return r;
  }

 
  componentWillUnmount() {
  
  }

  render = () => {
    console.log('reach componentDidMount splash   ')
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
          {/* <Image source={Icons.IC_BANNER} style={{
            width: AppDimensions.WINDOW_WIDTH - 30,
            height: (AppDimensions.WINDOW_WIDTH - 20)/565*581}}>
          </Image> */}
          <View style={{height: 10}}></View>
          <Text style={[Styles.styleHeaderCenterText, {color: Colors.colorPrimary, fontSize: 25, fontFamily: 'SegoeUI-Bold', marginBottom: 10}]}>
            {this.state.appName}
          </Text>
          <Text style={[Styles.styleHeaderCenterText, {color: Colors.headerSection, fontSize: 18, fontFamily: 'SegoeUI-LightItalic'}]}>
            {"Đang tải dữ liệu..."}
          </Text>
          <View style={{height: 6}}></View>
          {/* <Spinner 
            isVisible={true} 
            size={AppDimensions.WINDOW_WIDTH/3 - 10} 
            type={this.state.animateTypes[this.state.animateTypeIndex < this.state.animateTypes.length ? this.state.animateTypeIndex: 0]} 
            color={Colors.colorPrimary}/> */}
            
      </View>
      </View>
    );
  }

  getLocalDataVersion = async() =>{
    try {
      return await StorageUtils.getData(Numbering.kDbVersion)
    } catch (error) {
      console.log('getLocalDataVersion err', error );
      return null;
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
