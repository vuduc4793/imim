import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  // AsyncStorage,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyStatusBar} from '../../components/MyStatusBar';

import {
  Colors,
  Styles,
  Icons,
  Texts,
  AppDimensions,
  TextStyles,
  Numbering,
} from '../../constants';
import {connect} from 'react-redux';
import Header from '../../components/Header';

import styles from './styles';

import FontAdjustmentComponent from '../../components/FontAdjustmentComponent';
import {
  changeBackgroundColor,
  changeTypeRead,
  changeFontSize,
  changeFontFamily,
  changeDistanceRow,
} from '../../redux/actions/settingUI';
import {Utils, DateTimeUtils} from '../../helper';
import HTML from 'react-native-render-html';
import {generateDefaultTextStyles} from 'react-native-render-html/src/HTMLDefaultStyles';
import {getNewsDetail} from '../../services/api';
import {XMLParser, XMLBuilder, XMLValidator} from 'fast-xml-parser';
const parser = new XMLParser();
var DomParser = require('react-native-html-parser').DOMParser;

class NewsDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize || 14,
      newsDataFromList: props?.route?.params?.newsData || '',
      title: Texts.news,
      newsData: {},
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    getNewsDetail(this.state.newsDataFromList.id)
      .then(response => {
        console.log('NewsDetail getData response', JSON.stringify(response));
        return response.data;
      })
      .then(textResponse => {
        let obj = parser.parse(textResponse);

        if (
          obj['soap:Envelope'] &&
          obj['soap:Envelope']['soap:Body'] &&
          obj['soap:Envelope']['soap:Body']['VccaTinResponse'] &&
          obj['soap:Envelope']['soap:Body']['VccaTinResponse']['VccaTinResult']
        ) {
          var data = JSON.parse(
            obj['soap:Envelope']['soap:Body']['VccaTinResponse'][
              'VccaTinResult'
            ],
          );
          console.log('NewsDetail getData newsData', JSON.stringify(data));
          this.setState({
            newsData: data,
          });
        }
      })
      .catch(err => {
        console.log('NewsDetail getData error', err);
        Alert.alert('Thông báo', err.message);
      });
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.fontSize !== nextProps.fontSize) {
      this.setState({
        fontSize: nextProps.fontSize,
      });
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
      </View>
    );
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  renderHeader() {
    return (
      <View
        style={[{backgroundColor: Colors.colorPrimary}, Styles.styleHeader]}>
        <Header body={this.renderHeaderBody()} left={this.renderHeaderLeft()} />
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
        <TouchableOpacity
          style={Styles.styleHeaderButtonTopLeft}
          onPress={this._goBack}>
          <Image
            source={Icons.IC_BACK}
            style={Styles.styleHeaderImageTopLeft}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1, paddingHorizontal: 10}}>
          <Text
            style={{
              color: Colors.headerSection,
              fontSize: AppDimensions.NORMAL_TEXT_SIZE,
              fontFamily: 'SegoeUI-Bold',
              paddingBottom: 10,
              paddingTop: 10,
            }}>
            {this.state.newsData.title}
          </Text>
          <View style={[styles.subTextWrapper, {paddingBottom: 10}]}>
            <Image source={Icons.IC_NEWS} style={styles.icon} />
            <Text style={styles.subTitleTextStyle}>
              {this.state.newsData.category_ids}
            </Text>
          </View>
          <View style={[styles.subTextWrapper, {paddingBottom: 10}]}>
            <Image source={Icons.IC_CLOCK} style={styles.icon} />
            <Text style={styles.subTitleTextStyle}>
              {DateTimeUtils.dateConverter(this.state.newsData.modify)}
            </Text>
          </View>
          {this.state.newsData.files_url && (
            <Image
              source={{uri: this.state.newsData.files_url}}
              style={{height: 200, paddingBottom: 10}}
              PlaceholderContent={
                <Image
                  source={Icons.IMG_LOGO}
                  style={{
                    height: 200,
                    tintColor: Colors.headerSection,
                    resizeMode: 'contain',
                  }}
                />
              }
              placeholderStyle={{backgroundColor: 'transparent'}}
            />
          )}
          <HTML
            containerStyle={{}}
            html={this.getEscapedContent(this.state.newsData.content)}
            imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
            baseFontStyle={{
              fontSize: AppDimensions.NORMAL_TEXT_SIZE,
              fontFamily: 'SegoeUI',
              color: 'black',
            }}
            tagsStyles={generateDefaultTextStyles(
              AppDimensions.NORMAL_TEXT_SIZE,
            )}
          />
        </ScrollView>
        {/* {
          this.state.screenType === Texts.introduce && 
          (<FontAdjustmentComponent 
          style= {{width: "100%"}}
          currentFontSize={this.state.fontSize}
          onPressIncrease={()=>{this.onChangeFontSize(this.state.fontSize + Numbering.fontSizeChangeConst)}}
          onPressDecrease={()=>{this.onChangeFontSize(this.state.fontSize - Numbering.fontSizeChangeConst)}}
        />)
        } */}
        <View
          style={{
            height: Utils.getBottomSafeAreaHeight(),
            width: '100%',
            backgroundColor: 'transparent',
          }}
        />
      </View>
    );
  };

  onChangeFontSize = fontSize => {
    // this.props.changeFontSize(fontSize);
    AsyncStorage.setItem(Numbering.normalTextSize, fontSize + '');
  };

  getEscapedContent = content => {
    console.log('getEscapedContent input', content);
    let doc = new DomParser().parseFromString(
      `<!DOCTYPE html><html><head></head><body>${content}</body></html>`,
      'text/html',
    );
    console.log('getEscapedContent output', doc.documentElement.textContent);
    return doc.documentElement.textContent;
  };
}

function mapStateToProps(state) {
  const {backgroundColor, typeRead, fontSize, fontFamily, distanceRow} =
    state.settingUI;
  return {
    backgroundColor,
    typeRead,
    fontSize,
    fontFamily,
    distanceRow,
  };
}

const mapDispatchToProps = {
  changeBackgroundColor,
  changeTypeRead,
  changeFontSize,
  changeFontFamily,
  changeDistanceRow,
};

export default NewsDetail;
