import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Share,
  ScrollView,
  Image as RNImage,
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Numbering, AppDimensions, Texts } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from "./styles";

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Image } from 'react-native-elements';
// import { AdMobBanner} from 'react-native-admob';
import { StorageUtils, Utils } from '../../helper';
import { getCompanyDetail } from '../../services/api';
import { parse } from 'fast-xml-parser';

class MLMCompanyDetailCenter extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      companyDataFromList: props?.route?.params?.companyData || '',
      companyData: {},
      keyword: "",
      isLoading: false,
      selectedItem: null,
      adsImgLink: null,
      adUnitID: __DEV__ ? Numbering.adsBannerTest : (Platform.OS === 'android' ? Numbering.adsBannerAndroid : Numbering.adsBannerIOS),
      commentList: [],
      appName: Texts.appName
    };

  }

  async componentDidMount() {
    let adsImgLink = await StorageUtils.getData(Numbering.kAdsLink);
    let appName = await StorageUtils.getData(Numbering.kHomeTitle);
    console.log('adsImgLink', adsImgLink)
    if (adsImgLink) {
      this.setState({ adsImgLink: { uri: adsImgLink } });
    }
    if (appName) {
      this.setState({ appName })
    }
    //TODO: call API, combine local and remote comment
    this.getData()
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
            size="large" color={colors.colorPrimary}
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
      <View style={[{ backgroundColor: Colors.colorPrimary }, Styles.styleHeader]}>
        <Header
          body={this.renderHeaderBody()}
          left={this.renderHeaderLeft()}
          right={this.renderHeaderRight()}
        />
      </View>
    );
  }

  renderHeaderRight() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this.share}>
          <Image source={Icons.IC_SHARE} style={[Styles.styleHeaderImageTopRight, { tintColor: 'white' }]} />
        </TouchableOpacity>
      </View>
    );
  }
  share = async () => {
    let message = this.state.companyData.ten + ". Địa chỉ: " + this.state.companyData.diachi + "."
    try {
      await Share.share({
        title: this.state.appName,
        message: message,
      });

    } catch (error) {
      console.log(error.message);
    }
  };
  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}
          ellipsizeMode='tail'>
          Thông tin doanh nghiệp bán hàng đa cấp
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <RNImage source={Icons.IC_BACK} style={[Styles.styleHeaderImageTopLeft, { tintColor: 'white' }]} />
        </TouchableOpacity>
      </View>
    );
  }


  renderContent = () => {
    let { companyData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundNumberQuestion, alignItems: 'center' }}>
        <View style={[Styles.sectionStyle, { paddingRight: 5 }]}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Image
                  style={{ height: 60, width: 80, borderRadius: 5, resizeMode: 'contain', }}
                  source={{ uri: `${companyData.logo}` }}
                  PlaceholderContent={<Image source={Icons.IC_COMPANY} style={{ height: 60, width: 80, borderRadius: 5, tintColor: Colors.headerSection, resizeMode: 'contain', }} />}
                  placeholderStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
              <View style={{ flex: 5, alignItems: 'flex-start', padding: 5, paddingRight: 10, flexDirection: "column" }}>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_COMPANY}
                    style={styles.icon}
                  />
                  <Text style={styles.titleTextStyle}>{companyData.ten}</Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_LOCATION}
                    style={styles.icon}
                  />
                  <Text style={styles.subTitleTextStyle}>{companyData.diachi}</Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_STATUS}
                    style={{ width: 15, height: 14, resizeMode: "cover", marginRight: 10 }}
                  />
                  <Text style={[styles.subTitleTextStyle, { color: 'green' }]}>{companyData.option}</Text>
                </View>

              </View>
            </View>
          </View>
        </View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <View style={[Styles.sectionStyle]}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('MLMCompanyCommonDetail', {
                  companyData: companyData
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>Hồ sơ chung</Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('MLMCompanyFile', {
                  companyData: companyData
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                  Hồ sơ cập nhật
                </Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('MLMCompanyAgency', {
                  companyData: companyData,
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                  Trụ sở chính/Chi nhánh/VP đại diện/Địa điểm kinh doanh
                </Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('MLMCompanyRepresentative', {
                  companyData: companyData,
                  title: "Thông tin người đại diện"
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                  Thông tin người đại diện
                </Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('MLMCompanyOwner', {
                  companyData: companyData,
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                  Thông tin chủ sở hữu
                </Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => {
                this.props.navigation.navigate('PostQuestionScreen', {
                  companyName: companyData.ten
                });
              }}>
              <View style={{
                flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%', borderBottomColor: 'gray',
                borderBottomWidth: 0.5
              }}>
                <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                  Khiếu nại
                </Text>
                <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
              </View>
            </TouchableOpacity>

            {
              Numbering.SHOW_ADS && <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => {
                  console.log("đánh giá: " + JSON.stringify(companyData))
                  this.props.navigation.navigate('MLMCompanyComment', {
                    companyData: companyData,
                    title: "Thông tin đánh giá"
                  });
                }}>

                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', padding: 10, width: '100%' }}>
                  <Text style={{ fontSize: AppDimensions.LARGE_TEXT_SIZE, fontFamily: 'SegoeUI', color: Colors.colorBlack3, flex: 1 }}>
                    Đánh giá doanh nghiệp
                  </Text>
                  <RNImage source={Icons.IC_NEXT} style={[Styles.styleHeaderImageTopLeft, { tintColor: Colors.headerSection }]} />
                </View>
              </TouchableOpacity>
            }

          </View>
        </ScrollView>
        <View style={{ width: '100%', backgroundColor: 'transparent' }}>
          {
            (this.state.adsImgLink && Platform.OS === 'android') && (
              <TouchableOpacity style={{ width: '100%' }}
                onPress={() => {
                  this.props.navigation.navigate('AboutUs', {
                    title: 'Sản phẩm',
                    screenType: 'QUANGCAO'
                  });
                }}>
                <RNImage source={this.state.adsImgLink}
                  style={{
                    width: AppDimensions.WINDOW_WIDTH,
                    height: AppDimensions.WINDOW_WIDTH / 650 * 150
                  }}
                >
                </RNImage>
              </TouchableOpacity>)
          }
          {/* {
            Platform.OS === "android" && 
            <AdMobBanner
              style={{ 
                marginTop: this.state.isShowAd ? 10 : 0}}
              adSize="smartBannerPortrait"
              adUnitID={this.state.adUnitID}
              ref={el => (this._basicExample = el)}
              onAdFailedToLoad={error => console.log('onAdFailedToLoad', error)}
              backgroundColor="white"
              onAdLoaded={() => {
                this.setState({
                  isShowAd: true
                })
              }}
          /> } */}
        </View>
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />
      </View>
    );
  }

  getData() {
    this.setState({ isLoading: true });
    getCompanyDetail(this.state.companyDataFromList.id).then((response) => {
      console.log('DetailCenter getData response', JSON.stringify(response));
      return response.data
    }).then((textResponse) => {
      let obj = parse(textResponse);

      if (obj['soap:Envelope']
        && obj['soap:Envelope']['soap:Body']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCDetailResponse']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCDetailResponse']['VccaDNBHDCDetailResult']) {
        var result = obj['soap:Envelope']['soap:Body']['VccaDNBHDCDetailResponse']['VccaDNBHDCDetailResult']
        let data = JSON.parse(result)
        console.log('DetailCenter getData data', JSON.stringify(data))
        this.setState({
          companyData: data,
          isLoading: false
        })
      }
    }).catch(err => {
      console.log('DetailCenter getData error', err);
    });

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

export default MLMCompanyDetailCenter

