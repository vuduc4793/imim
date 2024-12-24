import { StyleSheet, Platform } from 'react-native';
import {AppDimensions, Colors} from "./index.js"

export const buildCommonStyles = (normalFontSize) => StyleSheet.create({
  normalText: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI',
    color: Colors.colorRed
  },
  p: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI',
    color: Colors.colorBlack2,
  },
  h1: {
    fontSize: normalFontSize + 1.5,
    fontFamily: 'SegoeUI-Bold',
    color: Colors.colorBlack2,
  },
  h2: {
    fontSize: normalFontSize +1,
    fontFamily: 'SegoeUI-Bold',
    color: Colors.colorBlack2,
  },
  h3: {
    fontSize: normalFontSize +0.5,
    fontFamily: 'SegoeUI-Bold',
    color: Colors.colorBlack2,
  },
  text: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI',
    color: Colors.colorBlack2,
  },
  note: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: Colors.colorBlack2,
  },
  hl: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: 'red',
  },
  i: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-LightItalic',
    color: Colors.colorBlack2,
  },
  ub: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: Colors.colorBlack2,
  },
  ib: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-LightItalic',
    color: Colors.colorBlack2,
  }
});

export const genQuestionTextStyles = (normalFontSize) => StyleSheet.create({
  text: {
    fontSize: normalFontSize + 2,
    fontFamily: 'SegoeUI-Bold',
    color: Colors.colorBlack2,
  }
});

export const genAnswerTextStyles = (normalFontSize) => StyleSheet.create({
  text: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI',
    color: Colors.colorBlack2,
  },
  note: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: Colors.colorBlack2,
  },
  hl: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: 'red',
  },
  i: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-LightItalic',
    color: Colors.colorBlack2,
  },
  ub: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-BoldItalic',
    color: Colors.colorBlack2,
  },
  ib: {
    fontSize: normalFontSize,
    fontFamily: 'SegoeUI-LightItalic',
    color: Colors.colorBlack2,
  },
});