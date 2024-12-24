import Realm from 'realm';
import * as SCHEMA_NAME from './constant';

// Define your models and their properties
class DBInfoSchema extends Realm.Object { }
DBInfoSchema.schema = {
  name: SCHEMA_NAME.DB_INFO_SCHEMA,
  properties: {
    version: 'int'
  }
};

class MLMCompanySchema extends Realm.Object { }
MLMCompanySchema.schema = {
  name: SCHEMA_NAME.MLM_COMPANY_SCHEMA,
  properties: {
    index: 'int',
    HoSoChung:'string',
    HoSoCapNhat:'string',
    TruSoChinh:'string',
    ThongTinNguoiDaiDien:'string',
    ThongTinChuSoHuu:'string',
    textForSearch: 'string',
    tenKhongDau: 'string'
  }
};

class QAndASchema extends Realm.Object { }
QAndASchema.schema = {
  name: SCHEMA_NAME.Q_AND_A_SCHEMA,
  properties: {
    index: 'int',
    question: 'string',
    answer: 'string',
    summary: 'string',
    textForSearch: 'string'
  }
};
const lawProperties = {
  id: 'int',
  sectionName: 'string',
  sectionIndex: 'int',
  title: 'string',
  content: 'string',
  summary: 'string',
  textForSearch: 'string',
  _id: 'string'
}; 

class NghiDinh40Schema extends Realm.Object { }
NghiDinh40Schema.schema = {
  name: SCHEMA_NAME.NGHI_DINH_40_SCHEMA,
  properties: lawProperties
};

class ThongTu10Schema extends Realm.Object { }
ThongTu10Schema.schema = {
  name: SCHEMA_NAME.THONG_TU_10_SCHEMA,
  properties: lawProperties
};
class NghiDinh141Schema extends Realm.Object { }
NghiDinh141Schema.schema = {
  name: SCHEMA_NAME.NGHI_DINH_141_SCHEMA,
  properties: lawProperties
};
class PHAP_LUAT_DOC_1_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_1_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_1_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_2_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_2_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_2_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_3_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_3_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_3_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_4_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_4_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_4_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_5_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_5_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_5_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_6_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_6_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_6_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_7_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_7_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_7_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_8_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_8_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_8_SCHEMA,
  properties: lawProperties
};

class PHAP_LUAT_DOC_9_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_9_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_9_SCHEMA,
  properties: lawProperties
};
class PHAP_LUAT_DOC_10_SCHEMA extends Realm.Object { }
PHAP_LUAT_DOC_10_SCHEMA.schema = {
  name: SCHEMA_NAME.PHAP_LUAT_DOC_10_SCHEMA,
  properties: lawProperties
};

class LawDocInfoSchema extends Realm.Object { }
LawDocInfoSchema.schema = {
  name: SCHEMA_NAME.LAW_DOC_INFO_SCHEMA,
  properties: {
    name: 'string',
    shortName: 'string',
    schemaName: 'string',
    numberOfItem: 'int',
    link: 'string'
  }
};

class CommentSchema extends Realm.Object { }
CommentSchema.schema = {
  name: SCHEMA_NAME.COMMENT_SCHEMA,
  properties: {
    _id: 'string',
    text: 'string',
    mail: 'string',
    name: 'string',
    sourceType: 'int',
    sourceID: 'string',
    sourceName: 'string',
    status: 'int',
    created_at: 'string'
  }
};

export const databaseOptions = {
  path: 'TTKTDC.realm',
  schema: [DBInfoSchema, MLMCompanySchema,
    QAndASchema,PHAP_LUAT_DOC_1_SCHEMA,
    PHAP_LUAT_DOC_2_SCHEMA, PHAP_LUAT_DOC_3_SCHEMA,PHAP_LUAT_DOC_4_SCHEMA,PHAP_LUAT_DOC_5_SCHEMA,
    PHAP_LUAT_DOC_6_SCHEMA,PHAP_LUAT_DOC_7_SCHEMA,PHAP_LUAT_DOC_8_SCHEMA,PHAP_LUAT_DOC_9_SCHEMA,
    PHAP_LUAT_DOC_10_SCHEMA, LawDocInfoSchema, CommentSchema],
  schemaVersion: 3, //optional
  deleteRealmIfMigrationNeeded: true,
  // migration: (oldRealm, newRealm) => {
  //   // only apply this change if upgrading to schemaVersion 1
  //   if (oldRealm.schemaVersion < 3) {
      
  //   }
    
  // }
}

export default new Realm(databaseOptions);
