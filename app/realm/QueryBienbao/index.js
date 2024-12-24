import Realm from 'realm';
import { BIENBAO_SCHEMA } from '../constant';
import { databaseOpations } from '../index';


export const insertNewBienbao = newBienbao => new Promise((resolve, reject) => {
  Realm.open(databaseOpations).then(realm => {
    realm.write(() => {
      realm.create(BIENBAO_SCHEMA, newBienbao);
      resolve(newBienbao);
    });
  }).catch((error) => reject(error));
});
