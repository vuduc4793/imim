// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Jsons } from '../constants';

export const ABOUT_US = "ABOUT_US";
export const LUU_Y_NHA_PHAN_PHOI = "LUU_Y_NHA_PHAN_PHOI";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + '');
  } catch (error) {
    // Error saving data
    console.log('saveData error', error);
  }
};

export const getData = async (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => {
        console.log('getData error', JSON.stringify(err));
        reject(err)
      });
  });
};

export const deleteData = (key) => {
  AsyncStorage.removeItem(key);
}

export const updateData = async (key, value) => {
  await AsyncStorage.removeItem(key);
  saveData(key, value);
}