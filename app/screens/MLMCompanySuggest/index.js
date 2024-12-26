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
import FloatLabelTextInput from 'react-native-floating-label-text-input';


class MLMCompanySuggest extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize,
      data: "",
      complainContent: "",
      isLoading: false,
      showInfoForm: false,
      enteringName: "",
      enteringAddress: "",
      enteringPhoneNumber: "",

      enteringStatus: "",
      enteringOName: "",
      enteringOAddress: "",
      enteringOPhoneNumber: ""
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
          right={this.renderHeaderRight()}
        />
      </View>
    );
  }

  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
          Cập nhật thông tin DNBHDC
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

  renderHeaderRight() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this.submit}>
          <Image source={Icons.IC_SUBMIT2} style={[Styles.styleHeaderImageTopRight, {tintColor: 'white'}]} />
        </TouchableOpacity>
      </View>
    );
  }

  submit = async () => {
    let {enteringName, enteringAddress, enteringPhoneNumber} = this.state
    if (enteringName === "" || enteringAddress === "" || enteringPhoneNumber === "") {
      Alert.alert("Thông báo", "Vui lòng nhập thông tin")
      return
    }

    this.setState({ showInfoForm: true});
  };

  renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1, alignContent: 'center', backgroundColor: Colors.backgroundNumberQuestion}}
          contentContainerStyle={{alignItems: 'center'}}>
          <View style={[Styles.sectionStyle] }>
            <HeaderSectionComponent 
              style={[Styles.headerSectionStyle, { width: "100%"}]}
              title="Thông tin chung"
              showSeparator={false}/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Tên doanh nghiệp"}
                  maxLength={50}
                  value={this.state.enteringName} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringName: text })
                  }}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Địa chỉ"}
                  maxLength={50}
                  value={this.state.enteringAddress} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringAddress: text })
                  }}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Số điện thoại liên hệ"}
                  maxLength={50}
                  value={this.state.enteringPhoneNumber} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringPhoneNumber: text })
                  }}  
                />
              </View>
            <HeaderSectionComponent/>
            <HeaderSectionComponent 
              style={[Styles.headerSectionStyle, { width: "100%"}]}
              title="Thông tin thêm (không bắt buộc)"
              showSeparator={false}/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Trạng thái hoạt động"}
                  maxLength={50}
                  value={this.state.enteringStatus} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringStatus: text })
                  }}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Chủ sở hữu"}
                  maxLength={50}
                  value={this.state.enteringOName} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringOName: text })
                  }}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Địa chỉ chủ sở hữu"}
                  maxLength={50}
                  value={this.state.enteringOAddress} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringOAddress: text })
                  }}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Số điện thoại chủ sở hữu"}
                  maxLength={50}
                  value={this.state.enteringOPhoneNumber} 
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={[Styles.floatInputStyle]}
                  onChangeTextValue={(text) => {
                    this.setState({ enteringOPhoneNumber: text })
                  }}  
                />
              </View>
            <HeaderSectionComponent/>
          </View>
        </ScrollView>
        <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor:'transparent'}}/>
        <UserInfoDialog
          showInfoForm={this.state.showInfoForm}
          canEnterCompanyName={false}
          onCancelPressed={()=> this.setState({showInfoForm: false})}
          onSubmitPressed={async(userName, userMail, companyName) => {
            this.setState({
              isLoading: false,
              showInfoForm: false,
            })
            Alert.alert("Thông báo", "Thông tin của bạn sẽ được chúng tôi xem xét. Cảm ơn bạn vì thông tin này.")
            this.setState({
              enteringName: "",
              enteringAddress: "",
              enteringPhoneNumber: "",
        
              enteringStatus: "",

              enteringOName: "",
              enteringOAddress: "",
              enteringOPhoneNumber: ""})
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

export default MLMCompanySuggest

