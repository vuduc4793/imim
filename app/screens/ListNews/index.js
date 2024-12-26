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
  Platform
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, Jsons, Numbering, AppDimensions} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";
import { FlatList } from 'react-native-gesture-handler';
const ITEM_PER_LOADING = 10;
import {Utils, DateTimeUtils} from "../../helper";
import { debounce } from "lodash";
import { getListNews } from '../../services/api';
import { XMLParser, XMLBuilder, XMLValidator } from 'fast-xml-parser';
const parser = new XMLParser();

class ListNews extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 1,
      allTin: [],
      listTin: [],
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
            color={colors.colorPrimary}
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
      <View style={[{ backgroundColor: Colors.colorPrimary },Styles.styleHeader]}>
        <Header
          body={this.renderHeaderBody()}
          left={this.renderHeaderLeft()}
          right={this.renderHeaderRight()}

        />
      </View>
    );
  }


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
              onSubmitEditing={()=>{
                this.setState({startIndex: 0, listTin: []}, ()=>{
                  this.getData();
                })
              }}
            />
          </View>) :
          (
            <Text numberOfLines={2} style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
              {Texts.news}
            </Text>
          )
        }
      </View>
    );
  }

  onChangeDebounced = debounce((text) => {
    // Delayed logic goes here
    console.log("onChangeDebounced text", text)
    this.setState({keyword: text, startIndex: 0, listTin: []}, ()=>{
      this.getData();
    })
  }, 300)

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
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {
            this.state.listTin ? 
            <FlatList 
            style={{flex: 1, padding: 10}}
            data={this.state.listTin}
            renderItem={({ item, index }) => {
              return (
              <TouchableOpacity 
                style={{flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 5}}
                onPress={() => this._onClick(item)}>
                <View style={[{paddingRight: 5}] }>
                  <View style={{flexDirection:'column', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{ alignItems: 'center', paddingRight: 10, backgroundColor: 'white'}}>
                        <Image
                          style={styles.itemImageStyle}
                          source={{uri: item.files_url}}
                          PlaceholderContent={<Image source={Icons.IC_COMPANY} style={[styles.itemImageStyle, {tintColor: Colors.headerSection}]}/>}
                          placeholderStyle={{backgroundColor: 'transparent'}}
                        />
                      </View>
                      <View style={{flex: 5, alignItems: 'flex-start', paddingRight: 5, flexDirection: "column"}}>
                        <View style={[styles.subTextWrapper, {paddingBottom: 5}]}>
                          <Text style={styles.titleTextStyle}>{item.title}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.subTextWrapper, {paddingBottom: 5, paddingTop: 10}]}>
                      <Image
                        source={Icons.IC_CLOCK}
                        style={styles.icon}
                      />
                      <Text style={styles.subTitleTextStyle}>{DateTimeUtils.dateConverter(item.modify)}</Text>
                    </View>
                    <View style={[styles.subTextWrapper, {paddingBottom: 5}]}>
                      <Text style={styles.subTitleTextStyle}>{item.title+"..."}</Text>
                    </View>
                  </View>   
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
        <View style={{height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor:'transparent'}}/>

      </View>
      
    );
  } 
  _onClick = (item) => {
    console.log("onclick "+ JSON.stringify(item));
  
    this.props.navigation.navigate('NewsDetail', {
      newsData: item
    });
  }
  _openSearch = () => {
    let { isSearch } = this.state;
    if (isSearch){
      this.setState({keyword: "",startIndex: 0, listTin: []}, ()=>{
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

  getData = () =>{
    this.setState({isLoading: true});
    let {keyword, allTin} = this.state;
    console.log('keyword', keyword);
    var json = {}
    if (false) {
      json = Jsons.DATA_LIST_TIN;
      this.setState({
        listTin: json,
        isLoading: false
      })
    } else {
      if (allTin.length == 0) {
        getListNews().then((response) => {
          console.log('ListNew getData response', JSON.stringify(response));
          return response.data 
        }).then((textResponse) => {
          let obj = parser.parse(textResponse);
          
          if (obj['soap:Envelope'] && obj['soap:Envelope']['soap:Body'] 
              && obj['soap:Envelope']['soap:Body']['VccaListTin1Response'] && 
              obj['soap:Envelope']['soap:Body']['VccaListTin1Response']['VccaListTin1Result']) {
                var result = obj['soap:Envelope']['soap:Body']['VccaListTin1Response']['VccaListTin1Result']
                result = `[${result}]`
                let data = JSON.parse(result)
                console.log('ListNew getData newsData', JSON.stringify(data));
            this.setState({
              allTin: data,
              isLoading: false
            }, () => {
              this.filterListWithKeyword(keyword)
            })
          }
        }).catch(err => {
          console.log('ListNew getData error', err);
        });
      } else {
        this.filterListWithKeyword(keyword)
      }
      
    }
    
  }

  filterListWithKeyword = (keyword) => {
    keyword = Utils.nonAccentVietnamese(keyword)
    console.log("filterListWithKeyword 364", keyword)
    let {allTin} = this.state;
    if (!keyword) {
      this.setState({
        listTin: allTin ,
        isLoading: false
      })
      return;
    }

    var filted = []
    for (let item of allTin) {
      if (Utils.nonAccentVietnamese(item.title).includes(keyword) ) {
        filted.push(item)
      }
    }
    this.setState({
      listTin: filted,
      isLoading: false
    })
  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
};

export default ListNews

