import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  // AsyncStorage,
  Share
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, TextStyles, Numbering, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";
// import HTMLView from 'react-native-htmlview';
import Realm from 'realm';
import { Q_AND_A_SCHEMA } from '../../realm/constant'
import { databaseOptions } from '../../realm/index';
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Utils } from "../../helper";
import FontAdjustmentComponent from "../../components/FontAdjustmentComponent";
import HTML from 'react-native-render-html';
import { generateDefaultTextStyles } from 'react-native-render-html/src/HTMLDefaultStyles';
class QAndADetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize,
      isShowAd: false,
      questionNumber: props?.route?.params?.questionNumber || 1,
      maxQuestionNumber: props?.route?.params?.maxQuestionNumber || 1,
      question: "",
      answer: ""
    };
  }
  componentDidMount() {

  }
  componentWillMount() {
    this.getData();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.fontSize !== nextProps.fontSize) {
      this.setState({
        fontSize: nextProps.fontSize,
      })
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderPager()}
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
          right={Numbering.SHOW_ADS ? this.renderHeaderRight() : <View />}
        />
      </View>
    );
  }


  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]} ellipsizeMode='tail' numberOfLines={2}>
          {Texts.qAndA}
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={[Styles.styleHeaderImageTopLeft, { tintColor: 'white' }]} />
        </TouchableOpacity>
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
    let message = "Hỏi: " + Utils.removeHTMLTags(this.state.question) + ".\n Đáp: " + Utils.removeHTMLTags(this.state.answer) + "."
    try {
      await Share.share({
        title: "iMLM",
        message: message,
      });

    } catch (error) {
      console.log(error.message);
    }
  };

  renderPager() {
    return (
      <View style={styles.stylePagerContainer}>
        <View style={styles.stylePager}>
          <View style={[styles.stylePagerEdge, Styles.styleHeaderCenter]}>
            {
              this.state.questionNumber > 1 &&
              <TouchableOpacity style={styles.styleButtonTopLeft} onPress={this.goPreviousQues}>
                <Image source={Icons.IC_PREVIOUS} style={styles.stylePagerIndicator} />
              </TouchableOpacity>
            }
          </View>
          <View style={[styles.stylePagerBody, Styles.styleHeaderCenter]}>
            <Text style={[styles.stylePagerTitle, Styles.styleHeaderCenterText]}>Câu hỏi số {this.state.questionNumber}</Text>
          </View>
          <View style={[styles.stylePagerEdge, styles.styleHeaderCenter]}>
            {this.state.questionNumber < this.state.maxQuestionNumber &&
              <TouchableOpacity style={styles.styleButtonTopLeft} onPress={this.goNextQues}>
                <Image source={Icons.IC_NEXT} style={styles.stylePagerIndicator} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  };

  renderContent = () => {
    console.log('renderContent generateDefaultTextStyles(this.state.fontSize) = ' + JSON.stringify(generateDefaultTextStyles(this.state.fontSize)));
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        {/* <HTMLView style={{marginBottom: 20}} stylesheet={TextStyles.genQuestionTextStyles(this.state.fontSize)} value={"<text>Hỏi: "+this.state.question+"<text>"} />  */}
        <HTML html={this.state.question}
          imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
          baseFontStyle={{ fontSize: this.state.fontSize, fontFamily: 'SegoeUI-Bold', color: 'black' }}
          tagsStyles={generateDefaultTextStyles(this.state.fontSize)}
        />
        {/* <View style={{height: 5, width: 0}}/> */}
        <ScrollView style={{ flex: 1 }}>
          {/* <HTMLView stylesheet={TextStyles.genAnswerTextStyles(this.state.fontSize)} value={"<text>Đáp: <u><b>mispeled</b></u><text>"} /> */}

          {/* <HTMLView stylesheet={TextStyles.genAnswerTextStyles(this.state.fontSize)} value={"<p><img src=\"https://html-online.com/img/04-replace.png\" /></p> <h1><span style=\"color: #ff0000;\">Xử l&yacute; 2 lỗi:</span></h1> <ol> <li><em><strong>Khi paste số t&agrave;i khoản v&agrave;o th&igrave; remove to&agrave;n bộ k&iacute; tự đặc biệt v&agrave; dấu c&aacute;ch đi</strong></em></li> <li><em><strong>Khi bấm chọn lịch sử GD hoặc template để fill v&agrave;o m&agrave;n h&igrave;nh chuyển tiền th&igrave; điều chỉnh lại k&iacute;ch cỡ của &ocirc; nội dung, giống như khi nhập nội dung trực tiếp.</strong></em></li> </ol> <h4>Xem ảnh đ&iacute;nh k&egrave;m</h4>"} imagesMaxWidth={AppDimensions.WINDOW_WIDTH} /> */}
          <HTML html={this.state.answer}
            imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
            baseFontStyle={{ fontSize: this.state.fontSize, fontFamily: 'SegoeUI', color: 'black' }}
            tagsStyles={generateDefaultTextStyles(this.state.fontSize)}
          />

        </ScrollView>
        <FontAdjustmentComponent
          style={{ width: "100%" }}
          currentFontSize={this.state.fontSize}
          onPressIncrease={() => { this.onChangeFontSize(this.state.fontSize + Numbering.fontSizeChangeConst) }}
          onPressDecrease={() => { this.onChangeFontSize(this.state.fontSize - Numbering.fontSizeChangeConst) }}
        // buttonTitle={"Bình luận"}
        // questionLaw={Numbering.SHOW_ADS ? ()=>{
        //   this.props.navigation.navigate('MLMCompanyComment', {
        //     questionData: {
        //       name: Utils.removeHTMLTags(this.state.question),
        //       ID: this.state.questionNumber - 1
        //     },
        //     title: "Bình luận"
        //   });
        // } : null} 

        />
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />

      </View>

    );
  }
  goPreviousQues = () => {
    this.setState({
      questionNumber: this.state.questionNumber - 1
    }, () => {
      this.getData();
    })

  }

  goNextQues = () => {
    this.setState({
      questionNumber: this.state.questionNumber + 1
    }, () => {
      this.getData();
    })
  }


  getData = () => {
    Realm.open(databaseOptions).then(realm => {
      let data = realm.objects(Q_AND_A_SCHEMA).
        filtered(`index == ${this.state.questionNumber - 1}`);
      for (let p of data) {
        let plainData = JSON.parse(JSON.stringify(p))
        console.log("plainData" + JSON.stringify(plainData));

        this.setState({
          question: Utils.removeFontSizeTag(plainData.question),
          answer: Utils.removeFontSizeTag(plainData.answer)
        })
      }

    }).catch((error) => {
      console.log("QAndADetail getData error", error)
      Alert.alert("Thông báo", "Dữ liệu bị lỗi!");
      this.setState({ isLoading: false });
    });
  }
  onChangeFontSize = (fontSize) => {
    this.props.changeFontSize(fontSize);
    AsyncStorage.setItem(Numbering.normalTextSize, fontSize + '');
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

export default connect(mapStateToProps, mapDispatchToProps)(QAndADetailScreen);

