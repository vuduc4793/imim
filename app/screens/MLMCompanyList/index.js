import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  Linking,
  ActivityIndicator,
  // AsyncStorage
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, Jsons, Numbering, AppDimensions} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";
import { FlatList } from 'react-native-gesture-handler';
import Realm from 'realm';
import {MLM_COMPANY_SCHEMA} from '../../realm/constant'
import { databaseOptions } from '../../realm/index';
import {nonAccentVietnamese} from "../../helper/Utils";
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { StorageUtils } from '../../helper';
const ITEM_PER_LOADING = 10;
import {Utils} from "../../helper";
import { getListCompany } from '../../services/api';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
const parser = new XMLParser();
import { debounce } from "lodash";
import Icon from "react-native-vector-icons/FontAwesome"
class MLMCompanyList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      questionNumber: 1,
      companyList: [],
      companyListFull: [],
      isSearch: false,
      keyword: "",
      isLoading: true,
      selectedItem: null,
      updatedAt : null,
      startIndex: 0
    };
  }

  componentWillMount(){
    this.getData();
    
  }
  
  async componentDidMount(){
    try {
      let updatedTime = await StorageUtils.getData(Numbering.kMlmCompanyListUpdateAt);
      this.setState({
        updatedAt: updatedTime
      })
    } catch(error){
      console.log('StorageUtils.getData(Numbering.kMlmCompanyListUpdateAt) error', error); 
    }
    
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
            size="large" 
            color={Colors.colorPrimary}
          />
        }
      </View>
    );
  }
  openMap = (item) => {
    const lat = item.lat;
    const lng = item.lng;
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    let latLng;
    if (item.addressLink){
      latLng = this.getLatLng(item.addressLink);
    } else {
      latLng = `${lat},${lng}`;
    }
    console.log("latLng" + latLng);
    const label = item.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url); 
  }
  showActionSheet = () => {
    this.ActionSheet.show()
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
          right={this.renderHeaderRight()}

        />
      </View>
    );
  }

  onChangeDebounced = debounce((text) => {
    // Delayed logic goes here
    console.log("onChangeDebounced text", text)
    this.setState({keyword: text, startIndex: 0, questionList: []}, ()=>{
      this.getData();
    })
  }, 300)

  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        {
          this.state.isSearch ? 
          (<View>
            <TextInput
              style={styles.styleTextInput}
              placeholder='Nhập nội dung mà bạn muốn tìm kiếm'
              placeholderTextColor='white'
              underlineColorAndroid='white'
              autoFocus={true}
              onChangeText={this.onChangeDebounced}
              // onSubmitEditing={()=>{
              //   
              // }}
            />
          </View>) :
          (
            <Text numberOfLines={2} style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
              {Texts.multiLevelSalesList}
            </Text>
          )
        }
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={[Styles.styleHeaderImageTopLeft, {tintColor: 'white'}]} />
        </TouchableOpacity>
      </View>
    );
  }
  renderHeaderRight() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._openSearch}>
          <Image source={Icons.IC_FIND} style={[Styles.styleHeaderImageTopRight, {tintColor: 'white'}]} />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    console.log("this.state.companyList", this.state.companyList)
    return (
      <View style={{flex: 1}}>
        {/* {
          this.state.updatedAt && (
            <View style={{width: '100%', alignItems: "center", padding: 10,     backgroundColor: Colors.colorBlack5,}}>
              <Text style={
                {
                  alignContent: "center", 
                  fontSize: AppDimensions.NORMAL_TEXT_SIZE,
                  fontFamily: 'SegoeUI-BoldItalic' 
                }
                }>{this.state.updatedAt}</Text> 
            </View>
          )
        } */}
        <View style={{flex: 1}}>
          {
            this.state.companyList ? 
            <FlatList 
            style={{flex: 1, padding: 10}}
            data={this.state.companyList}
            renderItem={({ item, index }) => {
              return (
              <TouchableOpacity 
                style={{flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 10}}
                onPress={() => this._onClick(item)}>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_COMPANY}
                    style={styles.icon}
                  />
                  <Text style={styles.titleTextStyle}>{item.ten}</Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_LICENSE}
                    style={styles.icon}
                  />
                  <Text style={styles.subTitleTextStyle}>GCN đăng ký doanh nghiệp/Đầu tư số: <Text style={{color: Colors.headerSection}}>{item.sodangkydoanhnghiep}</Text></Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_LICENSE}
                    style={styles.icon}
                  />
                  <Text style={styles.subTitleTextStyle}>GCN đăng ký hoạt động BHĐC: <Text style={{color: Colors.headerSection}}>{item.sodangkyhoatdong}</Text></Text>
                </View>
              </TouchableOpacity>
              );
            }
            }
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={()=><View style={styles.bottomLine} elevation={5} />}
            onEndReached={this.handleLoadMore.bind(this)}
            onEndReachedThreshold={0.2}
          /> : <Text style={styles.styleTextNoData}>{Texts.noSearchResult}</Text> 
          }
        </View>
        {
        Numbering.SHOW_ADS && 
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
            this.props.navigation.navigate('MLMCompanySuggest');
          }}
        >
          <Icon name='plus' size={17} color='#fff' />
        </TouchableOpacity>
        }
        <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor:'transparent'}}/>

      </View>
      
    );
  } 
  _onClick = (item) => {
    console.log("onclick "+ item);
  
    this.props.navigation.navigate('MLMCompanyDetailCenter',{
      companyData: item
    });
  }
  _openSearch = () => {
    let { isSearch } = this.state;
    if (isSearch){
      this.setState({keyword: "",startIndex: 0, companyList: []}, ()=>{
        this.getData();
      });
    }
    this.setState({
      isSearch: !isSearch
    }, () => {

    })
  }

  handleLoadMore = () => {
    let {startIndex} = this.state;
    if (!this.state.isLoading) {
      this.setState({
        startIndex: startIndex + ITEM_PER_LOADING,
        isLoading: true
      }, () => {
        this.getData();
      });
       
    }
  };

  async getData() {
    await this.setState({isLoading: true});
    let {keyword, startIndex, companyList, companyListFull} = this.state;
    if (false) {
      console.log('keyword', keyword);
      Realm.open(databaseOptions).then(realm => {
        let data;
        if (keyword === ""){
          data = realm.objects(MLM_COMPANY_SCHEMA);
        } else {
          data = realm.objects(MLM_COMPANY_SCHEMA).
        filtered("textForSearch LIKE[c] $0", "*" + nonAccentVietnamese(keyword) + "*");
        }
        let dataFromRealm = Array.prototype.slice.call(data, startIndex, startIndex + ITEM_PER_LOADING);
        let companyListNew = [];
        for (let p of dataFromRealm) {
          let element = {};
          console.log('p.HoSoChung', p.HoSoChung)
          element.HoSoChung = JSON.parse(p.HoSoChung);
          element.HoSoCapNhat = JSON.parse(p.HoSoCapNhat);
          element.TruSoChinh = JSON.parse(p.TruSoChinh);
          element.ThongTinNguoiDaiDien = JSON.parse(p.ThongTinNguoiDaiDien);
          element.ThongTinChuSoHuu = JSON.parse(p.ThongTinChuSoHuu);
          element.tenKhongDau = p.tenKhongDau
          companyListNew.push(element);
        }
        this.setState({
          companyList: companyList.concat(companyListNew),
          isLoading: false
        })
        // console.log("MLM_COMPANY_SCHEMA"+JSON.stringify(data));
      }).catch((error) => {
        Alert.alert("Thông báo", "Dữ liệu bị lỗi!");
        this.setState({isLoading: false});
      });
    } else {
      if (companyListFull.length == 0) {
        getListCompany().then((response) => {
          return response.data 
        }).then((textResponse) => {
          let obj = parser.parse(textResponse);
          if (obj['soap:Envelope'] 
              && obj['soap:Envelope']['soap:Body'] 
              && obj['soap:Envelope']['soap:Body']['VccaListDNBHDCResponse'] 
              && obj['soap:Envelope']['soap:Body']['VccaListDNBHDCResponse']['VccaListDNBHDCResult']) {
                var result = obj['soap:Envelope']['soap:Body']['VccaListDNBHDCResponse']['VccaListDNBHDCResult']
                result = `[${result}]`
                let data = JSON.parse(result)
                console.log("🚀 ~ MLMCompanyList ~ getListCompany ~ data:", data)
                
                this.setState({
                  companyListFull: data,
                })
                this.filterListWithKeyword(keyword, data)
          }
        }).catch(err => {
          console.log('getListCompany getData error', err);
        });
      } else {
        this.filterListWithKeyword(keyword)
      }
    }
    
  }

  filterListWithKeyword = (keyword, data) => {
    keyword = Utils.nonAccentVietnamese(keyword)
    console.log("filterListWithKeyword 364", keyword)
    let {companyListFull} = this.state;
    if (!keyword) {
      this.setState({
        companyList: data?.length > 0 ? data : companyListFull,
        isLoading: false
      })
      return;
    }

    // sodangkydoanhnghiep,sodangkyhoatdong
    var filted = []
    for (let item of companyListFull) {
      if (Utils.nonAccentVietnamese(item.ten).includes(keyword) || Utils.nonAccentVietnamese(item.sodangkydoanhnghiep).includes(keyword) || Utils.nonAccentVietnamese(item.sodangkyhoatdong).includes(keyword)) {
        filted.push(item)
      }
    }
    this.setState({
      companyList: filted,
      isLoading: false
    })
  }
  getLatLng = (link) => {
    // const link = "https://www.google.com/maps/place/Ba+Sao+Hotel/@21.012531,105.7989155,17z/data=!4m8!3m7!1s0x3135aca0a8a069dd:0x87325764ab06e363!5m2!4m1!1i2!8m2!3d21.0128815!4d105.7988726";
  var firstIndexOfAlpha = link.indexOf("@");
  var cutString = link.substring(firstIndexOfAlpha+1);
  var splitByColon = cutString.split(",");
  var result = splitByColon[0]+ "," + splitByColon[1];
  return result;
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

export default MLMCompanyList

