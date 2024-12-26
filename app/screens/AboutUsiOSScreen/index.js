import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
  ActivityIndicator,
  TextInput,
  Platform
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, AppDimensions, TextStyles, Numbering} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import {Utils, StorageUtils} from "../../helper";
import HTML from 'react-native-render-html';
import  HeaderSectionComponent  from '../../components/HeaderSectionComponent';

import {generateDefaultTextStyles} from 'react-native-render-html/src/HTMLDefaultStyles';
import UserInfoDialog from '../../screens/UserInfoDialog'
import {postComplaint} from '../../services/api'
import { Button } from "react-native-elements";
import DeviceInfo from 'react-native-device-info';

class AboutUsiOSScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize,
      data: "",
      title: "Về chúng tôi",
      complainContent: "",
      isLoading: false,
      showInfoForm: false,
      contentHTML1: "Ứng dụng cung cấp thông tin về hoạt động bán hàng đa cấp tại Việt Nam.\nỨng dụng này được xây dựng, phát triển bởi Trung tâm Thông tin, Tư vấn và Đào tạo, Cục Cạnh tranh và bảo vệ người tiêu dùng (Cục CT&BVNTD), Bộ Công Thương.",
      contentHTML2: "Trong trường hợp cần thêm thông tin, người dùng vui lòng liên hệ theo địa chỉ sau: \nCục Cạnh tranh và Bảo vệ người tiêu dùng, Bộ Công Thương; 25 Ngô Quyền, Hoàn Kiếm, Hà Nội; \nEmail: <a href=\"mailto:huuchi207@gmail.com\">vcca@moit.gov.vn</a>; \nWebsite: <a href=\"http://bhdc.vcca.gov.vn\">http://bhdc.vcca.gov.vn.</a>",
      contentHTML3: "Người dùng có thể gửi phản ánh bằng các kênh ở phần Thông tin liên hệ, hoặc có thể điền trực tiếp vào đây:"
    };
  }

  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
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
        />
      </View>
    );
  }

  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View style={styles.styleHeaderCenter}>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={Styles.styleHeaderImageTopLeft} />
        </TouchableOpacity>
      </View>
    );
  }


  renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1, alignContent: 'center', backgroundColor: Colors.backgroundNumberQuestion}}
          contentContainerStyle={{alignItems: 'center'}}>
        <View style={[Styles.sectionStyle] }>
          <HeaderSectionComponent 
            style={[Styles.headerSectionStyle, { width: "100%"}]}
            title="Thông tin ứng dụng"/>
            <Text
              style={{
                fontSize: AppDimensions.NORMAL_TEXT_SIZE,
                textAlign: 'left',
                alignSelf: 'flex-start'
              }}
            >Phiên bản: {DeviceInfo.getVersion()}. Bản dựng: {DeviceInfo.getBuildNumber()}</Text>
        </View>
          <View style={[Styles.sectionStyle] }>
            <HeaderSectionComponent 
              style={[Styles.headerSectionStyle, { width: "100%"}]}
              title="Về chúng tôi"/>
              <HTML html={this.state.contentHTML1} 
                imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20} 
                baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
                tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
                onLinkPress={(evt, link) => {this.onLinkPress(evt, link)}}
              /> 
          </View>
          <View style={[Styles.sectionStyle] }>
            <HeaderSectionComponent 
              style={[Styles.headerSectionStyle, { width: "100%"}]}
              title="Thông tin liên hệ"/>
              <HTML html={this.state.contentHTML2} 
                imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20} 
                baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
                tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
                onLinkPress={(evt, link) => {this.onLinkPress(evt, link)}}
              /> 
          </View>
          <View style={[Styles.sectionStyle] }>
            <HeaderSectionComponent 
              style={[Styles.headerSectionStyle, { width: "100%",}]}
              title="Phản ánh/Khiếu nại"/>
              {/* <HTML html={this.state.contentHTML3} 
                imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20} 
                baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
                tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
                onLinkPress={(evt, link) => {this.onLinkPress(evt, link)}}
              />  */}
              
              <TextInput
                multiline
                numberOfLines={3}
                style={{fontSize: AppDimensions.NORMAL_TEXT_SIZE,
                  fontFamily: 'SegoeUI', width: "95%", marginBottom: 20,  height: AppDimensions.WINDOW_HEIGHT / 5}}
                placeholder="Nhập nội dung phản ánh/khiếu nại"
                onChangeText={(text) => this.setState({ complainContent: text })}
                clearButtonMode="while-editing"
                maxLength={500}
                ref={input => { this.textInput = input }}
              />
              <Button
                buttonStyle={Platform.OS === 'ios' ? Styles.submitButton : {}}
                containerStyle={Platform.OS === 'ios' ? Styles.submitButton : {}}
                type="outline"
                title="Gửi"
                onPress={() => {
                  if (!this.state.complainContent) {
                    Alert.alert("Thông báo", "Vui lòng điền thông tin phản ánh/khiếu nại")
                    return
                  }
                  this.setState({ showInfoForm: true});
                }}
              />
              {/* <View style={{height: AppDimensions.BOTTOM_SAFE_AREA, width: "100%", backgroundColor:'transparent'}}/> */}

          </View>
        </ScrollView>
        <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor:'transparent'}}/>
        <UserInfoDialog
          showInfoForm={this.state.showInfoForm}
          canEnterCompanyName={true}
          onCancelPressed={()=> this.setState({showInfoForm: false})}
          onSubmitPressed={async(userName, userMail, companyName) => {
            this.setState({
              isLoading: true,
              showInfoForm: false,
            })
            try {
              await postComplaint(this.state.complainContent, userMail, userName, "1", "", "", companyName)
              this.setState({
                complainContent: "", 
                isLoading: false
              })
              Alert.alert("Thông báo", Texts.thankYouForYourComplaint)
              this.textInput.clear()
            } catch(error) {
              console.log("post comment error", error)
              this.setState({isLoading: false})
              Alert.alert("Thông báo", "Có lỗi xảy ra. Vui lòng thử lại!")
            }            
          }}
        />
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
  
  onLinkPress = (evt, link) => { 
    console.log("clicked on link: " , link);
      Linking.canOpenURL(link).then(supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.log("Don't know how to open URI: " + link);
        }
      }).catch(err=>{
        console.log("openLink err: " , link, ' ',err);
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

export default AboutUsiOSScreen

