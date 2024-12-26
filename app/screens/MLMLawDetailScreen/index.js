import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  // AsyncStorage,
  Platform,
  Share
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Numbering, TextStyles, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";
// import HTMLView from 'react-native-htmlview';
import { Realm } from '@realm/react';
import { databaseOptions } from '../../realm/index';
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Utils } from "../../helper";
import FontAdjustmentComponent from "../../components/FontAdjustmentComponent";
import HTML from 'react-native-render-html';
import { generateDefaultTextStyles } from 'react-native-render-html/src/HTMLDefaultStyles';
class MLMLawDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize,
      schema: props?.route?.params?.schema || '',
      itemIndex: props?.route?.params?.itemIndex || 0,
      maxItemIndex: props?.route?.params?.maxItemIndex || 1,
      title: "",
      content: "",
      documentShortName: props?.route?.params?.documentShortName || '',
      titleBarText: "",
      _id: ""
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
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}
          ellipsizeMode='tail' numberOfLines={2}>
          {this.state.titleBarText}
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
    let message = "Nội dung " + this.state.title + ": " + Utils.removeHTMLTags(this.state.content) + "."
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
              this.state.itemIndex > 0 &&
              <TouchableOpacity style={styles.styleButtonTopLeft} onPress={this.goPreviousQues}>
                <Image source={Icons.IC_PREVIOUS} style={styles.stylePagerIndicator} />
              </TouchableOpacity>
            }
          </View>
          <View style={[styles.stylePagerBody, Styles.styleHeaderCenter]}>
            <Text style={[styles.stylePagerTitle, Styles.styleHeaderCenterText]}>{this.state.title}</Text>
          </View>
          <View style={[styles.stylePagerEdge, styles.styleHeaderCenter]}>
            {this.state.itemIndex < this.state.maxItemIndex - 1 &&
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
    return (
      <View style={{ flex: 1, marginTop: 10, marginLeft: 10, marginRight: 10 }}>
        <ScrollView style={{ flex: 1 }}>
          <HTML html={this.state.content}
            imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
            baseFontStyle={{ fontSize: this.state.fontSize, fontFamily: 'SegoeUI', color: 'black' }}
            tagsStyles={generateDefaultTextStyles(this.state.fontSize)}
          />
          {/* <HTMLView stylesheet={TextStyles.genAnswerTextStyles(this.state.fontSize)} value={"<text>"+this.state.content+"<text>"} /> */}
        </ScrollView>
        <FontAdjustmentComponent
          style={{ width: "100%" }}
          currentFontSize={this.state.fontSize}
          onPressIncrease={() => { this.onChangeFontSize(this.state.fontSize + Numbering.fontSizeChangeConst) }}
          onPressDecrease={() => { this.onChangeFontSize(this.state.fontSize - Numbering.fontSizeChangeConst) }}
          questionLaw={() => {
            console.log("this.state._id", this.state._id)
            this.props.navigation.navigate('PostQuestionScreen', {
              dieuKhoanID: this.state._id
            });
          }}
        />
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />
      </View>

    );
  }
  goPreviousQues = () => {
    this.setState({
      itemIndex: this.state.itemIndex - 1
    }, () => {
      this.getData();
    })

  }

  goNextQues = () => {
    this.setState({
      itemIndex: this.state.itemIndex + 1
    }, () => {
      this.getData();
    })
  }


  getData = () => {
    let { documentShortName } = this.state;
    Realm.open(databaseOptions).then(realm => {
      let data = realm.objects(this.state.schema).
        filtered(`id == ${this.state.itemIndex}`);
      for (let p of data) {
        this.setState({
          title: p.title,
          content: Utils.removeFontSizeTag(p.content),
          titleBarText: documentShortName + (p.sectionName ? (" - " + p.sectionName) : ""),
          _id: p._id
        })
        console.log("law data = " + JSON.stringify(p))
        console.log("law data _id = " + JSON.stringify(p._id))

      }

    }).catch((error) => {
      Alert.alert("Thông báo", "Dữ liệu bị lỗi!");
      this.setState({ isLoading: false });
    });;
  }

  onChangeFontSize = (fontSize) => {
    // this.props.changeFontSize(fontSize);
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

export default MLMLawDetailScreen

