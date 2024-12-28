import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
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
  AppDimensions,
  TextStyles,
  Numbering,
} from '../../constants';
import {connect} from 'react-redux';
import Header from '../../components/Header';

import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import {Realm} from '@realm/react';
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
import HTML from 'react-native-render-html';
import {generateDefaultTextStyles} from 'react-native-render-html/src/HTMLDefaultStyles';
import {debounce} from 'lodash';
import {Utils} from '../../helper';

class MLMLawScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      titleBarText: props?.route?.params?.titleBarText || '',
      schema: props?.route?.params?.schema || '',
      dataList: [],
      isSearch: false,
      keyword: '',
      isLoading: false,
      maxItemIndex: props?.route?.params?.maxItemIndex || 0,
      startIndex: 0,
    };
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {}

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
    this.setState({keyword: text, startIndex: 0, dataList: []}, () => {
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
              //   this.setState({startIndex: 0, dataList: []}, ()=>{
              //     this.getData();
              //   })

              // }}
            />
          </View>
        ) : (
          <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
            {this.state.titleBarText}
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
        {this.state.dataList ? (
          <FlatList
            style={{flex: 1}}
            data={this.state.dataList}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  margin: 10,
                }}
                onPress={() => this._onClick(item)}>
                {/* <HTMLView 
                style={{marginBottom: 5}} 
                stylesheet={TextStyles.genQuestionTextStyles(AppDimensions.NORMAL_TEXT_SIZE)} 
                value={"<text>"+item.title+"<text>"}/> */}
                <HTML
                  containerStyle={{}}
                  html={Utils.removeHTMLTags(item?.title)}
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
                {/* <HTMLView 
                stylesheet={TextStyles.genAnswerTextStyles(AppDimensions.NORMAL_TEXT_SIZE)} 
                value={"<text>"+item.summary+"<text>"} /> */}
                <HTML
                  containerStyle={{}}
                  html={Utils.removeHTMLTags(item?.summary)}
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
    console.log('MLMLawScreen renderFooter');
    return (
      <ActivityIndicator
        style={Styles.activityIndicatorStyle}
        size="large"
        color={colors.colorPrimary}
      />
    );
  };

  _onClick = item => {
    console.log('onclick maxItemIndex' + this.state.maxItemIndex);
    console.log('onclick item' + JSON.stringify(item));

    this.props.navigation.navigate('MLMLawDetail', {
      schema: this.state.schema,
      itemIndex: item?.id,
      maxItemIndex: this.state.maxItemIndex,
      documentShortName: this.state.titleBarText,
    });
  };

  _openSearch = () => {
    let {isSearch} = this.state;
    if (isSearch) {
      this.setState({keyword: '', startIndex: 0, dataList: []}, () => {
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
    let {keyword, schema, startIndex, dataList} = this.state;
    console.log('schema= ' + schema);

    await this.setState({isLoading: true});
    const realm = await Realm.open(databaseOptions).catch(e => {});
    let data;
    if (keyword === '') {
      data = await realm.objects(schema).sorted('id');
    } else {
      data = await realm
        .objects(schema)
        .filtered(
          'textForSearch LIKE[c] $0',
          '*' + nonAccentVietnamese(keyword) + '*',
        );
      console.log('textForSearch = ' + keyword);
    }
    let dataFromRealm = Array.prototype.slice.call(
      data,
      startIndex,
      startIndex + ITEM_PER_LOADING,
    );
    console.log('AgentNotice dataList', JSON.stringify(dataFromRealm));
    console.log('startIndex= ' + startIndex);
    this.setState({
      dataList: dataList.concat(dataFromRealm),
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

export default MLMLawScreen;
