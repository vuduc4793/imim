import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import {Colors, Styles, Icons, Texts, AppDimensions} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import styles from "./styles";
import PDFView from 'react-native-view-pdf';
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';

class PDFViewerScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      isLoading: true
    };
  }
  componentDidMount(){
   
  }
  componentWillMount(){   
    
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}
        {this.renderContent()}
        {this.state.isLoading &&
          <ActivityIndicator
              style={Styles.activityIndicatorStyle}
              size="large" color={colors.colorPrimary}
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
          Pháp luật BHDC
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
      <View style={{ flex: 1,margin: 10 }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resource={"nghi_dinh_40_2018_nd_cp_quan_ly.pdf"}
          resourceType={'file'}
          onLoad={() => this.setState({isLoading: false})}
          onError={(error) => {
            console.log('Cannot render PDF', error)
            this.setState({isLoading: false});
            Alert.alert(
              "Thông báo",
              "Không thể tải tài liệu!",
              [
                {text: 'OK', onPress: () => {}},
              ],
              {cancelable: false},
            );
            }
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(PDFViewerScreen);

