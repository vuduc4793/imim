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
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, AppDimensions, Numbering} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from "./styles";
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import YouTube from 'react-native-youtube';
import { StorageUtils, Utils } from "../../helper";

class YoutubeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isATab: props.navigation ? false : true,
      title: "Ấn phẩm",
      isLoading: false,
      loadVideo : props.loadVideo,
      youtubeLink: 'jo7GdZO-11Y'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Youtube screen prevprops', prevProps)
    console.log('Youtube screen currprops', this.props)
    if (prevProps.loadVideo != this.props.loadVideo){
      this.setState({loadVideo: this.props.loadVideo});
    }
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
        {!this.state.isATab && <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />}
        {!this.state.isATab && this.renderHeader()}
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
        />
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
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={Styles.styleHeaderImageTopLeft} />
        </TouchableOpacity>
      </View>
    );
  }

  renderContent = () => {
    return (
      <View style={{ flex: 1,margin: 10 }}>
        <YouTube
          apiKey="AIzaSyAgu-btPncbMxMZIrv1dm5AqHwlRQg2Ijc"
          videoId={this.state.youtubeLink}   // The YouTube video ID
          resumePlayAndroid={false}
          play={this.state.loadVideo}             // control playback of video with true/false
          fullscreen={false}               // control whether the video should play in fullscreen or inline
          loop={false}             // control whether the video should loop when ended
          showFullscreenButton
          controls={1}
          onReady={this.handleReady}
          onChangeState={e => {}}
          onChangeQuality={e => {}}
          onError={e => console.log('onerror YouTube', e.error)}
          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
      
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeScreen);

