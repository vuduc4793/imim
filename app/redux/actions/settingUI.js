import { BACKGROUND_COLOR, TYPE_READ, FONT_SIZE, FONT_FAMILY, DISTANCE_ROW } from '../types';

export function changeBackgroundColor(backgroundColor) {
  return dispatch => dispatch({
    type: BACKGROUND_COLOR,
    backgroundColor: backgroundColor,
  });
}

export function changeTypeRead(typeRead) {
  return dispatch => dispatch({
    type: TYPE_READ,
    typeRead: typeRead,
  });
}

export function changeFontSize(fontSize) {
  return dispatch => dispatch({
    type: FONT_SIZE,
    fontSize: fontSize,
  });
}

export function changeFontFamily(fontFamily) {
  return dispatch => dispatch({
    type: FONT_FAMILY,
    fontFamily: fontFamily,
  });
}

export function changeDistanceRow(distanceRow) {
  return dispatch => dispatch({
    type: DISTANCE_ROW,
    distanceRow: distanceRow,
  });
}