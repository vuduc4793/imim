import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image as RNImage,
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';
import { FlatList } from 'react-native-gesture-handler';

import { Colors, Styles, Icons, Texts, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Image } from 'react-native-elements';
import InfoLineComponent from '../../components/InfoLineComponent';
import HeaderSectionComponent from '../../components/HeaderSectionComponent'
import styles from "./styles";
import { Utils } from "../../helper";
import { parse } from 'fast-xml-parser';
import { getCompanyRepresentative } from '../../services/api';

class MLMCompanyRepresentative extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      companyDataFromParent: props?.route?.params?.companyData || '',
      companyData: [],
      isLoading: false,
    };

  }

  componentWillMount() {
  }

  async componentDidMount() {
    await this.setState({
      isLoading: true
    })
    let id = this.state.companyDataFromParent.id ?? ""
    console.log("componentDidMount id", id)
    getCompanyRepresentative(id).then((response) => {
      this.setState({
        isLoading: false
      })
      console.log('CompanyRepresentative getData response', JSON.stringify(response));
      return response.data
    }).then((textResponse) => {
      let obj = parse(textResponse);

      if (obj['soap:Envelope']
        && obj['soap:Envelope']['soap:Body']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCNguoidaidienResponse']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCNguoidaidienResponse']['VccaDNBHDCNguoidaidienResult']) {
        var result = obj['soap:Envelope']['soap:Body']['VccaDNBHDCNguoidaidienResponse']['VccaDNBHDCNguoidaidienResult']
        result = `[${result}]`
        let data = JSON.parse(result)
        console.log('CompanyRepresentative getData data', JSON.stringify(data))
        this.setState({
          companyData: data,
        })
      }
    }).catch(err => {
      console.log('CompanyRepresentative getData error', err);
    });
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
        <Text style={[Styles.styleHeaderCenterText, { color: 'white' }]}
          ellipsizeMode='tail'>
          Thông tin người đại diện
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <RNImage source={Icons.IC_BACK} style={[Styles.styleHeaderImageTopLeft, { tintColor: 'white' }]} />
        </TouchableOpacity>
      </View>
    );
  }


  renderContent = () => {
    let { companyData, companyDataFromParent } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundNumberQuestion, alignItems: 'center' }}>
        <View style={[Styles.sectionStyle]}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Image
                  style={{ height: 60, width: 80, borderRadius: 5, resizeMode: 'contain', }}
                  source={{ uri: `${companyDataFromParent.logo}` }}
                  PlaceholderContent={<Image source={Icons.IC_COMPANY} style={{ height: 60, width: 80, borderRadius: 5, tintColor: Colors.headerSection, resizeMode: 'contain', }} />}
                  placeholderStyle={{ backgroundColor: 'transparent' }}
                />
              </View>
              <View style={{ flex: 5, alignItems: 'flex-start', padding: 5, flexDirection: "column" }}>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_COMPANY}
                    style={styles.icon}
                  />
                  <Text style={styles.titleTextStyle}>{companyDataFromParent.ten}</Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_LOCATION}
                    style={styles.icon}
                  />
                  <Text style={styles.subTitleTextStyle}>{companyDataFromParent.diachi}</Text>
                </View>
                <View style={styles.subTextWrapper}>
                  <Image
                    source={Icons.IC_STATUS}
                    style={{ width: 15, height: 14, resizeMode: "cover", marginRight: 10 }}
                  />
                  <Text style={[styles.subTitleTextStyle, { color: 'green' }]}>{companyDataFromParent.option}</Text>
                </View>

              </View>
            </View>
          </View>
        </View>
        {
          companyData.length > 0 ?
            <FlatList
              style={{ flex: 1, padding: 10 }}
              data={companyData}
              renderItem={({ item, index }) => {
                return (
                  <View style={[Styles.sectionStyle]}>

                  </View>
                );
              }}

              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <View style={styles.bottomLine} elevation={5} />}
            /> :
            <Text style={styles.styleTextNoData}>{Texts.noSearchResult}</Text>
        }
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />
      </View>
    );
  }
  _onClick = (item) => {

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

export default MLMCompanyRepresentative

