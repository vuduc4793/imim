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

import { Colors, Styles, Icons, Texts, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from "./styles";
import { WebView } from 'react-native-webview';
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';

class WebViewScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    let newsLink = 'http://bhdc.vcca.gov.vn/?page=news&do=browse&category_id=fc296b89-976b-43d5-9a3d-00bf70b19567&current_id=73d30c5a-c8e6-4d75-b1d1-97a8d8ead14e3'
    this.state = {
      isATab: props.navigation ? false : true,
      link: props.navigation ? props?.route?.params?.link || newsLink : (props.link ? props.link : newsLink),
      title: props.navigation ? props?.route?.params?.title || Texts.tinTucCanhBao : (props.title ? props.title : Texts.tinTucCanhBao),
      isLoading: true
    };
  }
  componentDidMount() {

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
      <View style={[{ backgroundColor: Colors.colorPrimary }, Styles.styleHeader]}>
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
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}>
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
    let self = this;
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <WebView
          source={{ uri: this.state.link }}
          onLoadEnd={() => {
            setTimeout(() => {
              self.setState({ isLoading: false })
            }, 2000);
          }}
          onError={() => {
            this.setState({ isLoading: false });
            Alert.alert(
              "Thông báo",
              "Không thể tải trang!",
              [
                { text: 'OK', onPress: () => { } },
              ],
              { cancelable: false },
            );
          }}
          mediaPlaybackRequiresUserAction={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(WebViewScreen);

