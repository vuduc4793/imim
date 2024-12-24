import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, AppDimensions, Numbering} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from "./styles";
import { TabView, SceneMap } from 'react-native-tab-view';
import AgentNoticeScreen from '../AgentNoticeScreen'
import WebViewScreen from '../WebViewScreen'
import YoutubeScreen from '../YoutubeScreen'
import { StorageUtils, Utils } from "../../helper";

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';

class NewsAndAlertScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Tin tức' },
        { key: 'second', title: 'Ấn phẩm' },
        { key: 'third', title: 'Lưu ý' },
      ],
      loadVideo: false,
      youtubeLink: Numbering.defaultYoutubeLink
    };
  }
  async componentDidMount(){
    let youtubeLink = await StorageUtils.getData(Numbering.kYoutubeLink);
    if (youtubeLink != null){
      this.setState({youtubeLink});
    }
  }
  

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
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
          showShadow={false}
        />
      </View>
    );
  }


  renderHeaderBody() {
    return (
      <View style={Styles.styleHeaderCenter}>
        <Text style={[Styles.styleHeaderCenterText, {color: 'white'}]}>
          Tin tức, Lưu ý
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View style={styles.styleHeaderCenter}>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={Styles.styleHeaderImageTopLeft} />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <TabView style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
        />
      </View>
      
    );
  } 

  _handleIndexChange = index => {
    this.setState({ index })
    this.setState({loadVideo: index === 1})
  };

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({ index: i })}>
              <Text>{route.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <WebViewScreen/>
      case 'second':
        return <WebViewScreen link={this.state.youtubeLink}/>
      case 'third':
        return <AgentNoticeScreen />;
      default:
        return null;
    }
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsAndAlertScreen);


