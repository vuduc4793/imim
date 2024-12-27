import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions, TextStyles } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";

// import HTMLView from 'react-native-htmlview';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { getData, LUU_Y_NHA_PHAN_PHOI } from "../../helper/StorageUtils";
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import HTML from 'react-native-render-html';
import { generateDefaultTextStyles } from 'react-native-render-html/src/HTMLDefaultStyles';
class AgentNoticeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: props.fontSize || 14,
      data: [],
      header: "",
      // title: "Lưu ý nhà phân phối",
      activeSections: [0, 1],
      collapsed: true,
      multipleSelect: true,
    };
  }
  componentDidMount() {

  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.fontSize !== nextProps.fontSize) {
      this.setState({
        fontSize: nextProps.fontSize,
      })
    }
  }
  async componentWillMount() {
    let dt = await getData(LUU_Y_NHA_PHAN_PHOI);

    dt = JSON.parse(dt);

    this.setState({
      data: dt.list,
      header: dt.header
    })
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }

  renderHeaderr() {
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
          Lưu ý
        </Text>
      </View>
    );
  }

  renderHeaderLeft() {
    return (
      <View >
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={Styles.styleHeaderImageTopLeft} />
        </TouchableOpacity>
      </View>
    );
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    console.log("section.title", section.title)
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive, { padding: 10 }]}
        transition="backgroundColor"
      >
        {/* <HTMLView style={{marginLeft: 10, marginRight: 10}} stylesheet={TextStyles.CommonStyles} value={"<text><h1>"+section.title+"</h1><text>"}/> */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <HTML
              containerStyle={{}}
              html={section.title}
              imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
              baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI-Bold', color: 'white' }}
              tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
            />
          </View>
          <Image source={isActive ? Icons.IC_UP_ARROW : Icons.IC_DOWN_ARROW} style={{ width: 24, height: 20, resizeMode: 'contain', tintColor: 'white' }} />
        </View>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive, { padding: 10 }]}
        transition="backgroundColor"
      >
        {/* <HTMLView style={{marginLeft: 10, marginRight: 10}} stylesheet={TextStyles.CommonStyles} value={"<text><p>"+section.content+"</p><text>"}/> */}
        <HTML
              containerStyle={{}}html={section.content}
          imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
          baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
          tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
        />
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {<MyStatusBar backgroundColor={Colors.colorPrimaryDark} />}
        {this.renderHeaderr()}
        <ScrollView
          style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 10 }}>
            <HTML
              containerStyle={{}}html={this.state.header}
              imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
              baseFontStyle={{ fontSize: AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
              tagsStyles={generateDefaultTextStyles(AppDimensions.NORMAL_TEXT_SIZE)}
            />
          </View>
          <Accordion
            activeSections={activeSections}
            sections={this.state.data}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
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

export default AgentNoticeScreen

