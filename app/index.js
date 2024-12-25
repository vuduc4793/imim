import React, { Component } from 'react';
import AppContainer from './navigation/index';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {
  Text,
  Platform
} from 'react-native';

export default class MainAppContainer extends Component {
  constructor() {
    super();
    this.state = {
      dataVersion: ""
    };
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false; 
    
  }

  componentDidMount() {
    console.log("reach componentDidMount");
  }

 
  
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}