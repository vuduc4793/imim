import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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


const Stack = createStackNavigator();

function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name={"Splash"} component={SplashScreen} />
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"QAndADetail"} component={QAndADetailScreen} />
        <Stack.Screen name={"QAndA"} component={QAndAScreen} />
        <Stack.Screen name={"AboutUs"} component={AboutUsScreen} />
        <Stack.Screen name={"PDFViewer"} component={PDFViewerScreen} />
        <Stack.Screen name={"WebViewScreen"} component={WebViewScreen} />
        <Stack.Screen name={"ReportScreen"} component={ReportScreen} />
        <Stack.Screen name={"MLMCompanyList"} component={MLMCompanyList} />
        <Stack.Screen name={"NewsAndAlert"} component={NewsAndAlertScreen} />
        <Stack.Screen name={"MLMLawList"} component={MLMLawListScreen} />
        <Stack.Screen name={"MLMLaw"} component={MLMLawScreen} />
        <Stack.Screen name={"MLMLawDetail"} component={MLMLawDetailScreen} />
        <Stack.Screen name={"AgentNotice"} component={AgentNoticeScreen} />
        <Stack.Screen name={"AboutUsiOS"} component={AboutUsiOSScreen} />
        <Stack.Screen name={"MLMCompanyDetailCenter"} component={MLMCompanyDetailCenter} />
        <Stack.Screen name={"MLMCompanyCommonDetail"} component={MLMCompanyCommonDetail} />
        <Stack.Screen name={"MLMCompanyAnotherDetail"} component={MLMCompanyAnotherDetail} />
        <Stack.Screen name={"MLMCompanyComment"} component={MLMCompanyComment} />
        <Stack.Screen name={"MLMCompanyFile"} component={MLMCompanyFile} />
        <Stack.Screen name={"MLMCompanyAgency"} component={MLMCompanyAgency} />
        <Stack.Screen name={"MLMCompanyOwner"} component={MLMCompanyOwner} />
        <Stack.Screen name={"MLMCompanyRepresentative"} component={MLMCompanyRepresentative} />
        <Stack.Screen name={"YoutubeScreen"} component={YoutubeScreen} />
        <Stack.Screen name={"ListNews"} component={ListNews} />
        <Stack.Screen name={"NewsDetail"} component={NewsDetail} />
        <Stack.Screen name={"PostQuestionScreen"} component={PostQuestionScreen} />
        <Stack.Screen name={"MLMCompanySuggest"} component={MLMCompanySuggest} />
        <Stack.Screen name={"SettingScreen"} component={SettingScreen} />
        <Stack.Screen name={"NotificationScreen"} component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContainer;
