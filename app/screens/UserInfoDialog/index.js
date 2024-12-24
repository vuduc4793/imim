import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
  } from 'react-native-popup-dialog';
import {
    View,
    Text,
    Alert,
    ScrollView
  } from 'react-native';  
import {Colors, Styles, Icons, Texts, AppDimensions, TextStyles, Numbering} from "../../constants";
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import {StorageUtils} from "../../helper"
import KeyboardManager from 'react-native-keyboard-manager';

export default class UserDialogInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : "Thông báo",
      enteringUserMail: "",
      enteringUserName: "",
      showInfoForm: this.props.showInfoForm,
      hasInfo: false,
      canEnterCompanyName: this.props.canEnterCompanyName ?? false,
      enteringCompanyName: this.props.enteringCompanyName ?? ""
    };
  }

  async componentDidMount() {
    this.updateData()
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(true);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnable(false);
    }
  }

  updateData = async() => {
    let userName = await StorageUtils.getData(Numbering.kUserName)
    let userMail = await StorageUtils.getData(Numbering.kEmail)
    this.setState({
      enteringUserMail: userMail,
      enteringUserName: userName
    })
    if (userMail && userName) {
      this.setState({hasInfo: true});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.hasOwnProperty('showInfoForm') && newProps.showInfoForm !== this.state.showInfoForm) {
      this.updateData()
      this.setState({ showInfoForm: newProps.showInfoForm })
    }
  }

  render() {
    return (
      <Dialog
      width={0.9}
      visible={this.state.showInfoForm}
      rounded
      actionsBordered
      dialogTitle={
        <DialogTitle
          title="Thông báo"
          textStyle={{
            // backgroundColor: '#F7F7F8',
            fontSize: AppDimensions.LARGE_TEXT_SIZE,
            fontFamily: 'SegoeUI-Bold'
          }}
          hasTitleBar={false}
          align="center"
        />
      }
      footer={
        <DialogFooter>
          <DialogButton
            text="Hủy bỏ"
            bordered
            onPress={() => {
              try {
                return this.props.onCancelPressed();
              } catch (_error) { }
            }}
            key="button-1"
          />
          <DialogButton
            text="Gửi"
            bordered
            onPress={ () => {
              let userMail = this.state.enteringUserMail, userName = this.state.enteringUserName;
              let companyName = this.state.enteringCompanyName
              if (!userMail || !userName) {
                Alert.alert("Thông báo", "Vui lòng điền vào các trường được yêu cầu.")
                return;
              }

              if (!this.validateEmail(userMail)) {
                Alert.alert("Thông báo", "Địa chỉ email không hợp lệ.")
                return;
              }
              this.setState({
                userName,
                userMail,
                hasInfo: true
              });
              StorageUtils.saveData(Numbering.kUserName, userName);
              StorageUtils.saveData(Numbering.kEmail, userMail);
              try {
                return this.props.onSubmitPressed(userName, userMail, companyName);
              } catch (_error) { }
            }}
            key="button-2"
          />
        </DialogFooter>
      }>
      <DialogContent
        style={{
          // backgroundColor: '#F7F7F8',
        }}>
        <Text 
          style={{width: "100%", 
                  fontFamily: 'SegoeUI', 
                  fontSize: AppDimensions.NORMAL_TEXT_SIZE}}>
                    {this.state.hasInfo ? 
                    "Vui lòng kiểm tra thông tin trước khi gửi. Nếu chưa đúng, hãy thay đổi thông tin.": 
                    "Hãy điền thông tin."}</Text>
          <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
            <FloatLabelTextInput
              placeholder={"Tên người dùng"}
              maxLength={30}
              value={this.state.enteringUserName} 
              placeholderFocusStyle={Styles.floatLabelStyle}
              inputStyle={[Styles.floatInputStyle]}
              onChangeTextValue={(text) => {
                this.setState({ enteringUserName: text })
              }}  
            />
          </View>
          <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
            <FloatLabelTextInput
              placeholder={"Email"}
              maxLength={30}
              value={this.state.enteringUserMail} 
              placeholderFocusStyle={Styles.floatLabelStyle}
              inputStyle={[Styles.floatInputStyle]}
              onChangeTextValue={(text) => {
                this.setState({ enteringUserMail: text })
              }}  
            />
          </View>
          {
            this.state.canEnterCompanyName && <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
            <FloatLabelTextInput
              placeholder={"Tên công ty khiếu nại"}
              maxLength={100}
              value={this.state.enteringCompanyName} 
              placeholderFocusStyle={Styles.floatLabelStyle}
              inputStyle={[Styles.floatInputStyle]}
              onChangeTextValue={(text) => {
                this.setState({ enteringCompanyName: text })
              }}  
            />
          </View>
          }
      </DialogContent>
    </Dialog>
    )
  }
  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}