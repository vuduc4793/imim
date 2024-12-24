import {
  Platform,
} from 'react-native'; 
import DeviceInfo from "react-native-device-info";
import {Jsons} from "../constants";
import {Numbering} from "../constants/index";
import {StorageUtils} from "./index"
import {AppDimensions } from "../constants"
var DomParser = require('react-native-html-parser').DOMParser

export const getBottomSafeAreaHeight= () => {
  return isIphoneX() ? 23: (Platform.isPad ? 10 : AppDimensions.BOTTOM_SAFE_AREA)
}

export const nonAccentVietnamese= (s) => {
  let str = s;
  str = str.toLowerCase();
//     We can also use this instead of from line 11 to line 17
//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
//     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

export const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    DeviceInfo.hasNotch
  );
}

export const getListProvinceFromJson = () => {
  let json = Jsons.DATA_TINHTHANH;
  let arr = [];
  Object.keys(json).forEach(function(key) {
    arr.push({ 'value': json[key]['name']});
  });
  console.log("getListProvinceFromJson arr " + JSON.stringify(arr));
  return arr;
}

export const removeHTMLTags = (r) => {
  r = r.replace('<p>','');
  r = r.replace('</p>','');
  r = r.replace('<note>','');
  r = r.replace('</note>','');
  r = r.replace('<i>','');
  r = r.replace('</i>','');
  r = r.replace('<ub>','');
  r = r.replace('</ub>','');
  r = r.replace('<ib>','');
  r = r.replace('</ib>','');
  r = r.replace('<hl>','');
  r = r.replace('</hl>','');
  r = r.replace(/(<([^>]+)>)/ig,"");
  return r;
}

export const showInfoDialog = async () => {
  let userName = StorageUtils.getData(Numbering.kUserName)
  let userMail = StorageUtils.getData(Numbering.kEmail)

  if (!userMail || !userName) {
    // show popup notice missing info
    return 
  }
}

export const escapeHTML = (text) => {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

export const removeFontSizeTag = (input) => {
  console.log("removeFontSizeTag input", input)
  if (!input.includes('font-size')) {
    // console.log("!input.includes('font-size'))", !input.includes('font-size'))
    return input
  }

  // return input
  let doc = new DomParser().parseFromString(`<!DOCTYPE html><html><head></head><body>${input}</body></html>`,'text/html')

  var divElement = doc.createElement('div');
  divElement.innerHTML = input;  
  // loop through ALL DOM elements insidie the divElement
  var elements = doc.getElementsByTagName("*");
  // console.log("getElementsByTagName length", elements.length)
  // console.log("divElement", divElement)

  for (var i = 0; i < elements.length; i++) {
    // remove the style attribute enterily if it contains font-size property
    if ((elements[i].getAttribute('style') || '').includes('font-size')) {
      elements[i].removeAttribute('style');
      // console.log("after removeAttribute elements[i]", elements[i])
    }
  }
  // console.log("after removeFontSizeTag doc", doc.documentElement.toString())

  return doc.documentElement.toString()
}


export function generateUUID(digits) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
      uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}