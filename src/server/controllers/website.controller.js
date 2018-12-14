import websiteModule from '../modules/website.module';

/**
 * Website_Shelve 資料表
 */

/*  Website_Shelve GET 取得  */
const websiteShelveGet = (req, res, next) => {
  const websiteShelveId = req.query.id; // 取得 url 中的 store_area_id 參數
  websiteModule.selectWebsiteShelve(websiteShelveId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Website_Shelve POST 新增  */
const websiteShelvePost = (req, res, next) => {
  // 取得新增參數
  const insertValues = {
    product_series_id: req.body.series_id,
    website_shelve_page: JSON.stringify(req.body.page),
    website_shelve_card: JSON.stringify(req.body.cards)
  };
  websiteModule.createWebsiteShelve(insertValues).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Website_Shelve PUT 修改  */
const websiteShelvePut = (req, res, next) => {
  // 取得修改參數
  const insertValues = {
    product_series_id: req.body.series_id,
    website_shelve_page: JSON.stringify(req.body.page),
    website_shelve_card: JSON.stringify(req.body.cards)
  };
  // 取得修改id
  const modifyId = req.query.id;
  websiteModule.modifyWebsiteShelve(insertValues, modifyId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Website_Shelve DELETE 刪除 */
const websiteShelveDelete = (req, res, next) => {
  // 取得刪除id
  const deleteId = req.query.id;
  websiteModule.deleteWebsiteShelve(deleteId).then((result) => {
    res.json(result); // 回傳刪除成功訊息
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

// const test = (req, res) => {
//   res.send('測試');
// };

export default {
  websiteShelveGet,
  websiteShelvePost,
  websiteShelvePut,
  websiteShelveDelete
};
