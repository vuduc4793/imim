
import {createStackNavigator, addNavigationHelpers, createAppContainer } from 'react-navigation';
// import { createStackNavigator, createAppContainer } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import QAndADetailScreen from '../screens/QAndADetailScreen';

// import ContentStoryScreen from '../screens/ContentStoryScreen';
import HomeScreen from '../screens/HomeScreen';
import QAndAScreen from '../screens/QAndAScreen';
import AboutUsScreen from "../screens/AboutUsScreen";
import PDFViewerScreen from '../screens/PDFViewerScreen';
import WebViewScreen from '../screens/WebViewScreen';
import MLMCompanyList from '../screens/MLMCompanyList';
import ReportScreen from "../screens/ReportScreen";

import NewsAndAlertScreen from '../screens/NewsAndAlertsScreen';
import MLMLawListScreen from '../screens/MLMLawListScreen';
import MLMLawScreen from '../screens/MLMLawScreen';
import MLMLawDetailScreen from '../screens/MLMLawDetailScreen';
import AgentNoticeScreen from '../screens/AgentNoticeScreen';

import MLMCompanyDetailCenter from '../screens/MLMCompanyDetailCenterScreen';
import MLMCompanyCommonDetail from '../screens/MLMCompanyCommonDetailScreen';
import MLMCompanyAnotherDetail from '../screens/MLMCompanyAnotherDetail';
import MLMCompanyFile from '../screens/MLMCompanyFile';
import MLMCompanyComment from '../screens/MLMCompanyComment';
import MLMCompanyAgency from '../screens/MLMCompanyAgency';
import MLMCompanyOwner from '../screens/MLMCompanyOwner';
import MLMCompanyRepresentative from '../screens/MLMCompanyRepresentative';

import YoutubeScreen from '../screens/YoutubeScreen';
import AboutUsiOSScreen from '../screens/AboutUsiOSScreen'
import PostQuestionScreen from '../screens/PostQuestionScreen'

import ListNews from '../screens/ListNews'
import NewsDetail from '../screens/NewsDetail'

import MLMCompanySuggest from '../screens/MLMCompanySuggest'
import SettingScreen from '../screens/SettingScreen'
import NotificationScreen from '../screens/NotificationScreen'

console.disableYellowBox = true;
import { fromRight } from 'react-navigation-transitions';

const AppNavigator = createStackNavigator(
  {
  Splash: { screen: SplashScreen },
  Home: { screen: HomeScreen },
  QAndADetail: {screen: QAndADetailScreen },
  QAndA: {screen: QAndAScreen },
  AboutUs: {screen: AboutUsScreen},
  PDFViewer: {screen: PDFViewerScreen },
  WebViewScreen: {screen: WebViewScreen},
  ReportScreen: {screen: ReportScreen},
  MLMCompanyList:{screen:MLMCompanyList},
  NewsAndAlert: {screen: NewsAndAlertScreen},
  MLMLawList: {screen: MLMLawListScreen},
  MLMLaw: {screen: MLMLawScreen},
  MLMLawDetail: {screen: MLMLawDetailScreen},
  AgentNotice: {screen: AgentNoticeScreen},

  AboutUsiOS: {screen: AboutUsiOSScreen},
  MLMCompanyDetailCenter: {screen: MLMCompanyDetailCenter},
  MLMCompanyCommonDetail: {screen: MLMCompanyCommonDetail},
  MLMCompanyAnotherDetail: {screen: MLMCompanyAnotherDetail},
  MLMCompanyComment: {screen: MLMCompanyComment},
  MLMCompanyFile: {screen: MLMCompanyFile},
  MLMCompanyAgency: {screen: MLMCompanyAgency},
  MLMCompanyOwner: {screen: MLMCompanyOwner},
  MLMCompanyRepresentative: {screen: MLMCompanyRepresentative},

  YoutubeScreen: {screen: YoutubeScreen},
  ListNews: {screen: ListNews},
  NewsDetail: {screen: NewsDetail},
  PostQuestionScreen: {screen: PostQuestionScreen},

  MLMCompanySuggest: {screen: MLMCompanySuggest},
  SettingScreen: {screen: SettingScreen},
  NotificationScreen: {screen: NotificationScreen}
},
  {
    headerMode: 'none',
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
      gestureDirection: 'inverted'
    },
    transitionConfig: () => fromRight()
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
