import { BACKGROUND_COLOR, TYPE_READ, FONT_SIZE, FONT_FAMILY, DISTANCE_ROW } from '../types';
import { BACKGROUND_COLOR_WHITE, TYPE_READ_VERTICAL, FONT_FAMILY_SERIF } from '../../constants/define';
import {AppDimensions} from "../../constants";
const initialState = {
  backgroundColor: BACKGROUND_COLOR_WHITE,
  typeRead: TYPE_READ_VERTICAL,
  fontSize: AppDimensions.NORMAL_TEXT_SIZE,
  fontFamily: FONT_FAMILY_SERIF,
  distanceRow: 3
};

export default function (state = initialState, action) {
  switch (action.type) {
    case BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: action.backgroundColor
      }
    case TYPE_READ:
      return {
        ...state,
        typeRead: action.typeRead
      }
    case FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize
      }
    case FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily
      }
    case DISTANCE_ROW:
      return {
        ...state,
        distanceRow: action.distanceRow
      }
    default:
      return state;
  }
}