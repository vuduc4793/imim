import PropTypes from 'prop-types';
import React from 'react';
import {
  Platform,
  View,
} from 'react-native';
import {Colors, AppDimensions} from "../../constants";
export const HEADER_HEIGHT = Platform.isPad ? 100 : 55
export default class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showShadow: this.props.showShadow != null ? this.props.showShadow : true
    };
  }
  static propTypes = {
    body: PropTypes.element,
    bodyStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    left: PropTypes.element,
    leftStyle: PropTypes.object,
    right: PropTypes.element,
    rightStyle: PropTypes.object,
    style: PropTypes.object,
    showShadow: PropTypes.bool
  };

  setNativeProps(nativeProps) {

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showShadow != this.props.showShadow){
      this.setState({showShadow: this.props.showShadow});
    }
  }
  renderLeft() {
    return this.props.left;
  }

  renderRight() {
    return this.props.right;
  }

  renderBody() {
    return this.props.body;
  }

  render() {
    return (
      <View>
        <View style={{ ...styles.rootContainer, ...this.props.style }}>
          <View style={{ ...styles.leftContainer, ...this.props.leftStyle }}>
            {this.renderLeft()}
          </View>
          <View style={{ ...styles.bodyContainer, ...this.props.bodyStyle }}>
            {this.renderBody()}
          </View>
          <View style={{ ...styles.rightContainer, ...this.props.rightStyle }}>
            {this.renderRight()}
          </View>
        </View>
        {this.state.showShadow && <View style={styles.bottomLine} elevation={5} />} 
      </View>
    );
  }
}

const styles = {
  rootContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    width: AppDimensions.WINDOW_WIDTH,
  },

  leftContainer: {
    // width: 40,
    zIndex: 1000,
    aspectRatio: 0.8,
    height: '100%', 
  },

  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  rightContainer: {
    // width: 40,
    zIndex: 1000,
    aspectRatio: 0.8,
    height: '100%', 
  },

  bottomLine: {
    width: AppDimensions.WINDOW_WIDTH,
    height: 1,
    backgroundColor: Colors.colorBlack3,
    opacity: 0.2,
    shadowColor: Colors.colorBlack3,
    shadowOffset: { width: 0, height: 5 },
  }
};
