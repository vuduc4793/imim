/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MainAppContainer from './app/index';
import { Provider } from 'react-redux';
// import { store } from './app/redux/store';
import AppContainer from './app/navigation';

import { applyMiddleware, createStore, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import reducers from './app/redux/reducers';

const middleWares = [thunkMiddleware];
const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  whitelist: [
    'settingUI'
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, compose(applyMiddleware()));
export const persistor = persistStore(store);

function App(): React.JSX.Element {
  return (

    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;