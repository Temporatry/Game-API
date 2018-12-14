import storeModule from '../modules/store.module';

/**
 * Store 資料表
 */

/*  Store GET 取得  */
const storeGet = (req, res, next) => {
  storeModule.selectStore().then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/**
 * Store_Area 資料表
 */

/*  Store_Area GET 取得  */
const storeAreaGet = (req, res, next) => {
  storeModule.selectStoreArea().then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/**
 * Store_Region 資料表
 */

/*  Store_Region GET 取得  */
const storeRegionGet = (req, res, next) => {
  storeModule.selectStoreRegion().then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

// const test = (req, res) => {
//   res.send('測試');
// };

export default {
  storeRegionGet,
  storeGet,
  storeAreaGet
};
