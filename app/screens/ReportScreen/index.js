import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert, 
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Arrays, Colors, Styles, AppDimensions, Texts, Icons} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import  HeaderSectionComponent  from '../../components/HeaderSectionComponent';
import styles from "./styles";
import { Dropdown } from 'react-native-material-dropdown';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import {Utils} from "../../helper";
import { CheckBox, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';

class ReportScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.listProvince = Utils.getListProvinceFromJson();
    this.state = {
      fullName : "",
      gender: Arrays.listGender[0].value,
      identifyCardNumber: "",
      phoneNumber: "",
      email: "",
      province: this.listProvince[0].value,
      location: "",

      goodsType: Arrays.listGoodsType[0].value,
      goodsInfo: "",
      objectBeComplained: "",
      objectBeComplainedPN: "",
      objectBeComplainedLocation:"",

      complainContent: "",
      complainFile: "",

      complainRequest:"",

      isAssured: false,
      showAlert: false
    };
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
          {Texts.tiepNhanPhanAnh}
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

  render() {
    return (
      <View style={{ flex: 1}}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        <View style={{flex: 1,backgroundColor: Colors.backgroundNumberQuestion, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center'}}>         
            <View style={[Styles.sectionStyle] }>
              <HeaderSectionComponent 
                style={[Styles.headerSectionStyle, { width: "100%"}]}
                title="Thông tin người khiếu nại"/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Họ và tên"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ fullName: text })}  
                />
              </View>
              <View style={{ width: "100%" }}>
                <Dropdown
                  fontSize={AppDimensions.NORMAL_TEXT_SIZE}
                  labelFontSize={AppDimensions.SMALL_TEXT_SIZE}
                  label='Giới tính'
                  value={Arrays.listGender[0].value}
                  data={Arrays.listGender}
                  labelTextStyle={Styles.floatLabelStyle}
                  onChangeText={(text) => this.setState({ gender: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Chứng minh nhân dân"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ identifyCardNumber: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Số điện thoại"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ phoneNumber: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Email"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ email: text })}  
                />
              </View>
              <View style={{ width: "100%" }}>
                <Dropdown
                  fontSize={AppDimensions.NORMAL_TEXT_SIZE}
                  labelFontSize={AppDimensions.SMALL_TEXT_SIZE}
                  label='Tỉnh thành'
                  value={this.listProvince[0].value}
                  data={this.listProvince}
                  labelTextStyle={Styles.floatLabelStyle}
                  onChangeText={(text) => this.setState({ province: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Địa chỉ"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ location: text })}  
                />
              </View>
            </View>
            <View style={[Styles.sectionStyle] }>
              <HeaderSectionComponent 
                style={[Styles.headerSectionStyle, { width: "100%"}]}
                title="Mô tả hàng hóa, dịch vụ, tổ chức, cá nhân bị khiếu nại"/>
              <View style={{ width: "100%" }}>
                <Dropdown
                  fontSize={AppDimensions.NORMAL_TEXT_SIZE}
                  labelFontSize={AppDimensions.SMALL_TEXT_SIZE}
                  label='Loại hàng hóa'
                  value={Arrays.listGoodsType[0].value}
                  data={Arrays.listGoodsType}
                  labelTextStyle={Styles.floatLabelStyle}
                  onChangeText={(text) => this.setState({ gender: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Thông tin hàng hóa"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ goodsInfo: text })}  
                  numberOfLines={3}
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Tổ chức, cá nhân bị khiếu nại"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ objectBeComplained: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Điện thoại"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ objectBeComplainedPN: text })}  
                />
              </View>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Địa chỉ"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ objectBeComplainedLocation: text })}  
                />
              </View>
            </View>
            <View style={[Styles.sectionStyle] }>
              <HeaderSectionComponent 
                style={[Styles.headerSectionStyle, { width: "100%"}]}
                title="Nội dung khiếu nại"/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Nội dung khiếu nại"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ complainContent: text })}  
                />
              </View>
            </View>
            <View style={[Styles.sectionStyle] }>
              <HeaderSectionComponent 
                style={[Styles.headerSectionStyle, { width: "100%"}]}
                title="Yêu cầu của người khiếu nại"/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%"}]}>
                <FloatLabelTextInput
                  placeholder={"Nội dung"}
                  placeholderFocusStyle={Styles.floatLabelStyle}
                  inputStyle={Styles.floatInputStyle}
                  onChangeTextValue={(text) => this.setState({ complainRequest: text })}  
                />
              </View>
            </View>
            <View style={[Styles.sectionStyle] }>
              <HeaderSectionComponent 
                style={[Styles.headerSectionStyle, { width: "100%"}]}
                title="Cam đoan"/>
              <View style={[Styles.textFieldInSectionStyle, {width: "100%", height: 105}]}>
                <CheckBox
                  center
                  textStyle={Styles.floatInputStyle}
                  containerStyle={{backgroundColor:'transparent', paddingHorizontal: 0, paddingVertical: 0 , margin:0, borderWidth: 0}}
                  title='Tôi cam đoan những thông tin, tài liệu được đưa ra trong đơn khiếu nại là trung thực, cẩn thận và chính xác. Nếu sai tôi hoàn toàn chịu trách nhiệm trước pháp luật.'
                  iconRight
                  iconType='material'
                  checkedColor={Colors.colorPrimary}
                  checked={this.state.isAssured}
                  fontFamily='SegoeUI'
                  checkedIcon={<Icon name="check-square-o" size={20}/>}
                  uncheckedIcon={<Icon name="square-o" size={20}/>}
                  onPress={() => this.setState({isAssured: !this.state.isAssured})}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{height: AppDimensions.SMALL_PADDING_VERTICAL, width: "100%", backgroundColor:'transparent'}}/>
          <Button
            buttonStyle={Platform.OS === 'ios' ? Styles.submitButton : {}}
            containerStyle={Platform.OS === 'ios' ? Styles.submitButton : {}}
            title="Gửi"
            type="outline"
            onPress={() => {
              console.log(this.state);
              this.setState({showAlert: true});
            }}
          />
          <View style={{height: Utils.getBottomSafeAreaHeight(), 
          width: "100%", backgroundColor:'transparent'}}/>
          
        </View>
      </View>
    );
  }

  componentDidMount(){
  
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

export default ReportScreen

