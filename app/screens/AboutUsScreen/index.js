import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  // AsyncStorage
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions, TextStyles, Numbering } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import styles from "./styles";

// import HTMLView from 'react-native-htmlview';
import { getData, ABOUT_US, LUU_Y_NHA_PHAN_PHOI } from "../../helper/StorageUtils";
import FontAdjustmentComponent from "../../components/FontAdjustmentComponent";
import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Utils } from "../../helper";
import HTML from 'react-native-render-html';
import { generateDefaultTextStyles } from 'react-native-render-html/src/HTMLDefaultStyles';
class AboutUsScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fontSize: props.fontSize,
      data: "<p></p>",
      title: props.navigation ? props?.route?.params?.title : props.title,
      screenType: props.navigation ? props?.route?.params?.screenType : props.title,
    };
  }
  async componentDidMount() {
    await this.setState({ isLoading: true })
    this.getDataFromLocalStorage();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.fontSize !== nextProps.fontSize) {
      this.setState({
        fontSize: nextProps.fontSize,
      })
    }
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
            size="large"
            color={Colors.colorPrimary}
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
      <View style={styles.styleHeaderCenter}>
        <TouchableOpacity style={Styles.styleHeaderButtonTopLeft} onPress={this._goBack}>
          <Image source={Icons.IC_BACK} style={Styles.styleHeaderImageTopLeft} />
        </TouchableOpacity>
      </View>
    );
  }


  renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
          {/* <HTMLView stylesheet={TextStyles.buildCommonStyles(this.state.fontSize)} value={"<text>"+this.state.data+"<text>"}/> */}
          <HTML html={this.state.data}
            imagesMaxWidth={AppDimensions.WINDOW_WIDTH - 20}
            baseFontStyle={{ fontSize: this.state.screenType === Texts.introduce ? this.state.fontSize : AppDimensions.NORMAL_TEXT_SIZE, fontFamily: 'SegoeUI', color: 'black' }}
            tagsStyles={generateDefaultTextStyles(this.state.screenType === Texts.introduce ? this.state.fontSize : AppDimensions.NORMAL_TEXT_SIZE)}
            containerStyle={{}}
         />
        </ScrollView>
        {
          this.state.screenType === Texts.introduce &&
          (<FontAdjustmentComponent
            style={{ width: "100%" }}
            currentFontSize={this.state.fontSize}
            onPressIncrease={() => { this.onChangeFontSize(this.state.fontSize + Numbering.fontSizeChangeConst) }}
            onPressDecrease={() => { this.onChangeFontSize(this.state.fontSize - Numbering.fontSizeChangeConst) }}
          />)
        }
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />

      </View>
    );
  }
  getDataFromLocalStorage = () => {
    if (this.state.screenType === Texts.tiepNhanPhanAnh) {
      this.setState({
        data: "Vui lòng liên hệ với Cục Cạnh tranh và Bảo vệ người tiêu dùng (Cục CT&BVNTD), Bộ Công Thương trong trường hợp có phản ánh, khiếu nại tại địa chỉ: 25 Ngô Quyền, Hoàn Kiếm, Hà Nội; \nEmail: vcca@moit.gov.vn; \nWebsite: bhdc.vcca.gov.vn."
      })
      return;
    }
    let key;
    if (this.state.screenType === Texts.introduce) {
      key = ABOUT_US;
    } else if (this.state.screenType === 'QUANGCAO') {
      key = Numbering.kAdsContent;
    } else {
      key = LUU_Y_NHA_PHAN_PHOI;
    }
    getData(key)
      .then(res => {
        this.setState({ isLoading: false })
        if (res !== null) {
          this.setState({
            data: Utils.removeFontSizeTag(res)
            //           data: `
            //           <h2 style="text-align:center"><span style="color:#3498db">THÔNG TIN VỀ HOẠT ĐỘNG BÁN HÀNG ĐA CẤP TẠI VIỆT NAM</span></h2><p style="text-align:justify">Bán hàng đa cấp là hình thức phân phối hàng hóa mới xuất hiện ở Việt Nam từ những năm 2000. Hình thức này được pháp luật Việt Nam thừa nhận tại Luật cạnh tranh năm 2004. Kể từ đó, hàng loạt các văn bản quy phạm pháp luật quản lý hoạt động bán hàng đa cấp được ban hành và thực thi.</span></span></p>
            // <p style="text-align:justify">Trong khoảng 20 năm tồn tại tại Việt Nam, hoạt động bán hàng đa cấp đã có những đóng góp nhất định cho xã hội, tạo nhiều công ăn việc làm, đóng góp cho ngân sách nhà nước, mang lại nhiều hàng hóa chất lượng cho người tiêu dùng&hellip; Tuy nhiên, những biến tướng từ hoạt động bán hàng đa cấp cũng gây ra nhiều bức xúc cho xã hội, thiệt hại cho người dân. </span></span></p>
            // <p style="text-align:justify">Thực tiễn này dẫn đến nhu cầu quản lý nhà nước đối với hoạt động bán hàng đa cấp ngày càng được đề cao, với mục tiêu đảm bảo môi trường hoạt động lành mạnh, hiệu quả cho các doanh nghiệp bán hàng đa cấp chính thống, đồng thời phòng ngừa, ngăn chặn tối đa các hoạt động lợi dụng bán hàng đa cấp để trục lợi bất hợp pháp.</span></span></p>
            // <p style="text-align:justify">Trong nỗ lực nâng cao hiệu quả công tác quản lý hoạt động bán hàng đa cấp, Bộ Công Thương xây dựng trang thông tin điện tử về quản lý hoạt động bán hàng đa cấp </span>http://bhdc.vcca.gov.vn</span>. Đây là trang thông tin cập nhật liên tục các tin tức trong công tác quản lý hoạt động bán hàng đa cấp, bao gồm thông tin về các chính sách, pháp luật mới, thông tin về các hoạt động trong công tác quản lý, và cả thông tin về các trường hợp vi phạm đã bị xử lý.</span></span></p>
            // <p style="text-align:justify">Trang thông tin điện tử quản lý hoạt động bán hàng đa cấp đăng tải công khai các tài liệu hoạt động của các doanh nghiệp bán hàng đa cấp, nâng cao tính minh bạch, giúp người dân và người tham gia bán hàng đa cấp đều có thể tiếp cận với các thông tin pháp lý chính thống, các tài liệu hoạt động chính thống của doanh nghiệp.</span></span></p>
            // <p style="text-align:justify">Bên cạnh đó, trang thông tin điện tử này cũng tạo kênh kết nối giữa Bộ Công Thương và các Sở Công Thương trong công tác quản lý hoạt động bán hàng đa cấp nhằm tiết kiệm thời gian, chi phí và nâng cao hiệu quả quản lý. </span></span></p>
            //           `
          })

        }
      }).catch(err => console.log('error', err));
  }

  onChangeFontSize = (fontSize) => {
    // this.props.changeFontSize(fontSize);
    AsyncStorage.setItem(Numbering.normalTextSize, fontSize + '');
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

export default AboutUsScreen

