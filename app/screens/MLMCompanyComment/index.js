import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList,
  Image as RNImage,
  ActivityIndicator,
} from 'react-native';
import { MyStatusBar, STATUSBAR_HEIGHT } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header, { HEADER_HEIGHT } from '../../components/Header';

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Image } from 'react-native-elements';
import styles from "./styles";
import { Utils, DateTimeUtils } from "../../helper";
import UserInfoDialog from '../../screens/UserInfoDialog'
import { CompanyCommentItem } from "../../components/CompanyCommentItem";
import CommentBox, { COMMENTBOX_HEIGHT } from "../../components/CommentBox";
import KeyboardManager from 'react-native-keyboard-manager';
import { postComplaint, getComments, COMMENT_TYPE_COMPANY, COMMENT_TYPE_LAW } from '../../services/api'
import Realm from 'realm';

import { COMMENT_SCHEMA } from '../../realm/constant'
import { databaseOptions } from '../../realm/index';
import * as DBSchema from '../../realm/constant';
import { ScrollView } from 'react-native-gesture-handler';
class MLMCompanyComment extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      lawData: this.getLawData(),
      companyData: this.getCompanyData(),
      ID: this.getCompanyData() ? this.getCompanyData().id : this.getQuestionData().ID + "",
      isLoading: false,
      title: props?.route?.params?.title || '',
      showInfoForm: false,
      enteringMsg: "",
      commentList: [
      ],
      commentRemoteList: [],
      companyInfoHeight: 0,
      sourceType: this.getCompanyData() ? COMMENT_TYPE_COMPANY : COMMENT_TYPE_LAW,
      sourceName: this.getCompanyData() ? this.getCompanyData().ten : this.getQuestionData().name
    };
    console.log('id = ' + this.state.ID)
  }

  getCompanyData = () => {
    console.log("getCompanyData= ", this.props?.route?.params?.companyData || '')
    return this.props?.route?.params?.companyData || ''
  }
  getLawData = () => {
    console.log("getLawData= ", this.props?.route?.params?.lawData || '')

    return this.props?.route?.params?.lawData || ''
  }

  getQuestionData = () => {
    console.log("getQuestionData= ", this.props?.route?.params?.questionData || '')

    return this.props?.route?.params?.questionData || ''
  }
  async componentDidMount() {
    // await this.getRemoteComment()
    await this.getLocalComment()
  }

  // async getRemoteComment() {
  //   try {
  //     let res = await getComments(this.state.ID, this.state.sourceType)
  //     let status = res.status;
  //     console.log("comment res= "+JSON.stringify(res))
  //     console.log("comment res.data= "+JSON.stringify(res.data))

  //     if (status == 200) {
  //       this.setState({
  //         commentRemoteList: res.data
  //       })
  //     }
  //     console.log("commentRemoteList", this.state.commentRemoteList)

  //   } catch (error) {
  //     console.log("get comments error", error)
  //   }
  // }

  async getLocalComment() {
    this.setState({ isLoading: true });
    Realm.open(databaseOptions).then(realm => {
      let localData = realm.objects(COMMENT_SCHEMA).
        filtered("sourceID == $0", this.state.ID);

      let combineComment = [];
      combineComment.push(...this.state.commentRemoteList)
      console.log("combineComment.push(...this.state.commentRemoteList)", combineComment)
      var foundDuplicate = false
      for (let item of localData) {
        foundDuplicate = false

        for (let added of this.state.commentRemoteList) {
          console.log("item._id=", JSON.stringify(item._id))
          console.log("added._id=", JSON.stringify(added._id))

          if (added._id == item._id) {
            foundDuplicate = true
            break
          }
        }
        if (!foundDuplicate) {
          var localItem = JSON.parse(JSON.stringify(item))
          localItem.isLocal = true
          combineComment.push(localItem)
        }
      }
      combineComment.sort(function (a, b) { return b.created_at - a.created_at });
      console.log("combineComment", combineComment)
      this.setState({
        commentList: combineComment,
        isLoading: false
      })
      console.log("commentList", this.state.commentList)
    }).catch((error) => {
      console.log("get local comments", error)
      Alert.alert("Thông báo", "Dữ liệu bị lỗi!");
      this.setState({ isLoading: false });
    });
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
          {this.state.title}
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
    let commentHeight = AppDimensions.WINDOW_HEIGHT - STATUSBAR_HEIGHT - HEADER_HEIGHT - this.state.companyInfoHeight - COMMENTBOX_HEIGHT - Utils.getBottomSafeAreaHeight() + 40
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundNumberQuestion, alignItems: 'center' }}>
        <ScrollView style={{ flex: 1, alignContent: 'center', width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
          keyboardShouldPersistTaps='handled'>
          <View style={{
            height: commentHeight,
            alignItems: 'center', width: '100%'
          }}>
            {
              this.state.commentList.length > 0 ? <FlatList
                style={{
                  flex: 1,
                  borderRadius: 15,
                  width: '95%',
                  marginTop: AppDimensions.SMALL_PADDING_VERTICAL,
                  marginBottom: AppDimensions.SMALL_PADDING_VERTICAL,
                  paddingHorizontal: AppDimensions.SMALL_PADDING_HORIZONTAL,
                  paddingVertical: AppDimensions.SMALL_PADDING_VERTICAL,
                  backgroundColor: Colors.white,
                }}
                renderItem={({ item, index }) => (
                  <CompanyCommentItem
                    name={item.name}
                    content={item.text}
                    time={DateTimeUtils.timeConverter(item.created_at)}
                    isReviewing={item.isLocal ?? false}
                    reply={{ text: item.reply }}
                  />

                )}
                data={this.state.commentList}
                keyExtractor={(item, index) => index.toString()}
                vertical={true}
                ItemSeparatorComponent={() => <View style={styles.bottomLine} elevation={5} />}
              /> :
                <View
                  style={[Styles.sectionStyle,
                  {
                    flex: 1, marginBottom: AppDimensions.SMALL_PADDING_VERTICAL,
                    height: commentHeight
                  }]}>
                  <Text style={styles.styleTextNoData}>{this.getCompanyData() ? "Không có đánh giá nào!" : "Không có câu hỏi nào"}</Text>
                </View>
            }
            <CommentBox
              // containerStyle={{position: 'absolute', bottom: Utils.getBottomSafeAreaHeight()}}
              placeholder="Nhập nội dung đánh giá"
              onSubmit={() => {
                console.log("enteringMsg= ", this.state.enteringMsg)

                if (!this.state.enteringMsg) {
                  Alert.alert("Thông báo", "Vui lòng nhập đánh giá")
                  return;
                }
                this.setState({ showInfoForm: true })
              }}
              onTextChange={(text) => this.setState({ enteringMsg: text })}
              refName={(commentBoxInput) => this.commentBoxInput = commentBoxInput}
            />
          </View>
        </ScrollView>

        <UserInfoDialog
          showInfoForm={this.state.showInfoForm}
          onCancelPressed={() => this.setState({ showInfoForm: false })}
          onSubmitPressed={async (userName, userMail) => {
            this.setState({
              isLoading: true,
              showInfoForm: false,
            })
            try {
              // let res = await postComplaint(
              //   this.state.enteringMsg, 
              //   userMail, 
              //   userName, 
              //   "1", 
              //   this.state.ID, 
              //   this.state.sourceName)
              // let status = res.status;
              // console.log("comment res="+JSON.stringify(res))
              // if (status == 200) {
              //save locally 
              let comment = {
                _id: Utils.generateUUID(5),
                text: this.state.enteringMsg,
                "mail": userMail,
                "name": userName,
                "sourceType": this.state.sourceType,
                "sourceID": this.state.ID,
                "sourceName": this.state.sourceName,
                "status": 1,
                "is_deleted": false,
                "created_at": parseInt((new Date().getTime() / 1000).toFixed(0)) + ''
              };
              console.log("saving comment= ", comment)
              let realm = await Realm.open(databaseOptions);
              realm.write(() => {
                realm.create(DBSchema.COMMENT_SCHEMA, comment);
              })
              realm.close();
              comment.isLocal = true
              this.setState({ commentList: [...this.state.commentList, comment] })
              this.setState({
                enteringMsg: "",
                isLoading: false
              })
              Alert.alert("Thông báo", "Đánh giá của bạn sẽ được chúng tôi xem xét. Khi được phê duyệt, mọi người sẽ xem được đánh giá này.")
              //clear
              this.commentBoxInput.clear()
              // } else throw "status is " + status;
            } catch (error) {
              console.log("post comment error", error)
              this.setState({ isLoading: false })
              Alert.alert("Thông báo", "Có lỗi xảy ra. Vui lòng thử lại!")
            }
          }}
        />
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />
      </View>
    );
  }
  _onClick = (item) => {

  }

  componentWillMount() {
    KeyboardManager.setEnable(true);
  }

  componentWillUnmount() {
    KeyboardManager.setEnable(false);
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

export default connect(mapStateToProps, mapDispatchToProps)(MLMCompanyComment);

