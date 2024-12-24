// import SQLite from 'react-native-sqlite-storage';
// SQLite.DEBUG(true);
// SQLite.enablePromise(false);

// const database_name = "Story.db";
// const database_version = "1.0";
// const database_displayname = "Story Database";
// const database_size = 200000;
// let db;


// export const createDB = () => {
//   // Opening database ...
//   db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, openCB, errorCB);
//   db.transaction((tx) => {
//     tx.executeSql('CREATE TABLE IF NOT EXISTS Story( '
//       + 'id VARCHAR(100) PRIMARY KEY NOT NULL, '
//       + 'crawl_url VARCHAR(100), '
//       + 'created INTEGER, '
//       + 'cover VARCHAR(200), '
//       + 'title VARCHAR(150), '
//       + 'author VARCHAR(50), '
//       + 'source VARCHAR(150), '
//       + 'full REAL, '
//       + 'genre VARCHAR(150), '
//       + 'desc TEXT, '
//       + 'first_chapter_url VARCHAR(150), '
//       + 'updated INTEGER, '
//       + 'publish REAL, '
//       + 'chapter_count INTEGER, '
//       + 'view_count INTEGER, '
//       + 'like_count INTEGER );', [], successCB, errorCB);

//     tx.executeSql('CREATE TABLE IF NOT EXISTS Chapter( '
//       + 'id VARCHAR(100) PRIMARY KEY NOT NULL, '
//       + 'title VARCHAR(150), '
//       + 'content TEXT, '
//       + 'story_id VARCHAR(100), '
//       + 'number INTEGER );', [], successCB, errorCB);

//     console.log("all config SQL done");
//   }, errorCB, () => {
//     console.log("create db success");
//     closeDatabase();
//   });
// }

// export const insertStory = () => {
//   db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, openCB, errorCB);
//   db.transaction((tx) => {
//     tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");', []);
//   }, errorCB, () => {
//     console.log("insert successs");
//     closeDatabase();
//   });
// }

// export const closeDatabase = () => {
//   if (db) {
//     console.log("Closing database ...");
//     db.close(closeCB, errorCB);
//   } else {
//     console.log("Database was not OPENED");
//   }
// }

// export const errorCB = (err) => {
//   console.log("error: ", err);
//   return false;
// }

// export const successCB = () => {
//   console.log("SQL executed ...");
// }

// export const openCB = () => {
//   console.log("Database OPEN");
// }

// export const closeCB = () => {
//   console.log("Database CLOSED");
// }