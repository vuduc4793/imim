import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {MyStatusBar} from '../../components/MyStatusBar';

import {
  Colors,
  Styles,
  Icons,
  Texts,
  TextStyles,
  Numbering,
  AppDimensions,
} from '../../constants';
import {connect} from 'react-redux';
import Header from '../../components/Header';

import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import Realm from 'realm';
import {Q_AND_A_SCHEMA} from '../../realm/constant';
import {databaseOptions} from '../../realm/index';
// import HTMLView from 'react-native-htmlview';
const ITEM_PER_LOADING = 10;
import {nonAccentVietnamese} from '../../helper/Utils';
import {
  changeBackgroundColor,
  changeTypeRead,
  changeFontSize,
  changeFontFamily,
  changeDistanceRow,
} from '../../redux/actions/settingUI';
import {Utils} from '../../helper';
import HTML from 'react-native-render-html';
import {generateDefaultTextStyles} from 'react-native-render-html/src/HTMLDefaultStyles';
import {debounce} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

class QAndAScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      questionNumber: 1,
      questionList: [],
      isSearch: false,
      keyword: '',
      isLoading: false,
      startIndex: 0,
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
        {/* {this.state.isLoading &&
          <ActivityIndicator
            style={Styles.activityIndicatorStyle}
            size="large" color={colors.colorPrimary}
          />
          } */}
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
        <Header
          body={this.renderHeaderBody()}
          left={this.renderHeaderLeft()}
          right={this.renderHeaderRight()}
        />
      </View>
    );
  }

  onChangeDebounced = debounce(text => {
    // Delayed logic goes here
    console.log('onChangeDebounced text', text);
    this.setState({keyword: text, startIndex: 0, questionList: []}, () => {
      this.getData();
    });
  }, 300);

  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        {this.state.isSearch ? (
          <View>
            <TextInput
              style={styles.styleTextInput}
              placeholder="Nhập nội dung mà bạn muốn tìm kiếm"
              placeholderTextColor="white"
              underlineColorAndroid="white"
              autoFocus={true}
              onChangeText={this.onChangeDebounced}
              // onSubmitEditing={()=>{
              //   this.setState({startIndex: 0, questionList: []}, ()=>{
              //     this.getData();
              //   })

              // }}
            />
          </View>
        ) : (
          <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
            {Texts.qAndA}
          </Text>
        )}
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity
          style={Styles.styleHeaderButtonTopLeft}
          onPress={this._goBack}>
          <Image
            source={Icons.IC_BACK}
            style={[Styles.styleHeaderImageTopLeft, {tintColor: 'white'}]}
          />
        </TouchableOpacity>
      </View>
    );
  }
  renderHeaderRight() {
    return (
      <View>
        <TouchableOpacity
          style={Styles.styleHeaderButtonTopLeft}
          onPress={this._openSearch}>
          <Image
            source={Icons.IC_FIND}
            style={[Styles.styleHeaderImageTopRight, {tintColor: 'white'}]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{flex: 1}}>
        {this.state.questionList ? (
          <FlatList
            style={{flex: 1}}
            data={this.state.questionList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: 10,
                }}
                onPress={() => this._onClick(item)}>
                <HTML
                  containerStyle={{}}
                  html={item.index + 1 + '. ' + item.question}
                  imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
                  baseFontStyle={{
                    fontSize: AppDimensions.NORMAL_TEXT_SIZE,
                    fontFamily: 'SegoeUI-Bold',
                    color: 'black',
                  }}
                  tagsStyles={generateDefaultTextStyles(
                    AppDimensions.NORMAL_TEXT_SIZE,
                  )}
                />
                <HTML
                  containerStyle={{}}
                  html={item.summary}
                  imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
                  baseFontStyle={{
                    fontSize: AppDimensions.SMALL_TEXT_SIZE,
                    fontFamily: 'SegoeUI',
                    color: 'black',
                  }}
                  tagsStyles={generateDefaultTextStyles(
                    AppDimensions.SMALL_TEXT_SIZE,
                  )}
                />
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={styles.bottomLine} elevation={5} />
            )}
            ListFooterComponent={this.renderFooter.bind(this)}
            onEndReachedThreshold={0.2}
            onEndReached={this.handleLoadMore.bind(this)}
          />
        ) : (
          <Text style={styles.styleTextNoData}>{Texts.noSearchResult}</Text>
        )}
        {Numbering.SHOW_ADS && (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,0.2)',
              alignItems: 'center',
              alignSelf: 'flex-end',
              justifyContent: 'center',
              width: 50,
              position: 'absolute',
              bottom: 30,
              right: 20,
              height: 50,
              backgroundColor: Colors.colorPrimary,
              borderRadius: 25,
            }}
            onPress={() => {
              this.props.navigation.navigate('PostQuestionScreen', {
                fakeMode: true,
              });
            }}>
            <Icon name="plus" size={17} color="#fff" />
          </TouchableOpacity>
        )}
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

  handleLoadMore = () => {
    let {startIndex} = this.state;
    if (!this.state.isLoading) {
      this.setState(
        {
          startIndex: startIndex + ITEM_PER_LOADING,
          isLoading: true,
        },
        () => {
          this.getData();
        },
      );
    }
  };

  renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!this.state.isLoading) return null;
    return (
      <ActivityIndicator
        style={Styles.activityIndicatorStyle}
        size="large"
        color={colors.colorPrimary}
      />
    );
  };

  _onClick = item => {
    console.log('onclick maxQuestionNumber' + this.state.maxQuestionNumber);
    this.props.navigation.navigate('QAndADetail', {
      questionNumber: item.index + 1,
      maxQuestionNumber: this.state.maxQuestionNumber,
    });
  };
  _openSearch = () => {
    let {isSearch} = this.state;
    if (isSearch) {
      this.setState({keyword: '', startIndex: 0, questionList: []}, () => {
        this.getData();
      });
    }
    this.setState(
      {
        isSearch: !isSearch,
      },
      () => {},
    );
  };
  getData = async () => {
    let {keyword, startIndex, questionList} = this.state;
    await this.setState({isLoading: true});
    const realm = await Realm.open(databaseOptions).catch(e => {});
    let data;
    if (keyword === '') {
      data = await realm.objects(Q_AND_A_SCHEMA);
    } else {
      data = await realm
        .objects(Q_AND_A_SCHEMA)
        .filtered(
          'textForSearch LIKE[c] $0',
          '*' + nonAccentVietnamese(keyword) + '*',
        );
    }
    let dataFromRealm = []
    for (let p of data) {
      dataFromRealm.push(p);
    }
    let plainDataFromRealm = [];
    dataFromRealm.forEach((item, index) => {
      let plainData = JSON.parse(JSON.stringify(item));
      plainData.question = Utils.removeHTMLTags(plainData.question);
      plainDataFromRealm.push(plainData);
    });
    // let questionList = [];
    // for (let p of data) {
    //   questionList.push(p);
    // }
    if (keyword === '') {
      this.setState({
        maxQuestionNumber: data.length,
      });
    }
    console.log('maxQuestionNumber = ' + data.length);

    this.setState({
      questionList: questionList.concat(plainDataFromRealm),
      isLoading: false,
    });
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

export default QAndAScreen;
