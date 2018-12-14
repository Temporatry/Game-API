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

/*  Store GET 取得  */
const selectStore = () => {
  /* 若 url 中有 store_area_id(商店地區id) 則用 WHERE 搜尋該地區店家資料
     反之 store_area_id===undefined 時搜尋出所有店家資料 */

  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        // async.waterfall([
        //   // step.1 ->
        //   (callback) => {
        //     let resultRegion;
        //     connection.query(
        //       `SELECT
        //       store_region_id as id,store_region_name as name,store_region_img as img,
        //       store_region_created_time as created_time,store_region_updated_time as updated_time
        //       FROM Store_Region ${queryString}` // User撈取所有欄位的值組
        //       , (error, result) => {
        //         if (error) {
        //           // 寫入資料庫有問題時回傳錯誤
        //           reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
        //         } else {
        //           resultRegion = result;
        //         }
        //       }
        //     );
        //     connection.query(
        //       `SELECT
        //       store_area_id as id,store_region_id as region_id,store_area_name as name,store_area_img as img,
        //       store_area_created_time as created_time,store_area_updated_time as updated_time
        //       FROM Store_Area ${queryString}` // User撈取所有欄位的值組
        //       , (error, result) => {
        //         if (error) {
        //           // 寫入資料庫有問題時回傳錯誤
        //           reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
        //         } else {
        //           // resolve(Object.assign({}, { store: result })); // 撈取成功回傳 JSON 資料
        //           callback(null, resultRegion, result);
        //         }
        //       }
        //     );
        //   }
        // ], (err, resultRegion, resultArea) => {
        //   connection.query(
        //     `SELECT
        //     store_id as id,store_area_id as area_id,store_name as name,store_phone as phone,
        //     store_address as address,store_created_time as created_time,store_updated_time as updated_time
        //     FROM Store ${queryString}` // User撈取所有欄位的值組
        //     , (error, result) => {
        //       if (error) {
        //         // 寫入資料庫有問題時回傳錯誤
        //         reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
        //       } else {
        //         // 撈取成功回傳 JSON 資料
        //         resolve(Object.assign(
        //           { region: resultRegion },
        //           { area: resultArea },
        //           { store: result }
        //         ));
        //       }
        //       connection.release();
        //     }
        //   );
        // });
        connection.query(
          `SELECT 
            store_id as id,store_name as name,store_phone as phone,
            store_address as address,store_latitude as lat,store_longitude as lng
            FROM Store` // User撈取所有欄位的值組
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              resolve(Object.assign(result));
            }
            connection.release();
          }
        );
      }
    });
  });
};

/*  Store_Area GET 取得  */
const selectStoreArea = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          'SELECT  * FROM Store_Area' // User撈取所有欄位的值組
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              resolve(result); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};

/*  Store_Region GET 取得  */
const selectStoreRegion = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT 
          store_region_id as id,store_region_name as name,store_region_img as img,
          store_region_created_time as created_time,store_region_updated_time as updated_time
          FROM Store_Region` // User撈取所有欄位的值組
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              resolve(Object.assign({ region: result })); // 撈取成功回傳 JSON 資料
            }
            connection.release();
          }
        );
      }
    });
  });
};

export default {
  selectStore,
  selectStoreArea,
  selectStoreRegion
};
