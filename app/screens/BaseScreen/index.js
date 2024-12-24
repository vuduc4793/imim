import React from 'react';
import {
  Image,
  Platform,
  View,
  AppDimensions,
  Text,
  TouchableOpacity,
  Animated
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';
import styles from './styles';
import {Colors, Styles, Icons} from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  _goBack = () => {
    this.props.navigation.goBack();
  }

  renderHeader() {
    return (
      <View style={[{ backgroundColor: Colors.white }, styles.styleHeader]}>
        <Header
          left={this.renderTopLeft()}
          body={this.renderTopBody()}
        />
      </View>
    );
  }

  renderTopLeft() {
    return (
      <View style={styles.styleTopHeader}>
        <TouchableOpacity style={styles.styleButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_CANCEL} style={styles.styleImageTopLeft} />
        </TouchableOpacity>
      </View >
    );
  }

  renderTopBody() {
    return (
      <View style={styles.styleTopHeader}>
        <Text style={Styles.styleTextToolbar}>
          Thiết lập giao diện
        </Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={Colors.colorPrimaryDark} />
        {this.renderHeader()}

      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}
export default connect(mapStateToProps, null)(HomeScreen);

