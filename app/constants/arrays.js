import {Texts, Icons} from "./index";
import { Platform } from "react-native";

export const listGender = [{
  value: 'Nam',
}, {
  value: 'Nữ',
}];
export const listGoodsType = [{
  value: 'Bất động sản, Nhà ở',
  code:294,
},{
  value: 'Dịch vụ Vận tải, Phương tiện vận chuyển',
  code:296,
}, {
  value: 'Du lịch, Nhà hàng',
  code:298,
},{
  value: 'Giáo dục, Giải trí',
  code:300,
},{
  value: 'Hàng hóa tiêu dùng thường ngày khác',
  code:302,
},{
  value: 'Máy tính, Kết nối Internet',
  code:304,
},{
  value: 'Năng lượng, Môi trường',
  code:306,
},{
  value: 'Nội thất, Ngoại thất',
  code:308,
},{
  value: 'Tài chính, Ngân hàng',
  code:310,
},{
  value: 'Thiết bị văn phòng',
  code:312,
},{
  value: 'Thời trang, Trang sức',
  code:314,
},{
  value: 'Y tế, Chăm sóc sức khỏe',
  code:316,
},{
  value: 'Điện thoại, Viễn thông',
  code:318,
},{
  value: 'Đồ điện tử gia dụng',
  code:320,
},{
  value: 'Thực phẩm đóng gói, chế biến sẵn',
  code:322,
},{
  value: 'Dịch vụ Kết nối Internet, Mạng di động',
  code:324,
},{
  value: 'Tài chính, Bảo hiểm, Ngân hàng',
  code:326,
},{
  value: 'Tín dụng tiêu dùng',
  code:328,
},];

export const listHomeFeature = [
    {
      id: 0,
      title: Texts.introduce,
      uri: Icons.IC_INFO
    },
    {
      id: 1,
      title: Texts.phapLuatBHDC,
      uri: Icons.IC_LAW
    },
    {
      id: 2,
      title: Texts.multiLevelSalesList,
      uri: Icons.IC_MLM_COMPANY_LIST
    },
    {
      id: 3,
      title: Texts.qAndA,
      uri: Icons.IC_ASK_ANSWER
    },
    {
      id: 4,
      title: "Lưu ý",
      uri: Icons.IC_ALERT
    },
    
    {
      id: 5,
      title: "Tin tức",
      uri: Icons.IC_NEWS
    },
    
    // {
    //   id: 6,
    //   title: "Về chúng tôi",
    //   uri: Icons.IC_ABOUT_US_IOS
    // }
  ];