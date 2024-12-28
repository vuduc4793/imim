import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image as RNImage,
  Platform,
} from 'react-native';
import {MyStatusBar} from '../../components/MyStatusBar';

import {
  Colors,
  Styles,
  Icons,
  Texts,
  AppDimensions,
  Jsons,
} from '../../constants';
import {connect} from 'react-redux';
import Header from '../../components/Header';

import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
import Realm from 'realm';
import {LAW_DOC_INFO_SCHEMA} from '../../realm/constant';
import {databaseOptions} from '../../realm/index';
import {nonAccentVietnamese, removeHTMLTags} from '../../helper/Utils';
import {
  changeBackgroundColor,
  changeTypeRead,
  changeFontSize,
  changeFontFamily,
  changeDistanceRow,
} from '../../redux/actions/settingUI';
import {Image} from 'react-native-elements';
import HTML from 'react-native-render-html';
import {generateDefaultTextStyles} from 'react-native-render-html/src/HTMLDefaultStyles';
import {debounce} from 'lodash';

class MLMLawListScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isSearch: false,
      isLoading: true,
      data: [],
      fullData: [],
      keyword: '',
    };
  }

  componentWillMount() {
    this.getDataFromDB();
  }

  getDataFromDB = () => {
    let {keyword} = this.state;
    this.setState({isLoading: true}, () => {
      Realm.open(databaseOptions)
        .then(realm => {
          let data;
          if (keyword === '') {
            data = realm.objects(LAW_DOC_INFO_SCHEMA);
          }
          let dataList = [];
          for (let p of data) {
            console.log('getDataFromDB', JSON.stringify(p));
            console.log(
              'removeHTMLTags(item.shortName)',
              removeHTMLTags(p.shortName),
            );
            dataList.push(p);
          }

          this.setState({
            data: dataList,
            fullData: dataList,
            isLoading: false,
          });
        })
        .catch(error => {
          Alert.alert('Thông báo', 'Dữ liệu bị lỗi!');
          this.setState({isLoading: false});
        });
    });
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

  onChangeDebounced = debounce(text => {
    // Delayed logic goes here
    console.log('onChangeDebounced text', text);
    this.setState({keyword: text}, () => {
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
              // onSubmitEditing={()=>{this.getData()}}
            />
          </View>
        ) : (
          <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
            {Texts.phapLuatBHDC}
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
          <RNImage
            source={Icons.IC_BACK}
            style={[Styles.styleHeaderImageTopLeft]}
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
          <RNImage
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
        {this.state.data ? (
          <FlatList
            style={{flex: 1}}
            data={this.state.data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={{flex: 0, margin: 10}}
                onPress={() => this._onClick(item)}>
                <View
                  style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                  {item.link ? (
                    <Image
                      style={{height: 60, width: 60, borderRadius: 5}}
                      source={{uri: item.link ? item.link : ''}}
                      PlaceholderContent={
                        <Image
                          source={Icons.IC_LAW_DOC}
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 5,
                            tintColor: Colors.colorPrimary,
                          }}
                        />
                      }
                      placeholderStyle={{backgroundColor: 'transparent'}}
                    />
                  ) : (
                    <Image
                      style={{height: 60, width: 60, borderRadius: 5}}
                      PlaceholderContent={
                        <Image
                          source={Icons.IC_LAW_DOC}
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 5,
                            tintColor: Colors.colorPrimary,
                          }}
                        />
                      }
                      placeholderStyle={{backgroundColor: 'transparent'}}
                    />
                  )}
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      width: Platform.isPad ? 20 : 10,
                    }}
                  />
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <HTML
                      containerStyle={{}}
                      html={removeHTMLTags(item.shortName)}
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
                      html={removeHTMLTags(item.name)}
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
                  </View>
                </View>
              </TouchableOpacity>
            )}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={styles.bottomLine} elevation={5} />
            )}
          />
        ) : (
          <Text style={styles.styleTextNoData}>{Texts.noSearchResult}</Text>
        )}
      </View>
    );
  };
  _onClick = item => {
    console.log('>>>>>>', item);
    this.props.navigation.navigate('MLMLaw', {
      schema: item.schemaName,
      titleBarText: item.shortName,
      maxItemIndex: item.numberOfItem,
    });
  };

  capitalize = s => {
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  _openSearch = () => {
    let {isSearch} = this.state;
    if (isSearch) {
      this.setState({keyword: ''}, () => {
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

  getData = () => {
    let {keyword, fullData} = this.state;

    if (keyword == '') {
      this.setState({data: fullData});
    } else {
      let filterData = [];
      fullData.forEach(element => {
        if (
          nonAccentVietnamese(element.name).contains(
            nonAccentVietnamese(keyword),
          )
        ) {
          filterData.push(element);
        }
      });
      this.setState({data: filterData});
    }
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

export default MLMLawListScreen;
