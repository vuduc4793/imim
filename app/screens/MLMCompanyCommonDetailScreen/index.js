import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Image as RNImage,
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Image } from 'react-native-elements';
import InfoLineComponent from '../../components/InfoLineComponent';
import styles from "./styles";
import { Utils } from "../../helper";
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
const parser = new XMLParser();

class MLMCompanyCommonDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      questionNumber: 1,
      companyData: props?.route?.params?.companyData || '',
      isSearch: false,
      keyword: "",
      isLoading: false,
      selectedItem: null
    };

  }

  componentWillMount() {
  }

  componentDidMount() {

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
        />
      </View>
    );
  }


  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}
          ellipsizeMode='tail'>
          Hồ sơ chung
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
        <View style={[Styles.sectionStyle]}>
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
              <View style={{ flex: 5, alignItems: 'flex-start', padding: 5, flexDirection: "column" }}>
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
            <InfoLineComponent
              style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
              info1={{ 'title': "Tỉnh thành", 'content': companyData.tinhthanh }}
              info2={{ 'title': "Điện thoại", 'content': companyData.dienthoai }}
            />
            <View style={{ height: 0.5, width: '100%', backgroundColor: Colors.colorBlack3 }} />
            <InfoLineComponent
              style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
              info1={{ 'title': "Hotline", 'content': companyData.hotline }}
              info2={{ 'title': "Website", 'content': companyData.website }}
            />
            <InfoLineComponent
              style={{ width: '100%' }}
              info1={{ 'title': "Email", 'content': companyData.email }}
            />
          </View>
          <View style={[Styles.sectionStyle]}>
            <InfoLineComponent style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
              info1={{ 'title': "GCN đăng ký doanh nghiệp/đầu tư số", 'content': companyData.sodangkydoanhnghiep }}
              info2={{ 'title': "Ngày cấp", 'content': companyData.ngaycap1 }}
            />
            <InfoLineComponent style={{ width: '100%' }}
              info1={{ 'title': "Ngày sửa", 'content': companyData.ngaysuadoi1 }}
            />
          </View>
          <View style={[Styles.sectionStyle]}>
            <InfoLineComponent style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
              info1={{ 'title': "GCN đăng ký hoạt động BHĐC", 'content': companyData.sodangkyhoatdong }}
              info2={{ 'title': "Ngày cấp", 'content': companyData.ngaycap2 }}
            />
            <InfoLineComponent style={{ width: '100%' }}
              info1={{ 'title': "Ngày sửa đổi bổ sung gần nhất", 'content': companyData.ngaysuadoi2 }}
              info2={{ 'title': "Ngày gia hạn", 'content': companyData.ngaygiahan }}
            />
          </View>
          <View style={[Styles.sectionStyle]}>
            <InfoLineComponent style={{ width: '100%', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
              info1={{ 'title': "Người đại diện theo pháp luật", 'content': companyData.daidien }}
              info2={{ 'title': "CMND/ Hộ chiếu/ MSDN", 'content': companyData.cmnd }}
            />
            <InfoLineComponent style={{ width: '100%' }}
              info1={{ 'title': "Chức vụ", 'content': companyData.chucvu }}
            />
          </View>
        </ScrollView>
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />

      </View>
    );
  }
  _onClick = (item) => {

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

export default MLMCompanyCommonDetail

