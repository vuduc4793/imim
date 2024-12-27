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
  TextInput
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions, TextStyles, Numbering } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Utils, StorageUtils } from "../../helper";
import HTML from 'react-native-render-html';
import HeaderSectionComponent from '../../components/HeaderSectionComponent';

import { generateDefaultTextStyles } from 'react-native-render-html/src/HTMLDefaultStyles';
import UserInfoDialog from '../../screens/UserInfoDialog'
import { postComplaint, postLawQuestion } from '../../services/api'
import { Button } from "react-native-elements";
class PostQuestionScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize || 14,
      data: "",
      title: props?.route?.params?.fakeMode ? "Tạo câu hỏi" : (props?.route?.params?.dieuKhoanID ? "Tạo câu hỏi" : "Tạo khiếu nại"),
      complainContent: "",
      isLoading: false,
      showInfoForm: false,
      dieuKhoanID: props?.route?.params?.dieuKhoanID,
      companyName: props?.route?.params?.companyName,
      fakeMode: props?.route?.params?.fakeMode || false
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
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}>
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
          style={{ flex: 1, alignContent: 'center', backgroundColor: Colors.backgroundNumberQuestion }}
          contentContainerStyle={{ alignItems: 'center' }}>
          <View style={[Styles.sectionStyle]}>
            <TextInput
              multiline
              numberOfLines={3}
              style={{
                fontSize: AppDimensions.NORMAL_TEXT_SIZE,
                fontFamily: 'SegoeUI', width: "95%", marginBottom: 20, height: AppDimensions.WINDOW_HEIGHT / 5
              }}
              placeholder={this.state.dieuKhoanID ? "Nhập câu hỏi" : "Nhập nội dung"}
              onChangeText={(text) => this.setState({ complainContent: text })}
              clearButtonMode="while-editing"
              maxLength={500}
              ref={input => { this.textInput = input }}
            />
            <Button
              buttonStyle={Platform.OS === 'ios' ? Styles.submitButton : {}}
              // containerStyle={Styles.submitButton}
              type="outline"
              title="Gửi"
              onPress={() => {
                if (!this.state.complainContent) {
                  Alert.alert("Thông báo", "Vui lòng nhập nội dung")
                  return
                }
                this.setState({ showInfoForm: true });
              }}
            />
          </View>
        </ScrollView>
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />
        <UserInfoDialog
          showInfoForm={this.state.showInfoForm}
          canEnterCompanyName={(this.state.dieuKhoanID || this.state.fakeMode) ? false : true}
          enteringCompanyName={this.state.companyName}
          onCancelPressed={() => this.setState({ showInfoForm: false })}
          onSubmitPressed={async (userName, userMail, companyName) => {
            console.log("companyName", companyName)
            this.setState({
              isLoading: true,
              showInfoForm: false,
            })
            try {
              if (this.state.dieuKhoanID) {
                await postLawQuestion(this.state.complainContent, userMail, userName, this.state.dieuKhoanID)
                Alert.alert("Thông báo", Texts.thankYouForYourQuestion)
              } else if (this.state.fakeMode) {
                Alert.alert("Thông báo", Texts.thankYouForYourQuestion)
              } else {
                await postComplaint(this.state.complainContent, userMail, userName, "1", "", "", companyName)
                Alert.alert("Thông báo", Texts.thankYouForYourComplaint)
              }
              this.setState({
                complainContent: "",
                isLoading: false
              })

              this.textInput.clear()
            } catch (error) {
              console.log("post comment error", error)
              this.setState({ isLoading: false })
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

export default PostQuestionScreen

