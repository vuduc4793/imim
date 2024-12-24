import {
  Image
} from 'react-native';

export const getSizeImage = (uriImage) => new Promise((resolve, reject) => {
  Image.getSize(uriImage, (width, height) => {
    let informationImage = {
      width,
      height
    }
    resolve(informationImage);
  }, err => {
    reject(err);
  });
});