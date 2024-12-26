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

class NotificationScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionNumber: 1,
      data: [
      ],
      isSearch: false,
      keyword: "",
      isLoading: false,
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
        <Text numberOfLines={2} style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
          Thông báo
        </Text>
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
        {/* <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._openSearch}>
          <Image source={Icons.IC_FIND} style={[Styles.styleHeaderImageTopRight, {tintColor: 'white'}]} />
        </TouchableOpacity> */}
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          {
            this.state.data.length > 0 ? 
            <FlatList 
            style={{flex: 1, padding: 10}}
            data={this.state.data}
            renderItem={({ item, index }) => {
              return (
              <TouchableOpacity 
                style={{flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 10}}
                onPress={() => this._onClick(item)}>
                
              </TouchableOpacity>
              );
            }
            }
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={()=><View style={styles.bottomLine} elevation={5} />}
          /> : <Text style={styles.styleTextNoData}>Chưa có thông báo nào</Text> 
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
  }

  getData = () => {

  }
}

function mapStateToProps(state) {
  return {
  };
}

const mapDispatchToProps = {
};

export default NotificationScreen

