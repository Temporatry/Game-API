import mysql from 'mysql';
import httpStatus from 'http-status';
import config from '../../config/config';
import APPError from '../helper/AppError';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  database: config.mysqlDatabase
});

/**
 * Website_Shelve 資料表
 */

/*  Website_Shelve GET 取得  */
const selectWebsiteShelve = (websiteShelveId) => {
  /* 若 url 中有 website_shelve_id(商店地區id) 則用 WHERE 搜尋該地區店家資料
     反之 website_shelve_id===undefined 時搜尋出所有店家資料 */
  let queryString = '';
  if (websiteShelveId) {
    queryString = `WHERE product_series_id=${websiteShelveId}`;
  }
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT 
          website_shelve_id as id,product_series_id as series_id,website_shelve_page page,website_shelve_card as cards,
          website_shelve_created_time as created_time,website_shelve_updated_time as updated_time
          FROM Website_Shelve ${queryString}` // User撈取所有欄位的值組
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              resolve(Object.assign({ edit: result })); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};
/* Website_Shelve  POST 新增 */
const createWebsiteShelve = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Website_Shelve SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
          } else if (result.affectedRows === 1) {
            // 寫入成功回傳寫入id
            resolve(Object.assign({ code: 200 }, { message: '新增成功', insertId: `${result.insertId}` }));
          }
          connection.release();
        });
      }
    });
  });
};
/* Website_Shelve PUT 修改 */
const modifyWebsiteShelve = (insertValues, modifyId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表修改指定id一筆資料
        connection.query('UPDATE Website_Shelve SET ? WHERE website_shelve_id = ?', [insertValues, modifyId], (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
          } else if (result.affectedRows === 0) {
            // 寫入時發現無該筆資料
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, '修改失敗，請確認ID', 'ER_BAD_FIELD_ERROR', 1054));
          } else if (result.message.match('Changed: 1')) {
            resolve(Object.assign({ code: 200 }, { message: '資料修改成功' }));
          } else {
            resolve(Object.assign({ code: 200 }, { message: '資料無異動' }));
          }
          connection.release();
        });
      }
    });
  });
};
/* Website_Shelve DELETE 刪除 */
const deleteWebsiteShelve = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表刪除指定id一筆資料
        connection.query('DELETE FROM Website_Shelve WHERE website_shelve_id = ?', userId, (error, result) => {
          if (error) {
            // 資料庫存取有問題時回傳錯誤
            reject(error);
          } else if (result.affectedRows === 1) {
            resolve(Object.assign({ code: 200 }, { message: '刪除成功' }));
          } else {
            // 刪除時發現無該筆資料
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, '刪除失敗，請確認ID', 'ER_BAD_FIELD_ERROR', 1054));
          }
          connection.release();
        });
      }
    });
  });
};

export default {
  selectWebsiteShelve,
  createWebsiteShelve,
  modifyWebsiteShelve,
  deleteWebsiteShelve
};
