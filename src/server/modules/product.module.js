import mysql from 'mysql';
import httpStatus from 'http-status';
import config from '../../config/config';
import APPError from '../helper/AppError';

const connectionPool = mysql.createPool({
  connectionLimit: 10,
  host: config.mysqlHost,
  user: config.mysqlUserName,
  password: config.mysqlPass,
  //database: config.mysqlDatabase
});


const selectGame = (gameId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT *
          FROM go_game_356.move WHERE game_id= 'WCCI-2016-GO-${gameId}'`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              resolve(Object.assign(result));
            }
            connection.release();
          }
        );
      }
    });
  });
};

/**
 * Product 資料表
 */
/*  Product 取得  */
const selectProduct = (category, series) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        let queryString = ''; // 以類別(category)或系列(series)查詢商品
        if (category !== undefined && series !== undefined) { // 類別＋系列搜尋
          queryString = `WHERE product_category = '${category}' AND product_series = '${series}' AND product_launch=1`;
        } else if (category !== undefined) { // 類別搜尋
          queryString = `WHERE product_category = '${category}' AND product_launch=1`;
        } else if (series !== undefined) { // 系列搜尋
          queryString = `WHERE product_series = '${series}' AND product_launch=1`;
        } else {
          queryString = 'WHERE product_launch=1';
        }
        connection.query(
          `SELECT
          product_id as id,product_model as model,product_name as product,
          product_image as image,product_category as category,product_series as series
          FROM Product ${queryString}`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              // const productResult = [];
              // result.map((c) => {
              //   const price = JSON.parse(c.price);
              //   const data = {
              //     id: c.id,
              //     name: c.name,
              //     model: c.model,
              //     unit: c.unit,
              //     stock: c.stock,
              //     ean: c.ean,
              //     price,
              //     created_time: c.created_time,
              //     updated_time: c.updated_time
              //   };
              //   return productResult.push(data);
              // });
              resolve(Object.assign(result));
            }
            connection.release();
          }
        );
      }
    });
  });
};
/*  Product 商品細項取得  */
const selectProductItem = (model) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT
          product_id as id,product_model as model,product_name as product,product_rrp as price,
          product_ean as ean,product_images as images,product_series as series
          FROM Product WHERE product_model = '${model}'`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              const productItemResult = [];
              result.map((item) => {
                const images = JSON.parse(item.images);
                const data = {
                  id: item.id,
                  model: item.model,
                  product: item.product,
                  price: item.price,
                  ean: item.ean,
                  images,
                  series: item.series
                };
                return productItemResult.push(data);
              });
              // 結果回傳
              try {
                resolve(Object.assign(productItemResult[0]));
              } catch (err) {
                reject(new APPError.APIError(httpStatus.BAD_REQUEST, '查無該筆資料', err.code, err.errno));
              }
            }
            connection.release();
          }
        );
      }
    });
  });
};
/* Product  POST 新增 */
const createProduct = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Product SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
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
/* Product PUT 修改 */
const modifyProduct = (insertValues, productModel) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表修改指定id一筆資料
        connection.query('UPDATE Product SET ? WHERE product_model = ?', [insertValues, productModel], (error, result) => {
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
/* Product DELETE 刪除 */
const deleteProduct = (productModel) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表刪除指定id一筆資料
        connection.query('DELETE FROM Product WHERE product_model = ?', productModel, (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
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

/**
 * Product_Category 資料表
 */
/*  Product_Category GET 取得  */
const selectProductCategory = () => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT  
          product_category_id as id,product_category_img as img,product_category_name as name,
          product_category_description as description,product_category_created_time as created_time,product_category_updated_time as updated_time 
          FROM Product_Category`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              resolve(Object.assign({ category: result }));
            }
            connection.release();
          }
        );
      }
    });
  });
};
/* Product_Category  POST 新增 */
const createProductCategory = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Product_Category SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
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
/* Product_Category PUT 修改 */
const modifyProductCategory = (insertValues, modifyId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表修改指定id一筆資料
        connection.query('UPDATE Product_Category SET ? WHERE product_category_id = ?', [insertValues, modifyId], (error, result) => {
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
/* Product_Category DELETE 刪除 */
const deleteProductCategory = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表刪除指定id一筆資料
        connection.query('DELETE FROM Product_Category WHERE product_category_id = ?', userId, (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
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

/**
 * Product_Series 資料表
 */
/*  Product_Series GET 取得  */
const selectProductSeries = (productCategoryId) => {
  /* 若 url 中有 product_series_id(商店地區id) 則用 WHERE 搜尋該地區店家資料
     反之 product_series_id===undefined 時搜尋出所有店家資料 */
  let queryString = '';
  if (productCategoryId) {
    queryString = `WHERE product_category_id=${productCategoryId}`;
  }
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT  
          product_series_id as id,product_category_id as category_id,product_series_img as img,product_series_name as name,
          product_series_description as description,product_series_created_time as created_time,product_series_updated_time as updated_time
          FROM Product_Series ${queryString}`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              resolve(Object.assign({ series: result }));
            }
            connection.release();
          }
        );
      }
    });
  });
};
/* Product_Series  POST 新增 */
const createProductSeries = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Product_Series SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
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
/* Product_Series PUT 修改 */
const modifyProductSeries = (insertValues, modifyId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表修改指定id一筆資料
        connection.query('UPDATE Product_Series SET ? WHERE product_series_id = ?', [insertValues, modifyId], (error, result) => {
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
/* Product_Series DELETE 刪除 */
const deleteProductSeries = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表刪除指定id一筆資料
        connection.query('DELETE FROM Product_Series WHERE product_series_id = ?', userId, (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
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

/**
 * Product_Card 資料表
 */
/*  Product_Card GET 取得  */
const selectProductCard = (productCardId) => {
  /* 若 url 中有 product_card_id(商店地區id) 則用 WHERE 搜尋該地區店家資料
     反之 product_card_id===undefined 時搜尋出所有店家資料 */
  let queryString = '';
  if (productCardId) {
    queryString = `WHERE product_card_id=${productCardId}`;
  }
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query(
          `SELECT  
          product_card_id as id,product_card_name as name,product_card_detail as detail,product_card_lightbox as lightbox,
          product_card_intro as intro,product_card_video as video,product_card_created_time as created_time,product_card_updated_time as updated_time
          FROM Product_Card ${queryString}`
          , (error, result) => {
            if (error) {
              // 寫入資料庫有問題時回傳錯誤
              reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
            } else {
              // 撈取成功回傳 JSON 資料
              const cardResult = [];
              result.map((c) => {
                const lightbox = JSON.parse(c.lightbox);
                const detail = JSON.parse(c.detail);
                const intro = JSON.parse(c.intro);
                const data = {
                  name: c.name,
                  id: c.id,
                  lightbox,
                  detail,
                  intro,
                  video: c.video
                };
                return cardResult.push(data);
              });
              resolve(Object.assign({ cardResult }));
            }
            connection.release();
          }
        );
      }
    });
  });
};
/* Product_Card  POST 新增 */
const createProductCard = (insertValues) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else {
        connection.query('INSERT INTO Product_Card SET ?', insertValues, (error, result) => { // User資料表寫入一筆資料
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
/* Product_Card PUT 修改 */
const modifyProductCard = (insertValues, modifyId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表修改指定id一筆資料
        connection.query('UPDATE Product_Card SET ? WHERE product_card_id = ?', [insertValues, modifyId], (error, result) => {
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
/* Product_Card DELETE 刪除 */
const deleteProductCard = (userId) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => { // 資料庫連線
      if (connectionError) {
        reject(new APPError.MySQLError()); // 若連線有問題回傳錯誤
      } else { // 資料表刪除指定id一筆資料
        connection.query('DELETE FROM Product_Card WHERE product_card_id = ?', userId, (error, result) => {
          if (error) {
            // 寫入資料庫有問題時回傳錯誤
            reject(new APPError.APIError(httpStatus.BAD_REQUEST, error.sqlMessage, error.code, error.errno));
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
  selectGame,
  selectProduct,
  selectProductItem,
  createProduct,
  modifyProduct,
  deleteProduct,
  selectProductCategory,
  createProductCategory,
  modifyProductCategory,
  deleteProductCategory,
  selectProductSeries,
  createProductSeries,
  modifyProductSeries,
  deleteProductSeries,
  selectProductCard,
  createProductCard,
  modifyProductCard,
  deleteProductCard
};
