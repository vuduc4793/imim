import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  ScrollView,
  Image as RNImage,
  ActivityIndicator
} from 'react-native';
import { MyStatusBar } from '../../components/MyStatusBar';

import { Colors, Styles, Icons, Texts, AppDimensions } from "../../constants";
import { connect } from 'react-redux';
import Header from '../../components/Header';

import { changeBackgroundColor, changeTypeRead, changeFontSize, changeFontFamily, changeDistanceRow } from '../../redux/actions/settingUI';
import { Image } from 'react-native-elements';
import HeaderSectionComponent from '../../components/HeaderSectionComponent';
import styles from "./styles";
import { Utils } from "../../helper";
import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
import { getCompanyHoSo } from '../../services/api';
import { parse } from 'fast-xml-parser';

class MLMCompanyAnotherDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isShowAd: false,
      questionNumber: 1,
      companyDataFromParent: props?.route?.params?.companyData || '',
      companyData: {},
      isSearch: false,
      keyword: "",
      isLoading: false,
      title: props?.route?.params?.title || '',
      specificData: this.getSpecificData(props?.route?.params?.title || '', props?.route?.params?.companyData || '')
    };

  }

  async componentDidMount() {
    this.getData()
  }

  getSpecificData = (title, companyData) => {
    console.log('title= ', title);
    console.log('companyData= ', JSON.stringify(companyData));

    let self = this;
    let progressedData;
    if (title === 'Hồ sơ cập nhật') {
      progressedData = companyData.HoSoCapNhat;
    } else if (title === 'Trụ sở chính/Chi nhánh/VP đại diện/Địa điểm kinh doanh') {
      progressedData = companyData.TruSoChinh;
    } else if (title === 'Thông tin người đại diện') {
      progressedData = companyData.ThongTinNguoiDaiDien;
    } else if (title === 'Thông tin chủ sở hữu') {
      progressedData = companyData.ThongTinChuSoHuu;
    }
    if (Array.isArray(progressedData)) {
      progressedData = {
        'null': progressedData
      }
    }
    let result = {};
    console.log('progressedData= ', JSON.stringify(progressedData));

    Object.keys(progressedData).map(function (key) {
      console.log('reach 61');

      result[key] = self.getTableData(progressedData[key]);
      console.log("getTableData", JSON.stringify(result));

    });
    console.log("result", JSON.stringify(result));
    return result;

  }
  getTableData = (data) => {
    let tableHead = ['STT'], tableData = [];
    let self = this;

    data.map((item, i) => {
      let rowData = [i];
      Object.keys(item).map(function (itemKey) {
        if (i === 0) {
          tableHead.push(self.convertKeyToVi(itemKey));
        }

        rowData.push(item[itemKey]);
      })
      tableData.push(rowData);
    })
    return {
      tableHead, tableData
    }
  }
  convertKeyToVi = (key) => {
    if (key === 'GiayChungNhanDangKyBHDC') {
      return 'Giấy chứng nhận đăng ký hoạt động bán hàng đa cấp';
    } else if (key === 'TenTep') {
      return 'Tên tệp';
    } else if (key === 'NgayGui') {
      return 'Ngày gửi';
    } else if (key === 'QuyTacHoatDong') {
      return 'Quy tắc hoạt động';
    } else if (key === 'KeHoachTraThuong') {
      return 'Kế hoạch trả thưởng';
    } else if (key === 'ChuongTrinhDaoTao') {
      return 'Chương trình đào tạo';
    } else if (key === 'HopDongBanHangDaCap') {
      return 'Hợp đồng bán hàng đa cấp';
    } else if (key === 'HangHoaKinhDoanhTheoPhuongThucDaCap') {
      return 'Hàng hóa kinh doanh theo phương thức đa cấp';
    } else if (key === 'TruSoChinh') {
      return 'Trụ sở chính';
    } else if (key === 'TenChiNhanh') {
      return 'Tên chi nhánh';
    } else if (key === 'TinhTrang') {
      return 'Tình trạng';
    } else if (key === 'ThongTin') {
      return 'Thông tin';
    } else if (key === 'TinhThanh') {
      return 'Tỉnh thành';
    } else if (key === 'ThongTinChuSoHuuCaNhan') {
      return 'Thông tin chủ sở hữu cá nhân';
    } else if (key === 'ThongTinChuSoHuuPhapNhan') {
      return 'Thông tin chủ sở hữu pháp nhân';
    }
    return key;
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
          {this.state.title}
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
    let { companyData, companyDataFromParent, specificData } = this.state;
    let self = this;
    const isHoSoCapNhat = this.state.title === 'Hồ sơ cập nhật';
    console.log('isHoSoCapNhat', isHoSoCapNhat);
    return (
      <View style={{ flex: 1, backgroundColor: Colors.backgroundNumberQuestion, alignItems: 'center' }}>
        <View style={[Styles.sectionStyle]}>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 2, alignItems: 'center' }}>
                <Image
                  style={{ height: 60, width: 80, borderRadius: 5, resizeMode: 'contain', }}
                  source={{ uri: `${companyData.logo}` }}
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
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {
            Object.keys(specificData).map(function (key) {
              console.log('specificData[key].tableHead ', key, '=', JSON.stringify(specificData[key].tableHead));
              console.log('specificData[key].tableData ', key, '=', JSON.stringify(specificData[key].tableData));
              return (
                <View style={[Styles.sectionStyle]}>
                  {key !== 'null' &&
                    (
                      <HeaderSectionComponent
                        style={[Styles.headerSectionStyle, { width: "100%" }]}
                        title={self.convertKeyToVi(key)} />
                    )
                  }
                  <View style={[styles.tableContainer, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Table style={{ width: '100%' }}
                      borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}
                    >
                      <Row
                        data={specificData[key].tableHead}
                        style={styles.tableHead} textStyle={styles.tableText}
                        flexArr={[1, 2, 2, 2]}
                      />
                      {
                        specificData[key].tableData.map((rowData, index) => (
                          <TableWrapper
                            key={index}
                            style={{ width: '100%', flexDirection: 'row' }}
                            borderStyle={{
                              borderWidth: 2,
                              borderColor: '#c8e1ff'
                            }}>
                            {
                              rowData.map((cellData, cellIndex) => (
                                <Cell key={cellIndex}
                                  data={(isHoSoCapNhat && cellIndex === 2) ?
                                    (<TouchableOpacity
                                      onPress={() => {
                                        self.openLink(cellData);
                                      }}
                                      style={{ padding: 5 }}>
                                      <Text
                                        style={{ color: Colors.colorPrimary, textDecorationLine: 'underline' }}>{cellData}
                                      </Text>
                                    </TouchableOpacity>)
                                    : cellData}
                                  textStyle={styles.tableText}
                                  style={cellIndex == 0 ? { flex: 1 } : { flex: 2 }}
                                />
                              ))
                            }
                          </TableWrapper>
                        ))
                      }
                      {/* <Rows data={specificData[key].tableData} textStyle={styles.tableText}/> */}
                    </Table>
                  </View>

                </View>

              )
            })
          }

        </ScrollView>
        <View style={{ height: Utils.getBottomSafeAreaHeight(), width: "100%", backgroundColor: 'transparent' }} />

      </View>
    );
  }
  _onClick = (item) => {

  }

  openLink = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Don't know how to open URI: " + link);
      }
    }).catch(err => {
      console.log("openLink err: ", link, ' ', err);
    });
  }

  getData() {
    this.setState({ isLoading: true });
    getCompanyHoSo(this.state.companyDataFromParent.id).then((response) => {
      console.log('CompanyAnotherDetail getData response', JSON.stringify(response));
      return response.data
    }).then((textResponse) => {
      let obj = parse(textResponse);

      if (obj['soap:Envelope']
        && obj['soap:Envelope']['soap:Body']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCHosoResponse']
        && obj['soap:Envelope']['soap:Body']['VccaDNBHDCHosoResponse']['VccaDNBHDCHosoResult']) {
        var result = obj['soap:Envelope']['soap:Body']['VccaDNBHDCHosoResponse']['VccaDNBHDCHosoResult']
        let data = JSON.parse(result)
        console.log('CompanyAnotherDetail getData data', JSON.stringify(data))
        this.setState({
          companyData: data,
          isLoading: false
        })
      }
    }).catch(err => {
      console.log('CompanyAnotherDetail getData error', err);
      Alert.alert("Thông báo", err.message)
    });

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

export default connect(mapStateToProps, mapDispatchToProps)(MLMCompanyAnotherDetail);

